'use strict';
(() => {
  if(!MizanRuntime.preview&&!window.MIZAN_DEPLOYMENT?.apiOrigin)return;
  const $=selector=>document.querySelector(selector);
  const codePattern=/^[A-HJ-NP-Z2-9]{6}$/;
  const tokenPattern=/^[a-f0-9]{32}$/;
  const escape=TeamFields.escape;
  const classroomLaunch=new URLSearchParams(location.search).get('classroom')==='mizan';
  const draftStorage='qba-challenge-drafts';
  const receiptStorage='qba-challenge-pending-saves';
  let answerDrafts={};
  let pendingRoundSaves={};
  try{answerDrafts=JSON.parse(localStorage.getItem(draftStorage))||{};}catch{}
  try{pendingRoundSaves=JSON.parse(localStorage.getItem(receiptStorage))||{};}catch{}
  const taskDrafts={};
  let code='',token='',view=null,signature='',busy=false,refreshing=false,generation=0;
  let pollTimer=null,pollFailures=0,saveTimer=null,autosaving=null;
  const queuedSaves=new Map();
  let ballotInFlight=null,ballotRejected=null,decisionInFlight=null;
  let taskPhase='',noteDirty=false,analysisSignature='',memberKey='',findingRequest=null;
  const newToken=()=>Array.from(crypto.getRandomValues(new Uint8Array(16)),byte=>byte.toString(16).padStart(2,'0')).join('');
  function rememberToken(roomCode,value){
    try{localStorage.setItem('qba-lobby-member-'+roomCode,value);}catch{}
  }
  function memberToken(roomCode){
    const key='qba-lobby-member-'+roomCode;
    try{
      const saved=localStorage.getItem(key);
      if(tokenPattern.test(saved||''))return saved;
    }catch{}
    const fresh=newToken();
    rememberToken(roomCode,fresh);
    return fresh;
  }
  function message(text='',error=false){
    $('#lobby-message').textContent=text;
    $('#lobby-message').classList.toggle('error',error);
    window.MizanWorkspace?.setFlash(text,error);
  }
  function showJoinQR(roomCode){
    const panel=$('#student-join-qr');
    const url=new URL(MizanRuntime.page('lobby'),location.origin);
    url.searchParams.set('room',roomCode);
    const image=window.LobbyQR?.image(url.href);
    panel.hidden=!image;
    if(!image)return;
    const qr=$('#student-qr-image');
    if(qr.getAttribute('src')!==image)qr.src=image;
    $('#student-qr-class-code').textContent='Class code '+roomCode;
  }
  async function api(action='lobby',body,credential=token){
    const response=await MizanRuntime.fetch('/api/challenges/'+code+'/'+action,{
      method:body===undefined?'GET':'POST',cache:'no-store',signal:AbortSignal.timeout(body===undefined?20000:30000),
      headers:{'X-Lobby-Member':credential,...(body===undefined?{}:{'Content-Type':'application/json'})},
      body:body===undefined?undefined:JSON.stringify(body)
    });
    const data=await response.json();
    if(!response.ok)throw Object.assign(new Error(data.error),{status:response.status});
    return data;
  }
  function draftKey(data,round){
    return [code,data.member.team,round.phase,round.version].join('-');
  }
  function fieldValues(form){
    return Object.fromEntries(Array.from(form.querySelectorAll('[data-field]'),field=>[field.dataset.field,field.value]));
  }
  function saveStatus(message){
    const node=$('#ws-autosave-status');
    if(node&&node.textContent!==message)node.textContent=message;
  }
  const hasQueuedWork=()=>[...queuedSaves.keys()].some(key=>key!=='vote');
  function scheduleSave(){
    if(saveTimer||busy||autosaving||!queuedSaves.size||navigator.onLine===false)return;
    const slot=parseInt(view?.member?.team?.slice(0,4)??'0',16)%1200;
    const timeLeft=window.MizanClock.remaining();
    const delay=Math.max(0,Math.min(450+slot+Math.random()*220,timeLeft-700));
    saveTimer=setTimeout(flushSaves,delay);
  }
  function queueSave(key,action,build,version,roundSave){
    queuedSaves.set(key,{code,token,action,build,version,roundSave});
    saveStatus(navigator.onLine===false?'Draft is on this device. Waiting for a connection.':'Saving changes…');
    scheduleSave();
  }
  const currentBallot=(write,choice)=>write&&write.code===code&&write.token===token&&write.choice===choice;
  function ballotStatus(choice){
    if(currentBallot(ballotInFlight,choice))return 'saving';
    const queued=queuedSaves.get('vote');
    if(currentBallot(queued,choice))return navigator.onLine===false?'offline':queued.retry?'retrying':'saving';
    return currentBallot(ballotRejected,choice)?'rejected':'';
  }
  function queueBallot(choice,immediate=false){
    if(!choice||currentBallot(queuedSaves.get('vote'),choice))return;
    ballotRejected=null;
    if(currentBallot(ballotInFlight,choice))queuedSaves.delete('vote');
    else queuedSaves.set('vote',{code,token,choice,action:'workspace-ballot',
      build:data=>data?.workspace?.vote?.open?{choice,receipt:true}:null});
    window.MizanWorkspace.renderBallotStatus();
    if(immediate)flushSaves();
    else scheduleSave();
  }
  function queueCash(cash,immediate=false){
    if(Number.isFinite(cash))queueDecision('cash',cash,immediate);
  }
  function queueBoard(board,immediate=false){
    if(board)queueDecision('board',board,immediate);
  }
  function queueDecision(field,value,immediate){
    const same=write=>write?.code===code&&write.token===token&&write[field]===value;
    // If the leader returns to the in-flight choice, cancel any intermediate queued choice.
    if(same(decisionInFlight))queuedSaves.delete('decision');
    else if(!same(queuedSaves.get('decision'))){
      queueSave('decision','workspace-decision-checks',data=>
        data?.workspace?.vote?.[field+'Open']&&data.workspace.member.isLeader?{[field]:value,receipt:true}:null);
      queuedSaves.get('decision')[field]=value;
    }
    if(immediate)flushSaves();
  }
  function applySaveReceipt(result,write){
    const receipt=result.receipt;
    if(!receipt)return false;
    if(receipt.code!==code||write.code!==code||write.token!==token||!view?.workspace)return true;
    if(receipt.action==='workspace-ballot'){
      if(!view.workspace.vote.own)view.workspace.vote.cast=Math.min(view.workspace.vote.eligible,view.workspace.vote.cast+1);
      view.workspace.vote.own=receipt.choice;
    }else if(receipt.action==='workspace-decision-checks'){
      view.workspace.vote.checks=receipt.board?{board:receipt.board}:{cash:receipt.cash};
      if(view.workspace.vote.result)view.workspace.vote.result[receipt.board?'boardSaved':'cashSaved']=true;
    }else return false;
    render(view);
    return true;
  }
  function flushSaves(){
    clearTimeout(saveTimer);saveTimer=null;
    if(busy||autosaving||!queuedSaves.size||navigator.onLine===false)return;
    generation++;
    autosaving=writeSaves().finally(()=>{
      autosaving=null;
      scheduleSave();
      scheduleRefresh();
    });
  }
  async function writeSaves(){
    const savedVersions=new Map();
    for(const [key,write] of [...queuedSaves]){
      if(busy)break;
      if(queuedSaves.get(key)!==write)continue;
      queuedSaves.delete(key);
      if(write.code!==code||write.token!==token)continue;
      const ballot=key==='vote';
      const payload=write.build(view,write.version);
      if(!payload){
        if(ballot)window.MizanWorkspace.renderBallotStatus();
        else saveStatus('This item is no longer open for saving.');
        continue;
      }
      if(ballot){ballotInFlight=write;window.MizanWorkspace.renderBallotStatus();}
      if(key==='decision')decisionInFlight=write;
      try{
        const result=await api(write.action,payload);
        if(write.roundSave)confirmRoundSave(write.roundSave,payload.answers,result.created);
        if(write.action==='workspace-component'){
          const version=result.workspace?.components.find(item=>item.id===payload.component)?.version;
          if(version!==undefined){
            savedVersions.set(payload.component,{from:payload.version,to:version});
            const queued=queuedSaves.get(key);
            if(queued?.version===payload.version)queued.version=version;
          }
        }
        if(write.action!=='answer'&&!applySaveReceipt(result,write))render(result);
        if(!ballot)saveStatus(hasQueuedWork()?'Saving changes…':'Saved automatically.');
      }catch(error){
        if(!error.status||error.status>=500||error.status===429){
          if(ballot)write.retry=true;
          if(!queuedSaves.has(key))queuedSaves.set(key,write);
          if(!ballot)saveStatus('Draft is on this device. Retrying the save…');
          if(navigator.onLine!==false)saveTimer=setTimeout(flushSaves,1300+Math.random()*700);
          break;
        }
        if(ballot)ballotRejected=write;
        else saveStatus(error.message);
        if(write.roundSave&&error.status===409){
          // Keep the draft visible on this device after a missed deadline.
          if(clearRoundReceipt(write.roundSave))persistRoundDrafts();
        }
        if(error.status===409){try{render(await api());}catch{}}
      }finally{
        if(ballot){ballotInFlight=null;window.MizanWorkspace.renderBallotStatus();}
        if(key==='decision')decisionInFlight=null;
      }
    }
    return savedVersions;
  }
  function roundDraft(data,phase){
    const round=data?.analysis;
    if(!round||round.phase!==phase||!data.member?.isCaptain)return null;
    const draft=answerDrafts[draftKey(data,round)]||round.answers||{};
    const valid=Object.fromEntries(round.fields.flatMap(field=>{
      const value=(draft[field.id]??'').trim().replaceAll('−','-');
      if(!value||field.kind==='number'&&!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value))return [];
      return [[field.id,value]];
    }));
    return {phase,version:round.version,answers:valid,draft:true};
  }
  function persistRoundDrafts(){
    try{
      localStorage.setItem(draftStorage,JSON.stringify(answerDrafts));
      localStorage.setItem(receiptStorage,JSON.stringify(pendingRoundSaves));
    }catch{}
  }
  function clearRoundReceipt({key,id}){
    if(pendingRoundSaves[key]!==id)return false;
    delete pendingRoundSaves[key];
    return true;
  }
  function confirmRoundSave(receipt,answers,created){
    if(!clearRoundReceipt(receipt))return;
    delete answerDrafts[receipt.key];
    const round=view?.analysis;
    if(round&&view.member&&draftKey(view,round)===receipt.key){
      round.answers=answers;
      round.saved={...round.saved,created};
    }
    persistRoundDrafts();
  }
  function queueRoundAnswer(data,round){
    if(!data.workspace?.guidedRound1||!data.member?.isCaptain)return;
    const key=draftKey(data,round);
    const id=pendingRoundSaves[key];
    const queueKey='answers:'+round.phase;
    if(!id||queuedSaves.get(queueKey)?.roundSave?.id===id)return;
    const body=roundDraft(data,round.phase);
    queueSave(queueKey,'answer',()=>({...body,saveId:id}),undefined,{key,id});
  }
  function renderAnalysis(data){
    const panel=$('#analysis-panel');
    const feedback=$('#analysis-feedback');
    const show=!!((data.classroom||data.workspace)&&data.member);
    panel.hidden=!show;
    feedback.hidden=!show||!data.feedback.length;
    const key=JSON.stringify([show,data.member?.team,data.member?.isCaptain,data.analysis,data.workspace?.workPlan,data.finalized,data.rounds,data.feedback]);
    if(key===analysisSignature)return;
    analysisSignature=key;
    if(!show){panel.replaceChildren();feedback.replaceChildren();return;}
    const round=data.analysis;
    if(!round){
      const closed=data.endedEarly||data.rounds.length&&data.rounds.every(p=>p.status==='closed');
      panel.innerHTML='<h2>'+(closed?'Analysis complete':'Waiting for the next round')+'</h2><p>'+
        (closed?'Review your scores below. The worked solutions appear when your instructor finalizes the activity.':
          'Stay on this page. The next questions appear here when your instructor opens the round.')+'</p>';
    }else{
      const focused=document.activeElement;
      const keep=panel.contains(focused)&&focused.id;
      const selection=keep&&[focused.selectionStart,focused.selectionEnd];
      const openTasks=$('#analysis-tasks')?.open;
      const captain=data.member.isCaptain;
      const guided=data.workspace?.guidedRound1;
      const first=guided&&data.workspace.phases.find(p=>p.id===round.phase)?.sequence===1;
      const instruction=captain?'Enter the answers your team agrees on. Check the saved time above before the round closes.':
        'Discuss each answer with your team. Your team leader enters and saves one set of answers for the group.';
      const restricted=!!data.workspace?.timing;
      const values=answerDrafts[draftKey(data,round)]||round.answers||{};
      const saved=round.saved?'<p class="receipt">Team answers saved at '+escape(new Date(round.saved.created).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}))+'.</p>':'';
      const tasks=captain&&round.tasks.length?'<details id="analysis-tasks"><summary>Assign tasks (optional)</summary>'+
        round.tasks.map(member=>'<form class="analysis-task" data-member="'+member.ref+'"><label for="assign-'+member.ref+'">'+escape(member.name)+'</label><div class="task-row">'+
          '<input id="assign-'+member.ref+'" maxlength="120" value="'+escape(taskDrafts[round.version+'-'+member.ref]??member.task)+'"><button class="secondary">Save task</button></div>'+
          (member.note?'<p class="answer">'+escape(member.note)+'</p>':'')+'</form>').join('')+'</details>':'';
      const ownerLabel=field=>{const task=data.workspace?.workPlan?.questions.find(task=>task.id===field.id);if(!task)return '';
        const role=data.workspace.roles.find(role=>role.id===task.role)?.label||task.role;
        return '<p class="ws-task-owner"><strong>Responsible: '+escape(role)+' · '+escape(task.owner?.name||'Team leader')+'</strong>'+(task.coveredByLeader?'<span>Unclaimed role — covered by the team leader</span>':'')+'</p><p class="fine">'+escape(task.instruction)+' The leader enters the team’s agreed answer.</p>';};
      const questions=round.fields.map((field,index)=>'<li id="question-'+escape(field.id)+'" class="analysis-question"'+(restricted&&!captain?' aria-hidden="true"':'')+'>'+
        ownerLabel(field)+(captain?TeamFields.answer(field,values[field.id]||'',restricted?index+1:undefined):
        '<p>'+escape(field.label)+'</p>'+(field.options?'<ol type="A">'+field.options.map(choice=>'<li>'+escape(choice.label)+'</li>').join('')+'</ol>':
          '<p class="fine">'+escape(field.unit||'Numerical answer')+'</p>'))+'</li>').join('');
      panel.innerHTML='<h2>'+escape(guided?(first?'Team question':'Team questions'):round.label)+'</h2><p'+(restricted?' aria-hidden="true"':'')+'>'+escape(round.prompt)+'</p>'+saved+
        (guided?'<p class="fine">'+instruction+'</p>':'')+tasks+
        (restricted?TeamFields.assessmentNotice:'')+
        (captain?'<form id="analysis-answer"'+(data.workspace?.guidedRound1?' novalidate':'')+'><ol class="analysis-list">'+questions+'</ol><button data-mizan-deadline="'+(data.workspace?.timing?.clock?.stage||'')+'">Save team answers</button><p class="fine">'+(data.workspace?.guidedRound1?'Valid entries save automatically while the round is open. You can also save now.':'You can revise while this round is open. The latest saved answers count.')+'</p></form>':
          (guided?'':'<p class="fine">Work through these questions with your team. Your team leader submits your shared answers.</p>')+'<ol class="analysis-list">'+questions+'</ol>');
      if($('#analysis-tasks'))$('#analysis-tasks').open=!!openTasks;
      if(keep){
        const replacement=document.getElementById(keep);
        replacement?.focus({preventScroll:true});
        if(replacement&&Number.isInteger(selection[0]))replacement.setSelectionRange(selection[0],selection[1]);
      }
    }
    feedback.innerHTML=data.feedback.length?'<h2>Worked solutions</h2>'+data.feedback.map(section=>'<details><summary>'+escape(section.label)+'</summary><ol>'+
      section.items.map(item=>'<li class="analysis-question"><strong>'+escape(item.question)+'</strong><p>'+item.earned+' / '+item.possible+' points. '+escape(item.solution)+'</p></li>').join('')+
      '</ol></details>').join(''):'';
  }
  function render(data){
    if(data.workspace||/^Mizan Market\b/i.test(data.title))data.classroom=true;
    // Keep the clock synchronized without rebuilding unchanged team forms.
    window.MizanClock?.sync(data.workspace?.timing?.clock??null);
    const next=JSON.stringify(data,(key,value)=>key==='serverTime'?undefined:value);
    if(next===signature){
      view=data;
      window.MizanWorkspace?.syncState?.(data);
      return;
    }
    signature=next;
    view=data;
    const locked=data.status==='locked';
    const member=data.member,lateJoin=!!data.observerCheckIn&&!member;
    $('#reconnect').hidden=!!member;
    const ownTeam=data.teams.find(team=>team.id===member?.team);
    $('#room-form').hidden=true;
    $('[data-current-check-in]').hidden=true;
    $('#room').hidden=false;
    $('#class-code').textContent='Class code '+data.code;
    $('#lobby-title').textContent=data.classroom?'Mizan Market':'Join a team';
    $('#case-title').textContent=data.classroom?'QBA201 · Team decision activity':data.title;
    $('#classroom-intro').hidden=!data.classroom||!!member||lateJoin;
    $('#registration-privacy').textContent=lateJoin?'Your team will see your name and observer status. Only your instructor can see your student ID. Observers are separate from the competing roster and team bonus.':'Your teammates will see your name. At the end of class, the class leaderboard shows each team’s names and roles. Only your instructor can see your student ID.';
    if(data.classroom&&data.status==='open'&&!member)showJoinQR(data.code);
    else $('#student-join-qr').hidden=true;
    $('#room-status').hidden=data.classroom&&!member&&!locked;
    $('#room-status').textContent=data.endedEarly?(member?'This session is closed. Your saved work is still available.':'This session is closed. Open the link for your current class.'):data.classroom&&!member&&!locked?'Check in with your own name and student ID, then select a team to join.':
      data.classroom&&member?'You’re checked in. '+(locked?'Stay on this page for the current round.':'You can switch teams until your instructor locks check-in.'):
      lateJoin?'The competition has started. Enter your name and student ID, then observe an existing team. Observers can read shared work but cannot submit, vote or earn the team bonus.':locked
      ?'Team rosters are locked. '+(ownTeam?'Work with your team. Your team leader will submit the answers.':'Ask your instructor if you need a team.')
      :'Team registration is open. Aim for five or six people. You can change teams until your instructor locks the rosters.';
    $('#your-team').hidden=!ownTeam;
    $('#your-team-name').textContent=ownTeam?'Your team · '+ownTeam.name:'';
    $('#teammates').innerHTML=data.teammates.map(name=>'<li>'+escape(name)+'</li>').join('');
    $('#leave-team').hidden=locked;
    $('#captain-status').textContent=member?.isCaptain?(data.classroom?'You are the team leader. Submit the team’s answers here when each round opens.':'You are the team leader. Open the workspace to submit for your team.')
      :data.captain?'Team leader: '+data.captain:'Choose one team leader to coordinate your work and submit the team’s answers.';
    $('#become-captain').hidden=!!member?.isObserver||!member||!!data.captain||data.finalized||data.endedEarly;
    $('#captain-workspace').hidden=!member?.isCaptain||(data.classroom&&!data.analysis);
    $('#captain-workspace').href=data.classroom?'#analysis-panel':MizanRuntime.page('challenge')+'?room='+code;
    $('#captain-workspace').textContent=data.classroom?'View current questions':'Continue to team workspace →';
    $('#step-down').hidden=!member?.isCaptain||data.finalized||data.endedEarly;
    $('#team-progress').hidden=!data.rounds.length;
    $('#round-progress').innerHTML=data.rounds.map(round=>{
      const status=round.earned!=null?round.earned+' / '+round.possible+' points':round.skipped?'Skipped':round.status==='pending'?'Waiting':round.status==='open'?'Open':'Closed';
      return '<li>'+escape(round.label)+' <span class="badge">'+escape(status)+'</span></li>';
    }).join('');
    $('#team-work').hidden=!data.work;
    $('#task-text').textContent=data.work?.task||'';
    if(taskPhase!==(data.work?.phase||'')){
      taskPhase=data.work?.phase||'';
      noteDirty=false;
      $('#task-message').textContent='';
    }
    if(!noteDirty)$('#task-note').value=data.work?.note||'';
    $('#member-fields').hidden=locked&&!lateJoin||!!member;
    $('#join-team').hidden=locked&&data.classroom&&!lateJoin;
    for(const field of ['#student-name','#student-id'])$(field).disabled=locked&&!lateJoin||!!member;
    $('#teams-heading').textContent=lateJoin?'Join an existing team as an observer':locked?'Class teams':member?'Switch teams':'Choose a team';
    const focused=document.activeElement?.dataset?.team;
    $('#team-list').innerHTML=data.teams.filter(team=>!lateJoin||team.size>0).map(team=>{
      const current=team.id===member?.team;
      const full=team.size>=data.capacity;
      const label=lateJoin?'Observe '+team.name:current?'Your team':full?'Full':(member?'Move to ':'Join ')+team.name;
      return '<article class="team-card'+(current?' current':'')+'"><h3>'+escape(team.name)+'</h3><p class="fine">'+
        team.size+' / '+data.capacity+' competing members'+(team.observers?' · '+team.observers+' observers':'')+'</p>'+(locked&&!lateJoin?'':'<button type="submit" data-team="'+team.id+'" '+(current||full&&!lateJoin?'disabled':'')+'>'+escape(label)+'</button>')+'</article>';
    }).join('');
    if(focused)$('#team-list button[data-team="'+focused+'"]:not(:disabled)')?.focus();
    const currentMember=member?data.code+'-'+member.team:'';
    if(currentMember!==memberKey){
      $('#team-members').open=true;
      memberKey=currentMember;
    }
    if(data.classroom&&!data.workspace){
      const analysis=$('#analysis-panel');
      const before=data.analysis?$('#your-team'):$('#team-progress');
      if(analysis.nextElementSibling!==before)$('#room').insertBefore(analysis,before);
      const work=$('#team-work');
      if(data.analysis&&work.nextElementSibling!==analysis)$('#room').insertBefore(work,analysis);
    }
    const board=$('#class-leaderboard');
    board.hidden=!data.leaderboard;
    board.innerHTML=data.leaderboard?'<h2>Class leaderboard</h2><p class="fine">'+(data.endedEarly?'Activity ended early. Saved work counts. ':'All three rounds are complete. ')+
      (data.leaderboard.finalized?'Final results.':'Scores are complete; the instructor still needs to finalize awards.')+
      ' Team IDs, members and roles are shown below. Student IDs stay private.</p>'+TeamLeaderboard.table(data.leaderboard):'';
    renderAnalysis(data);
    window.MizanWorkspace?.render(data,workspaceContext);
    if(data.analysis)queueRoundAnswer(data,data.analysis);
  }
  function showError(error){
    message(error.status&&error.status<500&&error.status!==429?error.message:'Connection interrupted. Keep this page open while it reconnects.',true);
    if(error.status===404){
      $('#room-form').hidden=false;
      $('#room').hidden=true;
      $('#classroom-intro').hidden=!classroomLaunch;
      $('#student-join-qr').hidden=true;
      signature='';view=null;
      window.MizanWorkspace?.render({member:null},workspaceContext);
    }
  }
  async function run(callback,{pending='',button=null,refresh=false}={}){
    if(busy)return;
    busy=true;generation++;
    clearTimeout(saveTimer);saveTimer=null;
    const label=button?.textContent;
    if(button){button.disabled=true;button.setAttribute('aria-busy','true');button.textContent=pending||'Saving…';}
    if(pending)message(pending);
    try{await callback(await autosaving);pollFailures=0;}
    catch(error){showError(error);if(error.status===409){try{render(await api());}catch{}}}
    finally{busy=false;scheduleSave();scheduleRefresh(refresh);if(button?.isConnected){button.disabled=false;button.removeAttribute('aria-busy');button.textContent=label;}}
  }
  function useOwnSavedVersion(body,savedVersions){
    const change=savedVersions?.get(body.component);
    return change&&change.from===body.version?{...body,version:change.to}:body;
  }
  const workspaceContext={
    queueSave,queueBallot,queueCash,queueBoard,ballotStatus,
    perform(action,body,{pending,success,button,after}={}){
      return run(async savedVersions=>{
        if(action==='workspace-finding'){
          const content=JSON.stringify(body);
          if(findingRequest?.content!==content)findingRequest={content,id:newToken()};
          const {id}=findingRequest;
          await api(action,{...body,saveId:id});
          findingRequest=null;
          after?.();message(success||'Finding shared.');
          return;
        }
        const key=action==='workspace-component'?(body.facts?'facts:':'notes:')+body.component:
          action==='workspace-decision-checks'?'checks':null;
        const pending=queuedSaves.get(key);
        const data=await api(action,useOwnSavedVersion(body,savedVersions));
        if(queuedSaves.get(key)===pending)queuedSaves.delete(key);
        if(key)saveStatus(hasQueuedWork()?'Saving changes…':'');
        after?.();render(data);message(success||'Saved.');
      },{pending,button,refresh:action==='workspace-finding'});
    },
    handoff(body,toMember,button,after){
      return run(async savedVersions=>{
        const key='notes:'+body.component;
        const pending=queuedSaves.get(key);
        const saved=await api('workspace-component',useOwnSavedVersion(body,savedVersions));
        if(queuedSaves.get(key)===pending)queuedSaves.delete(key);
        const version=saved.workspace.components.find(item=>item.id===body.component)?.version;
        render(saved);
        const result=await api('workspace-handoff',{component:body.component,version,toMember});
        after?.();render(result);message('Notes saved and role handed off.');
      },{pending:'Saving notes and handing off…',button});
    }
  };
  function enter(value){
    const roomCode=value.trim().toUpperCase();
    if(!codePattern.test(roomCode)){message('Enter the six-character class code.',true);return;}
    run(async()=>{
      code=roomCode;
      token=memberToken(code);
      render(await api());
      history.replaceState(null,'',MizanRuntime.page('lobby')+'?room='+code);
      message();
    },{pending:'Opening team workspace…',button:$('#room-form button')});
  }
  $('#room-form').addEventListener('submit',event=>{
    event.preventDefault();
    enter($('#room-code').value);
  });
  $('#reconnect-form').addEventListener('submit',event=>{
    event.preventDefault();
    const fields=new FormData(event.currentTarget);
    const studentId=String(fields.get('studentId')).trim();
    const recovery=String(fields.get('recovery')).trim().toLowerCase().replace(/[\s-]+/g,'');
    const status=$('#reconnect-status');
    if(!tokenPattern.test(recovery)){status.textContent='Check your recovery code for this section.';return;}
    status.textContent='';
    run(async()=>{
      try{
        const data=await api('lobby-reconnect',{studentId},recovery);
        token=recovery;
        rememberToken(code,token);
        status.textContent='';
        $('#reconnect-form').reset();
        render(data);
        message('Reconnected to your team. Your saved work is available.');
      }catch(error){status.textContent=error.status===403?error.message:'Could not reconnect yet. Try again with the same code.';}
    },{pending:'Reconnecting…',button:event.submitter});
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('[data-recovery-code]')||!view?.member)return;
    $('#recovery-copy-status').textContent='';
    $('#recovery-code').value=token.match(/.{4}/g).join('-');
    $('#recovery-dialog').showModal();
  });
  $('#copy-recovery').addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText($('#recovery-code').value);
      $('#recovery-copy-status').textContent='Recovery code copied.';
    }catch{
      $('#recovery-code').select();
      $('#recovery-copy-status').textContent='Select and copy the recovery code.';
    }
  });
  $('#recovery-dialog').addEventListener('close',()=>{$('#recovery-code').value='';});
  $('#join-team').addEventListener('submit',event=>{
    event.preventDefault();
    const team=event.submitter?.dataset.team;
    if(!team)return;
    run(async()=>{
      const form=view.member?{}:{name:$('#student-name').value.trim(),studentId:$('#student-id').value.trim()};
      const data=await api('lobby-join',{team,...form});
      render(data);
      $('#student-id').value='';
      $('#student-name').value='';
      const joined=data.teams.find(item=>item.id===data.member?.team);
      message(joined?data.member?.isObserver?'You are observing '+joined.name+'. Read the case and follow the team’s shared work.':'You joined '+joined.name+'. Choose a role and keep your recovery code from Team settings.':'Your team registration changed. Check your team above.');
    },{pending:view.member?'Moving to team…':'Joining team…',button:event.submitter});
  });
  $('#leave-team').addEventListener('click',()=>run(async()=>{
    render(await api('lobby-leave',{}));
    message('You left the team. You can choose another team.');
  }));
  $('#become-captain').addEventListener('click',()=>run(async()=>{
    message();
    render(await api('lobby-captain',{}));
  }));
  $('#step-down').addEventListener('click',()=>run(async()=>{
    message();
    render(await api('lobby-step-down',{}));
  }));
  $('#task-note').addEventListener('input',()=>{noteDirty=true;$('#task-message').textContent='';});
  $('#team-work').addEventListener('submit',event=>{
    event.preventDefault();
    if(!view?.work)return;
    run(async()=>{
      const data=await api('lobby-note',{phase:view.work.phase,note:$('#task-note').value});
      noteDirty=false;
      render(data);
      $('#task-message').textContent='Sent to your team leader.';
      message('Note saved for your team leader.');
    },{pending:'Sending note…',button:event.submitter});
  });
  $('#analysis-panel').addEventListener('input',event=>{
    const round=view?.analysis;
    if(!round)return;
    const form=event.target.closest('form');
    if(form?.id==='analysis-answer'){
      const key=draftKey(view,round);
      answerDrafts[key]=fieldValues(form);
      if(view.workspace?.guidedRound1)pendingRoundSaves[key]=newToken();
      persistRoundDrafts();
      queueRoundAnswer(view,round);
    }
    if(form?.classList.contains('analysis-task'))taskDrafts[round.version+'-'+form.dataset.member]=event.target.value;
  });
  $('#analysis-panel').addEventListener('submit',event=>{
    event.preventDefault();
    const round=view?.analysis;
    if(!round||!view.member?.isCaptain)return;
    const form=event.target;
    run(async()=>{
      if(form.id==='analysis-answer'){
        const key='answers:'+round.phase;
        const pending=queuedSaves.get(key);
        const draftId=draftKey(view,round);
        const receipt={key:draftId,id:pendingRoundSaves[draftId]||newToken()};
        const body=view.workspace?.guidedRound1?roundDraft(view,round.phase):
          {phase:round.phase,version:round.version,answers:fieldValues(form)};
        if(!body)throw Error('This round is no longer open for saving.');
        const result=await api('answer',{...body,saveId:receipt.id});
        confirmRoundSave(receipt,body.answers,result.created);
        if(queuedSaves.get(key)===pending)queuedSaves.delete(key);
        const saved=Object.keys(body.answers).length+' of '+round.fields.length+' team answers saved.';
        saveStatus(saved);
        message(saved);
      }else{
        const member=Number(form.dataset.member);
        await api('lobby-task',{phase:round.phase,member,task:form.querySelector('input').value});
        delete taskDrafts[round.version+'-'+member];
        message('Task saved.');
      }
      if(form.id!=='analysis-answer')render(await api());
    },{pending:form.id==='analysis-answer'?'Saving team answers…':'Saving task…',button:event.submitter,refresh:form.id==='analysis-answer'});
  });
  // Schedule after completion, rather than piling requests up on a fixed interval.
  // Jitter spreads classroom tabs out; hidden/offline tabs make no polling requests.
  function scheduleRefresh(immediate=false){
    clearTimeout(pollTimer);pollTimer=null;
    if(!view||busy||autosaving||refreshing||document.hidden||navigator.onLine===false)return;
    const base=view?.finalized?30000:6000;
    const delay=immediate?0:Math.min(60000,base*2**Math.min(pollFailures,4))*(0.9+Math.random()*0.2);
    pollTimer=setTimeout(refresh,delay);
  }
  async function refresh(){
    clearTimeout(pollTimer);pollTimer=null;
    if(!view||busy||autosaving||refreshing||document.hidden||navigator.onLine===false)return;
    const current=generation;
    refreshing=true;
    try{
      const data=await api();
      if(current===generation){pollFailures=0;render(data);if($('#lobby-message').textContent.startsWith('Connection interrupted'))message();}
    }catch(error){
      if(current===generation){pollFailures++;showError(error);}
    }finally{refreshing=false;scheduleRefresh();}
  }
  document.addEventListener('visibilitychange',()=>scheduleRefresh(true));
  window.addEventListener('online',()=>{
    window.MizanWorkspace?.renderBallotStatus();
    scheduleSave();
    scheduleRefresh(true);
    if(!view&&code)enter(code);
  });
  window.addEventListener('offline',()=>{
    if(hasQueuedWork())saveStatus('Draft is on this device. Waiting for a connection.');
    window.MizanWorkspace?.renderBallotStatus();
    scheduleRefresh();
  });
  const initial=new URLSearchParams(location.search).get('room');
  if(classroomLaunch){
    $('#lobby-title').textContent='Mizan Market';
    $('#classroom-intro').hidden=false;
  }
  if(initial){$('#room-code').value=initial;enter(initial);}
})();
