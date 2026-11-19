'use strict';
window.MizanBrief={
  identity:'<section class="ws-case-brief" aria-hidden="true"><h2>Who you represent</h2>'+
    '<p><strong>Your team works for Mizan Market.</strong> You are its internal management team. Your advice goes to <strong>Mariam, the owner</strong>, who decides whether to buy the dispatch software.</p>'+
    '<p><strong>Your customers</strong> are the shoppers who place orders with Mizan Market. They depend on orders leaving on time. The <strong>vendor</strong> sells the software.</p></section>',
  background:`<section class="ws-case-brief" aria-hidden="true"><h2>The contract decision</h2>
    <p>Mizan Market sells online and dispatches orders from its own delivery centre. The team groups orders by hand and often works overtime. The owner, Mariam, has just finished a 90-day software trial. A sales campaign begins next week, and the vendor's offer expires at 5 p.m.</p>
    <dl><div><dt>Cash available today</dt><dd>AED 10,000 for setup, audits and any reservation fee. Daily licence fees come out of the operating budget.</dd></div>
    <div><dt>Original contract</dt><dd>AED 7,200 setup due today, plus AED 240 per operating day for 180 days. Setup takes five working days.</dd></div>
    <div><dt>Reserve the price</dt><dd>AED 1,000 holds the price for seven days. The fee is nonrefundable and the delay means missing the first campaign week.</dd></div></dl>
    <p>Your recommendation needs to weigh three things: what you can pay today, whether labour savings can cover the full contract cost, and what the evidence says about average dispatch lateness. Independent audits can improve the evidence but use some of today's cash.</p>
    <p>As you read each report, ask which days and workers it covers. Keep track of the evidence your team actually has.</p></section>`
};

'use strict';
(() => {
  if(!MizanRuntime.preview&&!window.MIZAN_DEPLOYMENT?.apiOrigin)return;
  const $=s=>document.querySelector(s);
  const hostMode=document.body.dataset.mizanPage==='host';
  const params=new URLSearchParams(location.search);
  const classroomLaunch=hostMode&&params.get('classroom')==='mizan';
  let linkedMinutes=!MizanRuntime.preview&&classroomLaunch&&['60','75'].includes(params.get('minutes'))?params.get('minutes'):null;
  const storageKey=hostMode?(classroomLaunch?(MizanRuntime.preview?'qba-mizan-preview-host':'qba-classroom-host'):'qba-challenge-host'):'qba-challenge-team';
  const packKey='qba-challenge-pack';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=n=>new Date(n).toLocaleString();
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
  let session=read(storageKey,null),pack=read(packKey,null),view=null,busy=false,rendered='';
  let pollTimer=null,pollFailures=0;
  let refreshing=false,generation=0;
  let selected='',answerStage='',answerCurrent='',savedInvites=read('qba-challenge-invites',{});
  let drafts=read('qba-challenge-drafts',{});
  let taskDrafts={};
  let sectionsPasscode='';
  const sectionAccess=new Map();
  const lobbyRoom=new URLSearchParams(location.search).get('room');
  function message(text=''){
    $('#message').textContent=view?.expectedStudents&&hostMode?'':text;
    $('#dashboard-message').textContent=view?.expectedStudents&&hostMode?text:'';
  }
  async function api(action='',body,credential=session){
    const headers={};
    if(credential?.secret)headers['X-Host-Token']=credential.secret;
    if(credential?.key)headers['X-Team-Key']=credential.key;
    if(credential?.member)headers['X-Lobby-Member']=credential.member;
    if(body!==undefined)headers['Content-Type']='application/json';
    const path=credential?'/'+credential.code+(action?'/'+action:''):'';
    const slowHost=classroomLaunch&&(credential?.secret&&body===undefined||action==='end-early'||body?.closeSection||
      action==='mizan-timing'&&body?.stage==='extend');
    const timeout=slowHost?30000:12000;
    const response=await MizanRuntime.fetch('/api/challenges'+path,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(timeout)});
    const data=await response.json();
    if(!response.ok)throw Object.assign(Error(data.error||'The request could not be completed.'),{status:response.status});
    return data;
  }
  async function action(callback){
    if(busy)return;
    busy=true;generation++;message();
    $('#cancel-section').disabled=true;
    try{await callback();pollFailures=0;}
    catch(error){message(error.status||!['TypeError','AbortError','TimeoutError'].includes(error.name)?error.message:'Connection interrupted. Your draft stays on this device. Try again.');}
    finally{busy=false;$('#cancel-section').disabled=false;scheduleRefresh();}
  }
  function saveSession(value,{remember=true}={}){
    generation++;pollFailures=0;session=value;
    if(!value)document.body.classList.remove('collaboration-host');
    if(remember)write(storageKey,value);
    if(remember&&value?.secret&&linkedMinutes){
      params.delete('minutes');
      history.replaceState(null,'',location.pathname+'?'+params.toString());
      linkedMinutes=null;
    }
    rendered='';view=null;pendingRoster=null;
    selected='';
    if(classroomLaunch&&value?.secret)sectionAccess.set(value.code,value);
    $('#host-body').innerHTML='<p class="fine">Loading session records…</p>';
    $('#team-body').innerHTML='<p class="fine">Loading team records…</p>';
    $('#host-title').textContent='Loading session…';
    $('#team-title').textContent='Loading team…';
    $('#close-host-section').hidden=true;
    $('#new-host-section').hidden=true;
    $('#start').hidden=!hostMode||!!session;
    $('#host').hidden=!hostMode||!session;
    $('#join').hidden=hostMode||!!session;
    $('#student').hidden=hostMode||!session;
    $('#archive-completion').hidden=true;
    if(!session)$('#session-tag').textContent='';
  }
  function setSectionSetup(open){
    $('#section-manager').hidden=open;
    $('#create').hidden=!open;
    $('#setup-rules').hidden=!open;
    $('#resume-details').hidden=open;
    $('#start-intro').textContent=open
      ? 'Enter the expected headcount. Starting the section opens student check-in.'
      : 'Open a saved section or start a new one.';
    $('#create-passcode-field').hidden=!!sectionsPasscode;
    $('#passcode').disabled=!!sectionsPasscode;
    if(open&&linkedMinutes)$('#session-minutes').value=linkedMinutes;
  }
  function sectionStatus(section){
    if(section.finalized)return 'Results finalized';
    if(section.endedEarly)return 'Closed early · Results ready';
    if(section.lobbyStatus==='open')return 'Check-in open';
    if(section.openRound)return 'Round '+section.openRound+' open';
    return section.nextRound?'Ready for Round '+section.nextRound:'Closed · Results ready';
  }
  function sectionClosed(section){
    return section.finalized||section.endedEarly||section.lobbyStatus!=='open'&&!section.openRound&&!section.nextRound;
  }
  function sectionRow(section,closed){
    const code=esc(section.code),openLabel=closed?'View results':'Open';
    return '<li><div><strong>'+esc(section.title)+'</strong><p class="fine">Class code '+code+' · '+
      esc(sectionStatus(section))+(section.minutes?' · '+section.minutes+' minutes':'')+'<br>Started '+esc(date(section.created))+' · Available until '+esc(date(section.expires))+
      '</p></div><div class="section-actions"><button type="button" class="secondary" data-open-section="'+code+'" aria-label="'+openLabel+' '+code+'">'+openLabel+'</button>'+
      (closed?'':'<button type="button" class="secondary" data-close-section="'+code+'" aria-label="Close session '+code+'">Close session</button>')+'</div></li>';
  }
  function confirmCloseSection(code){
    return confirm('Close session '+code+'? Check-in will stop and any open round or vote will close. Saved work remains available to review.');
  }
  async function loadSections(passcode=sectionsPasscode){
    const status=$('#sections-status');
    status.textContent='Loading sections…';
    try{
      const {sections}=await api('',{passcode,listSections:true},null);
      sectionsPasscode=passcode;
      $('#section-sign-in').reset();
      $('#section-sign-in').hidden=true;
      $('#refresh-sections').hidden=false;
      const closed=sections.filter(sectionClosed);
      const open=sections.filter(section=>!sectionClosed(section));
      $('#section-list').innerHTML=open.map(section=>sectionRow(section,false)).join('');
      $('#closed-section-list').innerHTML=closed.map(section=>sectionRow(section,true)).join('');
      $('#closed-sections').hidden=!closed.length;
      $('#closed-section-count').textContent=closed.length;
      status.textContent=open.length?'':'No open sessions. Choose New section to get started.';
    }catch(error){
      status.textContent='';
      if(error.status===401){
        sectionsPasscode='';
        $('#section-sign-in').hidden=false;
        $('#refresh-sections').hidden=true;
        $('#section-list').replaceChildren();
        $('#closed-section-list').replaceChildren();
        $('#closed-sections').hidden=true;
      }
      throw error;
    }finally{$('#sections-passcode').value='';}
  }
  async function openSection(code){
    let credential=sectionAccess.get(code),data;
    if(credential){
      try{data=await api('',undefined,credential);}
      catch(error){if(error.status!==403)throw error;}
    }
    if(!data){
      credential=await api('',{passcode:sectionsPasscode,resumeCode:code},null);
      data=await api('',undefined,credential);
    }
    if(data.expectedStudents&&data.lobbyStatus==='open')await api('show-check-in',{},credential);
    saveSession(credential);render(data);
    $('#host-title').focus();
  }
  function readPack(){
    if(!hostMode)return;
    if(location.hash.startsWith('#template=')){
      const id=location.hash.slice(10);
      if(/^[a-f0-9]{32}$/.test(id)){pack={title:'Team competition',scoring:'automatic',templateId:id};write(packKey,pack);}
      else message('The challenge link is invalid. Reopen it from the case.');
      history.replaceState(null,'',location.pathname+location.search);return;
    }
    if(!location.hash.startsWith('#challenge='))return;
    try{
      if(location.hash.length>30000)throw Error();
      const imported=JSON.parse(decodeURIComponent(location.hash.slice(11)));
      if(!Array.isArray(imported.phases)||!imported.title)throw Error();
      pack=imported;write(packKey,pack);
    }catch{message('The challenge could not be loaded. Reopen the Team competition link in the case.');}
    history.replaceState(null,'',location.pathname+location.search);
  }
  function parseAccess(value){
    const match=/^([A-HJ-NP-Z2-9]{6})-([a-f0-9]{12})$/i.exec(value.trim());
    if(!match)throw Error('Use the full team access code supplied by the instructor.');
    return {code:match[1].toUpperCase(),key:match[2].toLowerCase()};
  }
  let pendingRoster=null;
  const blankMember=()=>({id:'',name:''});
  function rosterRows(members){
    const rows=members.length?members:[blankMember()];
    return rows.map((m,index)=>'<div class="roster-row"><label>Student ID<input data-member-id aria-label="Student '+(index+1)+' ID" value="'+esc(m.id)+'" required maxlength="24" autocomplete="off"></label>'+
      '<label>Full name<input data-member-name aria-label="Student '+(index+1)+' full name" value="'+esc(m.name)+'" required maxlength="80" autocomplete="off"></label>'+
      (rows.length>1?'<button type="button" class="secondary" data-remove-member="'+index+'" aria-label="Remove student '+(index+1)+'">Remove</button>':'')+'</div>').join('');
  }
  function readRosterRows(){
    return Array.from(document.querySelectorAll('#roster-rows .roster-row'),row=>({
      id:row.querySelector('[data-member-id]').value.trim(),name:row.querySelector('[data-member-name]').value.trim()
    }));
  }
  function redrawRosterRows(members){
    pendingRoster=members;
    $('#roster-rows').innerHTML=rosterRows(members);
    $('#add-roster-member').disabled=members.length>=6;
  }
  function rosterText(roster){return roster.map(m=>m.id+' | '+m.name).join('\n');}
  function parseRoster(value){
    if(!value.trim())return [];
    return value.trim().split(/\r?\n/).map(line=>{
      const parts=line.split('|').map(x=>x.trim());
      if(parts.length!==2||!parts[0]||!parts[1])throw Error('Use one member per line as Student ID | Full name.');
      return {id:parts[0],name:parts[1]};
    });
  }
  function latest(teamId,phaseId){
    return view.submissions.filter(s=>(!teamId||s.team===teamId)&&s.phase===phaseId).at(-1);
  }
  function receipt(submission){
    return submission?'<div class="receipt">Saved record #'+submission.id+' · '+esc(date(submission.created))+'</div>':'';
  }
  function formatAnswer(field,value){return field?.kind==='choice'?(field.options.find(o=>o.id===value)?.label||value||'No answer'):value??'No answer';}
  function responseHTML(submission,phase){
    if(!submission)return '<p class="fine">No answer saved.</p>';
    return receipt(submission)+'<dl class="answer">'+phase.fields.map(f=>'<dt>'+esc(f.label)+'</dt><dd>'+esc(formatAnswer(f,submission.answers[f.id]))+'</dd>').join('')+'</dl>';
  }
  function standings(){
    if(!view.ranking.length)return '<p class="fine">The leaderboard will appear here as teams join and rounds close.</p>';
    const auto=view.scoring==='automatic';
    const max=view.maxPoints||12;
    const scoring=auto?'<p class="fine">Ranked automatically by points from closed rounds. The latest saved answer counts. Equal totals share a rank (1, 1, 3). No speed points. '+view.available+' / '+max+' points released.</p>':'<p class="fine">Ranks use instructor-reviewed scores. The bonus requires a finalized record.</p>';
    const leaders=view.finalized?view.ranking.filter(t=>t.winner).map(t=>'<div class="winner"><strong>Rank 1'+(t.tied?' · joint winner':' · winner')+' · '+esc(t.name)+'</strong><p>'+t.total+' / '+max+' points · '+(view.bonusPolicy==='team-pool'?t.coursePercentagePoints:1)+' course percentage points per verified participating member</p></div>').join(''):'';
    return scoring+leaders+TeamLeaderboard.table(view);
  }
  function sampleKey(sample){
    if(!sample)return '';
    const rows=[['Company savings',sample.cs],['Company dispatch',sample.cd],['Savings audit',sample.sa],['Dispatch audit',sample.da]];
    return '<details class="panel"><summary>This team’s sample figures and key</summary><p class="fine">Private instructor reference. Audit evidence stays hidden from students until purchase.</p><div class="scroll"><table><thead><tr><th>Report</th><th>n</th><th>Mean</th><th>SD</th><th>Statistic</th><th>df</th><th>One-sided p</th></tr></thead><tbody>'+
      rows.map(([label,row])=>'<tr><th>'+esc(label)+'</th><td>'+row.n+'</td><td>'+row.mean+'</td><td>'+row.sd+'</td><td>'+row.stat.toFixed(4)+'</td><td>'+esc(row.df??'z')+'</td><td>'+row.p.toFixed(4)+'</td></tr>').join('')+'</tbody></table></div><p>Audit savings against the split benchmark: t = '+sample.sa.splitStat.toFixed(4)+', p = '+sample.sa.splitP.toFixed(4)+'.</p></details>';
  }
  function automaticReview(team){
    const locked=view.finalized&&!awardTeams().some(t=>t.id===team.id);
    return '<section class="panel"><h2>Team record · '+esc(team.name)+'</h2>'+sampleKey(team.sample)+'<p>Automatic total · <strong>'+(team.total??0)+' / '+view.maxPoints+'</strong>. Marks come from the saved answers. There is no manual score to enter.</p>'+team.automaticDetails.map(p=>'<details><summary>'+esc(p.label)+' · '+(p.closed?p.earned+' / '+p.possible:'not scored yet')+'</summary>'+(!p.submitted?'<p>No saved answer. A missing closed round earns 0.</p>':'')+p.items.map(item=>'<div class="score-item"><strong>'+esc(item.question)+'</strong><p>Saved answer: '+esc(formatAnswer(item.options?{kind:'choice',options:item.options}:{kind:'number'},item.answer))+'</p><p>'+item.earned+' / '+item.possible+' points · '+(item.correct?'Correct':'Incorrect or missing')+'</p><p class="fine">'+esc(item.solution)+'</p></div>').join('')+'</details>').join('')+
      '<form id="review-form"><h3>Roster and eligibility only</h3><label for="review-roster">Student ID | Full name, one member per line</label><textarea id="review-roster" '+(locked?'disabled':'')+'>'+esc(rosterText(team.roster))+'</textarea><label><input id="review-active" type="checkbox" '+(team.active?'checked':'')+' '+(view.finalized?'disabled':'')+'>Include this team</label><label><input id="review-verified" type="checkbox" '+(team.verified?'checked':'')+' '+(locked?'disabled':'')+'>Participation and IDs verified</label><button '+(locked?'disabled':'')+'>Save roster and eligibility</button><p class="fine">This does not change answer scores. Rosters are also included in the award export for attendance checks.</p></form></section>';
  }
  function reviewPanel(){
    const team=view.teams.find(t=>t.id===selected);
    if(!team)return '<div class="empty">Select a team to inspect its submitted answers and verify its members.</div>';
    if(view.scoring==='automatic')return automaticReview(team);
    const locked=view.finalized;
    return '<section class="panel"><h2>Review '+esc(team.name)+'</h2>'+
      '<p class="fine">Verify members who took part, then score the whole record. Award 0 for missing or incorrect reasoning, 1 for partial reasoning and 2 for a complete, defensible answer. Deduct an originating error once and award correct follow-through.</p>'+
      view.phases.map(phase=>'<details open><summary>'+esc(phase.label)+'</summary>'+responseHTML(latest(team.id,phase.id),phase)+
        (view.submissions.filter(s=>s.team===team.id&&s.phase===phase.id).length>1?'<details><summary>Earlier saved versions</summary>'+view.submissions.filter(s=>s.team===team.id&&s.phase===phase.id).slice(0,-1).map(s=>responseHTML(s,phase)).join('')+'</details>':'')+'</details>').join('')+
      '<form id="review-form"><label for="review-roster">Verified participants · Student ID | Full name, one per line</label><textarea id="review-roster" '+(locked?'disabled':'')+'>'+esc(rosterText(team.roster))+'</textarea>'+
      '<label><input id="review-active" type="checkbox" '+(team.active?'checked':'')+' '+(locked?'disabled':'')+'>Eligible team · clear this for an absent or excluded team</label>'+
      '<label><input id="review-verified" type="checkbox" '+(team.verified?'checked':'')+' '+(locked?'disabled':'')+'>I checked the IDs, team membership and participation</label>'+
      view.rubric.map((text,i)=>'<div class="criterion"><label for="criterion-'+i+'">'+esc(text)+'</label><select id="criterion-'+i+'" '+(locked?'disabled':'')+'><option value="">Score</option>'+[0,1,2].map(n=>'<option value="'+n+'" '+(team.criteria?.[i]===n?'selected':'')+'>'+n+'</option>').join('')+'</select></div>').join('')+
      '<label for="review-note">Marking note or error-carried-forward adjustment</label><textarea id="review-note" maxlength="1500" '+(locked?'disabled':'')+'>'+esc(team.note||'')+'</textarea>'+
      '<div class="controls"><button '+(locked?'disabled':'')+'>Save roster and rubric review</button><span class="fine">'+(team.reviewed?'Current review saved.':'Review needed for the current answers and roster.')+'</span></div></form></section>';
  }
  function winningTeams(){
    const winners=new Set(view.ranking.filter(t=>view.finalized?t.winner:t.rank===1&&t.total>0).map(t=>t.id));
    return view.teams.filter(t=>winners.has(t.id));
  }
  function awardTeams(){
    return view.bonusPolicy==='team-pool'?view.teams.filter(t=>t.active&&t.roster.length):winningTeams();
  }
  function roundsFinished(){
    return view.endedEarly||view.phases.every(p=>p.status==='closed');
  }
  function endEarlyControl(){
    return !classroomLaunch&&view.workspaceProfile&&!view.finalized&&!roundsFinished()?
      '<button type="button" id="end-early" class="secondary">End activity early</button>':'';
  }
  function awardPanel(){
    const finished=roundsFinished();
    const winners=finished?awardTeams():[];
    const verified=winners.length>0&&winners.every(t=>t.verified);
    const noWinner=finished&&!winners.length;
    const pool=view.bonusPolicy==='team-pool';
    const finalizeReady=verified||!pool&&view.endedEarly&&noWinner;
    const status=pool?(!finished?'Close all rounds to confirm the team bonuses.':verified?'All participating rosters are verified. '+(view.finalized?'Download the bonus CSV.':'Finalize the award list when ready.'):
      'Confirm every participating team’s names and IDs before exporting its bonus.'):
      view.finalized?(noWinner?'Results saved. No team earned a positive score.':verified?'Award list ready. Download the CSV to apply the bonus.':'Check the winning rosters before downloading the bonus CSV.'):
      !finished?'Close all rounds to see the winning teams.':noWinner?'No team earned a positive score.':verified?'The winning rosters are verified. You can finalize the award list.':'Check the names and IDs of the winning teams before finalizing.';
    return '<section class="panel" id="awards"><h2>3. Verify rosters and export bonuses</h2><p class="award-status">'+status+'</p>'+(pool?'<p>'+esc(view.bonusRule)+'</p>':'')+
      winners.map(t=>'<div class="private-roster"><strong>'+esc(t.name)+' · '+(t.total??0)+' / '+view.maxPoints+' points'+(pool?' · bonus '+esc(view.ranking.find(r=>r.id===t.id)?.coursePercentagePoints)+' course percentage points':'')+'</strong><ul>'+
        t.roster.map(m=>'<li>'+esc(m.name)+' · '+esc(m.id)+'</li>').join('')+'</ul>'+
        (t.verified?'<span class="badge">Roster verified</span>':'<button type="button" data-verify-winner="'+t.id+'">Confirm this roster</button>')+
        ('<button type="button" class="secondary" data-edit-roster="'+t.id+'">Correct roster</button>')+'</div>').join('')+
      '<div class="controls"><button id="finalize" '+(view.finalized||!finalizeReady?'disabled':'')+'>'+(view.finalized?'Results finalized':pool?'Finalize bonuses':noWinner?'Finalize results':'Finalize winners')+'</button>'+
      '<button class="secondary" id="export-csv" '+(view.finalized&&verified?'':'disabled')+'>Download bonus CSV</button>'+
      '<button class="secondary" id="export-json">Download full answer record</button><button class="secondary" id="export-ranking">Download team rankings</button></div>'+
      '<p class="fine">Confirm only students who took part. The CSV lists verified '+(pool?'participating':'winning')+' students and the course bonus for each. Team scores are automatic.</p></section>';
  }
  function studentLobbyUrl(){return new URL(MizanRuntime.page('lobby'),location.origin).href+'?room='+view.code;}
  function studentLobbyQR(){return window.LobbyQR?.image(studentLobbyUrl())||'';}
  function lobbyQRButton(){
    const image=studentLobbyQR();
    return image?'<button type="button" class="secondary lobby-qr" id="show-lobby-qr"><img src="'+image+
      '" alt="" width="128" height="128"><span>Show QR code</span></button>':'';
  }
  function leadershipControl(team){
    if(!team.workspaceMembers||view.finalized)return '';
    const candidates=team.workspaceMembers.filter(member=>!member.isLeader);
    if(!candidates.length)return '<p class="fine">Solo team: the leader covers every unclaimed role. Add a teammate during check-in before transferring leadership.</p>';
    return '<div class="leadership-transfer"><label for="leader-to-'+team.id+'">Transfer team leadership</label><select id="leader-to-'+team.id+'">'+
      candidates.map(member=>'<option value="'+member.ref+'">'+esc(member.name)+'</option>').join('')+'</select>'+
      '<button type="button" class="secondary" data-transfer-leader="'+team.id+'">Transfer leadership</button><p class="fine">Team notes, decisions, audit spend and submissions stay with the team.</p></div>';
  }
  function workspaceHostNotice(){
    return view.workspaceProfile==='mizan-market-v1'?'<aside class="class-legacy-notice" aria-label="Earlier session release order"><strong>Saved session: earlier release order</strong><p>This class retains its original decision and evidence sequence. Start a new class to use the corrected first-decision, audit-review and final-decision gates. Nothing in this saved session has been reset or migrated.</p></aside>':'';
  }
  function collaborationMonitor(){
    const teams=view.teams.filter(team=>team.active&&team.roster.length);
    const initials=name=>name.split(/\s+/).slice(0,2).map(p=>p[0]).join('').toUpperCase();
    const people=team=>team.activity?.people||[];
    const table=teams.map(team=>{
      const a=team.activity,next=a?.next;
      const others=(a?.tasks||[]).filter(task=>!['done','saved','waiting'].includes(task.status)&&task.id!==next?.id);
      const members=people(team).map(member=>'<li><span class="member-initial">'+esc(initials(member.name))+'</span><div><strong>'+esc(member.name)+'</strong><small>'+esc(member.roles.join(' · ')||'Role to choose')+'</small></div></li>').join('')+(team.observers||[]).map(member=>'<li class="monitor-observer"><span class="member-initial">'+esc(initials(member.name))+'</span><div><strong>'+esc(member.name)+'</strong><small>Observer · not scored</small></div></li>').join('');
      return '<tr><th scope="row">'+esc(team.name)+'</th><td><ul class="monitor-people">'+members+'</ul></td><td>'+esc(a?.label||'Check-in')+
        '<small>'+(a?a.complete+' / '+a.total+' current steps saved':'')+'</small></td><td><div class="monitor-wait '+(next?'has-waiting':'is-ready')+'"><strong>'+esc(next?(next.owner?.name||'Team'):'Ready')+'</strong><p>'+esc(next?next.title:'Current work saved')+'</p>'+(others.length?'<small class="monitor-others">Also: '+esc(others.map(task=>(task.owner?.name||'Team')+' · '+task.title).join('; '))+'</small>':'')+'</div></td>'+
        '<td><button type="button" class="secondary" data-inspect-team="'+team.id+'">Inspect team</button></td></tr>';
    }).join('');
    return '<section id="team-progress-monitor" class="collaboration-monitor"><div class="monitor-heading"><h2>Where teams need help</h2><p>Based on saved work and the next action in the case.</p></div>'+
      (teams.length?'<div class="scroll"><table class="work-monitor"><thead><tr><th>Team</th><th>People & roles</th><th>Current work</th><th>Waiting for</th><th>Action</th></tr></thead><tbody>'+table+'</tbody></table></div>':'<p>Teams appear here as students join.</p>')+'</section>';
  }
  function mountHostCollaboration(){
    if(!view.workspaceProfile||!hostMode)return;
    document.body.classList.add('collaboration-host');
    let nav=$('#host-channels');
    if(!nav){nav=document.createElement('aside');nav.id='host-channels';nav.setAttribute('aria-label','Instructor channels');$('#host').prepend(nav);}
    nav.innerHTML='<div class="host-channel-brand"><strong>Mizan Market</strong><span>Classroom · '+esc(view.code)+'</span></div><p>Instructor channels</p>'+
      [['.class-action','class-control'],['#team-progress-monitor','team-progress'],['#class-answer-review','saved-answers'],['#class-results','results-and-bonus'],['#classroom-admin','session-settings']].map(([target,label])=>'<button type="button" data-host-channel="'+target+'"'+(target==='#class-results'&&!document.querySelector(target)?' disabled title="Available after the activity ends"':'')+'><span aria-hidden="true">#</span> '+label+'</button>').join('')+
      '<div class="host-channel-footer"><p>'+esc(view.title)+'</p><button type="button" data-host-sections>Saved sections</button></div>';
    const body=$('#host-body'),action=body.querySelector('.class-action');
    if(!action)return;
    action.insertAdjacentHTML('afterend',collaborationMonitor());
    let layout=document.createElement('div');layout.className='host-collaboration-layout';
    let main=document.createElement('div');main.className='host-collaboration-main';
    let aside=document.createElement('aside');aside.className='host-collaboration-context';aside.setAttribute('aria-label','Selected team');
    const chosen=view.teams.find(team=>team.id===selected)||view.teams.find(team=>team.active&&team.roster.length);
    const a=chosen?.activity;
    const details=chosen?'<h2>'+esc(chosen.name)+'</h2><ul class="host-person-context">'+(a?.people||[]).map(member=>'<li class="'+esc(member.status)+'"><strong>'+esc(member.name)+'</strong><span>'+esc(member.roles.join(' · ')||'Role to choose')+'</span><p>'+esc(member.detail)+'</p></li>').join('')+'</ul>'+
      (chosen.observers?.length?'<h3>Observers</h3><ul class="host-person-context">'+chosen.observers.map(person=>'<li><strong>'+esc(person.name)+'</strong><span>Observer · '+esc(person.studentId)+' · not scored</span></li>').join('')+'</ul>':'')+'<h3>Next action</h3><p>'+esc(a?.next?(a.next.owner?.name||'Team')+' · '+a.next.action:'Current work is ready.')+'</p><button type="button" class="secondary" data-inspect-team="'+chosen.id+'">Open team record</button>':'<h2>People & work</h2><p>Students and assignments appear after check-in.</p>';
    aside.innerHTML=details;
    const share=body.querySelector('.class-share');
    if(share){const heading=share.querySelector('h2');if(heading&&view.lobbyStatus==='locked')heading.textContent='Late arrivals · observer check-in';const qr=share.querySelector('.lobby-qr');if(qr){qr.classList.add('context-qr');}aside.append(share);}
    const metrics=body.querySelector('.class-metrics');if(metrics)aside.append(metrics);
    // Keep the original controls, IDs and handlers, while grouping them around live team progress.
    for(const child of [...body.children])main.append(child);
    layout.append(main,aside);body.append(layout);
    $('#host-title').textContent='# class-control';
  }
  function workspaceHostProgress(){
    const progress=view.workspaceProgress;if(view.endedEarly||view.workspaceProfile!=='mizan-market-v2'||!progress)return '';
    const p2=view.phases.find(p=>p.sequence===2),p3=view.phases.find(p=>p.sequence===3);
    if(progress.guidedRound1&&p2?.status!=='closed')return '';
    if(view.timing?.combinedFinal)return '<section class="panel class-workflow"><h2>Team decisions</h2><p>Teams finish audit review before Round 3. During Round 3 they save MCQs, vote, and answer the final recommendation question.</p>'+
      '<div class="scroll"><table class="class-decisions"><thead><tr><th>Team</th><th>Audit</th><th>Review</th><th>Vote</th><th>Final question</th></tr></thead><tbody>'+
      progress.teams.map(team=>{const vote=view.voteProgress?.find(row=>row.team===team.team);return '<tr><th>'+esc(team.name)+'</th><td>'+esc(team.auditPlan||'Waiting')+'</td>'+
        '<td>'+(team.reportsReviewed?'Ready':'Waiting')+'</td><td>'+(view.timing.voteClosed?esc(({launch:'Sign original',reserve:'Reserve',negotiate:'Accept split',decline:'Decline'})[vote?.result?.choice]||'No votes'):
          (vote?.cast??0)+' / '+(vote?.eligible??0)+' voted')+'</td><td>'+((view.finalStyle==='board'?vote?.result?.board_choice!=null:vote?.result?.cash!=null)?'Saved':'Waiting')+'</td></tr>';}).join('')+'</tbody></table></div></section>';
    const between=p2?.status==='closed'&&p3?.status==='pending';
    const names=items=>items.length?items.map(team=>esc(team.name)).join(', '):'None';
    return '<section class="panel class-workflow"><h2>Business decision checkpoints</h2><p>Three scored rounds, with separate audit and business-decision steps. '+(progress.guidedRound1?'Round 1 uses the role fact sheet and one team question.':'A team’s first recommendation unlocks its company reports.')+' Audits open after scored Round 2 closes. The leader confirms report review before the final offer opens.</p>'+(between?'<div class="class-workflow-alert"><strong>Between scored Rounds 2 and 3</strong><p>Teams should choose an audit plan, review their purchased information and record a final business recommendation. '+(view.timing?'Close the final vote to release the common exercise.':'Round 3 stays locked until every participating team has recorded its final choice.')+'</p></div>':'')+'<div class="class-pending"><p>'+(progress.guidedRound1?'':'<strong>First choices still needed:</strong> '+names(progress.pendingInitial||[])+'</p><p>')+'<strong>Final choices still needed:</strong> '+names(progress.pendingFinal||[])+'</p></div><div class="scroll"><table class="class-decisions"><thead><tr><th scope="col">Team</th><th scope="col">First choice</th><th scope="col">Audit plan</th><th scope="col">Report review</th><th scope="col">Final choice</th></tr></thead><tbody>'+progress.teams.map(team=>'<tr><th scope="row">'+esc(team.name)+'</th><td>'+ (team.initialCommitted?'Recorded':'Waiting')+'</td><td>'+esc(team.auditPlan||'Not chosen')+'</td><td>'+(team.reportsReviewed?'Confirmed':'Waiting')+'</td><td>'+(view.timing?(()=>{const vote=view.voteProgress?.find(v=>v.team===team.team);return view.timing.voteClosed?(vote?.result?.choice?esc(({launch:'Sign original',reserve:'Reserve',negotiate:'Accept split',decline:'Decline'})[vote.result.choice])+' · '+vote.result.earned+' / 6':'No votes · 0 / 6'):(vote?.cast??0)+' / '+(vote?.eligible??0)+' voted';})():team.finalCommitted?'Recorded':'Waiting')+'</td></tr>').join('')+'</tbody></table></div></section>';
  }
  function timingControls(timing,open,next,primary){
    if(!timing)return primary;
    const button=(stage,label)=>'<button data-timing-stage="'+stage+'">'+label+'</button>';
    if(open)return timing.combinedFinal&&open.sequence===3&&!timing.voteClosed?
      button('close-vote',view.finalStyle==='board'?'Confirm team choices and open board question':'Confirm team choices and open cash question')+primary:primary;
    if(next?.sequence===1&&!timing.guided&&!timing.readingStarted)return button('reading','Start case reading · '+timing.stages.reading.minutes+' min');
    if(next?.sequence!==3||timing.voteClosed)return primary;
    if(!timing.auditsStarted)return button('audits','Start audit review · '+timing.stages.audits.minutes+' min');
    if(timing.combinedFinal)return primary;
    if(!timing.voteStarted)return button('vote','Open final decision vote · '+timing.stages.vote.minutes+' min');
    return button('close-vote','Close vote and score decision checks');
  }
  function answerReviewPanel(review){
    if(!review)return '';
    if(!review.stages.length){
      answerStage=answerCurrent='';
      return '<section id="class-answer-review" class="panel"><h2>Live answer review</h2><p>Saved answers will appear when Round 1 opens.</p></section>';
    }
    if(review.current!==answerCurrent||!review.stages.some(stage=>stage.id===answerStage)){
      answerCurrent=review.current;answerStage=review.current;
    }
    const stage=review.stages.find(s=>s.id===answerStage)||review.stages.at(-1);
    const kept=new Set([...document.querySelectorAll('#class-answer-review details[data-review-item][open]')].map(row=>row.dataset.reviewItem));
    const repeatedError=row=>Math.max(0,...row.groups.filter(group=>!group.correct).map(group=>group.count));
    const items=[...stage.items].sort((a,b)=>(b.answered-b.correct)-(a.answered-a.correct)||
      repeatedError(b)-repeatedError(a));
    const responses=items.reduce((n,row)=>n+row.answered,0);
    const marked=items.reduce((n,row)=>n+row.correct,0);
    const waiting=items.reduce((n,row)=>n+row.waiting,0);
    const priorities=items.filter(row=>row.answered>row.correct);
    const primary=priorities[0], mistake=primary?.groups.find(group=>!group.correct);
    const learn=primary?'<div class="answer-review-prompt"><p><strong>Discuss first</strong> '+esc(primary.title)+
      ' <span class="fine">· '+(primary.answered-primary.correct)+' of '+primary.answered+' responses to review</span></p>'+
      (mistake?'<p>'+esc(mistake.reason)+' <span class="fine">('+mistake.count+' '+(mistake.count===1?'team':'teams')+')</span></p>':'')+
      '<p>'+esc(primary.discussion)+'</p></div>':'<p class="fine">'+(responses?
        'The saved responses match the expected answers so far.':'Waiting for teams to save a response.')+'</p>';
    const rows=items.map(item=>{
      const key=stage.id+':'+item.id;
      const facts=stage.id==='facts',miss=item.answered-item.correct;
      return '<details data-review-item="'+esc(key)+'" '+(kept.has(key)?'open':'')+'>'+
        '<summary><strong>'+esc(item.title)+'</strong><span class="answer-review-counts"><span class="answer-ok">'+
          item.correct+(facts?' match':' correct')+'</span><span class="'+(miss?'answer-miss':'')+'">'+miss+' '+(facts?'check':'incorrect')+
          '</span><span>'+item.waiting+' waiting</span></span></summary>'+
        '<div class="answer-review-body"><p>'+esc(item.question)+'</p><p><strong>Expected answer</strong> '+esc(item.expected)+'</p>'+
        (item.groups.length?'<ul>'+item.groups.map(g=>'<li><span class="'+(g.correct?'answer-ok':'answer-miss')+'">'+g.count+
          '</span><div><strong>'+esc(g.value)+'</strong><p class="fine">'+esc(g.teams.join(', '))+'</p>'+
          (g.reason?'<p>'+esc(g.reason)+'</p>':'')+'</div></li>').join('')+'</ul>':'<p class="fine">Awaiting a saved answer.</p>')+
        '<p><strong>Ask the room.</strong> '+esc(item.discussion)+'</p></div></details>';
    }).join('');
    return '<section id="class-answer-review" class="panel" aria-labelledby="answer-review-title">'+
      '<div class="heading"><h2 id="answer-review-title">Live answer review</h2><span class="badge">Instructor only</span></div>'+
      '<p class="fine">Each question uses the latest saved answer from each team. Missing answers count as waiting here. The view refreshes as teams save.</p>'+
      '<div class="answer-review-tabs" aria-label="Review stage">'+review.stages.map(s=>
        '<button class="'+(s.id===stage.id?'':'secondary')+'" data-answer-stage="'+esc(s.id)+'" type="button" aria-pressed="'+(s.id===stage.id)+'">'+esc(s.label)+'</button>').join('')+'</div>'+
      '<p class="answer-review-summary"><strong>'+responses+'</strong> responses from up to '+review.teams+' active teams <span>·</span> <strong>'+marked+
        '</strong> '+(stage.id==='facts'?'matched':'correct')+' <span>·</span> <strong>'+waiting+'</strong> unanswered'+
        ' <span>·</span> '+(stage.status==='open'?'Round open':'Round closed')+'</p>'+
      (stage.id==='facts'?'<p class="fine">Fact matches are for discussion. Read the saved wording when reviewing a possible mismatch.</p>':'')+
      learn+'<div class="answer-review-list">'+rows+'</div></section>';
  }
  function classroomBody(){
    const groups=view.teams.filter(team=>team.active&&team.roster.length);
    const joined=groups.reduce((n,team)=>n+team.roster.length,0);
    const captains=groups.filter(team=>team.captain||view.timing?.guided&&team.roster.length===1).length;
    const open=view.phases.find(phase=>phase.status==='open');
    const next=view.endedEarly?null:view.phases.find(phase=>phase.status==='pending');
    const finished=!open&&!next;
    const gatedFinal=view.workspaceProfile==='mizan-market-v2'&&next?.sequence===3&&!view.workspaceProgress?.canOpenRound3;
    const checkIn=view.lobbyStatus==='open';
    const beforeRounds=view.phases.every(phase=>phase.status==='pending');
    const answered=(team,phase)=>Object.keys(latest(team.id,phase.id)?.answers||{}).length;
    const submitted=open?groups.filter(team=>answered(team,open)===open.fields.length).length:0;
    const boardUrl='../board.html';
    const guides=[
      'Ask teams to explain which cost the sales pitch leaves out and whether quiet days represent normal operations.',
      'Ask teams what the p-value lets them tell the owner. Hear an explanation about savings and one about late orders.',
      'Ask teams to separate the cash due today from the evidence that the contract will pay off.'
    ];
    const phaseNumber=view.phases.indexOf(open||next);
    const missing=Math.max(0,view.expectedStudents-joined);
    const teamsNeedingLeaders=groups.length-captains;
    const canLock=joined>0&&!teamsNeedingLeaders&&(!missing||!!view.workspaceProfile);
    let checkInNote='Everyone expected has checked in.';
    if(!joined)checkInNote='Waiting for the first student to check in.';
    else if(teamsNeedingLeaders)checkInNote=teamsNeedingLeaders===1?'One team still needs a leader.':teamsNeedingLeaders+' teams still need leaders.';
    else if(missing)checkInNote=view.workspaceProfile?'You can lock with the students who have checked in.':
      missing+' more student'+(missing===1?'':'s')+' to check in.';
    const timing=view.timing,clock=timing?.clock;
    const priorExtend=$('#extend-timer');
    const keepMinutes=priorExtend?.dataset.stage===clock?.stage?$('#extend-minutes')?.value||'':'';
    const keepExtendFocus=!!clock&&priorExtend?.dataset.stage===clock.stage&&document.activeElement?.id==='extend-minutes';
    const briefStage=checkIn?'check-in':beforeRounds?(clock?.stage||'before-round1'):'rounds';
    const priorBrief=$('#class-case-brief');
    const briefOpen=priorBrief?.dataset.stage===briefStage?priorBrief.open:['before-round1','reading'].includes(briefStage);
    const caseBrief=timing&&!finished?'<details id="class-case-brief" class="panel" data-case-copy data-stage="'+esc(briefStage)+'" '+
      (briefOpen?'open':'')+'><summary>Case brief</summary>'+MizanBrief.identity+MizanBrief.background+'</details>':'';
    let guide=checkIn?'Ask each student to open the link on their own device and choose a team. '+(timing?.guided?
      'Teams with two or more students choose a leader. Solo students become leaders when you lock check-in.':'Each team chooses one leader.'):
      open?guides[phaseNumber]:finished?guides.at(-1):phaseNumber>0?guides[phaseNumber-1]:'Project the case, give teams a moment to read, then open Round 1.';
    if(timing?.guided){
      if(!checkIn&&beforeRounds)guide='Have teams read the case brief below. Open Round 1 when they are ready.';
      else if(open?.sequence===1)guide='Have each specialist fill in their facts. The team leader covers open roles and saves one team answer after the cards are complete.';
      else if(!open&&next?.sequence===2)guide='Discuss two team answers. Ask what the vendor’s comparison leaves out and how the sample was selected.';
      else if(!open&&next?.sequence===3&&!timing.auditsStarted)guide='Discuss the company reports. Compare what the two tests let the teams say.';
      else if(!open&&next?.sequence===3&&timing.voteClosed&&!timing.combinedFinal)guide='Give teams 2 minutes to compare why they voted differently, then open the common exercise.';
      else if(finished)guide='Discuss affordability and evidence. Verify rosters and export after class.';
    }
    if(timing?.combinedFinal){
      if(open?.sequence===3)guide=timing.voteClosed?(view.finalStyle==='board'?'Teams now select a board message combining evidence, cash and remaining risk. Close Round 3 when they finish.':'Teams now select the cash balance for their confirmed action. Close Round 3 when they finish.'):
        (view.finalStyle==='board'?'Teams answer the MCQs, then each student votes. Confirm team choices to release the final board-recommendation MCQ.':'Teams answer the MCQs, then each student votes. Confirm team choices to release the final cash MCQ.');
      else if(!open&&next?.sequence===3&&timing.auditsStarted)guide='Have every leader finish the audit review. Then open Round 3.';
    }
    if(view.endedEarly)guide='Saved work counts. Unopened rounds are skipped. Review the rankings and finalize the results.';
    const stageLabel=clock?timing.stages[clock.stage].label:null;
    const status=view.endedEarly?'Activity ended early':stageLabel|| (checkIn?'Check-in':open?open.label:finished?'Results':gatedFinal?'Audit review & final decisions':next.label+' · ready');
    let primary=checkIn?'<button id="lock-team-lobby" '+(canLock?'':'disabled')+'>Lock check-in</button>':
      open?'<button data-close="'+open.id+'">Close round and release scores</button>':
      finished?'<a class="button-link" href="#class-results">Go to results</a>':
      '<button data-open="'+next.id+'" '+(gatedFinal?'disabled aria-describedby="class-round-gate"':'')+'>Open '+esc(next.label.replace(/^([0-9]+)\. /,'Round $1 · '))+'</button>';
    if(!checkIn&&!view.finalized)primary=timingControls(timing,open,next,primary);
    const keepAdmin=$('#classroom-admin')?.open;
    const keepBoard=$('#class-results')?.open;
    const keepPlan=$('#mizan-class-plan')?.open;
    const inspection=view.teams.find(team=>team.id===selected);
    const facts=inspection?.workspace?.facts;
    const factReview=facts?'<details class="panel" open><summary>Round 1 fact sheet · '+facts.length+' / 5 cards saved</summary>'+
      facts.map(card=>'<div class="score-item"><strong>'+esc(card.role)+'</strong><dl>'+card.prompts.map((p,i)=>
        '<dt>'+esc(p)+'</dt><dd>'+esc(card.values[i])+'</dd>').join('')+'</dl></div>').join('')+'</details>':'';
    const roster=inspection?'<section class="panel" id="class-inspector" tabindex="-1"><div class="heading"><h2>'+esc(inspection.name)+' · private record</h2><button id="dismiss-inspector" class="secondary">Close record</button></div>'+
      '<p class="fine">'+esc(inspection.captain?'Team leader · '+inspection.captain:'Team leader not selected')+'</p>'+
      (inspection.roster.length?'<ul class="class-roster">'+inspection.roster.map(member=>'<li>'+esc(member.name)+' · '+esc(member.id)+
        (checkIn?' <button class="secondary" data-lobby-remove="'+esc(member.id)+'" data-lobby-team="'+inspection.id+'">Remove</button>':'')+'</li>').join('')+'</ul>':'<p>No students have joined this team.</p>')+
      (inspection.workspaceMembers?leadershipControl(inspection):inspection.captain&&!view.finalized?'<button class="secondary" data-clear-captain="'+inspection.id+'">Clear team leader</button>':'')+'</section>'+
      (!checkIn?factReview+reviewPanel():''):'';
    const monitor=view.teams.filter(t=>t.active||t.roster.length).map(t=>{
      const scores=view.ranking.find(team=>team.id===t.id);
      return '<tr><th scope="row">'+esc(t.name)+'</th><td>'+t.roster.length+'</td><td>'+esc(t.captain||'—')+'</td>'+
        view.phases.map((p,i)=>{
          const count=answered(t,p);
          const facts=i===0&&t.workspace?.facts&&p.status==='open'?' · '+t.workspace.facts.length+'/5 cards':'';
          const score=scores?.rounds[i];
          const value=score?.skipped?(score.possible?'Vote '+(score.earned??0)+' / '+score.possible:'Skipped'):
            p.status==='closed'&&t.roster.length?(score?.earned??0)+' / '+(score?.possible??0):
            p.status==='open'&&t.roster.length?(count===p.fields.length?'Complete':count?count+'/'+p.fields.length+' saved':'Waiting'):'—';
          return '<td'+(count===p.fields.length&&p.status==='open'?' class="class-saved"':'')+'>'+esc(value+facts)+'</td>';
        }).join('')+'<td><button class="secondary" data-inspect-team="'+t.id+'" aria-label="Inspect '+esc(t.name)+'">Inspect</button></td></tr>';
    }).join('');
    $('#host-title').textContent='Mizan Market · Instructor dashboard';
    $('#host-meta').textContent=view.title+(timing?' · '+timing.minutes+' minutes':'')+' · Class code '+view.code;
    $('#host-body').innerHTML=workspaceHostNotice()+
      (finished?'':'<section class="class-share panel" aria-label="Share class access">'+lobbyQRButton()+
      '<div><h2>Student check-in</h2><label for="student-lobby-link">Student link · '+esc(view.code)+'</label><input id="student-lobby-link" readonly value="'+esc(studentLobbyUrl())+'">'+
      '<div class="controls"><button class="secondary" id="copy-lobby-link">Copy student link</button><a href="'+esc(boardUrl)+'" target="_blank" rel="noopener">Project case ↗</a></div></div></section>')+
      '<section class="class-metrics" aria-label="Live class progress"><div><span>Checked in</span><strong>'+joined+' / '+view.expectedStudents+'</strong></div><div><span>Teams with a team leader</span><strong>'+captains+' / '+groups.length+'</strong></div>'+
      '<div><span>Current stage</span><strong>'+esc(status)+'</strong></div><div><span>Completed this round</span><strong>'+(open?submitted+' / '+groups.length:'—')+'</strong></div></section>'+
      '<section class="panel class-action"><h2>'+esc(status)+'</h2><p>'+esc(timing?.combinedFinal?guide:timing&&gatedFinal&&timing.auditsStarted?(clock?.stage==='vote'?'Each student votes on their phone. The leader saves the three scored checks. Close the vote to record each team’s decision.':'Teams should review their own audit evidence before voting.'):gatedFinal&&!timing?'Give teams time to purchase and review audits, discuss the final offer, and record their final business choice. Open scored Round 3 afterward.':guide)+'</p>'+(gatedFinal&&!timing?'<p id="class-round-gate" class="fine">Waiting for final recommendations from '+(view.workspaceProgress?.pendingFinal||[]).map(t=>esc(t.name)).join(', ')+'.</p>':'')+
      (checkIn?'<p class="fine">'+esc(checkInNote)+'</p>':
        open?'<p class="fine">When you close this round, saved answers are scored and students see their points.</p>':'')+
      (clock?'<div class="case-clock" data-mizan-clock><span>Time remaining</span> <strong data-mizan-countdown></strong></div>'+
        '<form id="extend-timer" data-stage="'+esc(clock.stage)+'" data-deadline="'+clock.deadline+'">'+
        '<label for="extend-minutes">Minutes to add</label><input type="number" id="extend-minutes" min="1" step="1" inputmode="numeric" required value="'+esc(keepMinutes)+'">'+
        '<button class="secondary">Extend timer</button></form>':'')+
      '<div class="controls">'+primary+(view.answerReview?.stages.length?'<a href="#class-answer-review">Review saved answers</a>':'')+(view.available>0?'<button id="show-board" class="secondary">Project leaderboard</button>':'')+
      (!checkIn&&beforeRounds&&!view.endedEarly?'<button id="reopen-lobby" class="secondary">Reopen check-in</button>':'')+endEarlyControl()+'</div></section>'+caseBrief+
      (timing?'<details class="panel" id="mizan-class-plan"><summary>'+timing.minutes+'-minute session plan</summary><p>'+
        timing.plan.map(({from,to,label})=>from+'–'+to+' '+esc(label)).join(' · ')+'.</p><p class="fine">When time runs out, submissions pause. You can add time until you close the round or vote.</p></details>':'')+
      answerReviewPanel(view.answerReview)+workspaceHostProgress()+'<details class="panel" id="class-round-record"><summary>Round completion record</summary><h2>Live team monitor</h2><p class="fine">Select a team to inspect its private roster and answers. Use the projection link when sharing with the class.</p>'+
      '<div class="scroll"><table class="class-monitor"><thead><tr><th scope="col">Team</th><th scope="col">Joined</th><th scope="col">Team leader</th>'+
      view.phases.map((p,i)=>'<th scope="col">Round '+(i+1)+'</th>').join('')+'<th scope="col">Record</th></tr></thead><tbody>'+monitor+'</tbody></table></div></details>'+roster+
      (finished?'<details class="panel" id="class-results"><summary>Results and bonus</summary>'+standings()+awardPanel()+'</details>':'')+
      '<details class="panel" id="classroom-admin"><summary>Session settings</summary>'+
      (checkIn?'<form id="expected-form"><label for="expected-now">Expected students</label><input id="expected-now" type="number" min="1" max="180" step="1" required value="'+view.expectedStudents+'"><div class="controls"><button>Update headcount</button></div></form>'+
        '<form id="add-team"><label for="team-name">Add another team</label><input id="team-name" maxlength="40" required><div class="controls"><button>Add team</button></div></form>':'')+
      '<div class="controls"><button class="secondary" id="export-json">Download full record</button><button class="secondary" id="reset-competition">Export and reset scores</button><button class="secondary" id="clear-session">Clear session</button></div></details>';
    $('#classroom-admin').open=!!keepAdmin;
    if($('#mizan-class-plan'))$('#mizan-class-plan').open=!!keepPlan;
    if($('#class-results'))$('#class-results').open=keepBoard??true;
    if(keepExtendFocus)$('#extend-minutes')?.focus({preventScroll:true});

  }
  function lobbyPanel(roundsStarted,ready){
    if(view.lobbyStatus==='off'){
      if(roundsStarted||ready||!view.teams.some(t=>t.active))return '';
      return '<div class="rules"><h3>Let students join live</h3><p>Share one lobby link so students can choose a team and see their teammates. Lock the rosters before Round 1.</p><div class="controls"><button id="open-team-lobby">Open team lobby</button></div></div>';
    }
    const open=view.lobbyStatus==='open';
    const count=view.teams.reduce((total,team)=>total+(team.active?team.roster.length:0),0);
    const roster=open?'<details id="live-rosters"><summary>View live rosters (private)</summary>'+
      view.teams.filter(team=>team.active&&team.roster.length).map(team=>'<section class="private-roster"><strong>'+esc(team.name)+' · '+team.roster.length+' joined</strong><ul>'+
      team.roster.map(member=>'<li>'+esc(member.name)+' · '+esc(member.id)+' <button type="button" class="secondary" data-lobby-remove="'+esc(member.id)+'" data-lobby-team="'+team.id+'" aria-label="Remove '+esc(member.name)+'">Remove</button></li>').join('')+'</ul></section>').join('')+
      (count?'':'<p class="fine">Waiting for students to join.</p>')+'</details>':'';
    const captains=view.teams.filter(team=>team.active&&team.roster.length);
    return '<div class="rules"><h3>'+ (open?'Team lobby is open':'Team rosters are locked')+'</h3><p>'+count+' students in '+ready+' teams. '+(open?'Students can join and choose a team leader on their team page.':'Team leaders open the workspace from their team page.')+'</p>'+
      '<label for="student-lobby-link">Student lobby link</label><input id="student-lobby-link" readonly value="'+esc(studentLobbyUrl())+'"><div class="controls">'+
      '<button class="secondary" id="copy-lobby-link">Copy student lobby link</button><a href="'+esc(studentLobbyUrl())+'" target="_blank" rel="noopener">Open student lobby ↗</a>'+
      (open?'<button id="lock-team-lobby" '+(count?'':'disabled')+'>Lock team rosters</button>':'')+'</div>'+
      (classroomLaunch?lobbyQRButton():'')+
      (captains.length?'<h4>Team leaders</h4><ul>'+captains.map(team=>'<li>'+esc(team.name)+' · '+esc(team.captain||'Waiting for a team leader')+
        (team.captain&&!view.finalized?' <button type="button" class="secondary" data-clear-captain="'+team.id+'">Clear team leader</button>':'')+'</li>').join('')+'</ul>':'')+
      roster+'</div>';
  }
  function hostBody(){
    $('#host-legacy').hidden=!!view.expectedStudents;
    if(view.expectedStudents){classroomBody();return;}
    $('#host-title').textContent=view.title;
    $('#host-meta').textContent='Session '+view.code+' · '+view.teams.length+' teams · access expires '+date(view.expires);
    const locked=view.finalized;
    const automatic=view.scoring==='automatic';
    const roundsStarted=view.phases.some(p=>p.status!=='pending');
    const allClosed=roundsFinished();
    const nextRound=view.phases.find(p=>p.status!=='closed');
    const ready=view.teams.filter(t=>t.roster.length>0&&t.active).length;
    const step=allClosed?2:roundsStarted?1:0;
    const steps=automatic?'<ol class="host-steps">'+[['team-setup','1. Set up teams'],['rounds','2. Run the rounds'],['awards','3. Verify and export']].map(([id,label],i)=>
      '<li class="'+(i===step?'current':'')+'"><a href="#'+id+'">'+label+'</a></li>').join('')+'</ol>':'';
    const codeListOpen=$('#team-codes')?.open;
    const liveRostersOpen=$('#live-rosters')?.open;
    $('#host-body').innerHTML=workspaceHostNotice()+workspaceHostProgress()+steps+'<section class="panel" id="team-setup"><h2>'+ (automatic?'1. Set up teams':'Teams and private access codes')+'</h2>'+
      '<p class="fine">'+ready+' / '+view.teams.length+(view.lobbyStatus==='open'?' teams have students in the lobby.':' teams have saved a roster.')+'</p>'+
      (!locked?'<form id="add-team"><label for="team-name">Team name</label><div class="row"><input id="team-name" maxlength="40" placeholder="Team Cedar" required><button>Add team</button></div></form>':'')+
      lobbyPanel(roundsStarted,ready)+'<p class="fine">'+(view.lobbyStatus==='off'?'Give each code to its team leader for the scored rounds.':'The private answer links are a backup if a team leader needs help opening the workspace.')+' Keep these codes off the projector.</p>'+
      '<details id="team-codes"><summary>Share team links</summary><div class="scroll"><table><thead><tr><th>Team</th><th>Roster</th><th>Access code</th><th>Controls</th></tr></thead><tbody>'+view.teams.map(t=>'<tr><td>'+esc(t.name)+'</td><td>'+ (t.roster.length?t.roster.length+' saved':'Waiting')+'</td><td class="mono">'+esc(savedInvites[t.id]||'Generate a new code')+'</td><td><div class="controls">'+(savedInvites[t.id]?'<button class="secondary" data-copy="'+t.id+'">Copy team link</button>':'')+(!locked?'<button class="secondary" data-reissue="'+t.id+'">New code</button>':'')+'</div></td></tr>').join('')+'</tbody></table></div></details></section>'+
      '<section class="panel"><div class="heading"><h2>Team leaderboard</h2><button class="secondary" id="show-board">Project leaderboard</button></div>'+standings()+'</section>'+
      '<section class="panel" id="rounds"><h2>'+ (automatic?'2. Run the rounds':'Submission checkpoints')+'</h2><p class="fine">Open a round when the class reaches it. Closing locks the saved answers and releases the scores.</p>'+
      endEarlyControl()+view.phases.map(p=>'<div class="row"><div><h3>'+esc(p.label)+'</h3><p class="fine">'+esc(p.prompt)+'</p><p class="fine">'+view.teams.filter(t=>latest(t.id,p.id)).length+' / '+view.teams.length+' teams have saved an answer</p></div><div class="controls"><span class="badge">'+esc(p.status)+'</span>'+(!locked&&!view.endedEarly&&p.status==='pending'&&(!automatic||p.id===nextRound?.id)?'<button data-open="'+p.id+'" '+(view.lobbyStatus==='open'||(view.workspaceProfile==='mizan-market-v2'&&p.sequence===3&&!view.workspaceProgress?.canOpenRound3)?'disabled':'')+'>'+(automatic?'Open round':'Open checkpoint')+'</button>':'')+(!locked&&p.status==='open'?'<button data-close="'+p.id+'">Close submissions</button>':'')+'</div></div>').join('')+'</section>'+
      (automatic?awardPanel():'')+(view.lobbyStatus==='open'?'':'<section class="panel" id="team-records"><h2>'+(automatic?'Team records':'Review the teams')+'</h2><label for="review-team">Team</label><select id="review-team"><option value="">Select a team</option>'+view.teams.map(t=>'<option value="'+t.id+'" '+(t.id===selected?'selected':'')+'>'+esc(t.name)+' · '+(t.active?(view.scoring==='automatic'?'automatic scoring':t.reviewed?'reviewed':'review needed'):'excluded')+'</option>').join('')+'</select></section>'+reviewPanel())+
      (automatic?'':'<div class="controls"><button id="finalize" '+(locked?'disabled':'')+'>'+(locked?'Bonus record finalized':'Finalize winners and bonus record')+'</button><button class="secondary" id="export-json">Download full answer record</button><button class="secondary" id="export-csv" '+(locked?'':'disabled')+'>Download bonus CSV</button><button class="secondary" id="export-ranking">Download team rankings</button></div>')+
      '<div class="danger"><p class="fine">Reset clears answers and scores and keeps teams and access codes. A backup download starts first. Finalizing also starts a full-record download.</p><div class="controls"><button class="secondary" id="reset-competition">Export and reset competition</button><button class="secondary" id="clear-session">Clear saved session</button></div></div>';
    $('#team-codes').open=!!codeListOpen;
    if($('#live-rosters'))$('#live-rosters').open=!!liveRostersOpen;
  }
  function taskPanel(phase){
    if(!phase||!view.work.length)return '';
    return '<details class="panel" id="task-panel"><summary>Assign tasks (optional)</summary><p class="fine">Give a team member a job for this round. Their notes will appear here. You can leave any task blank.</p>'+
      view.work.map(member=>'<form class="task-form" data-phase="'+phase.id+'" data-member="'+member.ref+'"><label for="task-'+member.ref+'">'+esc(member.name)+'</label>'+
        '<div class="task-row"><input id="task-'+member.ref+'" maxlength="120" value="'+esc(taskDrafts[phase.id+'-'+member.ref]??member.task)+'">'+
        '<button class="secondary">Save task</button></div>'+
        (member.note?'<p class="answer">'+esc(member.note)+'</p>':'')+'</form>').join('')+'</details>';
  }
  function studentBody(){
    $('#team-body').toggleAttribute('data-case-copy',/^Mizan Market\b/i.test(view.title));
    $('#team-title').textContent=view.team.name;
    $('#team-session').textContent=view.title+' · '+view.code;
    const roster=view.team.roster;
    const submissions=view.submissions.length;
    const fromLobby=!!session.member;
    $('#leave-team').hidden=fromLobby;
    const taskPanelOpen=$('#task-panel')?.open;
    const openPhase=view.phases.find(phase=>phase.status==='open');
    let html=view.scoring==='automatic'?'<div class="rules"><strong>Team competition · '+view.maxPoints+' points · automatic ranking</strong><p>Correct answers earn the displayed points. Numerical answers use the displayed absolute tolerance. Scores update when the instructor closes a round. The latest saved answer counts. No speed points or manual marking. Missing answers earn 0. '+esc(view.bonusRule||'A positive top score is required; teams tied at the highest positive total share +1 course percentage point per participating member after roster verification.')+' An unsaved round earns zero.</p></div>':
'<div class="rules"><strong>Winning-team bonus · +1 course percentage point per verified member</strong><p>Six criteria, maximum 12 points. Tied top teams are joint winners, with the full bonus for each verified member. The instructor verifies who took part. Save your checkpoint answers before they close.</p><details><summary>How the 12 points are awarded</summary><ol>'+view.rubric.map(text=>'<li>'+esc(text)+'</li>').join('')+'</ol><p>Each criterion receives 0, 1 or 2 points. The instructor awards partial credit for sound reasoning and correct follow-through.</p></details></div>';
    if(fromLobby)html='<p><a href="'+MizanRuntime.page('lobby')+'?room='+esc(session.code)+'">← Back to your team page</a></p><section class="panel"><h2>Team workspace</h2><p>'+
      (openPhase?'Work with your team on the open round below. Save one set of team answers.':view.phases.every(p=>p.status==='closed')?'All rounds are closed. Review your team’s results below.':'Waiting for the instructor to open the next round.')+'</p>'+
      '<p class="fine">The latest saved answers count. Scores appear when your instructor closes each round.</p></section>';
    if(!fromLobby&&view.ranking.length&&view.scoring==='automatic')html+='<section class="panel"><h2>Team leaderboard</h2>'+standings()+'</section>';
    if(!fromLobby&&view.lobbyStatus!=='off'){
      html+='<section class="panel"><h2>Team members</h2>'+
        (roster.length?'<p>'+roster.map(m=>esc(m.name)).join('<br>')+'</p>':'')+
        '<p class="fine">'+(view.lobbyStatus==='open'?'Students register in the shared lobby. The instructor will lock rosters before opening Round 1.':'Ask the instructor to correct the roster if needed.')+'</p></section>';
    }else if(view.lobbyStatus==='off'&&(!roster.length||!submissions)){
      const members=pendingRoster||roster;
      html+='<form class="panel" id="roster-form"><h2>Register your team members</h2><p class="fine">Enter the student ID and full name for each participating member. Save before answering. Your instructor uses this roster to verify bonus eligibility.</p>'+
        '<div id="roster-rows">'+rosterRows(members)+'</div><div class="controls"><button type="button" class="secondary" id="add-roster-member" '+(members.length>=6?'disabled':'')+'>Add member</button><button>Save team members</button></div></form>';
    }else if(view.lobbyStatus==='off'){
      html+='<section class="panel"><h2>Team members</h2><p>'+roster.map(m=>esc(m.name)+' · '+esc(m.id)).join('<br>')+'</p><p class="fine">Ask the instructor to correct this roster if needed.</p></section>';
    }
    if(!view.team.active){html+='<div class="empty">The instructor has marked this team ineligible. Ask them if this needs correction.</div>';}
    else{
      const phases=fromLobby?[...view.phases.filter(p=>p.status==='open'),...view.phases.filter(p=>p.status==='closed')]:view.phases;
      html+=taskPanel(openPhase)+phases.map(phase=>{
        const last=latest(null,phase.id);
        if(phase.status==='pending')return '<section class="panel"><h2>'+esc(phase.label)+'</h2><p>'+(view.endedEarly?'Skipped when the activity ended.':'The instructor will open this checkpoint during the case.')+'</p></section>';
        if(phase.status==='closed'||view.finalized)return '<section class="panel"><h2>'+esc(phase.label)+' · closed</h2>'+responseHTML(last,phase)+'</section>';
        if(view.scoring==='automatic'&&!phase.fields.length)return '<section class="panel"><h2>'+esc(phase.label)+'</h2><p>'+esc(phase.prompt)+'</p><p><a href="'+MizanRuntime.page('lobby')+'?room='+esc(session.code)+'">Open the team workspace to complete the required decision</a></p></section>';
        const key=session.code+'-'+view.team.id+'-'+phase.id+'-'+phase.version;
        const values=drafts[key]||last?.answers||{};
        return '<form class="panel" id="answer-form" data-phase="'+phase.id+'" data-version="'+phase.version+'"><h2>'+esc(phase.label)+'</h2><p'+(view.timing?' aria-hidden="true"':'')+'>'+esc(phase.prompt)+'</p>'+receipt(last)+
          (view.timing?TeamFields.assessmentNotice:'')+phase.fields.map((f,index)=>TeamFields.answer(f,values[f.id]||'',view.timing?index+1:undefined)).join('')+'<p class="fine">You can save a revision while this checkpoint is open. The latest saved version is marked. Previous saved versions stay in the instructor’s record.</p><button '+(!roster.length?'disabled':'')+'>Save team answer</button></form>';
      }).join('');
    }
    if(fromLobby&&view.ranking.length&&view.scoring==='automatic')html+='<section class="panel"><h2>Team leaderboard</h2>'+standings()+'</section>';
    if(view.finalized&&view.scoring!=='automatic')html+='<section class="panel"><h2>Final scoreboard</h2>'+standings()+'</section>';
    if(view.finalized&&view.scoring==='automatic')html+='<section class="panel"><h2>Your answer feedback</h2>'+view.team.automaticDetails.map(p=>'<h3>'+esc(p.label)+' · '+p.earned+' / '+p.possible+'</h3>'+p.items.map(item=>'<div class="score-item"><strong>'+item.earned+' / '+item.possible+' · '+(item.correct?'Correct':'Incorrect or missing')+'</strong><p>'+esc(item.solution)+'</p></div>').join('')).join('')+'</section>';
    $('#team-body').innerHTML=html;
    if($('#task-panel'))$('#task-panel').open=!!taskPanelOpen;
  }
  function render(data){
    MizanClock.sync(data.timing?.clock);
    const signature=JSON.stringify(data,(key,value)=>key==='serverTime'?undefined:value);
    if(rendered===signature)return;
    const focused=document.activeElement;
    const keep=!hostMode&&focused?.closest('#answer-form, .task-form')&&focused.id;
    const selection=keep&&[focused.selectionStart,focused.selectionEnd];
    view=data;rendered=signature;
    document.body.classList.toggle('collaboration-host',hostMode&&!!data.workspaceProfile);
    document.body.classList.toggle('mizan-host',classroomLaunch||!!data.expectedStudents||/^mizan-market-v[12]$/.test(data.workspaceProfile||''));
    $('#session-tag').textContent='Session '+data.code;
    if(hostMode){hostBody();mountHostCollaboration();}else studentBody();
    MizanClock.sync(data.timing?.clock);
    $('#archive-completion').hidden=!hostMode||!data.finalized;
    $('#archive-completion').textContent=data.resultArchive?'Results archived. Download before '+archiveDate(data.resultArchive.expires)+' from Past games & results. Keep downloaded student records private.':'This game is complete, but a saved archive is not yet confirmed. Download the full answer record now, or open Past games & results to check again.';
    if(keep){
      const replacement=document.getElementById(keep);
      replacement?.focus({preventScroll:true});
      if(replacement&&Number.isInteger(selection[0]))replacement.setSelectionRange(selection[0],selection[1]);
    }
    if(hostMode){
      if(classroomLaunch){
        const finished=data.finalized||data.lobbyStatus!=='open'&&roundsFinished();
        $('#close-host-section').hidden=finished;
        $('#new-host-section').hidden=!finished;
      }
      const mismatch=pack?.scoring==='automatic'&&view.scoring!=='automatic';
      $('#session-notice').hidden=!mismatch;
      $('#session-notice').textContent=mismatch?'This saved session uses the earlier instructor-marked rubric. For automatic scoring, choose Switch session, then Start a session. You can still resume this saved session using its code.':'';
      $('#host-rules').textContent=view.scoring==='automatic'?'Answers are scored automatically when each round closes. The highest positive final total wins. Equal positive top totals share the bonus. An unsaved round earns zero. No rubric marking is required. Check the participating roster before applying the exported bonus.':'Score six common criteria from 0 to 2. Verify rosters and review each eligible team before finalizing.';
      $('#host-instructions').innerHTML=view.scoring==='automatic'?'<li>Add teams and give each team leader a private code.</li><li>Open the matching round. Team leaders save their answers before the deadline.</li><li>Close the round. Automatic scores and ranks appear immediately, using the latest saved answers.</li><li>After all rounds close, confirm '+(view.bonusPolicy==='team-pool'?'all participating':'the winning')+' rosters and finalize the award list. Incomplete rounds earn 0. A positive score is required to win.</li><li>Download the bonus CSV, full answer record and team rankings. Check IDs and participation when applying the bonus.</li>':'<li>Add teams, run checkpoints, review answers and verify rosters, then finalize the bonus record.</li>';
      if($('#board-dialog').open)$('#projected-board').innerHTML=standings();
    }
  }
  // Schedule after completion, rather than piling requests up on a fixed interval.
  // Jitter spreads classroom tabs out; hidden/offline tabs make no polling requests.
  function scheduleRefresh(immediate=false){
    clearTimeout(pollTimer);pollTimer=null;
    if(!session||busy||refreshing||document.hidden||navigator.onLine===false)return;
    const base=view?.finalized?30000:(hostMode?4000:6000);
    const delay=immediate?0:Math.min(60000,base*2**Math.min(pollFailures,4))*(0.9+Math.random()*0.2);
    pollTimer=setTimeout(refresh,delay);
  }
  async function refresh(){
    clearTimeout(pollTimer);pollTimer=null;
    if(!session||busy||refreshing||document.hidden||navigator.onLine===false)return;
    if(document.activeElement?.closest(hostMode?'form':'#roster-form')){scheduleRefresh();return;}
    const current=generation;
    refreshing=true;
    try{
      const data=await api();
      if(current===generation&&!busy){pollFailures=0;render(data);}
    }catch(error){
      if(current!==generation||busy)return;
      pollFailures++;
      if(error.status===404||error.status===403){saveSession(null);message(error.message);}
      else message('Connection interrupted. Your draft stays on this device.');
    }finally{refreshing=false;scheduleRefresh();}
  }
  function download(name,data,type){
    const url=URL.createObjectURL(new Blob([data],{type}));
    const a=document.createElement('a');a.href=url;a.download=name;a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  // Archive credentials and records deliberately never enter browser storage.
  let archivePasscode='', archivePending=false, archiveGeneration=0;
  async function archiveRequest(archiveId){
    const response=await MizanRuntime.fetch('/api/challenge-results',{
      method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',
      body:JSON.stringify({passcode:archivePasscode,...(archiveId?{archiveId}:{})}),
      signal:AbortSignal.timeout(20000)
    });
    const data=await response.json();
    if(!response.ok)throw Error(data.error||'Could not retrieve results. Try again.');
    return data;
  }
  function archiveDate(value){return value?date(value):'Not available';}
  function archiveCSV(archive){
    const record=archive.record;
    const rows=[['Record type','Session code','Team ID','Team name','Student ID','Name','Roles','Rank','Score','Maximum points','Round','Saved at','Details','Course bonus percentage points']];
    const add=(kind,team={},person={},extra={})=>rows.push([kind,record.code,team.id??'',team.name??'',person.id??'',person.name??'',person.roles?.join('; ')||'',extra.rank??'',extra.score??'',record.maxPoints??'',extra.phase??'',extra.created??'',extra.details??'',extra.bonus??'']);
    add('Archive',{}, {},{details:JSON.stringify({completed:archive.completed,captured:archive.captured,expires:archive.expires,finalized:record.finalized})});
    for(const team of record.teams||[]){
      const ranking=(record.ranking||[]).find(row=>row.id===team.id)||{};
      add('Team',team,{}, {rank:ranking.rank,score:ranking.total??team.total,details:JSON.stringify({active:team.active,verified:team.verified,criteria:team.criteria,note:team.note,rounds:ranking.rounds})});
      for(const person of team.roster||[])add('Roster',team,person,{bonus:record.finalized&&team.active&&team.verified?
        (record.bonusPolicy==='team-pool'?ranking.coursePercentagePoints:ranking.winner?1:''):''});
      // Keep role assignments separate: names alone cannot reliably match student IDs.
      for(const member of team.workspaceMembers||[])add('Role assignment',team,{name:member.name,roles:[...(member.isLeader?['Team leader']:[]),...(member.roles||[])]});
      for(const [kind,value] of Object.entries(team.workspace||{})){
        if(value===null||value===undefined)continue;
        for(const work of Array.isArray(value)?value:[value]){
          add('Workspace: '+kind,team,{name:work?.author||''},{phase:work?.phase,created:work?.created??work?.updated,details:JSON.stringify(work)});
        }
      }
    }
    for(const submission of record.submissions||[]){
      const team=(record.teams||[]).find(t=>t.id===submission.team)||{id:submission.team};
      add('Submission',team,{}, {phase:submission.phase,created:submission.created,details:JSON.stringify(submission.answers)});
    }
    const cell=value=>{
      let text=String(value??'');
      if(/^\s*[=+@-]/.test(text)||/^[\t\r\n]/.test(text)||/^0\d+$/.test(text))text="'"+text;
      return '"'+text.replaceAll('"','""')+'"';
    };
    return '\ufeff'+rows.map(row=>row.map(cell).join(',')).join('\r\n');
  }
  async function archiveAction(callback){
    if(!hostMode||archivePending)return;
    archivePending=true;
    const generation=archiveGeneration;
    $('#archive-status').textContent='Loading…';
    try{await callback(generation);}catch(error){
      if(generation===archiveGeneration)$('#archive-status').textContent=error.message||'Connection interrupted. Try again.';
    }finally{if(generation===archiveGeneration)archivePending=false;}
  }
  async function loadArchives(generation){
    const data=await archiveRequest();
    if(generation!==archiveGeneration)return;
    $('#archive-list').innerHTML=(data.archives||[]).map(item=>
      '<section class="archive-card"><h3>'+esc(item.title||'Completed game')+'</h3><p>Session '+esc(item.code)+' · '+esc(item.teams)+' teams · '+esc(item.students)+' students</p><p>'+(item.completed?'Completed: ':'Captured: ')+esc(archiveDate(item.completed||item.captured))+'<br>Download before: '+esc(archiveDate(item.expires))+'</p><div class="controls"><button type="button" data-archive-id="'+esc(item.id)+'" data-archive-format="csv">Download results CSV</button><button type="button" class="secondary" data-archive-id="'+esc(item.id)+'" data-archive-format="json">Download complete JSON</button></div></section>'
    ).join('');
    $('#archive-status').textContent=data.archives?.length?'CSV includes teams, rosters, roles, scores, submissions and reflections. JSON preserves the complete saved record.':'No completed games are currently in the archive.';
  }
  $('#archive-entry').hidden=!hostMode;
  $('#archive-dialog').addEventListener('close',()=>{
    archiveGeneration++;archivePending=false;archivePasscode='';$('#archive-passcode').value='';
    $('#archive-list').replaceChildren();$('#archive-status').textContent='';
  });
  function fullRecord(){
    const winners=view.finalized?awardTeams():[];
    const awarded=winners.every(t=>t.verified)?winners:[];
    return {assessment:'QBA201 case bonus',exportedAt:new Date().toISOString(),
      awardRule:view.bonusRule||'One course percentage point per verified participating member of an eligible team with the highest positive score. Equal positive top totals share the full bonus. An unsaved round earns zero. Verify roster and participation before applying grades.',
      finalized:view.finalized,
      awards:awarded.flatMap(t=>t.roster.map(m=>({studentId:m.id,name:m.name,team:t.name,score:t.total,maxPoints:view.maxPoints,rosterVerified:true,
        coursePercentagePoints:view.bonusPolicy==='team-pool'?view.ranking.find(r=>r.id===t.id).coursePercentagePoints:1}))),
      record:view};
  }
  function exportJSON(){download('QBA201_Team_Challenge_'+view.code+'.json',JSON.stringify(fullRecord(),null,2),'application/json');}
  function exportCSV(){
    const rows=[['Student ID','Name','Team','Score out of '+view.maxPoints,'Course bonus percentage points','Roster verified']];
    for(const a of fullRecord().awards)rows.push([a.studentId,a.name,a.team,a.score,a.coursePercentagePoints,a.rosterVerified?'Yes':'Check attendance and ID']);
    const cell=value=>{
      let s=String(value);
      if(/^[=+\-@\t\r]/.test(s)||/^0\d+$/.test(s))s="'"+s;
      return '"'+s.replaceAll('"','""')+'"';
    };
    download('QBA201_Bonus_Recipients_'+view.code+'.csv','\ufeff'+rows.map(row=>row.map(cell).join(',')).join('\r\n'),'text/csv;charset=utf-8');
  }
  function rememberInvite(result){savedInvites[result.id]=result.access;write('qba-challenge-invites',savedInvites);}
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(form.method==='dialog')return;
    event.preventDefault();
    if(form.id==='archive-form'){archivePasscode=$('#archive-passcode').value;archiveAction(loadArchives);return;}
    action(async()=>{
      if(form.id==='section-sign-in'){
        await loadSections($('#sections-passcode').value);
        return;
      }
      if(form.id==='extend-timer'){
        const input=$('#extend-minutes');
        const {stage,deadline}=form.dataset,minutes=input.valueAsNumber;
        try{
          const updated=await api('mizan-timing',{stage:'extend',target:stage,deadline:Number(deadline),minutes});
          input.value='';
          render(updated);
          message('Added '+minutes+' minute'+(minutes===1?'':'s')+' to the timer.');
        }catch(error){
          if(error.status===409){try{render(await api());}catch{}}
          throw error;
        }
        return;
      }
      if(form.id==='create'){
        if(!pack&&!classroomLaunch)throw Error('Load the checkpoints from the case first.');
        const passcode=classroomLaunch&&sectionsPasscode?sectionsPasscode:$('#passcode').value;
        const {invites=[],...created}=await api('',{passcode,teamCount:Number($('#team-count').value),
          sessionLabel:$('#session-label').value,...(classroomLaunch?{expectedStudents:Number($('#expected-students').value),timed:true,sessionMinutes:Number($('#session-minutes').value),randomizeNumbers:$('#team-numbers').checked}:{}),
          ...(pack?.templateId?{templateId:pack.templateId}:pack?{pack}:{useMizanTemplate:true})},null);
        for(const invite of invites)savedInvites[invite.id]=invite.access;
        write('qba-challenge-invites',savedInvites);
        if(classroomLaunch){sectionsPasscode=passcode;form.reset();setSectionSetup(false);}
        $('#passcode').value='';saveSession(created);render(await api());
      }
      if(form.id==='resume-form'){
        const passcode=$('#resume-passcode').value;
        const resumed=await api('',{passcode,resumeCode:$('#resume-code').value},null);
        if(classroomLaunch)sectionsPasscode=passcode;
        const data=await api('',undefined,resumed);
        if(classroomLaunch&&data.expectedStudents&&data.lobbyStatus==='open')await api('show-check-in',{},resumed);
        $('#resume-passcode').value='';saveSession(resumed);render(data);
      }
      if(form.id==='join-form'){
        const candidate=parseAccess($('#access').value);
        const data=await api('',undefined,candidate);
        saveSession(candidate);render(data);
      }
      if(form.id==='add-team'){
        const result=await api('team',{name:$('#team-name').value});
        rememberInvite(result);rendered='';render(await api());
      }
      if(form.id==='expected-form'){
        render(await api('expected-students',{expectedStudents:Number($('#expected-now').value)}));
        message('Headcount updated.');
      }
      if(form.id==='roster-form'){
        const data=await api('roster',{roster:readRosterRows()});
        pendingRoster=null;render(data);
        message('Team members saved.');
      }
      if(form.id==='answer-form'){
        const answers=Object.fromEntries(Array.from(form.querySelectorAll('[data-field]'),field=>[field.dataset.field,field.value]));
        render(await api('answer',{phase:form.dataset.phase,version:form.dataset.version,answers}));
        message('Your answer is saved. Check the record number and time.');
      }
      if(form.classList.contains('task-form')){
        const phase=form.dataset.phase,member=Number(form.dataset.member);
        const data=await api('lobby-task',{phase,member,task:form.querySelector('input').value});
        delete taskDrafts[phase+'-'+member];
        render(data);
        message('Task saved.');
      }
      if(form.id==='review-form'){
        const team=view.teams.find(t=>t.id===selected);
        const roster=parseRoster($('#review-roster').value);
        const active=$('#review-active').checked,verified=$('#review-verified').checked;
        if(view.scoring==='automatic'){
          const update=view.finalized?{team:team.id,roster,verified,revision:team.revision}:{team:team.id,roster,active,verified};
          render(await api(view.finalized?'winner-roster':'team-update',update));
          message('Roster saved. Answer scores are unchanged.');return;
        }
        const criteria=Array.from({length:6},(_,i)=>$('#criterion-'+i).value);
        const note=$('#review-note').value;
        if(active&&criteria.some(x=>x===''))throw Error('Score every criterion before saving the review.');
        const updated=await api('team-update',{team:team.id,roster,active,verified});
        const current=updated.teams.find(t=>t.id===team.id);
        const result=active?await api('review',{team:team.id,criteria:criteria.map(Number),note,latest:current.latest,revision:current.revision}):updated;
        render(result);message(active?'Roster and rubric review saved.':'Team excluded from the bonus competition.');
      }
    });
  });
  document.addEventListener('input',event=>{
    if(event.target.closest('#roster-rows'))pendingRoster=readRosterRows();
    if(event.target.id==='review-roster')$('#review-verified').checked=false;
    const task=event.target.closest('.task-form');
    if(task)taskDrafts[task.dataset.phase+'-'+task.dataset.member]=event.target.value;
    const form=event.target.closest('#answer-form');
    if(form){
      const key=session.code+'-'+view.team.id+'-'+form.dataset.phase+'-'+form.dataset.version;
      drafts[key]=Object.fromEntries(Array.from(form.querySelectorAll('[data-field]'),f=>[f.dataset.field,f.value]));
      write('qba-challenge-drafts',drafts);
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='review-team'){selected=event.target.value;rendered='';render(view);}
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button)return;
    if(button.type==='submit'&&button.closest('form'))return;
    if(button.id==='open-archives'){if(hostMode)$('#archive-dialog').showModal();return;}
    if(button.id==='new-section'||button.id==='new-host-section'){
      if(!busy){
        if(button.id==='new-host-section')saveSession(null);
        setSectionSetup(true);message();$('#session-label').focus();
      }
      return;
    }
    if(button.id==='cancel-section'){
      if(!busy){
        $('#create').reset();setSectionSetup(false);message();$('#new-section').focus();
        if(sectionsPasscode)action(()=>loadSections());
      }
      return;
    }
    if(button.id==='refresh-sections'){action(()=>loadSections());return;}
    if(button.dataset.openSection){
      action(async()=>{
        try{await openSection(button.dataset.openSection);}
        catch(error){if(error.status===404)await loadSections();throw error;}
      });
      return;
    }
    if(button.dataset.closeSection){
      const code=button.dataset.closeSection;
      if(busy||!confirmCloseSection(code))return;
      action(async()=>{
        const status=$('#sections-status');
        status.textContent='Closing session '+code+'…';
        try{
          await api('',{passcode:sectionsPasscode,closeSection:code},null);
          await loadSections();
          status.textContent='Session '+code+' closed.';
          $('#new-section').focus();
        }catch(error){status.textContent='';throw error;}
      });
      return;
    }
    if(button.id==='show-lobby-qr'){
      const image=studentLobbyQR();
      $('#join-qr-image').src=image;
      $('#join-qr-download').href=image;
      $('#join-qr-download').download='Mizan-Market-'+view.code+'-QR.png';
      $('#join-qr-code').textContent='Class code '+view.code;
      $('#join-qr-dialog').showModal();
      return;
    }
    if(button.dataset.hostChannel){
      const node=document.querySelector(button.dataset.hostChannel);
      if(node){if(node.tagName==='DETAILS')node.open=true;node.scrollIntoView({block:'start'});node.setAttribute('tabindex','-1');node.focus({preventScroll:true});}
      else message('This section opens when the case reaches that stage.');
      return;
    }
    if(button.hasAttribute('data-host-sections')){$('#leave-host').click();return;}
    if(button.dataset.answerStage){
      answerStage=button.dataset.answerStage;
      rendered='';render(view);
      document.querySelector('[data-answer-stage="'+answerStage+'"]')?.focus({preventScroll:true});
      return;
    }
    if(button.dataset.archiveId){
      archiveAction(async generation=>{
        const {archive}=await archiveRequest(button.dataset.archiveId);
        if(generation!==archiveGeneration)return;
        const format=button.dataset.archiveFormat;
        const filename='Mizan_Results_'+String(archive.code||archive.record.code).replace(/[^a-z0-9_-]/gi,'_');
        download(filename+'.'+format,format==='csv'?archiveCSV(archive):JSON.stringify(archive,null,2),format==='csv'?'text/csv;charset=utf-8':'application/json');
        $('#archive-status').textContent='Download started. Keep this student record in a private location.';
      });return;
    }
    if(button.id==='leave-host'&&classroomLaunch){
      if(busy)return;
      saveSession(null);setSectionSetup(false);message();$('#sections-heading').focus();
      if(sectionsPasscode)action(()=>loadSections());
      return;
    }
    if(button.id==='leave-host'||button.id==='leave-team'){saveSession(null);return;}
    if(button.id==='add-roster-member'){
      const members=readRosterRows();
      if(members.length<6){redrawRosterRows([...members,blankMember()]);$('#roster-rows .roster-row:last-child [data-member-id]').focus();}
      return;
    }
    if(button.dataset.removeMember!==undefined){
      redrawRosterRows(readRosterRows().filter((_,i)=>i!==Number(button.dataset.removeMember)));
      $('#add-roster-member').focus();return;
    }
    if(button.dataset.editRoster){
      selected=button.dataset.editRoster;rendered='';render(view);
      $('#review-roster').focus();return;
    }
    if(button.dataset.inspectTeam||button.id==='dismiss-inspector'){
      selected=button.dataset.inspectTeam||'';
      rendered='';render(view);
      if(selected)$('#class-inspector')?.focus();
      return;
    }
    if(button.id==='show-board'){$('#projected-board').innerHTML=standings();$('#board-dialog').showModal();return;}
    if(button.id==='export-ranking'){const headers=['Rank','Team',...view.phases.map(p=>p.label),'Total','Maximum','Tied','Winner'];const rows=view.ranking.map(t=>[t.rank??'',t.name,...(t.rounds.length?t.rounds.map(r=>r.earned??''):view.phases.map(()=>'')),t.total??'',view.maxPoints,t.tied?'Yes':'No',t.winner?'Yes':'No']);const cell=v=>'\"'+String(v).replace(/^[=+@-]/,m=>"'"+m).replaceAll('\"','\"\"')+'\"';download('QBA201_Team_Rankings_'+view.code+'.csv','\ufeff'+[headers,...rows].map(r=>r.map(cell).join(',')).join('\r\n'),'text/csv;charset=utf-8');return;}
    if(button.id==='export-json'){exportJSON();return;}
    if(button.id==='export-csv'){exportCSV();return;}
    if(button.id==='clear-session'){$('#clear-dialog').returnValue='';$('#clear-dialog').showModal();return;}
    action(async()=>{
      if(button.id==='open-team-lobby'){
        render(await api('lobby-open',{}));
        message('Team lobby opened. Share the student lobby link.');
        return;
      }
      if(button.id==='copy-lobby-link'){
        try{await navigator.clipboard.writeText(studentLobbyUrl());message('Student lobby link copied.');}
        catch{$('#student-lobby-link').select();message('Select and copy the student lobby link.');}
        return;
      }
      if(button.id==='lock-team-lobby'){
        const notice=view.workspaceProfile?'Lock check-in with the students who have joined? Empty teams will be removed. Students can no longer join or switch teams.':
          'Lock the rosters so students can no longer join or switch teams?';
        if(!confirm(notice))return;
        const updated=await api('lobby-lock',{});
        render(updated);
        const removed=updated.removedEmptyTeams;
        message('Rosters locked. '+(removed?removed+' empty '+(removed===1?'team':'teams')+' removed. ':'')+'You can begin the activity.');
        return;
      }
      if(button.id==='reopen-lobby'){
        render(await api('lobby-reopen',{}));message('Check-in is open again.');return;
      }
      if(button.dataset.lobbyRemove){
        render(await api('lobby-remove',{team:button.dataset.lobbyTeam,studentId:button.dataset.lobbyRemove}));
        message('Student removed. They can now join again from the lobby.');
        return;
      }
      if(button.dataset.clearCaptain){
        render(await api('lobby-clear-captain',{team:button.dataset.clearCaptain}));
        message('Team leader cleared. A team member can now volunteer.');
        return;
      }
      if(button.dataset.transferLeader){
        const team=button.dataset.transferLeader;
        const toMember=Number(document.getElementById('leader-to-'+team)?.value);
        render(await api('workspace-transfer-leader',{team,toMember}));
        message('Leadership transferred. Team work and cash decisions are preserved.');
        return;
      }
      if(button.dataset.verifyWinner){
        const team=awardTeams().find(t=>t.id===button.dataset.verifyWinner);
        if(!team||!roundsFinished())throw Error('Close all rounds before confirming the winning roster.');
        render(await api('winner-roster',{team:team.id,roster:team.roster,verified:true,revision:team.revision}));
        message('Winning roster verified.');return;
      }
      if(button.dataset.timingStage){
        const stage=button.dataset.timingStage;
        const missing=(view.voteProgress||[]).reduce((n,t)=>n+t.eligible-t.cast,0);
        if(stage==='close-vote'&&view.timing.clock?.deadline>Date.now()&&missing&&
          !confirm(missing+' registered student(s) have not voted. Close the vote now?'))return;
        render(await api('mizan-timing',{stage}));return;
      }
      if(button.dataset.open)render(await api('open',{phase:button.dataset.open}));
      if(button.dataset.close){
        const phase=view.phases.find(p=>p.id===button.dataset.close);
        const incomplete=view.teams.filter(t=>t.active&&t.roster.length&&Object.keys(latest(t.id,phase.id)?.answers||{}).length<phase.fields.length).length;
        if(view.expectedStudents&&incomplete&&!confirm(incomplete+' team(s) have incomplete answers. Close this round? Saved answers will count.'))return;
        render(await api('close',{phase:button.dataset.close}));
      }
      if(button.dataset.reissue){
        const result=await api('team-access',{team:button.dataset.reissue});
        rememberInvite(result);rendered='';render(view);
      }
      if(button.dataset.copy){
        const access=savedInvites[button.dataset.copy];
        const url=new URL(MizanRuntime.page('challenge'),location.origin).href+'#access='+encodeURIComponent(access);
        try{await navigator.clipboard.writeText(url);message('Private team link copied.');}catch{message('Team link\n'+url);}
      }
      if(button.id==='end-early'||button.id==='close-host-section'){
        if(!confirmCloseSection(view.code))return;
        message('Closing session '+view.code+'…');
        render(await api('end-early',{}));
        if($('#class-results'))$('#class-results').open=true;
        message('Session '+view.code+' closed. Saved results are available below.');
        return;
      }
      if(button.id==='finalize'){render(await api('finalize',{}));exportJSON();message('Results finalized. The full record download has started.');}
      if(button.id==='reset-competition'){exportJSON();render(await api('reset',{}));message('Backup download started. Answers and scores cleared. Teams and codes remain.');}
    });
  });
  $('#clear-dialog').addEventListener('close',()=>{
    if($('#clear-dialog').returnValue!=='clear')return;
    action(async()=>{exportJSON();await api('end',{});saveSession(null);message('Backup download started. The saved session has been cleared.');});
  });
  readPack();
  if(classroomLaunch){
    document.body.classList.add('mizan-host');
    $('#start-title').textContent='Mizan Market · Instructor dashboard';
    $('#create-heading').textContent='New section';
    $('#cancel-section').hidden=false;
    $('#leave-host').textContent='All sections';
    setSectionSetup(!!linkedMinutes);
    $('#expected-field').hidden=false;
    $('#session-minutes-field').hidden=false;
    $('#team-numbers-field').hidden=false;
    $('#expected-students').disabled=false;
    $('#expected-students').required=true;
    $('#team-count').min='1';
    $('#start-session').textContent='Start class and open check-in';
    $('#expected-students').addEventListener('input',event=>{
      const n=Number(event.target.value);
      if(n>0&&n<=180)$('#team-count').value=Math.min(30,Math.max(Math.ceil(n/6),Math.round(n/5.5)));
    });
  }
  if(!hostMode&&location.hash.startsWith('#access=')){
    try{saveSession(parseAccess(decodeURIComponent(location.hash.slice(8))));}catch(error){message(error.message);}
    history.replaceState(null,'',location.pathname);
  }else if(!hostMode&&/^[A-HJ-NP-Z2-9]{6}$/.test(lobbyRoom||'')){
    const link=$('#return-to-lobby');
    link.href=MizanRuntime.page('lobby')+'?room='+lobbyRoom;
    link.hidden=false;
    let member;
    try{member=localStorage.getItem('qba-lobby-member-'+lobbyRoom);}catch{}
    if(/^[a-f0-9]{32}$/.test(member||''))saveSession({code:lobbyRoom,member});
    else{saveSession(null);location.replace(link.href);}
  }else if(linkedMinutes){
    if(session?.secret)sectionAccess.set(session.code,session);
    saveSession(null,{remember:false});
  }else saveSession(session?.member?null:session);
  if(classroomLaunch){$('#setup-rules strong').textContent='Team bonus pool';$('#start-rules').textContent='Each participating team starts with 1 bonus point. Each team below first place keeps 0.5 and transfers 0.5 to the winner. Tied positive top teams split the transfers; with no positive top score, every team keeps 1. Choose 60 or 75 minutes. Round 3 uses MCQs, a vote and a board-recommendation question. You can give teams different sample numbers below.';}
  else if(pack?.scoring==='automatic')$('#start-rules').textContent='Fifteen questions in three rounds, 2 points each, 30 points in total. Scores appear after each round closes. A positive top score is required for the bonus; equal positive top totals share the full bonus. An unsaved round earns zero. No speed points.';
  $('#pack-status').textContent=pack?(pack.templateId?'Automatic scoring challenge loaded. The answer key stays on the server.':'Loaded '+pack.phases.length+' checkpoints for '+pack.title+'.'):'No challenge loaded yet.';
  if(classroomLaunch&&!pack)$('#pack-status').hidden=true;
  refresh();
  document.addEventListener('visibilitychange',()=>scheduleRefresh(true));
  window.addEventListener('online',()=>scheduleRefresh(true));
  window.addEventListener('offline',()=>scheduleRefresh());
})();
