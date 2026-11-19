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
/* Only server-delivered packets enter this UI. No private case evidence or scoring keys live here. */
window.MizanWorkspace = (() => {
  const $ = selector => document.querySelector(selector);
  const esc = value => TeamFields.escape(value);
  const icons = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    log:'<path d="M7 3h8l4 4v14H5V3h2Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
    hash:'<path d="m9 3-2 18M17 3l-2 18M4 9h17M3 15h17"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-3-5"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'
  };
  const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||icons.hash)+'</svg>';
  const initials = name => String(name||'?').split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  const time = value => {const d=new Date(value);return Number.isNaN(d.getTime())?'':d.toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});};
  const statusName = status => ({todo:'Not started',in_progress:'In progress',done:'Complete',pending:'Locked',open:'Open',closed:'Closed'})[status]||status;
  let state=null,ctx=null,selected='overview',selectedPacket='',identity='',shell=null,initialized=false,resourceMode='reference',reviewQuestions=false;
  let drafts={};
  try{drafts=JSON.parse(localStorage.getItem('qba-workspace-drafts'))||{};}catch{}
  const signatures=new Map();
  const draftKey = key => identity+':'+key;
  const readDraft = (key,fallback='') => drafts[draftKey(key)]??fallback;
  function saveDraft(key,value){drafts[draftKey(key)]=value;try{localStorage.setItem('qba-workspace-drafts',JSON.stringify(drafts));}catch{}}
  function removeDraft(key){delete drafts[draftKey(key)];try{localStorage.setItem('qba-workspace-drafts',JSON.stringify(drafts));}catch{}}
  function patch(selector,html){
    const node=$(selector);if(!node||signatures.get(selector)===html)return;
    const active=document.activeElement,focus=node.contains(active)&&active.id;
    const range=focus&&typeof active.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null;
    const opened=[...node.querySelectorAll('details[open][id]')].map(d=>d.id);
    const selections=[...node.querySelectorAll('select[id]')].map(el=>[el.id,el.value]);
    node.innerHTML=html;signatures.set(selector,html);
    selections.forEach(([id,value])=>{const el=document.getElementById(id);if(el&&[...el.options].some(o=>o.value===value))el.value=value;});
    opened.forEach(id=>{const detail=document.getElementById(id);if(detail)detail.open=true;});
    if(focus){const replacement=document.getElementById(focus);replacement?.focus({preventScroll:true});if(range&&replacement?.setSelectionRange)replacement.setSelectionRange(...range);}
  }
  function mount(){
    if(shell)return;
    shell=document.createElement('section');shell.id='mizan-workspace';shell.setAttribute('aria-label','Mizan Market team workspace');
    shell.dataset.caseCopy='';
    shell.innerHTML=`<aside class="ws-sidebar" aria-label="Workspace navigation">
      <div class="ws-brand"><span class="ws-brand-mark" aria-hidden="true">M</span><div><strong>Mizan Market</strong><span>Team workspace</span></div></div>
      <div id="ws-team-label" class="ws-team-label"></div>
      <nav id="ws-navigation" aria-label="Workspace and stages"></nav><div id="ws-identity" class="ws-identity"></div>
    </aside><div class="ws-main" id="ws-main-content" tabindex="-1"><div class="ws-topbar"><button id="ws-menu" class="ws-menu secondary" aria-label="Toggle workspace navigation" aria-expanded="false" type="button">${icon('menu')}</button><p id="ws-breadcrumb"></p><span id="ws-round-state" class="ws-round-state"></span><button id="ws-reference-open" class="secondary ws-reference-open" type="button" data-resource="reference">Reference</button><button id="ws-mobile-team" type="button" class="secondary ws-mobile-team" aria-label="View your team" aria-controls="ws-people">${icon('people')}Team</button></div>
      <div id="ws-clock"></div><p id="ws-autosave-status" role="status"></p><div id="ws-flash" class="ws-flash" role="status" aria-live="polite"></div><div id="ws-team-progress"></div>
      <section id="ws-overview" class="ws-view"><div id="ws-overview-body"></div><div id="ws-team-settings"><details id="ws-registration"><summary>Team settings &amp; check-in</summary><div id="ws-team-settings-content"></div></details></div></section>
      <section id="ws-team-room" class="ws-view" hidden><div id="ws-channel-feed" role="log" aria-label="Team messages"></div><form id="ws-channel-form" class="channel-composer"><label for="ws-channel-message">Message your team</label><textarea id="ws-channel-message" maxlength="1500" required placeholder="Share a finding, ask for a check, or explain what you need."></textarea><div class="controls"><span>Everyone on your team can read this.</span><button>Send</button></div></form></section><section id="ws-observer-work" class="ws-view" hidden></section><section id="ws-my-work" class="ws-view" hidden><div id="ws-my-work-body"></div></section><section id="ws-stage" class="ws-view" hidden><div id="ws-stage-heading"></div><div id="ws-personal-job"></div><div id="ws-next"></div><div id="ws-confirmed"></div><div id="ws-answer-slot"></div><div id="ws-guided"></div><div id="ws-audit"></div><div id="ws-components"></div><div id="ws-evidence"></div><div id="ws-shared"></div><div id="ws-report-review"></div><div id="ws-vote"></div><div id="ws-recommendation"></div><div id="ws-task-slot"></div></section>
      <section id="ws-log" class="ws-view" hidden><div class="ws-page-heading"><h1>Decision log</h1><p>The shared record of your team’s reasoning, findings and handoffs.</p></div><div id="ws-log-items"></div><form id="ws-decision-form" class="ws-compose"><label for="ws-decision-text">Record a team decision</label><textarea id="ws-decision-text" required maxlength="1500" placeholder="What did the team decide, and why?"></textarea><div class="ws-compose-footer"><span class="fine">Visible to everyone on your team.</span><button type="submit">Record decision</button></div></form></section>
      <div id="ws-leaderboard-slot"></div><div id="ws-feedback-slot" class="ws-view"></div>
    </div><aside class="ws-inspector" aria-label="Team roles and status" tabindex="-1"><div id="ws-people"></div><div id="ws-current-work"></div><div id="ws-score"></div><div id="ws-leader-tools"></div></aside><dialog id="ws-resource-dialog" aria-labelledby="ws-resource-title"><div class="ws-dialog-header"><h2 id="ws-resource-title"></h2><button type="button" class="secondary" data-close-resource aria-label="Close reference panel">Close</button></div><div id="ws-resource-body"></div></dialog>`;
    $('#room').append(shell);
    $('#ws-answer-slot').append($('#analysis-panel'));
    $('#ws-feedback-slot').append($('#analysis-feedback'));
    $('#ws-leaderboard-slot').append($('#class-leaderboard'));
    $('#ws-task-slot').append($('#team-work'));
    $('#ws-team-settings-content').append($('#your-team'),$('#join-team'));
    shell.addEventListener('keydown',event=>{if(event.key==='Escape'&&shell.classList.contains('navigation-open')){shell.classList.remove('navigation-open');$('#ws-menu').setAttribute('aria-expanded','false');$('#ws-menu').focus();}});
    shell.addEventListener('click',onClick);shell.addEventListener('submit',onSubmit);shell.addEventListener('input',onInput);shell.addEventListener('change',onChange);
  }
  function send(action,body,pending,success,button,after){
    return ctx.perform(action,body,{pending,success,button,after});
  }
  const confirmedRound1='<section class="ws-case-brief ws-confirmed" aria-hidden="true"><h2>Verified facts for this round</h2>'+
    '<p>Use this checked summary if your fact sheet is missing a detail or has a different value. Your earlier entries stay on record.</p>'+
    '<ul><li>Original offer is AED 7,200 setup today and AED 240 per operating day for 180 days. Setup takes 5 working days. The whole contract breaks even at AED 280 in daily gross savings.</li>'+
    '<li>Mizan Market has AED 10,000 in cash today. Reserving the price costs AED 1,000 and holds it for 7 days.</li>'+
    '<li>The vendor reported AED 340 in average daily savings from 12 quiet days with experienced staff.</li>'+
    '<li>The customer target is mean dispatch lateness below 2 minutes. The offer closes at 5 p.m.</li></ul></section>';
  const confirmedRound2='<section class="ws-case-brief ws-confirmed" aria-hidden="true"><h2>Checked company evidence</h2>'+
    '<p>Use these confirmed company results for your audit or business decision. Your earlier answers stay on record.</p>'+
    '<ul><li>Company savings report gives 16 days, mean AED 300 and sample SD AED 80. Against AED 280, t = +1.00 and one-sided p = 0.1666.</li>'+
    '<li>Company dispatch report gives 36 orders, mean 1.6 minutes and known population SD 2.4 minutes. Against 2 minutes, z = −1.00 and one-sided p = 0.1587.</li>'+
    '<li>At 5%, this evidence is insufficient for mean savings above AED 280 or mean dispatch lateness below 2 minutes.</li></ul></section>';
  const guidedReportTasks={
    'r2-finance':'Work out what the savings report supports about covering the full contract cost. Tell your team your result and what it means.',
    'r2-customer':'Tell your team what the report supports about the company’s target, and how it applies to individual orders.',
    'r2-analyst':'Check how your team uses the two reports. Point out one assumption or conclusion you would check before advising Mariam.',
    'r2-commercial':'Choose the savings audit, the dispatch audit or both. Consider what you need to check and how much cash will be left.',
    'r2-savings-audit':'Calculate the test statistic for mean daily savings above AED 280. At 5%, what does this new sample support? Give your team the statistic and a one-sentence conclusion.',
    'r2-dispatch-audit':'Calculate the test statistic for mean lateness below 2 minutes. At 5%, what does this new sample support? Give your team the statistic and a one-sentence conclusion.',
    'r3-commercial':'Compare what the two offers ask Mizan Market to pay today and over the full contract. Tell the team which difference matters for its decision.',
    'r3-finance':'Check which options fit your team’s remaining cash. Explain what your preferred option would do to that cash balance.',
    'r3-analyst':'Tell your team how strong the savings evidence is for the option you support. Name one uncertainty that matters to your vote.',
    'r3-customer':'Suggest one way to keep track of late orders if the company buys the software.',
    'r3-operations':'Tell your team how the option you support would affect the sales campaign. Suggest one next step.'
  };
  function auditTask(type){
    return type==='savings'?{
      title:'Savings audit',goal:'Can the original software contract cover its full cost?',
      task:'Test whether population mean daily gross savings exceed AED 280. Use this new sample on its own and the 5% level.',
      use:'This result helps Mariam judge whether the original contract pays for itself. The team must also check whether it can afford today’s payment.',
      options:[{id:'supports',label:'There is evidence that mean daily savings exceed AED 280.'},
        {id:'insufficient',label:'There is insufficient evidence that mean daily savings exceed AED 280.'},
        {id:'guarantee',label:'The software will save more than AED 280 on every operating day.'}]
    }:{title:'Dispatch audit',goal:'Does average lateness meet the customer target?',
      task:'Test whether population mean dispatch lateness is below 2 minutes. Use this new sample on its own and the 5% level.',
      use:'This result helps Mariam judge service quality. A conclusion about the mean does not guarantee that every order is on time.',
      options:[{id:'supports',label:'There is evidence that mean dispatch lateness is below 2 minutes.'},
        {id:'insufficient',label:'There is insufficient evidence that mean dispatch lateness is below 2 minutes.'},
        {id:'guarantee',label:'Every order will leave less than 2 minutes late.'}]
    };
  }
  function auditValues(report){
    const component=current().components.find(c=>c.id===report.id),task=auditTask(report.type);
    const note=component?.note||'';
    const match=/^Test statistic: ([^\n]*)\nConclusion at 5%: (.*)$/.exec(note);
    const stored={statistic:match?.[1]||'',conclusion:task.options.find(o=>o.label===match?.[2])?.id||''};
    return {component,task,legacy:!match?note:'',
      statistic:readDraft('audit-stat:'+report.id,stored.statistic),conclusion:readDraft('audit-conclusion:'+report.id,stored.conclusion)};
  }
  function auditNote(report,statistic,conclusion){
    if(!statistic&&!conclusion)return '';
    const label=auditTask(report.type).options.find(o=>o.id===conclusion)?.label||'Not selected';
    return 'Test statistic: '+statistic.trim()+'\nConclusion at 5%: '+label;
  }
  function queueAuditReport(report,statistic,conclusion){
    const component=current().components.find(c=>c.id===report.id),note=auditNote(report,statistic,conclusion);
    ctx.queueSave('notes:'+report.id,'workspace-component',(data,version)=>{
      const card=data?.workspace?.components.find(c=>c.id===report.id);
      return card?.editable&&!data.workspace.flow.reportsReviewed?
        {component:report.id,version,note,status:statistic.trim()&&conclusion?'done':'in_progress'}:null;
    },component?.version);
  }
  function renderAuditReports(step){
    const w=current(),reports=w.auditReports||[],ended=state.finalized||state.endedEarly;
    const shared=report=>w.findings.filter(f=>f.component===report.id).at(-1);
    patch('#ws-stage-heading','<div class="ws-page-heading"><h1>Audit review</h1></div>');
    patch('#ws-next',directions(w.flow.reportsReviewed?'Audit review complete':'Use the new evidence to advise Mariam',[
      'Your team bought '+reports.length+' '+(reports.length===1?'report':'reports')+'. Everyone can see the purchased data below.',
      'For each report, its named owner enters a test statistic and selects a conclusion at 5%. Use Reference for the statistical tables.',
      'Select Share with team on that report. Discuss both the result and what it means for the purchase. The leader finishes the review.'
    ],reports.map(report=>jumpButton('ws-audit-report-'+report.id,'Open '+auditTask(report.type).title.toLowerCase())).join('')));
    patch('#ws-confirmed',companyEvidenceMarkup());
    patch('#ws-audit','<section class="ws-audit-ledger"><h2>Your purchased reports</h2><p><strong>'+reports.map(r=>esc(auditTask(r.type).title)).join(' + ')+
      '</strong> · '+money(w.audit.cost)+' spent · '+money(w.audit.cashRemaining)+' cash left</p><p>'+reports.filter(r=>shared(r)).length+' / '+reports.length+' findings shared with the team.</p></section>');
    const cards=reports.map(report=>{
      const {component,task,statistic,conclusion,legacy}=auditValues(report),finding=shared(report);
      const own=component?.editable&&!ended&&!w.flow.reportsReviewed;
      const note=auditNote(report,statistic,conclusion),ready=!!statistic.trim()&&!!conclusion;
      const persisted=note===component?.note;
      const saveMessage=!statistic.trim()&&!conclusion?'Enter a statistic and choose a conclusion.':
        persisted?(ready?'Finding saved.':'Draft saved. Complete both fields to share.'):'Your draft saves automatically.';
      return '<section class="ws-evidence-section ws-audit-report" id="ws-audit-report-'+esc(report.id)+'"><h2>'+esc(task.title)+'</h2>'+
        responsibility(w.workPlan?.audits.find(task=>task.id===report.id))+
        '<div class="ws-assignment" aria-hidden="true"><strong>Decision question</strong><p>'+esc(task.goal)+'</p><p>'+esc(task.task)+'</p></div>'+
        '<dl class="ws-audit-figures" aria-hidden="true">'+report.figures.map(([label,value])=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join('')+'</dl>'+
        '<p class="ws-audit-purpose" aria-hidden="true"><strong>How this helps Mariam:</strong> '+esc(task.use)+'</p>'+
        (own?'<form class="ws-audit-work" data-audit-work="'+esc(report.id)+'"><h3>Your finding for the team</h3>'+
          '<label for="ws-audit-stat-'+esc(report.id)+'">1. Test statistic (include its sign)</label>'+TeamFields.signedNumber(statistic,'id="ws-audit-stat-'+esc(report.id)+'" data-audit-stat placeholder="Your calculated statistic"')+
          '<label for="ws-audit-conclusion-'+esc(report.id)+'">2. What does the evidence support at 5%?</label>'+
          TeamFields.choices(task.options,conclusion,'id="ws-audit-conclusion-'+esc(report.id)+'" data-audit-conclusion',true,'Choose the conclusion')+
          '<p class="fine" data-audit-save-status>'+saveMessage+' Sharing sends these two answers to the team from this report.</p>'+
          '<button type="button" data-share-report="'+esc(report.id)+'" '+(!ready||finding?.text===note?'disabled':'')+'>'+(finding?.text===note?'Shared with team':'Share with team')+'</button></form>':
          '<p class="fine">'+(ended||w.flow.reportsReviewed?'Review the team finding below.':esc(report.owner?.name||'The team leader')+' records this finding. Use the data above to help them calculate and check the conclusion.')+'</p>')+
        (legacy?'<details><summary>Earlier working notes</summary><p class="ws-audit-reason">'+esc(legacy)+'</p></details>':'')+
        '<div class="ws-audit-shared" aria-live="polite"><strong>'+(finding?'Shared with your team':'Team finding')+'</strong><p class="ws-audit-reason">'+esc(finding?.text||'No finding shared yet. Discuss the result and ask the report owner to share it here.')+'</p></div></section>';
    }).join('');
    patch('#ws-evidence',cards);
    for(const id of ['guided','components','shared','recommendation'])patch('#ws-'+id,'');
    patch('#ws-report-review','<section class="ws-review-gate"><h2>Finish the team’s review</h2><p>For every report you bought, check the statistic and conclusion together. Discuss what changed from the company report and whether the purchase fits your remaining cash.</p>'+
      (w.flow.reportsReviewed?'<p>The review is recorded. Wait for the instructor to open Round 3.</p><button type="button" data-nav="final-decision">Go to Round 3</button>':
        w.member.isLeader&&!ended?'<form id="ws-review-reports"><button type="submit">Finish audit review</button><p class="fine">The leader can continue after a spoken discussion too. Sharing findings helps everyone retain a record.</p></form>':
        '<p class="fine">Your leader selects Finish audit review when the team is ready.</p>')+'</section>');
    patch('#ws-vote','');
  }
  function current(){return state.workspace;}
  function isV2(){return current()?.profile==='mizan-market-v2';}
  function phaseNumber(number){return current().phases.find(p=>p.sequence===number);}
  function steps(){
    const w=current();
    if(!isV2())return w.phases.map(p=>({id:p.id,phase:p,mode:'legacy',label:p.label,released:p.status!=='pending',status:p.status,description:p.status==='pending'?'Evidence unlocks when your instructor releases this round':p.status==='open'?'Review evidence and save your team’s answers':'Review your team’s work and score'}));
    const f=w.flow||{},p1=phaseNumber(1),p2=phaseNumber(2),p3=phaseNumber(3);
    return [
      {id:p1.id,phase:p1,mode:'initial',label:w.guidedRound1?'Round 1 · Build the fact sheet':'Sales claims & first choice',released:!!p1.businessReleased,status:f.initialCommitted&&p1.status==='closed'?'done':p1.status,description:w.guidedRound1?'Collect facts from the role packets, then answer one question as a team.':'Review the sales evidence, record your first recommendation and answer scored Round 1.'},
      {id:p2.id,phase:p2,mode:'company',label:'Company analysis · Round 2',released:!!f.companyReleased,status:p2.status,description:'Use the company’s reports to decide what the evidence supports.'},
      {id:'audit-work',phase:p2,mode:'audits',label:'Audits & report review',released:!!f.auditAvailable,status:f.reportsReviewed?'done':f.auditAvailable?'open':'pending',description:'Choose an independent report, calculate its test result, and discuss what it means for the business.'},
      ...(w.combinedFinal?[{id:p3.id,phase:p3,mode:'combined',label:'Round 3 · Business decision',released:!!f.round3QuestionsReleased,status:p3.status,
        description:w.finalStyle==='board'?'Answer the MCQs, vote, then send Mariam an accurate board recommendation.':'Answer the MCQs, vote on the team’s action, then select the cash left.'}]:[
        {id:'final-decision',phase:p3,mode:'final',label:w.timing?'Round 3A · Final decision vote':'Final business decision',released:!!f.finalOfferReleased||!!w.vote?.closed,status:f.finalCommitted||w.vote?.closed?'done':f.finalOfferReleased?'open':'pending',description:w.timing?'Compare the offers using your own evidence. Each team member casts a private ballot.':'Consider the final offer using only your team’s evidence. Record the final recommendation before scored Round 3.'},
        {id:p3.id,phase:p3,mode:'scored',label:w.timing?'Round 3B · Common exercise':'Common exercise · Round 3',released:!!f.round3QuestionsReleased,status:p3.status,description:'Only after final recommendations, solve the common scored exercise. It does not change your business ledger.'}])
    ];
  }
  function currentStep(){return steps().find(step=>step.id===selected);}
  function nextStep(){
    const w=current(),f=w.flow||{},list=steps();
    if(!isV2())return list.find(step=>step.status==='open')||list.find(step=>step.status==='pending')||list.at(-1);
    if(w.combinedFinal)return !f.initialCommitted?list[0]:!f.round2Closed?list[1]:!f.reportsReviewed?list[2]:list[3];
    if(w.vote?.closed)return list[4];
    if(!f.initialCommitted)return list[0];
    if(!f.round2Closed)return list[1];
    if(!f.reportsReviewed)return list[2];
    if(!f.finalCommitted)return list[3];
    return list[4];
  }
  function stepComponents(step){
    const w=current(),all=w.components.filter(c=>c.phase===step.phase.id);
    if(!isV2())return all;
    if(['scored','combined'].includes(step.mode))return [];
    return all.filter(c=>c.releaseStep===step.mode&&(!w.guidedRound1||step.mode!=='audits'||!!c.audit));
  }
  function blockedStep(step){
    const w=current(),f=w.flow||{};
    if(!w.leader&&(!w.guidedRound1||w.members.length>1))return {title:'Choose a team leader',text:'Agree on who will save the team’s answers. That person selects Lead in Your team.',to:'team',action:'Go to Your team'};
    if(state.status!=='locked')return {title:'Get ready for Round 1',text:w.members.length===1&&w.guidedRound1?
      'Read the case brief. If you are working alone, you become the leader and cover all roles when check-in locks.':
      'Claim a role in Your team and read the case brief. Your instructor opens Round 1 after check-in.',to:'team',action:'Review your team'};
    if(step.released)return null;
    if(step.mode==='combined')return !f.reportsReviewed?
      {title:'Finish the audit review',text:'Discuss your audit results and have your leader finish the review.',to:'audit-work',action:'Open audit review'}:
      {title:'Waiting for Round 3',text:'The instructor opens Round 3 when the teams are ready. You will answer MCQs and then vote.'};
    if(!isV2())return {title:'This stage is locked',text:'Your instructor has not released this round. Its evidence appears here automatically when it opens.'};
    if(['company','audits','final','scored'].includes(step.mode)&&!f.initialCommitted)return w.guidedRound1?
      {title:'Finish Round 1 first',text:'Save your fact card and discuss the team question. Your instructor releases the company reports after Round 1 closes.',to:phaseNumber(1).id,action:'Open Round 1'}:
      {title:'Record your first recommendation',text:'Your team must record its first choice before seeing the company reports. Return to the first step, even if the instructor has already opened Round 2.',to:phaseNumber(1).id,action:'Go to first recommendation'};
    if(['audits','final'].includes(step.mode)&&!f.round2Closed)return {title:'Finish the company analysis first',text:'Audit choices and results remain locked until the instructor closes scored Round 2. Save the company-analysis answers before then.',to:phaseNumber(2).id,action:'Open company analysis'};
    if(step.mode==='audits'&&w.timing&&!f.auditAvailable)return {title:'Waiting for audit review',text:'Use the checkpoint to discuss the company results. Your instructor will open audit review next.'};
    if(step.mode==='final')return {title:'Finish the audit step',text:!f.auditCommitted?
      'Choose an audit report. Your leader confirms the team’s choice.':'Calculate the audit test results, discuss them, and ask your leader to finish the review.',to:'audit-work',action:'Open audit step'};
    if(step.mode==='scored'&&w.timing)return {title:'Waiting for the common exercise',text:'When the team vote closes, the instructor can open the common exercise.'};
    if(step.mode==='scored'&&!f.finalCommitted)return {title:'Make your business decision first',text:'The common Round 3 exercise reveals evidence that must not influence your team’s recommendation. Record the final business decision first.',to:'final-decision',action:'Open final business decision'};
    return {title:'Waiting for instructor release',text:step.mode==='scored'?'Your final choice is recorded. Your instructor can open scored Round 3 after every participating team has recorded its final choice.':'Your team is ready. These reports appear when your instructor opens scored Round 2.'};
  }
  function ownerName(component){return component.owner?.name||(component.covered?'Team leader':'Unclaimed');}
  function roleName(id){return id==='leader'?'Team leader':current().roles.find(r=>r.id===id)?.label||id;}
  function componentNote(component){return typeof component.note==='string'?component.note:component.note?.text||'';}
  function setFlash(text='',error=false){if(!shell)return;$('#ws-flash').textContent=text;$('#ws-flash').classList.toggle('error',error);}
  function go(view){selected=view;selectedPacket='';render(state,ctx,true);$('#ws-breadcrumb')?.scrollIntoView({block:'nearest'});shell.classList.remove('navigation-open');$('#ws-menu').setAttribute('aria-expanded','false');}
  function focusCaseBrief(){
    const brief=$('#ws-case-brief');
    brief?.scrollIntoView({block:'start'});
    brief?.focus({preventScroll:true});
  }
  function jumpTo(id){
    const target=document.getElementById(id);
    if(!target)return;
    target.setAttribute('tabindex','-1');
    target.scrollIntoView({block:'start'});
    target.focus({preventScroll:true});
  }
  function jumpButton(id,label,primary=false){
    return '<button type="button"'+(primary?'':' class="secondary"')+' data-jump="'+id+'">'+esc(label)+'</button>';
  }
  const questionsButton=(label,primary=true)=>'<button type="button"'+(primary?'':' class="secondary"')+' data-answer>'+esc(label)+'</button>';
  function directions(title,lines,buttons=''){
    return '<section class="ws-directions"><h2>'+esc(title)+'</h2><ol>'+lines.map(line=>'<li>'+esc(line)+'</li>').join('')+'</ol>'+
      (buttons?'<div class="controls">'+buttons+'</div>':'')+'</section>';
  }
  function render(data,context,force=false){
    const previouslyReady=state?.workspace?.vote?.questionsReady;
    const previousClock=state?.workspace?.timing?.clock?.stage,previousStep=selected,wasEnded=state?.endedEarly;
    ctx=context;state=data;
    const active=!!(data.member&&data.workspace);
    document.title=active?'Mizan Market · Team workspace':data.classroom?'Mizan Market · Join your team':'Join a team · QBA201';
    document.body.classList.toggle('workspace-active',active);
    $('.skip-link').href=active?'#ws-main-content':'#lobby-title';
    if(!active){
      if(shell){shell.hidden=true;['#your-team','#team-work','#analysis-panel','#analysis-feedback','#class-leaderboard','#join-team'].forEach(id=>$('#room').append($(id)));}
      return;
    }
    mount();shell.hidden=false;
    for(const [child,parent] of [['#analysis-panel','#ws-answer-slot'],['#analysis-feedback','#ws-feedback-slot'],['#class-leaderboard','#ws-leaderboard-slot'],['#team-work','#ws-task-slot'],['#your-team','#ws-team-settings-content'],['#join-team','#ws-team-settings-content']]){if($(child).parentElement!==$(parent))$(parent).append($(child));}
    const w=current(),newIdentity=[data.code,data.member.team,w.member.ref].join(':'),changedIdentity=newIdentity!==identity;
    if(changedIdentity){identity=newIdentity;initialized=false;selectedPacket='';reviewQuestions=false;signatures.clear();}
    if(w.member.isObserver){renderObserver();return;}
    $('#ws-observer-work').hidden=true;$('#ws-team-settings').hidden=false;$('#ws-score').hidden=false;$('#ws-leader-tools').hidden=false;$('#ws-team-progress').classList.remove('observer-progress');
    if(!initialized){selected=isV2()?(state.status==='locked'&&(!w.timing||w.phases.some(p=>p.status!=='pending'))?nextStep()?.id:'overview'):w.phases.find(p=>p.status==='open')?.id||'overview';initialized=true;}
    if(w.finalStyle==='board'&&w.vote?.questionsReady&&!previouslyReady)reviewQuestions=false;
    const stage=w.timing?.clock?.stage;
    const readingStarted=previousClock!==stage&&stage==='reading';
    if(readingStarted)selected='overview';
    if(selected!=='team-room'&&previousClock!==stage&&stage==='round1'&&['overview','my-work'].includes(selected))selected=phaseNumber(1).id;
    if(selected!=='team-room'&&previousClock!==stage&&stage==='round2'&&w.guidedRound1)selected=phaseNumber(2).id;
    if(selected!=='team-room'&&previousClock!==stage&&stage==='audits'&&w.guidedRound1)selected='audit-work';
    if(selected!=='team-room'&&previousClock!==stage&&stage==='vote'&&w.flow.finalOfferReleased)selected='final-decision';
    if(selected!=='team-room'&&previousClock!==stage&&stage==='round3'&&w.flow.round3QuestionsReleased)selected=phaseNumber(3).id;
    if(data.endedEarly&&!wasEnded)selected='overview';
    if(!['overview','team-room','log','my-work',...steps().map(p=>p.id)].includes(selected))selected='overview';
    const team=data.teams.find(t=>t.id===data.member.team),me=w.members.find(m=>m.ref===w.member.ref),open=w.phases.find(p=>p.status==='open');
    $('#ws-team-label').textContent=team?.name||'Your team';
    $('#ws-breadcrumb').textContent='# '+(selected==='team-room'?'team-room':selected==='overview'?'case-and-team':selected==='log'?'activity-log':selected==='my-work'?'my-tasks':channelName(currentStep()));
    const betweenRounds=isV2()&&w.flow?.round2Closed&&!w.flow?.round3QuestionsReleased;
    const businessStatus=betweenRounds?(!w.flow.initialCommitted?'First decision needed':!w.flow.reportsReviewed?'Audit review':!w.flow.finalCommitted?'Business decision':'Ready for Round 3'):'';
    $('#ws-round-state').textContent=data.endedEarly?'Activity ended early':data.finalized?'Activity complete':open?'Round open':isV2()&&w.flow?.reflectionAvailable?'Rounds complete':businessStatus||(data.status==='locked'?'Waiting for round':'Check-in open');
    $('#ws-round-state').classList.toggle('is-open',(!!open||betweenRounds&&!w.flow.finalCommitted)&&!data.endedEarly&&!data.finalized);
    patch('#ws-identity','<span class="ws-avatar">'+esc(initials(me?.name))+'</span><div><strong>'+esc(me?.name||'You')+'</strong><span>'+esc(w.member.isLeader?'You · Team leader':w.member.roles.map(roleName).join(' · ')||'Choose your role')+'</span></div>');
    patch('#ws-navigation','<p class="ws-nav-heading">Your workspace</p>'+nav('my-work','My tasks','check')+nav('overview','Case & team settings','grid')+
      '<p class="ws-nav-heading">Team channels</p>'+nav('team-room','team-room','hash')+
      steps().map(step=>nav(step.id,channelName(step),step.released?'hash':'lock',!step.released)).join('')+
      '<p class="ws-nav-heading">Resources</p>'+nav('log','Activity log','log')+(w.references?'<button type="button" class="ws-nav-item" data-resource="reference">'+icon('log')+'<span>Reference tables</span></button>':'')+
      (w.debrief?'<button type="button" class="ws-nav-item" data-resource="debrief">'+icon('log')+'<span>Debrief & reflection</span></button>':''));
    $('#ws-overview').hidden=selected!=='overview';$('#ws-stage').hidden=['overview','team-room','log','my-work'].includes(selected);$('#ws-team-room').hidden=selected!=='team-room';$('#ws-log').hidden=selected!=='log';$('#ws-my-work').hidden=selected!=='my-work';
    const clock=w.timing?.clock;
    patch('#ws-clock',clock?'<div class="case-clock" data-mizan-clock><span>'+esc(w.timing.stages[clock.stage].label)+'</span><strong data-mizan-countdown></strong></div>':'');
    renderOverview();renderMyWork();renderPeople();renderStage();renderLog();renderScore();renderCollaboration();
    MizanClock.sync(clock);
    renderBallotStatus();
    // Recover device drafts after refresh without requiring another selection.
    const pendingBallot=readDraft('ballot');
    if(w.guidedRound1&&w.vote?.open&&pendingBallot&&pendingBallot!==w.vote.own&&
      w.vote.choices.some(choice=>choice.id===pendingBallot&&choice.cost<=w.ledger.startingCash-w.ledger.auditCost))
      ctx.queueBallot(pendingBallot);
    const pendingBoard=readDraft('final-board');
    if(w.finalStyle==='board'&&w.member.isLeader&&pendingBoard){
      if(w.vote?.checks?.board===pendingBoard)removeDraft('final-board');
      else if(w.vote?.boardOpen&&w.vote.boardQuestion.options.some(option=>option.id===pendingBoard))ctx.queueBoard(pendingBoard);
    }
    const pendingCash=readDraft('final-cash');
    if(w.combinedFinal&&w.member.isLeader&&pendingCash){
      if(String(w.vote?.checks?.cash)===pendingCash)removeDraft('final-cash');
      else if(w.vote?.cashOpen&&w.vote.cashChoices.some(option=>option.id===pendingCash))ctx.queueCash(Number(pendingCash));
    }
    if(changedIdentity&&w.combinedFinal&&!w.flow.reportsReviewed){
      for(const report of w.auditReports||[]){
        const values=auditValues(report);
        if(values.component?.editable&&(drafts[draftKey('audit-stat:'+report.id)]!==undefined||drafts[draftKey('audit-conclusion:'+report.id)]!==undefined)&&
          auditNote(report,values.statistic,values.conclusion)!==values.component.note)
          queueAuditReport(report,values.statistic,values.conclusion);
      }
    }
    if(readingStarted)focusCaseBrief();
    else if(previousClock!==stage&&previousStep!==selected){
      setFlash();
      window.scrollTo(0,0);
    }
    $('#ws-reference-open').hidden=!w.references;
    if($('#ws-resource-dialog').open)renderResource(resourceMode);
    $('#ws-decision-form').hidden=!w.member.isLeader||data.finalized||data.endedEarly;
    const decision=$('#ws-decision-text');if(document.activeElement!==decision)decision.value=readDraft('decision');
    // The original form and API remain the authority for scored answers.
    $('#analysis-panel').hidden=selected!==data.analysis?.phase||!data.analysis||(isV2()&&!['initial','company','scored','combined'].includes(currentStep()?.mode))||(w.finalStyle==='board'&&currentStep()?.mode==='combined'&&w.vote.questionsReady&&!reviewQuestions);
    $('#team-work').hidden=!data.work||currentStep()?.phase.id!==data.work.phase;
    $('#analysis-feedback').hidden=!data.feedback?.length;
    $('#captain-workspace').hidden=true;
    $('#step-down').hidden=true; // Classroom leadership uses an explicit handoff instead of leaving a team leaderless.
    $('#your-team').hidden=false;
  }
  function observerRoster(w){
    return w.observers?.length?'<section class="ws-observers"><h3>Observers · '+w.observers.length+'</h3><ul aria-label="Team observers">'+w.observers.map(person=>'<li><span class="ws-avatar small" aria-hidden="true">'+esc(initials(person.name))+'</span><div><strong>'+esc(person.name)+(person.ref===w.member.ref?' · You':'')+'</strong><span>Observer · read only</span></div></li>').join('')+'</ul><p>Observers are separate from the competing roster and team bonus.</p></section>':'';
  }
  function renderObserver(){
    const w=current(),team=state.teams.find(t=>t.id===state.member.team),activity=w.activity;
    if(!['overview','team-room','log','my-work','observer-work'].includes(selected))selected='team-room';
    initialized=true;
    document.title='Mizan Market · Observer';
    $('#ws-team-label').textContent=(team?.name||'Your team')+' · Observer';
    $('#ws-breadcrumb').textContent='# '+({overview:'case-brief','team-room':'team-room',log:'activity-log','my-work':'observer-guide','observer-work':'current-work'}[selected]);
    $('#ws-round-state').textContent='Observer · read only';
    patch('#ws-identity','<span class="ws-avatar">'+esc(initials(w.member.name))+'</span><div><strong>'+esc(w.member.name)+'</strong><span>Observer · read only</span></div>');
    patch('#ws-navigation','<p class="ws-nav-heading">Your workspace</p>'+nav('overview','Case brief','grid')+nav('my-work','Observer guide','check')+'<p class="ws-nav-heading">Team channels</p>'+nav('team-room','team-room','hash')+nav('observer-work','current-work','hash')+nav('log','Activity log','log')+'<p class="ws-nav-heading">Resources</p><button type="button" class="ws-nav-item" data-resource="reference">'+icon('log')+'<span>Reference tables</span></button><button type="button" class="ws-nav-item" data-recovery-code>'+icon('lock')+'<span>Recovery code</span></button>');
    for(const id of ['overview','team-room','log','my-work','stage','observer-work'])$('#ws-'+id).hidden=selected!==id;
    $('#ws-team-settings').hidden=true;
    $('#ws-feedback-slot').hidden=true;$('#ws-leaderboard-slot').hidden=true;
    const clock=w.timing?.clock;
    patch('#ws-clock',clock?'<div class="case-clock" data-mizan-clock><span>'+esc(w.timing.stages[clock.stage].label)+'</span><strong data-mizan-countdown></strong></div>':'');
    patch('#ws-overview-body','<div class="ws-page-heading"><h1>Case brief</h1><p>Follow the business problem and your team’s work.</p></div><div class="ws-observer-note"><strong>You joined as an observer.</strong><p>You can read your team’s shared work and released case data. Your team’s competing roster is locked. You cannot submit answers, vote, take a role or receive the team bonus.</p></div>'+MizanBrief.identity+MizanBrief.background);
    patch('#ws-my-work-body','<section class="ws-observer-note"><h1>Your role: observer</h1><ol><li>Read the case brief and find the current business decision.</li><li>Use People & work to see who is preparing each result.</li><li>Follow the team-room and current-work channels as the instructor opens each round.</li><li>Listen to the discussion and make your own notes outside the shared scored workspace.</li></ol></section>');
    const figures=(w.auditReports||[]).map(report=>'<section class="ws-message"><h2>'+esc(auditTask(report.type).title)+'</h2>'+('<dl class="ws-audit-figures">'+report.figures.map(([label,value])=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join('')+'</dl>')+'</section>').join('');
    const questions=state.analysis?.fields.map((field,index)=>'<li><strong>'+esc((index+1)+'. '+field.label)+'</strong>'+(field.options?'<ul>'+field.options.map(option=>'<li>'+esc(option.label)+'</li>').join('')+'</ul>':'')+'</li>').join('')||'';
    patch('#ws-observer-work','<div class="ws-page-heading"><h1>'+esc(activity?.label||'Current work')+'</h1><p>Follow the evidence and the team’s next action. This view is read only.</p></div>'+(w.companyEvidence?companyEvidenceMarkup():'')+figures+(questions?'<section class="ws-message"><h2>Current questions</h2><ol class="observer-questions">'+questions+'</ol></section>':'')+'<section class="ws-message"><h2>Team’s next actions</h2><ul class="observer-tasks">'+(activity?.tasks||[]).map(progressTask).join('')+'</ul></section>');
    renderPeople();renderLog();renderCollaboration();
    $('#ws-role-settings').hidden=true;$('#ws-score').hidden=true;$('#ws-leader-tools').hidden=true;
    $('#ws-decision-form').hidden=true;$('#ws-channel-form').hidden=true;
    $('#analysis-panel').hidden=true;$('#team-work').hidden=true;$('#your-team').hidden=true;
    $('#ws-team-progress').classList.add('observer-progress');
    $('#ws-reference-open').hidden=!w.references;
    if($('#ws-resource-dialog').open)renderResource(resourceMode);
    MizanClock.sync(clock);
  }
  function channelName(step){
    if(!step)return '';
    return {initial:'fact-sheet',company:'company-analysis',audits:'audit-reports',combined:'board-decision',final:'board-decision',scored:'team-exercise'}[step.mode]||step.label;
  }
  const workStatus=status=>({pending:'Needs action',working:'Draft in progress',waiting:'Waiting',saved:'Finding saved',done:'Saved',support:'Checking & discussion'})[status]||status;
  function progressTask(task){
    const own=task.owner?.ref===current().member.ref;
    return '<li class="work-task work-'+esc(task.status)+'"><span class="work-state-icon" aria-hidden="true">'+(['done','saved'].includes(task.status)?'✓':'○')+'</span><div><strong>'+esc(task.title)+'</strong><p>'+esc(task.owner?.name||'Team')+' · '+esc(task.roleLabel)+(task.coveredByLeader?' · covered by leader':'')+'</p><small>'+esc(workStatus(task.status))+(own?' · Your task':'')+'</small></div></li>';
  }
  function renderCollaboration(){
    const w=current(),activity=w.activity;if(!activity)return;
    const task=activity.next;
    patch('#ws-team-progress','<section class="team-progress-bar '+(task?(task.status==='waiting'?'is-waiting':'has-waiting'):'is-ready')+'"><div><strong>'+esc(task?activity.headline:activity.stage==='complete'?'Activity complete':'Current work saved')+'</strong><p>'+
      esc(task?(task.owner?.name||'Team')+' · '+task.action:activity.instruction)+'</p></div>'+
      '<button type="button" class="secondary" data-nav="'+esc(w.member.isObserver?'observer-work':activity.channel)+'">'+(activity.stage==='instructor'?'Review current work':'Open current work')+'</button></section>');
    if(selected==='team-room'){
      const items=w.findings.map(f=>({...f,kind:'message'})).sort((a,b)=>a.created-b.created||a.id-b.id);
      const feed=items.length?items.map(item=>item.kind==='message'?findingMarkup(item):'<p class="channel-event"><span aria-hidden="true">◇</span> '+esc(authorName(item.author))+' · '+esc(item.text)+' <time>'+esc(time(item.created))+'</time></p>').join(''):
        '<div class="channel-empty"><h1># team-room</h1><p>Your shared space for results, questions and checks. Start with what your teammates need to move forward.</p>'+(w.phases.every(p=>p.status==='pending')?'<p>Team messages open when the instructor starts Round 1.</p>':'')+'</div>';
      const node=$('#ws-channel-feed'),atEnd=node.scrollHeight-node.scrollTop-node.clientHeight<60;
      const last=items.at(-1),ownNew=last&&last.author===w.member.name&&node.dataset.lastPost!==String(last.id);
      patch('#ws-channel-feed',feed);node.dataset.lastPost=last?String(last.id):'';
      if(atEnd||ownNew)node.scrollTop=node.scrollHeight;
    }
    $('#ws-channel-form').hidden=w.member.isObserver||state.status!=='locked'||!w.leader||state.endedEarly||state.finalized||w.phases.every(p=>p.status==='pending');
    const input=$('#ws-channel-message');if(document.activeElement!==input)input.value=readDraft('channel-message');
    patch('#ws-current-work','<section class="people-current-work"><h3>What moves us forward</h3><p>'+activity.complete+' / '+activity.total+' current steps saved</p><ul>'+activity.tasks.map(progressTask).join('')+'</ul>'+
      '<p class="fine">Status follows saved work. Discuss your reasoning with the team.</p></section>');
  }
  function nav(id,label,type,locked=false){return '<button type="button" class="ws-nav-item'+(selected===id?' selected':'')+(locked?' locked':'')+'" data-nav="'+esc(id)+'" '+(selected===id?'aria-current="page"':'')+'>'+icon(type)+'<span>'+esc(label)+'</span>'+(locked?'<span class="sr-only">Locked until the required work is complete</span>':'')+'</button>';}
  function renderOverview(){
    const w=current(),leader=w.leader,solo=w.members.length===1,next=nextStep(),block=next?blockedStep(next):null;
    const brief=(w.guidedRound1?MizanBrief.identity:'')+(w.timing?MizanBrief.background:'');
    const title=state.endedEarly?'Activity ended early':state.finalized?'Activity complete':block?.title||next.label;
    const help=state.endedEarly?'Saved work counts. Unopened rounds are skipped. See team scores below.':state.finalized?'Review the worked solutions and complete your individual reflection.':block?.text||next.description;
    const tools=(w.references?'<button type="button" class="secondary" data-resource="reference">Open reference tables</button>':'')+(w.whatIf?'<button type="button" class="secondary" data-resource="whatif">Explore a what-if</button>':'')+(w.flow?.reflectionAvailable&&!w.debrief?'<button type="button" class="secondary" data-resource="reflection">Write your individual reflection</button>':'')+(w.debrief?'<button type="button" class="secondary" data-resource="debrief">Open debrief &amp; reflection</button>':'');
    patch('#ws-overview-body','<div class="ws-page-heading"><h1>Team overview</h1>'+(w.timing?'':'<p>'+esc(w.brief)+'</p>')+'</div>'+'<div class="ws-overview-banner"><div><span class="ws-section-kicker">'+(solo?'Working alone':'What to do now')+'</span><h2>'+esc(title)+'</h2><p>'+esc(help)+'</p></div>'+(state.endedEarly?'':!leader?'<button type="button" data-lead>Become team leader</button>':state.finalized&&w.debrief?'<button type="button" data-resource="debrief">Open debrief &amp; reflection</button>':next?'<button type="button" data-nav="'+esc(block?.to||next.id)+'">'+esc(block?.action||'Open next step')+' '+icon('arrow')+'</button>':'')+'</div>'+(brief?'<div id="ws-case-brief" tabindex="-1" aria-label="Case brief">'+brief+'</div>':'')+'<section class="ws-overview-section"><h2>Stages of the case</h2>'+(isV2()?'<p class="ws-section-help">'+(w.timing?(w.guidedRound1?'The fact cards prepare your team for the Round 1 check.':'The three rounds include 30 statistical points and 6 decision points.'):'Five work steps, three scored rounds. Audit choices and the final business decision are not extra scored rounds.')+'</p>':'')+'<div class="ws-stage-path">'+steps().map((step,i)=>'<button type="button" class="ws-stage-row" data-nav="'+esc(step.id)+'"><span class="ws-stage-number">'+String(i+1).padStart(2,'0')+'</span><span><strong>'+esc(step.label)+'</strong><small>'+esc(step.description)+'</small></span><span class="ws-state '+(step.released&&step.status!=='done'?'is-open':'')+'">'+esc(!step.released?'Locked':statusName(step.status))+'</span></button>').join('')+'</div></section><section class="ws-overview-section"><h2>How your team works</h2><div class="ws-guidance"><div><span class="ws-guide-number">1</span><div><h3>Choose a role</h3><p>Finance, Operations, Customer, Analyst and Commercial each contribute a different view. The team leader keeps the whole decision on track. '+(w.multiRole?'One person may take several roles. Each role still has one owner.':'')+'</p></div></div><div><span class="ws-guide-number">2</span><div><h3>Read and discuss</h3><p>Read the messages for your role. Tell the group what you found, in person or in Team messages. Use Working notes to keep your own calculations with the report.</p></div></div><div><span class="ws-guide-number">3</span><div><h3>Save the team’s answers</h3><p>Discuss each scored question. The leader saves one set of answers for the team. '+(solo?'You cover all roles and submit the team answers yourself.':'The leader covers any role nobody claims.')+'</p></div></div></div></section>'+(w.glossary?.length?'<section class="ws-overview-section"><h2>Business glossary</h2><dl class="ws-glossary">'+w.glossary.map(item=>'<div><dt>'+esc(item.term)+'</dt><dd>'+esc(item.definition)+'</dd></div>').join('')+'</dl></section>':'')+(w.competitionRules?.length?'<section class="ws-overview-section ws-rules"><h2>Competition rules</h2><ul>'+(w.timing?[(w.guidedRound1?'Complete the fact sheet and one team check in Round 1. The leader saves the answers before each round closes.':'Complete 15 questions for 30 points. The team leader saves the team answers before each round closes.'),(w.combinedFinal?'Round 3 has team MCQs, an individual vote and a final '+(w.finalStyle==='board'?'board recommendation':'cash MCQ')+' worth 2 points.':'In Round 3A each member votes. The team earns up to 6 additional points for the three decision checks.'),w.bonusRule||'Each verified member of the highest-scoring team with a positive total earns one course percentage point. Tied winners share the full bonus.']:w.competitionRules).map(rule=>'<li>'+esc(rule)+'</li>').join('')+'</ul></section>':'')+(tools?'<section class="ws-overview-section"><h2>Learning resources</h2><div class="controls">'+tools+'</div></section>':''));
  }
  function responsibility(task){
    if(!task)return '';
    return '<p class="ws-task-owner"><strong>Responsible: '+esc(roleName(task.role))+' · '+esc(task.owner?.name||'Choose a team leader')+'</strong>'+
      (task.coveredByLeader?'<span>Unclaimed role — covered by the team leader</span>':'')+'</p>';
  }
  function personalWorkMarkup(step=currentStep()){
    const w=current(),plan=w.workPlan,person=plan?.people.find(p=>p.ref===w.member.ref);
    if(!person||state.finalized||state.endedEarly)return '';
    const audit=step?.mode==='audits';
    const stepButton=(id,label)=>selected==='my-work'?'<button type="button" data-nav="'+esc(step.id)+'" data-stage-jump="'+id+'">'+esc(label)+'</button>':jumpButton(id,label,true);
    if(step?.phase?.status==='closed'&&step.mode!=='audits')return '';
    const board=step?.mode==='combined'&&w.finalStyle==='board'&&w.vote.closed;
    if(step?.mode==='combined'&&w.finalStyle==='board'&&w.vote.questionsReady&&!w.vote.closed)
      return '<section class="ws-personal-work"><h2>Your job now · '+esc(w.member.name)+'</h2><p>Compare the available actions with the evidence your team bought. Explain your reason, then cast your own vote on this device. Every member has one vote.</p>'+stepButton('ws-vote','Go to my vote')+' '+questionsButton('Review team MCQs',false)+'</section>';
    const tasks=board?[{id:'final_board',role:'leader',owner:w.leader,instruction:'Combine the team’s checks and save one accurate board message.',coveredByLeader:false}]:audit?plan.audits:plan.questions;
    const mine=tasks.filter(task=>task.owner?.ref===w.member.ref);
    let check=plan.questions.find(task=>person.check.includes(task.id));
    if(board)check=tasks[0];
    if(audit)check=plan.audits[w.members.findIndex(member=>member.ref===w.member.ref)%Math.max(plan.audits.length,1)];
    const label=task=>task.id==='final_board'?'Board recommendation':audit?(task.id.includes('savings')?'Savings audit':'Dispatch audit'):'Q'+task.index;
    const directions=mine.length?'<ul>'+mine.map(task=>'<li><strong>'+esc(label(task))+':</strong> '+esc(task.instruction)+'</li>').join('')+'</ul>':
      check?'<p><strong>Your checking task:</strong> Independently work through '+esc(label(check))+'. Compare the calculation or reason with '+esc(check.owner?.name||'the leader')+'. Tell them one correction or why you agree.</p>':
      '<p>'+(step?.mode==='initial'?'Read your role’s message and complete its fact card. If yours is done, help someone find a missing fact.':
        audit?'Discuss which information would change the decision. Check the audit cost and who will record each purchased report.':
        'Review the contract terms and your team’s saved findings. Prepare a reason for the action you would recommend.')+'</p>';
    const choices=tasks.map(task=>'<option value="'+esc(label(task))+'">'+esc(label(task))+' · '+esc(roleName(task.role))+' · '+esc(task.owner?.name||'Team leader')+'</option>').join('');
    const open=step?.released&&!state.endedEarly;
    const ideas=w.findings.filter(finding=>!finding.component&&finding.text.startsWith('[')).slice(-3);
    return '<section class="ws-personal-work"><h2>Your job now · '+esc(w.member.name)+'</h2>'+(board?stepButton('ws-vote','Go to board recommendation'):state.analysis?questionsButton('Go to team questions'):'')+'<p>'+esc(board?(w.member.isLeader?'Ask teammates to check cash, evidence and contract risk. Select one message that gets every part right.':'Your contribution: '+(w.member.roles.includes('finance')?'verify the cash calculation and which payment is due today.':w.member.roles.includes('analyst')?'check exactly what the purchased statistical evidence supports.':w.member.roles.includes('customer')?'check the service claim and the remaining risk for individual orders.':w.member.roles.includes('operations')?'check the campaign timing and the next operational step.':'check the contract conditions and what the proposed action commits Mizan to.')):person.instruction)+'</p>'+directions+
      (w.vote?.open?'<p><strong>Everyone:</strong> After the discussion, cast your own vote on this device.</p>':'')+
      (tasks.length?'<details id="ws-team-task-list"><summary>Who is working on each question?</summary>'+tasks.map(task=>responsibility(task)+'<p>'+esc(label(task))+': '+esc(task.instruction)+'</p>').join('')+'</details>':'')+
      (open&&choices?'<details id="ws-idea-composer"><summary>Share a check or ask a teammate</summary><form id="ws-question-idea" data-idea-stage="'+esc(step.id)+'" data-idea-round="'+step.phase.sequence+'"><h3>Help your team with a specific question</h3><label for="ws-idea-question">Question or report</label><select id="ws-idea-question">'+choices+'</select><label for="ws-idea-text">Your reason, check or question</label><textarea id="ws-idea-text" maxlength="300" required placeholder="Explain a step or flag something for your team to check.">'+esc(readDraft('idea:'+step.id))+'</textarea><button>Share idea with team</button><p class="fine">A team message, not a scored answer. Only the leader submits the team’s agreed answers.</p></form></details>':'')+(ideas.length?'<div class="ws-question-ideas"><h3>Team checks and ideas</h3>'+ideas.map(idea=>'<p><strong>'+esc(idea.author)+':</strong> '+esc(idea.text)+'</p>').join('')+'</div>':'')+'</section>';
  }
  function companyEvidenceMarkup(){
    const evidence=current().companyEvidence;if(!evidence)return confirmedRound2;
    const n=value=>Number(value.toFixed(4)).toString();
    return '<section class="ws-case-brief ws-confirmed"><h2>'+(evidence.checked?'Checked company evidence':'Company reports · Your team’s sample')+'</h2>'+
      '<p>'+(evidence.checked?'Use these checked results to begin the next stage on the same ground. Earlier answers stay on record.':
      'Everyone can use these figures. The named question owners lead the calculations and explain them to the team.')+'</p>'+
      (current().numberMode?'<p class="fine">Other teams may have different sample figures. Keep using your team’s figures after refreshing or reconnecting.</p>':'')+
      '<ul>'+evidence.rows.map(row=>'<li><strong>'+esc(row.label)+':</strong> n = '+row.n+', mean '+n(row.mean)+' '+esc(row.unit)+', '+(row.known?'known population':'sample')+' SD '+n(row.sd)+'.'+
        (evidence.checked?' '+(row.known?'z':'t')+' = '+n(row.statistic)+(row.df?', '+row.df+' df':'')+', one-sided p = '+row.p.toFixed(4)+'.':'')+'</li>').join('')+'</ul>'+
      (evidence.checked?'<p>At 5%, neither company test establishes its claim. Use a purchased audit on its own; do not pool it with the company sample.</p>':'')+'</section>';
  }
  function renderMyWork(){
    const w=current();
    const step=nextStep();
    const work=step?stepComponents(step).filter(c=>c.released&&c.owner?.ref===w.member.ref&&!notPurchased(c)):[];
    const roles=w.member.roles.map(roleName);
    const buttons=steps().filter(s=>s.released).map(s=>'<button type="button" class="secondary" data-nav="'+esc(s.id)+'">'+esc(s.label)+'</button>').join('');
    patch('#ws-my-work-body',personalWorkMarkup(step).replaceAll('id="ws-question-idea"','id="ws-my-question-idea"').replaceAll('ws-idea-question','ws-my-idea-question').replaceAll('ws-idea-text','ws-my-idea-text').replaceAll('ws-team-task-list','ws-my-team-task-list').replaceAll('ws-idea-composer','ws-my-idea-composer')+'<div class="ws-page-heading"><h1>My work</h1><p>'+esc(w.member.name)+' · '+
      esc([...(w.member.isLeader?['Team leader']:[]),...roles].join(', ')||'Choose a role')+'</p></div>'+
      '<section class="ws-audit-ledger"><h2>Your assignments for this stage</h2>'+
      (work.length?'<ul class="ws-my-assignments">'+work.map(c=>'<li><span>'+esc(c.label)+'</span>'+(c.packet&&c.unlocked?
        '<button type="button" class="secondary" data-report="'+esc(c.id)+'" data-stage="'+esc(step.id)+'">'+(c.status==='done'?'Review':'Open')+'</button>':
        '<span class="fine">Waiting to open</span>')+'</li>').join('')+'</ul>':
        '<p>Open the stage for your next instruction. Some stages ask you to discuss a shared question or vote.</p>')+
      (step?'<button type="button" data-nav="'+esc(step.id)+'">Open current stage</button>':'')+'</section>'+
      (buttons?'<div class="controls">'+buttons+'</div>':''));
  }
  function renderPeople(){
    const w=current(),me=w.member,leader=w.leader;
    const roster=w.members.map(member=>{
      const assignments=member.roles.map(roleName);
      if(member.isLeader)assignments.unshift('Team leader');
      const progress=w.activity?.people.find(person=>person.ref===member.ref);
      return '<li class="ws-person person-work '+esc(progress?.status||'')+'"><span class="ws-avatar small" aria-hidden="true">'+esc(initials(member.name))+'</span><div><strong>'+esc(member.name)+
        (member.ref===me.ref?' · You':'')+'</strong><span>'+esc(assignments.join(', ')||'Choose a role')+'</span>'+(progress?'<small class="person-work-status is-'+esc(progress.status)+'">'+esc(workStatus(progress.status))+'</small><p class="person-task-detail">'+esc(progress.detail)+'</p>':'')+'</div></li>';
    }).join('');
    const leaderSlot=leader?'':'<li class="ws-person leader"><span class="ws-avatar">TL</span><div><strong>Team leader</strong><span>Choose a leader</span></div>'+
      '<button type="button" class="ws-mini" data-lead>Lead</button></li>';
    const roleRows=w.roles.filter(r=>r.id!=='leader').map(role=>{
      const mine=role.owner?.ref===me.ref,items=w.components.filter(c=>c.role===role.id&&(isV2()?c.released:w.phases.find(p=>p.id===c.phase)?.status==='open')&&!notPurchased(c));
      const status=items.length?items.every(c=>c.status==='done')?'Complete':items.some(c=>c.status==='in_progress')?'In progress':items.some(c=>c.unlocked)?'Released · not started':'Waiting for release or earlier work':'';
      const action=!me.isObserver&&!state.finalized&&!role.owner&&(!me.isLeader||w.multiRole)&&(!me.roles.length||w.multiRole)&&!!leader?'<button type="button" class="ws-mini secondary" data-claim="'+esc(role.id)+'">Claim</button>':mine&&!state.finalized?'<button type="button" class="ws-mini secondary" data-release="'+esc(role.id)+'">Return</button>':'';
      return '<li class="ws-person"><span class="ws-avatar '+(!role.owner?'unclaimed':'')+'">'+esc(initials(role.owner?.name||role.label))+'</span><div><strong>'+esc(role.label)+'</strong><span>'+esc(role.owner?.name||(leader?'Covered by leader':'Unclaimed'))+(mine?' · You':'')+'</span>'+(role.owner&&status?'<small>'+esc(status)+'</small>':'')+'</div>'+action+'</li>';
    }).join('');
    patch('#ws-people','<div class="ws-inspector-heading"><h2>People & work</h2><p>'+w.members.length+' member'+(w.members.length===1?'':'s')+' · '+state.capacity+' seats</p></div>'+
      '<ul id="ws-team-roster" class="ws-member-list" aria-label="Team members">'+roster+'</ul>'+observerRoster(w)+
      '<details id="ws-role-settings" '+(state.status==='open'?'open':'')+'><summary>Roles & handoffs</summary><ul class="ws-people-list">'+leaderSlot+roleRows+'</ul><p class="ws-routing-note">'+
      esc(w.guidedRound1?'Choose a role at check-in. Any remaining team member receives a role when the instructor locks the roster. The leader covers open roles.':'Unclaimed roles route to the team leader. Future evidence stays locked until the required release step.')+'</p></details>');
    patch('#ws-leader-tools',me.isLeader&&!state.endedEarly&&!state.finalized&&w.members.length>1?'<details id="ws-lead-handoff"><summary>Hand over leadership</summary><p class="fine">The next leader will submit team answers and cover unclaimed roles. Your saved notes stay with the team.</p><form data-leader-handoff><label for="ws-next-leader">New team leader</label><select id="ws-next-leader" required><option value="">Choose a teammate</option>'+memberOptions(me.ref)+'</select><button type="submit" class="secondary">Transfer leadership</button></form></details>':'');
  }
  function memberOptions(except){return current().members.filter(m=>m.ref!==except).map(m=>'<option value="'+esc(m.ref)+'">'+esc(m.name)+'</option>').join('');}
  function notPurchased(component){return !!(component.audit&&current().audit&&!component.auditAvailable);}
  function guidedDirections(step,report){
    const w=current(),leader=w.member.isLeader;
    const readFirst=step.mode==='company'&&report&&report.status!=='done';
    const readReport=report?jumpButton('ws-evidence','Open my report',readFirst):'';
    const openQuestions=state.analysis?.phase===step.phase.id?questionsButton('Open team questions',!readFirst):'';
    const reflect=step.mode==='scored'&&w.flow.reflectionAvailable?
      '<button type="button" class="secondary" data-resource="reflection">Write your individual reflection</button>':'';
    const submit=leader?'Enter the group’s answers in Team questions. Select Save team answers and check the saved time.':
      'Discuss Team questions together. Your leader saves one set of answers for the group.';
    if(state.endedEarly||state.finalized)return directions('Review your saved work',['This activity has ended. You can review your reports and team scores.'],reflect);
    if(step.mode==='company'||step.mode==='scored'){
      if(step.phase.status!=='open')return directions('Round closed',['Review your scores when the instructor discusses the answers.'],reflect);
      if(step.mode==='scored')return directions('Solve the shared example',['Use the numbers in Team questions. Every team gets the same example.',submit],openQuestions);
      const work=report?['Open your report. Follow the task above its messages.',
        'Tell the group one useful result. Say it aloud or use Team messages.']:
        ['Ask the report owners what they found. Help your team decide what the reports support.'];
      return directions('Use the company reports',[...work,submit],readReport+openQuestions);
    }
    if(step.mode==='audits'){
      if(!w.audit)return directions('Choose a report to check',[
        'Buy the savings audit, the dispatch audit or both. An audit gives your team a new independent sample.',
        leader?'Choose one plan below when the team agrees. Its price is deducted from your cash.':
          'Compare the three choices below. Agree as a team and ask your leader to confirm the plan.'
      ],jumpButton('ws-audit','See audit choices',leader));
      if(w.flow.reportsReviewed)return directions('The review is complete',['Read the final offer and prepare to vote.'],
        '<button type="button" data-nav="final-decision">Open final business decision</button>');
      const bought=w.audit.plan!=='none';
      const owners=[...new Set(w.components.filter(c=>c.audit&&!notPurchased(c)).map(c=>c.owner?.name).filter(Boolean))];
      return directions('Calculate, discuss, then continue',[
        bought?(report?.audit?'Use the figures below to calculate your audit’s test statistic and a conclusion at 5%.':
          'Ask '+owners.join(' and ')+' for the audit test results. Discuss what the new sample supports.'):
          'This saved session has no audit purchase. Review its company evidence.',
        leader?'After the team checks its results, select Finish audit review to open the final offer.':
          'Tell your leader the statistic and conclusion. The leader selects Finish audit review.'
      ],(report?.audit?jumpButton('ws-evidence','Open audit results',true):'')+
        jumpButton('ws-report-review',leader?'Go to finish review':'See who has each report'));
    }
    if(w.vote?.closed)return directions('Voting has closed',['Check which vote counted and what your team chose. Wait for your instructor to open Round 3B.'],
      jumpButton('ws-vote','See the vote result'));
    return directions('Choose what to recommend',[
      'Compare the offers using the cash your team has left and the evidence it reviewed. Discuss the option you would recommend to Mariam.',
      'When voting is open, choose an option on your own device and wait for Vote recorded.',
      leader?'Save the three team decision checks below the ballot. Submit your own vote as well.':
        'Help your leader work through the three team decision checks. The leader saves them for the team.'
    ],readReport+jumpButton('ws-vote',w.vote?.open?'Go to my vote':'Check voting status',w.vote?.open));
  }
  function renderStage(){
    const w=current(),step=currentStep();if(!step)return;
    patch('#ws-personal-job',w.guidedRound1?personalWorkMarkup():'');
    if(step.mode==='audits'&&w.combinedFinal&&w.audit){renderAuditReports(step);return;}
    if(step.mode==='combined'){
      const block=blockedStep(step),closed=step.phase.status==='closed'||state.endedEarly||state.finalized;
      patch('#ws-stage-heading','<div class="ws-page-heading"><h1>Round 3 · Business decision</h1></div>');
      patch('#ws-next',block?directions(block.title,[block.text],block.to?'<button type="button" data-nav="'+esc(block.to)+'">'+esc(block.action)+'</button>':''):
        closed?directions('Round 3 closed',['Review the team’s scores and discuss the decision with your instructor.']):
        w.finalStyle==='board'&&w.vote.closed?directions('Choose the board recommendation',['The business action is fixed. Check which message correctly describes the cash, evidence and remaining risk.','The leader saves one answer after the team checks it.'],jumpButton('ws-vote','Open board recommendation',true)+questionsButton('Review team MCQs',false)):
        w.finalStyle==='board'&&w.vote.questionsReady?directions('Each member votes',['Discuss the alternatives using the reports your team bought.','Cast your own ballot. Wait for the instructor to confirm the team action.'],jumpButton('ws-vote','Go to my vote',true)+questionsButton('Review team MCQs',false)):
        directions(w.finalStyle==='board'?'Analyze, vote, then advise Mariam':'Answer, vote, then check the cash',[
          'Use the comparison below to answer the MCQs. The team leader saves the group’s answers.',
          'Vote on your own phone when the team questions are saved.',
          w.finalStyle==='board'?'After the instructor confirms the action, compare four board messages. The leader saves the one that correctly combines evidence, cash and remaining risk.':'After the instructor confirms the team’s action, the leader selects its remaining cash in the final MCQ.'
        ],questionsButton('Open team MCQs')+jumpButton('ws-vote',w.vote.closed?(w.finalStyle==='board'?'Open board recommendation':'Open final cash question'):'Go to team vote')));
      patch('#ws-confirmed',!block?'<section class="ws-audit-ledger"><h2>Contract comparison</h2><p>Both offers run for 180 operating days. The figures include the full setup cost.</p>'+
        '<div class="scroll"><table class="ws-audit-options"><thead><tr><th>Offer</th><th>Setup due today</th><th>Daily fee</th><th>Full contract cost</th><th>Break-even saving per day</th></tr></thead>'+
        '<tbody><tr><th>Original</th><td>AED 7,200</td><td>AED 240</td><td>AED 50,400</td><td>AED 280</td></tr>'+
        '<tr><th>Split payment</th><td>AED 3,600</td><td>AED 270</td><td>AED 55,800</td><td>AED 310</td></tr></tbody></table></div>'+
        '<p class="fine">The split offer also requires AED 3,600 after 30 operating days. Reserving the price costs AED 1,000 today and holds it for seven days. Audit fees have already been spent.</p></section>':'');
      for(const id of ['guided','audit','components','evidence','shared','report-review','recommendation'])patch('#ws-'+id,'');
      patch('#ws-vote',!block?combinedVoteMarkup():'');
      return;
    }
    patch('#ws-confirmed',w.guidedRound1&&step.released?
      (step.mode==='company'?confirmedRound1+companyEvidenceMarkup():['audits','final'].includes(step.mode)?companyEvidenceMarkup():
        step.mode==='scored'?'<p class="ws-case-brief ws-confirmed" aria-hidden="true"><strong>Common example.</strong> Use the figures stated in each question. Every team uses this same scenario, regardless of which audits it bought.</p>':''):'');
    if(w.guidedRound1&&step.mode==='initial'){
      for(const slot of ['vote','components','evidence','audit','report-review','recommendation','shared'])patch('#ws-'+slot,'');
      patch('#ws-stage-heading','<div class="ws-page-heading"><h1>'+esc(step.label)+'</h1></div>');
      renderGuidedRound(step);
      return;
    }
    patch('#ws-guided','');
    const phase=step.phase,components=stepComponents(step),relevant=components.filter(c=>!notPurchased(c)),block=blockedStep(step);
    patch('#ws-stage-heading','<div class="ws-page-heading"><h1>'+esc(step.label)+'</h1><p>'+esc(isV2()?step.description:'Build the case together. Share what matters before submitting your team’s decision.')+'</p></div>');
    const available=components.filter(c=>c.packet&&c.unlocked);
    if(!available.some(c=>c.id===selectedPacket)){
      const openReports=w.guidedRound1&&step.mode==='audits'&&w.audit?available.filter(c=>c.audit):available;
      selectedPacket=openReports.find(c=>c.status!=='done')?.id||openReports[0]?.id||'';
    }
    const component=available.find(c=>c.id===selectedPacket),pending=relevant.find(c=>c.status!=='done'&&(c.owner?.ref===w.member.ref||c.covered&&w.member.isLeader));
    let title=block?.title||'Your next move',text=block?.text||'';
    if(!block&&!w.guidedRound1){
      if(step.mode==='scored'){title=state.analysis?'Save the common exercise answers':'Scored Round 3 is closed';text='These common questions are separate from your team’s evidence-limited business decision. Only the leader saves the scored answers.';}
      else if(component&&component.status!=='done')text='Review the '+roleName(component.role).toLowerCase()+' evidence, save your notes and share your finding.';
      else if(step.mode==='initial'&&!w.flow?.initialCommitted){title='Record your first recommendation';text='The leader records your team’s first choice below. Company reports stay locked until that choice is recorded.';}
      else if(step.mode==='audits'){title=w.flow.reportsReviewed?'Report review confirmed':w.audit?'Review your purchased reports':'Choose what to investigate';text=w.flow.reportsReviewed?'The final business offer is now available in the next step.':w.audit?'Read the purchased reports, share the findings, then ask the leader to confirm the team’s review below.':'The team leader records one audit plan below. No audit is a valid choice.';}
      else if(step.mode==='final'&&!w.flow.finalCommitted){title='Record the final business decision';text=w.timing?'Discuss the options as a team. Cast your own ballot and ask the leader to save the three decision checks.':'Use only your team’s evidence and cash ledger. The leader records the recommendation below before the common Round 3 exercise opens.';}
      else if(available.length){title='Your released work is complete';text='Review your team’s findings and any remaining decision below.';}
      else if(!w.member.isLeader&&!w.member.roles.length){title='Choose your role';text='Claim an available role in Your team to receive the evidence assigned to it.';}
      else if(pending){title='Your next component is waiting';text=pending.blockedReason||'Complete the earlier component first, then return here for the next released packet.';}
      else{title='Follow the team’s progress';text='Your role has no evidence to review in this step. Read shared findings and help the team reason through the decision.';}
    }
    patch('#ws-next',w.guidedRound1&&!block?guidedDirections(step,component):'<div class="ws-next '+(block?'is-waiting':'')+'"><div><strong>'+esc(title)+'</strong><p>'+esc(text)+'</p>'+(block?.to?'<button type="button" class="secondary ws-next-action" data-nav="'+esc(block.to)+'">'+esc(block.action)+'</button>':'')+(step.mode==='scored'&&w.flow?.reflectionAvailable?'<button type="button" class="secondary ws-next-action" data-resource="reflection">Write your individual reflection</button>':'')+'</div>'+(component?'<span class="ws-role-tag">'+esc(roleName(component.role))+'</span>':icon(block?'lock':'people'))+'</div>');
    patch('#ws-components',components.length&&!(w.guidedRound1&&step.mode==='audits')?'<details id="ws-responsibilities" class="ws-responsibilities" open><summary><span>Reports and assignments</span><span class="fine">'+relevant.filter(c=>c.status==='done').length+' / '+relevant.length+' complete</span></summary><div class="ws-component-list">'+components.map(c=>'<button type="button" class="ws-component '+(c.id===selectedPacket?'selected':'')+'" data-component="'+esc(c.id)+'" '+(!c.packet||!c.unlocked?'disabled':'')+'><span class="ws-component-icon">'+icon(c.status==='done'?'check':c.packet&&c.unlocked?'log':'lock')+'</span><span><strong>'+esc(c.label)+'</strong><small>'+esc(roleName(c.role))+' · '+esc(ownerName(c))+'</small>'+(!c.unlocked&&c.blockedReason?'<small>'+esc(c.blockedReason)+'</small>':'')+'</span><span class="ws-state">'+esc(notPurchased(c)?'Not purchased':c.status==='done'?'Complete':c.unlocked?statusName(c.status):c.released===false||block?'Locked':'Waiting')+'</span></button>').join('')+'</div></details>':'');
    if(step.mode==='final'&&w.timing){patch('#ws-vote',voteMarkup());patch('#ws-recommendation','');}
    else patch('#ws-vote','');
    renderEvidence(component);
    if(!isV2()||step.mode==='audits')renderAudit(phase);else patch('#ws-audit','');
    renderReportReview(step);
    if(!isV2()||step.mode==='initial'||step.mode==='final'&&!w.timing)renderRecommendation(phase);else patch('#ws-recommendation','');
    if(step.mode!=='scored'&&step.released)renderFindings(phase);else patch('#ws-shared','');
  }
  function renderGuidedRound(step){
    const w=current(),facts=w.facts;
    if(!facts){
      patch('#ws-next',directions('Before Round 1',['Read the case brief and check your role. Your instructor opens the fact cards when the round starts.'],
        '<button type="button" class="secondary" data-nav="case-brief">Read the case brief</button>'));
      patch('#ws-guided','');
      return;
    }
    const count=facts.filter(card=>card.values.length).length;
    const open=step.phase.status==='open'&&!state.finalized&&!state.endedEarly;
    const components=w.components.filter(c=>c.sequence===1&&c.packet);
    const own=components.find(c=>c.id===selectedPacket)||components.find(c=>c.status!=='done');
    const card=facts.find(f=>f.id===own?.id);
    const nextCard=components.find(c=>c.id!==own?.id&&c.status!=='done');
    const question=open&&state.analysis?.phase===step.phase.id;
    const ownCard=open&&card?jumpButton('ws-fact-card','Open my fact card',!question):'';
    patch('#ws-next',open?directions('Collect the facts and answer one team question',[
      components.some(c=>c.status!=='done')?'Read your assigned message, fill in every blank, and select Save facts.':
        'Check the team fact sheet. You can help a teammate find a detail in their own message.',
      w.member.isLeader?'Cover any empty roles. When all five cards show Saved, discuss the team question and save one answer for the group.':
        'When all five cards show Saved, discuss the team question. Your leader saves one answer for the group.'
    ],ownCard+(question?questionsButton('Open team question'):'')):
      directions('Round 1 closed',['Review the saved facts and discuss the team’s answer when your instructor asks.']));
    const list=facts.map(f=>{
      const component=w.components.find(c=>c.id===f.id),yours=f.owner?.ref===w.member.ref;
      const details=f.values.length?'<dl aria-hidden="true">'+f.prompts.map((p,i)=>'<div><dt>'+esc(p)+'</dt><dd>'+esc(f.values[i])+'</dd></div>').join('')+'</dl>':'';
      const control=yours?'<button class="secondary" type="button" data-component="'+esc(f.id)+'">'+(f.values.length?'View card':'Open my card')+'</button>':
        open&&component?.covered&&component.status==='todo'?'<button class="secondary" type="button" data-claim="'+esc(f.role)+'">Claim role</button>':'';
      return '<li><div class="ws-fact-title"><div><strong>'+esc(roleName(f.role))+'</strong><small>'+esc(f.owner?.name||'Awaiting a team leader')+(yours?' · You':'')+' · '+(f.values.length?'Saved':'Waiting')+'</small></div>'+control+'</div>'+details+'</li>';
    }).join('');
    const form=card?'<div id="ws-fact-card" class="ws-fact-work"><h3>'+esc(roleName(card.role))+' fact card</h3>'+
      '<div class="ws-fact-packet" aria-hidden="true"><h4>'+esc(own.packet.subject)+'</h4>'+own.packet.messages.map(m=>
        '<p><strong>'+esc(m.from)+' · '+esc(m.title)+'</strong></p><p>'+esc(m.body)+'</p>').join('')+'</div>'+
      (open?'<form data-fact-card="'+esc(card.id)+'"><div class="ws-fact-fields">'+card.prompts.map((prompt,i)=>{
        const id=card.id+'-'+i,stored=own.note?JSON.parse(own.note).facts:[],value=readDraft('fact:'+id,stored[i]??card.values[i]??'');
        return '<label for="ws-fact-'+id+'"><span aria-hidden="true">'+esc(prompt)+'</span><input aria-label="Fact '+(i+1)+'" id="ws-fact-'+id+'" data-fact="'+id+'" maxlength="100" required value="'+esc(value)+'"></label>';
      }).join('')+'</div><button data-mizan-deadline="round1">Save facts</button>'+(own.status==='done'&&nextCard?' <button type="button" class="secondary" data-component="'+esc(nextCard.id)+'">Next card</button>':'')+'<p class="fine">Your entries also save automatically.</p></form>':'')+'</div>':'';
    patch('#ws-guided','<section class="ws-audit-ledger">'+form+
      '<div class="ws-section-title"><h2>Team fact sheet</h2><strong>'+count+' / '+facts.length+' cards saved</strong></div>'+
      (open&&!question?'<p>The team question appears when all five cards are saved.</p>':'')+
      '<ul class="ws-fact-list">'+list+'</ul></section>');
  }
  function renderReportReview(step){
    const w=current(),f=w.flow||{};
    if(!isV2()||step.mode!=='audits'||!f.auditCommitted){patch('#ws-report-review','');return;}
    const reports=w.components.filter(c=>c.audit&&!notPurchased(c));
    if(w.guidedRound1){
      const links=reports.map(report=>'<li><div><strong>'+esc(report.audit==='savings'?'Savings audit':'Dispatch audit')+'</strong><span>'+esc(ownerName(report))+'</span></div>'+
        (report.packet&&report.unlocked?'<button type="button" class="secondary" data-report="'+esc(report.id)+'">Open results</button>':'')+'</li>').join('');
      const confirm=w.member.isLeader&&f.canReviewReports&&!state.endedEarly&&!state.finalized;
      patch('#ws-report-review','<section class="ws-review-gate"><h2>Finish audit review</h2>'+
        (links?'<ul class="ws-audit-owners">'+links+'</ul>':'')+
        (f.reportsReviewed?'<p>Your team’s review is recorded. The final offer is ready.</p><button type="button" data-nav="final-decision">Open final business decision</button>':
          '<p>Check the test statistic and the conclusion for each report your team bought.</p>'+
          (confirm?'<form id="ws-review-reports"><button type="submit">Finish audit review</button></form>':
            '<p class="fine">Your team leader selects Finish audit review when the team is ready.</p>'))+'</section>');
      return;
    }
    patch('#ws-report-review','<section class="ws-review-gate"><h2>'+(f.reportsReviewed?'Report review confirmed':'Confirm the team’s report review')+'</h2><p>'+(f.reportsReviewed?'Your team can now read the final offer and prepare its decision.':reports.length?'Ask the report owners to share their findings. When the team has reviewed the purchased evidence, the leader confirms that review to open the final offer.':'Your team chose no audit. The leader can confirm that choice and continue with the evidence already available.')+'</p>'+(reports.length?'<ul>'+reports.map(c=>'<li><strong>'+esc(c.label)+'</strong><span>'+esc(ownerName(c))+' · '+esc(statusName(c.status))+'</span>'+(c.owner?.ref===w.member.ref&&c.packet&&c.unlocked?'<button type="button" class="secondary ws-open-report" data-report="'+esc(c.id)+'">'+(c.status==='done'?'Review report again':'Open report')+' '+icon('arrow')+'</button>':'')+'</li>').join('')+'</ul>':'')+(f.reportsReviewed?'<button type="button" data-nav="final-decision">Open final business decision '+icon('arrow')+'</button>':w.member.isLeader&&f.canReviewReports&&!state.endedEarly&&!state.finalized?'<form id="ws-review-reports"><label class="ws-check-label"><input id="ws-reports-confirm" type="checkbox" required> '+(reports.length?'We have reviewed the purchased reports and discussed the relevant findings.':'We chose no audit and are ready to make the final decision using our available evidence.')+'</label><button type="submit">Confirm review &amp; open final offer</button></form>':'<p class="fine">The team leader confirms this review.</p>')+'</section>');
  }
  function renderEvidence(component){
    if(!component){patch('#ws-evidence','');return;}
    const w=current(),packet=component.packet,note=readDraft('component:'+component.id,componentNote(component));
    const readonly=state.finalized||component.editable===false;
    const task=w.guidedRound1?guidedReportTasks[component.id]||packet.task:packet.task;
    const compactAudit=w.guidedRound1&&!!component.audit;
    const messages=compactAudit?'<dl class="ws-audit-figures" aria-hidden="true">'+packet.figures.map(([label,value])=>
      '<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join('')+'</dl>':
      (packet.messages||[]).map(m=>'<article class="ws-message" aria-hidden="true"><div class="ws-message-top"><span class="ws-avatar">'+
      esc(initials(m.from))+'</span><div><strong>'+esc(m.from)+'</strong><span>'+esc(m.title||packet.channel||'Case message')+'</span></div>'+
      '</div><div class="ws-message-body">'+esc(m.body).split('\n').map(line=>'<p>'+line+'</p>').join('')+'</div></article>').join('');
    const complete=component.status==='done';
    const finishLabel=w.guidedRound1?(complete?'Report read':'Mark report read'):
      (complete?'Completed':component.covered&&w.member.isLeader?'Complete &amp; continue':'Mark complete');
    const share=readonly?'':'<button type="button" class="secondary" data-share-report="'+esc(component.id)+'">Share with team</button>';
    const status=readonly?'This report is read-only.':
      compactAudit?'Use this new sample on its own. You can tell the group your result aloud or send it in Team messages.':
      w.guidedRound1?(complete?'Report read. Notes stay with this report.':'Notes stay with this report. Mark it read when finished so the next report can open.'):
      (complete?'This work is complete. ':'')+'Notes stay with this report. Team messages reach all teammates.';
    const handoffTargets=w.members.filter(m=>m.ref!==w.member.ref&&(w.multiRole||m.isLeader||!m.roles.length||m.roles.includes(component.role)));
    const handoff=!readonly&&handoffTargets.length?'<details id="ws-handoff-'+esc(component.id)+'" class="ws-handoff">'+
      '<summary>Hand this role to a teammate</summary><p class="fine">The teammate receives '+esc(roleName(component.role))+' and its saved notes.</p>'+
      '<form data-handoff="'+esc(component.id)+'"><label for="ws-handoff-person-'+esc(component.id)+'">Teammate</label>'+
      '<select id="ws-handoff-person-'+esc(component.id)+'" required><option value="">Choose a teammate</option>'+
      handoffTargets.map(m=>'<option value="'+esc(m.ref)+'">'+esc(m.name)+'</option>').join('')+
      '</select><button class="secondary" type="submit">Save notes &amp; hand off</button></form></details>':'';
    patch('#ws-evidence','<section class="ws-evidence-section"><div class="ws-section-title"><h2>'+esc(compactAudit?
      (component.audit==='savings'?'Savings audit results':'Dispatch audit results'):'Your report')+'</h2><span class="ws-role-tag">'+
      esc(roleName(component.role))+'</span></div><div class="ws-assignment" aria-hidden="true"><strong>What to bring to your team</strong><p>'+
      esc(task||'Read the report and tell your teammates one finding that matters.')+'</p></div>'+
      (compactAudit?'':'<div class="ws-packet-heading" aria-hidden="true"><h3>'+esc(packet.subject||component.label)+'</h3><p>'+esc(packet.summary||'')+'</p></div>'+
      '<p class="ws-section-help">Read the case messages below. Use Share with team to send your takeaway to teammates.</p>')+messages+
      (packet.source&&!compactAudit?'<p class="ws-source" aria-hidden="true">Source · '+esc(packet.source)+'</p>':'')+
      (compactAudit?'<details id="ws-audit-notes-'+esc(component.id)+'"><summary>Write or share a calculation</summary>':'')+
      '<form class="ws-work-form" data-work="'+esc(component.id)+'" data-version="'+esc(component.version)+'">'+
      '<label for="ws-note-'+esc(component.id)+'">Working notes (optional)</label><textarea id="ws-note-'+esc(component.id)+'" name="note" maxlength="4000" '+
      (readonly?'readonly':'')+' placeholder="Keep your calculation or reasoning here.">'+esc(note)+'</textarea>'+
      '<div class="ws-work-footer"><span class="fine">'+esc(status)+'</span><div class="controls">'+share+
      '<button type="submit" class="secondary" name="intent" value="save" '+(readonly?'disabled':'')+'>Save notes</button>'+
      (compactAudit?'':'<button type="submit" name="intent" value="complete" '+(readonly||complete?'disabled':'')+'>'+finishLabel+'</button>')+
      '</div></div></form>'+(compactAudit?'</details>':handoff)+'</section>');
  }
  function renderFindings(phase){
    const w=current(),components=currentStep()?stepComponents(currentStep()):w.components.filter(c=>c.phase===phase.id),ids=new Set(components.map(c=>c.id));
    const findings=w.findings.filter(f=>!f.component||ids.has(f.component));
    const options=components.filter(c=>c.packet&&c.unlocked);
    patch('#ws-shared','<section class="ws-shared-section"><div class="ws-section-title"><h2>Team messages</h2></div><div class="ws-findings-list">'+(findings.length?findings.map(f=>findingMarkup(f)).join(''):'<p class="ws-empty">No messages yet.</p>')+'</div>'+(!state.endedEarly&&!state.finalized&&(isV2()?currentStep()?.released:phase.status!=='pending')&&state.status==='locked'&&!!w.leader?'<form id="ws-finding-form" class="ws-compose"><label for="ws-finding-text">Message for your team</label><textarea id="ws-finding-text" maxlength="1500" required placeholder="Share one result, a reason or a question for your team.">'+esc(readDraft('finding:'+selected))+'</textarea><div class="ws-compose-footer"><div><label class="sr-only" for="ws-finding-component">Report this message refers to</label><select id="ws-finding-component"><option value="">General team message</option>'+options.map(c=>'<option value="'+esc(c.id)+'">'+esc(c.label)+'</option>').join('')+'</select></div><button type="submit">Send to team '+icon('arrow')+'</button></div></form>':'')+'</section>');
  }
  function authorName(author){return typeof author==='string'?author:author?.name||'Team member';}
  function findingMarkup(f){return '<article class="ws-finding"><span class="ws-avatar small">'+esc(initials(authorName(f.author)))+'</span><div><div class="ws-item-meta"><strong>'+esc(authorName(f.author))+'</strong><time>'+esc(time(f.created))+'</time></div><p>'+esc(f.text)+'</p></div></article>';}
  function renderLog(){
    const w=current();
    const items=[...w.decisions.map(d=>({...d,type:d.kind||'Decision'})),...w.findings.map(f=>({...f,type:'Finding'}))].sort((a,b)=>new Date(a.created)-new Date(b.created));
    patch('#ws-log-items',items.length?'<ol class="ws-timeline">'+items.map(item=>'<li><span class="ws-timeline-dot"></span><div class="ws-item-meta"><span class="ws-log-type">'+esc(item.type)+'</span><strong>'+esc(authorName(item.author))+'</strong><time>'+esc(time(item.created))+'</time></div><p>'+esc(item.text)+'</p></li>').join('')+'</ol>':'<div class="ws-empty"><h2>Your shared record starts here</h2><p>Findings and saved decisions will appear here as your team works. The team leader can record the reasoning behind the team’s choices.</p></div>');
  }
  const money = value => 'AED '+Number(value||0).toLocaleString('en-US');
  function renderAudit(phase){
    const w=current(),audit=w.audit,options=w.auditOptions||[];
    if(!audit&&(!options.length||phase.sequence<2||phase.status==='pending')){patch('#ws-audit','');return;}
    if(w.guidedRound1){
      const names={savings:'Savings audit',dispatch:'Dispatch audit',both:'Both audits',none:'No audit'};
      if(audit){
        patch('#ws-audit','<section class="ws-audit-ledger"><h2>Audit selected</h2><p><strong>'+esc(names[audit.plan]||audit.plan)+
          '</strong> · '+money(audit.cost)+' spent · '+money(audit.cashRemaining)+' cash left</p></section>');
        return;
      }
      const purpose={savings:'Can savings cover the original contract’s full cost?',dispatch:'Is mean lateness below the 2-minute customer target?',both:'Check both the cost and customer-service questions'};
      const canChoose=w.member.isLeader&&!state.endedEarly&&!state.finalized;
      const choices=options.map(option=>'<tr><th scope="row">'+esc(option.label)+'</th><td>'+esc(purpose[option.id])+'</td><td>'+money(option.cost)+
        '</td><td>'+money(w.ledger.startingCash-option.cost)+'</td></tr>').join('');
      const form=canChoose?'<form id="ws-audit-form"><label for="ws-audit-plan">Which report will your team buy?</label>'+
        '<select id="ws-audit-plan" required><option value="">Choose one plan</option>'+options.map(option=>'<option value="'+esc(option.id)+'" '+
        (readDraft('audit-plan')===option.id?'selected':'')+'>'+esc(option.label)+'</option>').join('')+'</select>'+
        '<div class="controls"><button type="submit">Buy selected audit</button></div></form>':
        '<p class="fine">Discuss the choice. Your leader buys the selected report for the team.</p>';
      patch('#ws-audit','<section class="ws-audit-ledger"><h2>Choose an audit</h2><p>Your team has <strong>'+money(w.ledger.startingCash)+
        '</strong>. Buy at least one report. Your choice is final and uses the cash shown below.</p><div class="scroll"><table class="ws-audit-options"><caption>Audit choices</caption>'+
        '<thead><tr><th scope="col">Report</th><th scope="col">Purpose</th><th scope="col">Price</th><th scope="col">Cash left</th></tr></thead><tbody>'+choices+'</tbody></table></div>'+form+'</section>');
      return;
    }
    if(audit){
      patch('#ws-audit','<section class="ws-audit-ledger"><div class="ws-section-title"><h2>Team audit ledger</h2><span class="ws-simulation">Simulation</span></div><p>Your team’s recorded choice, separate from any worked classroom example.</p><div class="ws-ledger-row"><div><span>Audit choice</span><strong>'+esc(options.find(o=>o.id===audit.plan)?.label||audit.plan)+'</strong></div><div><span>Simulated cost</span><strong>'+money(audit.cost)+'</strong></div><div><span>After audits</span><strong>'+money(audit.cashRemaining)+'</strong></div></div><p class="ws-audit-reason">'+esc(audit.reason||'')+'</p><p class="fine">Recorded by '+esc(authorName(audit.author))+' · '+esc(time(audit.created))+'</p></section>');return;
    }
    const canChoose=w.member.isLeader&&!state.endedEarly&&!state.finalized&&!w.ledger?.final;
    patch('#ws-audit','<section class="ws-audit-ledger"><div class="ws-section-title"><h2>Audit choice</h2><span class="ws-simulation">Simulation</span></div><p>Your team has '+money(w.ledger?.startingCash)+' in the simulation. Compare the report prices and decide whether the information is worth spending the cash.</p>'+(canChoose?'<form id="ws-audit-form"><label for="ws-audit-plan">Audit plan</label><select id="ws-audit-plan" required><option value="">Choose a plan</option>'+options.map(o=>'<option value="'+esc(o.id)+'" '+(readDraft('audit-plan')===o.id?'selected':'')+'>'+esc(o.label)+' · '+money(o.cost)+' · '+money(w.ledger.startingCash-o.cost)+' left</option>').join('')+'</select><label for="ws-audit-reason">Why is this the right choice for your team?</label><textarea id="ws-audit-reason" required maxlength="2000">'+esc(readDraft('audit-reason'))+'</textarea><div class="ws-compose-footer"><p class="fine">Your team selects one plan. The reports you choose open after confirmation.</p><button type="submit">Confirm audit decision</button></div></form>':'<p class="fine">Your team leader records the team’s audit choice here.</p>')+'</section>');
  }
  function renderRecommendation(phase){
    const w=current(),kind=phase.sequence===1?'initial':phase.sequence===3?'final':null;
    if(!kind||(isV2()?kind==='final'?!w.flow.finalOfferReleased:!phase.businessReleased:phase.status==='pending')){patch('#ws-recommendation','');return;}
    const ledger=w.ledger||{},record=ledger[kind],options=w.decisionOptions?.[kind]||[],isFinal=kind==='final';
    const title=isFinal?'Final team recommendation':'First team recommendation';
    if(record){patch('#ws-recommendation','<section class="ws-audit-ledger ws-recommendation"><div class="ws-section-title"><h2>'+title+'</h2><span class="ws-simulation">Recorded</span></div><h3>'+esc(options.find(o=>o.id===record.choice)?.label||record.choice)+'</h3><p class="ws-audit-reason">'+esc(record.text)+'</p>'+(isFinal?'<div class="ws-ledger-row"><div><span>Simulated commitment</span><strong>'+money(record.cost)+'</strong></div><div><span>Cash remaining</span><strong>'+money(ledger.cashRemaining)+'</strong></div></div>':'')+'<p class="fine">'+esc(authorName(record.author))+' · '+esc(time(record.created))+'. This recorded choice stays in your team history.</p>'+(isFinal&&w.whatIf?'<button type="button" class="secondary" data-resource="whatif">Explore hypothetical outcomes</button>':'')+'</section>');return;}
    const canChoose=w.member.isLeader&&!state.finalized&&options.length&&(!isFinal||!!w.audit);
    const choice=readDraft('recommendation-choice:'+kind),option=options.find(o=>o.id===choice),remaining=ledger.cashRemaining||0;
    patch('#ws-recommendation','<section class="ws-audit-ledger ws-recommendation"><div class="ws-section-title"><h2>'+title+'</h2><span class="ws-simulation">Simulation</span></div><p>'+(isFinal?'Use your team’s own evidence and cash ledger. This choice is separate from the common worked example used in the scored questions.':'Record where your team stands before the next evidence is released. This first recommendation does not commit cash.')+'</p>'+(canChoose?'<form id="ws-recommendation-form" data-kind="'+kind+'"><label for="ws-recommendation-choice">Team action</label><select id="ws-recommendation-choice" required><option value="">Choose your recommendation</option>'+options.map(o=>'<option value="'+esc(o.id)+'" '+(choice===o.id?'selected':'')+' '+(isFinal&&o.cost>remaining?'disabled':'')+'>'+esc(o.label)+(isFinal?' · '+money(o.cost)+(o.cost>remaining?' · exceeds cash available':''):'')+'</option>').join('')+'</select>'+(isFinal?'<p id="ws-commit-preview" class="fine">'+(option?'Simulated cash after this action: '+money(remaining-option.cost):'Simulated cash available: '+money(remaining))+'. No real money is spent.</p>':'')+'<label for="ws-recommendation-reason">Evidence, reasoning and remaining risk</label><textarea id="ws-recommendation-reason" required maxlength="2000" placeholder="Explain your recommendation, the evidence and what could change your mind.">'+esc(readDraft('recommendation:'+kind))+'</textarea><div class="ws-compose-footer"><p class="fine">This is a one-time record. '+(isFinal?'The selected simulated cost is deducted from your team ledger.':(isV2()?'After audit review, record your final business recommendation before the common scored Round 3 exercise.':'Your team can record a separate final recommendation in Round 3.'))+'</p><button type="submit">Record '+(isFinal?'final':'first')+' recommendation</button></div></form>':'<p class="fine">'+(isFinal&&!w.audit?'First commit an audit plan, including no audit if appropriate.':state.finalized?'This session is finalized.':'Your team leader records the recommendation here.')+'</p>')+'</section>');
  }
  function renderBallotStatus(){
    const vote=state?.workspace?.vote;
    if(!vote)return;
    const draft=readDraft('ballot'),choice=draft||vote.own;
    const status=ctx.ballotStatus(choice);
    const pending=['saving','offline','retrying'].includes(status);
    const recorded=!!choice&&choice===vote.own&&!pending;
    if(recorded&&draft)removeDraft('ballot');
    const node=$('#ws-ballot-status');
    if(!node)return;
    let text='';
    if(status==='offline')text='Waiting for a connection to save your vote. Keep this page open.';
    else if(status==='retrying')text='Still confirming your vote. Keep this page open.';
    else if(pending)text='Saving your vote. Please wait for confirmation.';
    else if(recorded)text=vote.open?(vote.combined?'Vote recorded. Wait for the instructor to confirm the team’s choice.':'Vote recorded. Wait for your instructor to close voting.'):'Vote recorded.';
    else if(status==='rejected'&&vote.open)text='Your vote could not be saved. Try again while voting is open.';
    else if(choice)text='This choice has not been saved yet.';
    else if(vote.open)text='Choose an action to vote.';
    if(node.textContent!==text)node.textContent=text;
    const button=$('#ws-ballot-form button');
    if(button){
      button.disabled=pending||recorded||!choice||MizanClock.remaining()<=0;
      button.setAttribute('aria-busy',String(pending));
    }
  }
  function boardMarkup(){
    const w=current(),vote=w.vote,question=vote.boardQuestion,action=vote.choices.find(option=>option.id===vote.result?.choice);
    if(!question)return '<section class="ws-audit-ledger"><h2>Board recommendation</h2><p>No team action was recorded. Discuss the decision with your instructor.</p></section>';
    const selected=readDraft('final-board',vote.checks?.board||'');
    const saved=selected&&selected===vote.checks?.board;if(saved)removeDraft('final-board');
    const end=phaseNumber(3).status==='closed'||state.endedEarly||state.finalized;
    const editable=w.member.isLeader&&vote.boardOpen&&!end;
    const task={role:'leader',owner:w.leader,coveredByLeader:false};
    const options=question.options.map((option,index)=>'<label class="ws-board-option"><input type="radio" name="board" value="'+esc(option.id)+'" '+
      (option.id===selected?'checked ':'')+(editable?'':'disabled ')+'data-mizan-deadline="round3" required aria-label="Board option '+String.fromCharCode(65+index)+'"><span aria-hidden="true"><strong>'+String.fromCharCode(65+index)+'.</strong> '+esc(option.label)+'</span></label>').join('');
    return '<section class="ws-audit-ledger ws-board-question"><h2>Final board recommendation · 2 points</h2>'+responsibility(task)+
      '<p>Your confirmed action: <strong>'+esc(action.label)+'</strong>. Audit spending: '+money(w.ledger.auditCost)+'.</p>'+
      '<p aria-hidden="true">'+esc(question.label)+'</p><p>Check every clause against your confirmed action, the contract and the reports your team purchased.</p>'+
      (end?'<p>Your team earned <strong>'+(vote.result.earned??0)+' / 2 points</strong> on this question.</p><p>Your answer: '+esc(question.options.find(o=>o.id===vote.result.boardAnswer)?.label||'No saved answer')+'</p><p class="ws-confirmed"><strong>Defensible board message:</strong> '+esc(vote.result.explanation)+'</p>':
        '<form id="ws-board-form">'+TeamFields.assessmentNotice+'<fieldset><legend>Choose the message to Mariam</legend>'+options+'</fieldset>'+
        (editable?'<p class="receipt">'+(saved?'Board recommendation saved. You can revise while Round 3 is open.':'Your choice saves automatically. Wait for the saved confirmation.')+'</p><button data-mizan-deadline="round3">Save board recommendation</button>':
          !vote.boardOpen?'<p>The timer has ended. The last saved answer counts. Wait for your instructor.</p>':
          '<p>The leader saves the team’s answer. Check the cash, what the purchased evidence supports, and what remains uncertain.</p>')+'</form>')+'</section>';
  }
  function combinedVoteMarkup(){
    const w=current(),vote=w.vote;
    const header='<section class="ws-audit-ledger ws-vote"><h2>Final business decision</h2>';
    const balance=w.ledger.startingCash-w.ledger.auditCost;
    if(vote.closed&&w.finalStyle==='board')return boardMarkup();
    if(vote.closed){
      const action=vote.choices.find(choice=>choice.id===vote.result?.choice);
      if(!action)return header+'<p>The team has no recorded action. Discuss the decision with your instructor.</p></section>';
      const cash=vote.checks?.cash;
      const selected=readDraft('final-cash',cash==null?'':String(cash));
      const saved=cash!==null&&cash!==undefined&&String(cash)===selected;
      if(saved)removeDraft('final-cash');
      const options=TeamFields.choices(vote.cashChoices,selected,'id="ws-final-cash" aria-label="Cash left after the team action"',true,'Choose the cash left');
      const question='<p aria-hidden="true">Your team chose <strong>'+esc(action.label)+'</strong>. Cash after audits was <strong>'+money(balance)+
        '</strong>. This action costs <strong>'+money(action.cost)+'</strong> today. How much cash is left immediately after this action?</p>';
      const end=phaseNumber(3).status==='closed'||state.endedEarly||state.finalized;
      return header+'<p>Team choice confirmed. Your recorded vote was '+esc(vote.choices.find(choice=>choice.id===vote.own)?.label||'not submitted')+'.</p>'+question+
        (end?'<p>Final cash question · '+(vote.result.earned??0)+' / 2 points</p>'+
          '<p>Your team answered: <strong>'+(vote.result.cashAnswer==null?'No saved answer':money(vote.result.cashAnswer))+'</strong>.<br>Correct cash balance: <strong>'+money(vote.result.cashExpected)+'</strong>.</p>'+
          '<p class="fine">Subtract the paid audit and today’s payment from AED 10,000. Later instalments and daily licence fees are not due from this cash today.</p>':
          w.member.isLeader?'<form id="ws-cash-form">'+TeamFields.assessmentNotice+options+
            '<div class="ws-compose-footer"><span class="fine">'+(saved?'Cash answer saved.':'Choose one balance. Your choice saves automatically.')+
            '</span><button data-mizan-deadline="round3">Save cash answer</button></div></form>':
            '<p>Discuss the cash balance with your team. The leader selects and saves the answer.</p>'+
            '<ol class="case-answer-options" type="A" aria-hidden="true">'+vote.cashChoices.map(option=>'<li>'+esc(option.label)+'</li>').join('')+'</ol>')+'</section>';
    }
    if(!vote.questionsReady)return header+'<p>Finish and save all team MCQs to open voting.</p>'+questionsButton('Open team MCQs')+'</section>';
    if(!vote.open)return header+'<p>Voting time has ended. Wait for your instructor to confirm the team’s choice.</p></section>';
    const selected=readDraft('ballot',vote.own);
    return header+'<p>Discuss the action you recommend to Mariam, then vote on your own device. Your team has '+money(balance)+' after audits.</p>'+
      '<p class="fine">'+vote.cast+' / '+vote.eligible+' teammates have voted. The action with the most votes wins. A tie goes to the leader’s tied choice, then the tied action with the lowest payment today.</p>'+
      '<form id="ws-ballot-form"><fieldset><legend>Your recommended action</legend>'+vote.choices.map((choice,index)=>'<label class="ws-vote-option">'+
        '<input type="radio" name="ballot" aria-label="Vote option '+String.fromCharCode(65+index)+'" id="ws-vote-'+esc(choice.id)+'" value="'+esc(choice.id)+'" '+
        (choice.id===selected?'checked ':'')+(choice.cost>balance?'disabled':'')+' required><span aria-hidden="true">'+esc(choice.label)+' · '+money(choice.cost)+
        ' today'+(choice.cost>balance?' · exceeds available cash':'')+'</span></label>').join('')+'</fieldset>'+
      '<div class="ws-compose-footer"><span id="ws-ballot-status" role="status"></span><button data-mizan-deadline="round3">Save my vote</button></div></form></section>';
  }
  function voteMarkup(){
    const w=current(),vote=w.vote,choices=vote.choices;
    const selection=readDraft('ballot',vote.own);
    const header='<section class="ws-audit-ledger ws-vote"><h2>Team ballot</h2>';
    if(vote.closed){
      const result=vote.result,choice=choices.find(option=>option.id===result?.choice);
      const own=choices.find(option=>option.id===vote.own);
      return header+'<p>'+(own?'Your recorded vote: '+esc(own.label)+'.':'You have no recorded vote.')+
        (selection&&selection!==vote.own?' Your last selection was not saved before voting closed.':'')+'</p>'+
        (choice?'<h3>'+esc(choice.label)+'</h3><p>Cash remaining after this choice: '+money(w.ledger.cashRemaining)+'.</p>'+
        '<ul class="ws-vote-tally">'+choices.map(option=>'<li>'+esc(option.label)+' <strong>'+esc(result.tally[option.id]??0)+'</strong></li>').join('')+'</ul>':
        '<p>No ballots were received. No business action was recorded.</p>')+
        '<h3>Decision checks · '+(result?.earned??0)+' / '+vote.points+'</h3>'+
        (result?'<ul>'+result.checks.map(c=>'<li>'+esc(c.label)+' · '+(c.correct?'2 / 2':'0 / 2')+'</li>').join('')+'</ul>':'')+
        '<p class="fine">Decision points are included in your Round 3 total.</p></section>';
    }
    const receipt='<span id="ws-ballot-status" role="status"></span>';
    if(!vote.open)return header+'<p>'+(!w.flow.reportsReviewed?'The leader must confirm the report review first.':
      w.timing.voteStarted?'Voting time has ended. Wait for your instructor to close the ballot.':'Wait for your instructor to open the vote. Use the time to compare your choices.')+'</p>'+
      (w.timing.voteStarted?receipt:'')+'</section>';
    const remaining=w.ledger.cashRemaining;
    const stored=vote.checks||{};
    const checkField=(id,label,position,value)=>'<label for="ws-check-'+id+'" aria-hidden="true">'+label+'</label><input id="ws-check-'+id+
      '" aria-label="Decision answer '+position+'" type="number" min="0" max="100000" inputmode="decimal" step="0.01" required value="'+esc(readDraft('check:'+id,value??''))+'">';
    const evidenceChoices=[
      {id:'below_target',label:'There is evidence that mean lateness is below two minutes.'},
      {id:'insufficient',label:'There is insufficient evidence that mean lateness is below two minutes.'},
      {id:'all_orders',label:'The software ensures every order is dispatched no more than two minutes late.'}
    ];
    return header+'<p aria-hidden="true">Cash after audits: <strong>'+money(remaining)+'</strong>. Both contracts run for 180 operating days. The original costs AED 240 per day. The split offer costs AED 270 per day, with AED 3,600 due today and another AED 3,600 after 30 operating days. Discuss the evidence first, then cast one ballot on your device. You can change it while voting is open.</p>'+
      '<p class="fine">'+vote.cast+' / '+vote.eligible+' teammates have voted. Individual ballots stay private. The action with the most votes wins. A tie goes to the leader’s choice if it is tied, then to the tied option that costs the least today.</p>'+
      '<form id="ws-ballot-form"><fieldset><legend>Your business action</legend>'+choices.map((option,index)=>'<label class="ws-vote-option"><input type="radio" aria-label="Vote option '+String.fromCharCode(65+index)+'" id="ws-vote-'+esc(option.id)+'" name="ballot" value="'+esc(option.id)+'" required '+
        (selection===option.id?'checked ':'')+(option.cost>remaining?'disabled':'')+'><span aria-hidden="true">'+esc(option.label)+' · '+money(option.cost)+' today'+(option.cost>remaining?' · exceeds cash available':'')+'</span></label>').join('')+
      '</fieldset><div class="ws-compose-footer">'+receipt+'<button data-mizan-deadline="vote">Save my vote</button></div></form>'+
      '<div class="ws-decision-score"><h3>Team decision checks · '+vote.points+' points</h3><p>Each correct check earns 2 points. Any affordable action can earn full points. The leader enters one set of checks for the team.</p>'+
      (w.member.isLeader?'<form id="ws-checks-form">'+TeamFields.assessmentNotice+
        checkField('cash','If your team accepts the split-payment offer, how much cash will be left immediately after the first payment? (AED)',1,stored.cash)+
        checkField('extra-cost','How much more does the split-payment contract cost in total over 180 operating days than the original? (AED)',2,stored.extra_cost)+
        '<label for="ws-check-evidence" aria-hidden="true">At 5%, what does your team’s strongest available dispatch report support?</label>'+
        TeamFields.choices(evidenceChoices,readDraft('check:evidence',stored.evidence),'id="ws-check-evidence" aria-label="Decision answer 3"',true,'Choose one conclusion')+
        '<div class="ws-compose-footer"><span class="fine">'+(vote.checks?'Decision checks saved.':'Save these before time is up.')+'</span><button data-mizan-deadline="vote">Save decision checks</button></div></form>':'')+'</div></section>';
  }
  function renderScore(){
    patch('#ws-score','<section class="ws-score-section"><h3>Team answers</h3><p>Only the team leader submits. Shared notes and findings are not scored answers.</p>'+(state.analysis?'<button type="button" class="secondary ws-score-link" data-answer>View current questions '+icon('arrow')+'</button>':'<p class="fine">'+(isV2()?'Scored questions appear after the required team decisions and instructor release.':'Questions appear when your instructor opens a round.')+'</p>'+(isV2()?'<button type="button" class="secondary ws-score-link" data-nav="'+esc(nextStep().id)+'">See required next step '+icon('arrow')+'</button>':''))+(current().ledger?'<div class="ws-cash-summary"><span>'+(current().combinedFinal&&(current().vote.cashOpen||current().vote.boardOpen)?'Cash before team action':'Simulated cash remaining')+'</span><strong>'+money(current().combinedFinal&&(current().vote.cashOpen||current().vote.boardOpen)?current().ledger.startingCash-current().ledger.auditCost:current().ledger.cashRemaining)+'</strong><small>Audit spending: '+money(current().ledger.auditCost)+'<br>Contract commitment: '+money(current().ledger.contractCost)+'</small></div>':'')+'<ul class="ws-score-list">'+state.rounds.map(r=>'<li><span>'+esc(r.label)+'</span><strong>'+esc(r.earned==null?statusName(r.status):r.earned+' / '+r.possible)+'</strong></li>').join('')+'</ul></section>');
  }
  function sectionsMarkup(resource){
    return (resource.sections||[]).map(section=>'<section class="ws-resource-section"><h3>'+esc(section.title)+'</h3>'+(section.body?'<p>'+esc(section.body)+'</p>':'')+(section.bullets?.length?'<ul>'+section.bullets.map(text=>'<li>'+esc(text)+'</li>').join('')+'</ul>':'')+(section.table?'<div class="ws-reference-table" role="region" aria-label="'+esc(section.table.caption||section.title)+'" tabindex="0"><table><caption>'+esc(section.table.caption||section.title)+'</caption><thead><tr>'+section.table.columns.map(column=>'<th scope="col">'+esc(column)+'</th>').join('')+'</tr></thead><tbody>'+section.table.rows.map(row=>'<tr>'+row.map((cell,index)=>index===0?'<th scope="row">'+esc(cell)+'</th>':'<td>'+esc(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'')+'</section>').join('');
  }
  function renderResource(mode){
    const w=current();resourceMode=mode;
    const resource=mode==='reflection'?(w.flow?.reflectionAvailable?{title:'Individual reflection',sections:[],reflectionPrompt:w.reflectionPrompt}:null):mode==='debrief'?w.debrief:mode==='whatif'?w.whatIf:w.references;
    if(!resource){$('#ws-resource-dialog').close();return false;}
    $('#ws-resource-title').textContent=resource.title||'Reference';
    let body=resource.sourceLabel?'<p class="ws-source" aria-hidden="true">'+esc(resource.sourceLabel)+'</p>':'';
    if(mode==='whatif')body+=whatIfMarkup(resource);
    else body+=sectionsMarkup(resource);
    if(['debrief','reflection'].includes(mode)&&(resource.reflectionPrompt||w.reflectionPrompt)&&w.flow?.reflectionAvailable){
      body+='<section class="ws-resource-section"><h3>Your individual reflection</h3><p>'+esc(resource.reflectionPrompt||w.reflectionPrompt)+'</p><form id="ws-reflection-form"><label for="ws-reflection-text">Your reflection</label><textarea id="ws-reflection-text" required maxlength="2000">'+esc(readDraft('reflection',w.reflection?.text||''))+'</textarea><div class="ws-compose-footer"><span class="fine">'+(w.reflection?'Saved '+esc(time(w.reflection.updated))+'. You can revise your individual record.':'Visible to you and your instructor, not your teammates or team leader.')+'</span><button type="submit">Save reflection</button></div></form></section>';
    }
    patch('#ws-resource-body',body);
    if(mode==='whatif')updateWhatIf();
    return true;
  }
  function whatIfMarkup(config){
    const saving=readDraft('whatif-saving',config.savings.initial),lateness=readDraft('whatif-lateness',config.lateness.initial);
    return '<p>'+esc(config.description)+'</p><div class="ws-hypothetical">Hypothetical, not scored. These assumptions do not change your recorded choice or cash ledger and do not establish population values.</div><div class="ws-whatif-inputs"><label for="ws-whatif-saving">Assumed mean daily gross saving <output id="ws-saving-label" for="ws-whatif-saving"></output></label><input id="ws-whatif-saving" type="range" min="'+esc(config.savings.min)+'" max="'+esc(config.savings.max)+'" step="'+esc(config.savings.step)+'" value="'+esc(saving)+'"><label for="ws-whatif-lateness">Assumed population mean lateness <output id="ws-lateness-label" for="ws-whatif-lateness"></output></label><input id="ws-whatif-lateness" type="range" min="'+esc(config.lateness.min)+'" max="'+esc(config.lateness.max)+'" step="'+esc(config.lateness.step)+'" value="'+esc(lateness)+'"></div><div id="ws-whatif-results" aria-live="polite"></div><ul class="ws-whatif-notes">'+(config.notes||[]).map(text=>'<li>'+esc(text)+'</li>').join('')+'</ul>';
  }
  function updateWhatIf(){
    const config=current().whatIf;if(!config||!$('#ws-whatif-saving'))return;
    const saving=Number($('#ws-whatif-saving').value),lateness=Number($('#ws-whatif-lateness').value),days=Number(config.operatingDays),setup=Number(config.setupCost),audit=Number(current().ledger?.auditCost||0);
    const amount=n=>'AED '+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    $('#ws-saving-label').textContent=amount(saving);$('#ws-lateness-label').textContent=lateness.toFixed(1)+' minutes';
    const offers=[['Original offer',Number(config.originalDailyFee)],['Split setup offer',Number(config.splitDailyFee)]];
    const rows=[['Assumed daily licence',fee=>amount(fee)],['Full setup cost',()=>amount(setup)],['Team audit spending',()=>amount(audit)],['Hypothetical project net over '+days+' days',fee=>amount(days*(saving-fee)-setup-audit)],['Forward break-even gross saving / day',fee=>amount(fee+setup/days)],['Project break-even including audits / day',fee=>amount(fee+setup/days+audit/days)]];
    patch('#ws-whatif-results','<div class="ws-reference-table" role="region" aria-label="Hypothetical contract comparison" tabindex="0"><table><caption>Hypothetical contract comparison</caption><thead><tr><th scope="col">Measure</th>'+offers.map(([label])=>'<th scope="col">'+esc(label)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(([label,calculate])=>'<tr><th scope="row">'+esc(label)+'</th>'+offers.map(([,fee])=>'<td>'+calculate(fee)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="ws-hypothetical">At the assumed mean of '+lateness.toFixed(1)+' minutes, lateness is '+(lateness<config.dispatchTarget?'below':lateness===config.dispatchTarget?'equal to':'above')+' the stated target of '+esc(config.dispatchTarget)+' minutes. This is an assumed mean, not a guarantee for each order or a statistical conclusion.</p>');
  }
  function onClick(event){
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.hasAttribute('data-close-resource')){$('#ws-resource-dialog').close();return;}
    if(button.dataset.resource){if(renderResource(button.dataset.resource))$('#ws-resource-dialog').showModal();return;}
    if(button.id==='ws-mobile-team'||button.dataset.nav==='team'){
      const panel=$('.ws-inspector');
      panel.scrollIntoView({behavior:'smooth',block:'start'});
      panel.focus({preventScroll:true});
      return;
    }
    if(button.hasAttribute('data-recovery-code')){shell.classList.remove('navigation-open');$('#ws-menu').setAttribute('aria-expanded','false');return;}
    if(button.id==='ws-menu'){const open=shell.classList.toggle('navigation-open');button.setAttribute('aria-expanded',String(open));return;}
    if(button.dataset.nav==='case-brief'){go('overview');focusCaseBrief();return;}
    if(button.dataset.nav&&current().member.isObserver){go(['overview','team-room','log','my-work'].includes(button.dataset.nav)?button.dataset.nav:'observer-work');return;}
    if(button.dataset.nav){
      const target=button.dataset.stageJump;
      go(current().combinedFinal&&button.dataset.nav==='final-decision'?phaseNumber(3).id:button.dataset.nav);
      if(target)jumpTo(target);
      return;
    }
    if(button.dataset.jump){jumpTo(button.dataset.jump);return;}
    if(button.hasAttribute('data-answer')){
      reviewQuestions=true;
      const phase=state.analysis?.phase;
      if(phase&&selected!==phase)go(phase);else if(phase)render(state,ctx,true);
      if(phase)jumpTo('analysis-panel');
      return;
    }
    if(current().member.isObserver)return;
    if(button.dataset.shareReport){
      const id=button.dataset.shareReport,report=current().auditReports?.find(r=>r.id===id);
      let text;
      if(report){
        const form=button.closest('[data-audit-work]');
        const statistic=form?.querySelector('[data-audit-stat]').value||'',conclusion=form?.querySelector('[data-audit-conclusion]').value||'';
        if(!statistic.trim()||!conclusion){setFlash('Enter the test statistic and choose a conclusion before sharing.',true);return;}
        text=auditNote(report,statistic,conclusion);
      }else text=$('#ws-note-'+id)?.value?.trim();
      if(!text){setFlash('Write your finding in this report before sharing it.',true);return;}
      send('workspace-finding',{component:id,text},'Sharing this finding…','Finding shared. You can continue in this report.',button);
      return;
    }
    if(button.dataset.report||button.dataset.component){
      const id=button.dataset.report||button.dataset.component;
      const report=current().components.find(c=>c.id===id);
      if(!report?.packet||!report.unlocked||report.owner?.ref!==current().member.ref)return;
      if(button.dataset.stage&&button.dataset.stage!==selected)go(button.dataset.stage);
      selectedPacket=id;renderStage();
      jumpTo(current().combinedFinal&&report.audit?'ws-audit-report-'+id:current().guidedRound1&&currentStep()?.mode==='initial'?'ws-fact-card':'ws-evidence');
      return;
    }
    if(button.hasAttribute('data-lead')){send('lobby-captain',{},'Claiming team leadership…','You are now the team leader.',button);return;}
    if(button.dataset.claim){send('workspace-claim',{role:button.dataset.claim},'Claiming role…','Role claimed. Your released work is ready.',button);return;}
    if(button.dataset.release){send('workspace-release',{role:button.dataset.release,toMember:current().leader.ref},'Releasing role…','Role released. Remaining work returns to the team leader.',button);}
  }
  function onInput(event){
    if(current()?.member.isObserver)return;
    const field=event.target,form=field.closest('form');
    if(form?.dataset.auditWork){
      const report=current().auditReports.find(r=>r.id===form.dataset.auditWork);
      if(!report)return;
      const statistic=form.querySelector('[data-audit-stat]').value,conclusion=form.querySelector('[data-audit-conclusion]').value;
      saveDraft('audit-stat:'+report.id,statistic);saveDraft('audit-conclusion:'+report.id,conclusion);
      const note=auditNote(report,statistic,conclusion),last=current().findings.filter(f=>f.component===report.id).at(-1);
      const share=form.querySelector('[data-share-report]');
      share.disabled=!statistic.trim()||!conclusion||last?.text===note;
      share.textContent=last?.text===note?'Shared with team':'Share with team';
      form.querySelector('[data-audit-save-status]').textContent=statistic.trim()&&conclusion?
        'Saving your finding…':'Your draft saves automatically. Complete both fields to share.';
      signatures.delete('#ws-evidence');
      queueAuditReport(report,statistic,conclusion);
      return;
    }
    if(form?.dataset.work){
      const id=form.dataset.work,note=field.value;
      saveDraft('component:'+id,note);
      signatures.delete('#ws-evidence');
      if(current().guidedRound1)ctx.queueSave('notes:'+id,'workspace-component',(data,version)=>{
        const card=data?.workspace?.components.find(item=>item.id===id);
        if(!card?.editable||card.sequence===1)return null;
        return {component:id,version,note,status:card.status==='done'?'done':'in_progress'};
      },current().components.find(item=>item.id===id)?.version);
    }
    if(field.dataset.fact){
      const id=form.dataset.factCard;
      selectedPacket=id;
      const values=[...form.querySelectorAll('[data-fact]')].map(input=>input.value);
      saveDraft('fact:'+field.dataset.fact,field.value);
      signatures.delete('#ws-guided');
      ctx.queueSave('facts:'+id,'workspace-component',(data,version)=>{
        const card=data.workspace?.components.find(item=>item.id===id);
        if(data.workspace?.timing?.clock?.stage!=='round1'||!card?.editable)return null;
        return {component:id,version,facts:values,draft:true};
      },current().components.find(item=>item.id===id)?.version);
    }
    if(field.id==='ws-reflection-text'){saveDraft('reflection',field.value);signatures.delete('#ws-resource-body');}
    if(field.id==='ws-whatif-saving'){saveDraft('whatif-saving',field.value);updateWhatIf();}
    if(field.id==='ws-whatif-lateness'){saveDraft('whatif-lateness',field.value);updateWhatIf();}
    if(field.id==='ws-finding-text'){saveDraft('finding:'+selected,field.value);signatures.delete('#ws-shared');}
    if(field.id==='ws-channel-message')saveDraft('channel-message',field.value);
    if(field.id==='ws-decision-text')saveDraft('decision',field.value);
    if(field.name==='ballot'){
      const choice=field.value;
      saveDraft('ballot',choice);signatures.delete('#ws-vote');
      if(current().guidedRound1)ctx.queueBallot(choice);
      else renderBallotStatus();
    }
    if(field.name==='board'){saveDraft('final-board',field.value);signatures.delete('#ws-vote');ctx.queueBoard(field.value);}
    if(form?.dataset.ideaStage&&field.tagName==='TEXTAREA')saveDraft('idea:'+form.dataset.ideaStage,field.value);
    if(field.id==='ws-final-cash'){
      saveDraft('final-cash',field.value);signatures.delete('#ws-vote');
      if(field.value)ctx.queueCash(Number(field.value));
    }
    if(field.id.startsWith('ws-check-')){
      saveDraft('check:'+field.id.slice(9),field.value);signatures.delete('#ws-vote');
      const amount=id=>{
        const n=form.querySelector(id).valueAsNumber;
        return Number.isFinite(n)&&n>=0&&n<=100000?n:null;
      };
      const payload={cash:amount('#ws-check-cash'),extraCost:amount('#ws-check-extra-cost'),
        evidence:form.querySelector('#ws-check-evidence').value||null,draft:true};
      if(current().guidedRound1)ctx.queueSave('checks','workspace-decision-checks',
        data=>data.workspace?.vote?.open&&data.workspace.member.isLeader?payload:null);
    }
    if(field.id==='ws-audit-reason'){saveDraft('audit-reason',field.value);signatures.delete('#ws-audit');}
    if(field.id==='ws-recommendation-reason'){saveDraft('recommendation:'+form.dataset.kind,field.value);signatures.delete('#ws-recommendation');}
  }
  function onChange(event){
    if(current()?.member.isObserver)return;
    if(event.target.id==='ws-audit-plan')saveDraft('audit-plan',event.target.value);
    if(event.target.id==='ws-recommendation-choice'){
      saveDraft('recommendation-choice:'+event.target.closest('form').dataset.kind,event.target.value);
      renderRecommendation(currentStep().phase);
    }
  }
  function onSubmit(event){
    const form=event.target;if(!form.closest('#mizan-workspace'))return;
    if(current().member.isObserver){event.preventDefault();return;}
    const button=event.submitter;
    if(['ws-question-idea','ws-my-question-idea'].includes(form.id)){
      event.preventDefault();const text=form.querySelector('textarea').value.trim(),question=form.querySelector('select').value;
      send('workspace-finding',{text:'[Round '+form.dataset.ideaRound+' '+question+'] '+text},'Sharing idea…','Idea shared with your team. Continue working here.',button,()=>{removeDraft('idea:'+form.dataset.ideaStage);form.querySelector('textarea').value='';});
      return;
    }
    if(form.id==='ws-board-form'){event.preventDefault();ctx.queueBoard(new FormData(form).get('board'),true);return;}
    if(form.id==='ws-channel-form'){
      event.preventDefault();const text=$('#ws-channel-message').value.trim();
      send('workspace-finding',{text},'Sending message…','Message sent to your team.',button,()=>{removeDraft('channel-message');$('#ws-channel-message').value='';});
      return;
    }
    if(form.dataset.auditWork){event.preventDefault();return;}
    if(form.dataset.factCard){
      event.preventDefault();
      const card=current().components.find(c=>c.id===form.dataset.factCard);
      const fields=[...form.querySelectorAll('[data-fact]')];
      send('workspace-component',{component:card.id,version:card.version,facts:fields.map(input=>input.value)},
        'Saving facts…','Facts saved to the team sheet.',button,()=>{
          fields.forEach(input=>removeDraft('fact:'+input.dataset.fact));
          selectedPacket='';
        });
    }else if(form.id==='ws-ballot-form'){
      event.preventDefault();
      ctx.queueBallot(new FormData(form).get('ballot'),true);
    }else if(form.id==='ws-checks-form'){
      event.preventDefault();
      send('workspace-decision-checks',{cash:$('#ws-check-cash').valueAsNumber,extraCost:$('#ws-check-extra-cost').valueAsNumber,
        evidence:$('#ws-check-evidence').value},'Saving the decision checks…','Team decision checks saved.',button,()=>{
        ['cash','extra-cost','evidence'].forEach(id=>removeDraft('check:'+id));
      });
    }else if(form.id==='ws-cash-form'){
      event.preventDefault();
      ctx.queueCash(Number($('#ws-final-cash').value),true);
    }else if(form.id==='ws-review-reports'){
      event.preventDefault();send('workspace-review-reports',{confirmed:true},'Confirming report review…','Review confirmed. You are ready for Round 3.',button,
        ()=>{selected=current().combinedFinal?phaseNumber(3).id:'final-decision';selectedPacket='';});
    }else if(form.id==='ws-reflection-form'){
      event.preventDefault();send('workspace-reflection',{text:$('#ws-reflection-text').value,version:current().reflection?.version||0},'Saving reflection…','Your individual reflection is saved.',button,()=>removeDraft('reflection'));
    }else if(form.dataset.work){
      event.preventDefault();const component=current().components.find(c=>c.id===form.dataset.work),complete=button?.value==='complete',note=form.querySelector('textarea').value;
      send('workspace-component',{component:component.id,version:component.version,note,status:complete?'done':component.status==='done'?'done':'in_progress'},
        complete?'Saving report status…':'Saving working notes…',complete?'Report marked read.':'Notes saved. Use Share with team to tell your teammates.',
        button,()=>{removeDraft('component:'+component.id);if(complete)selectedPacket='';});
    }else if(form.id==='ws-finding-form'){
      event.preventDefault();const text=$('#ws-finding-text').value,component=$('#ws-finding-component').value,phase=selected;
      send('workspace-finding',{text,...(component?{component}:{})},'Sending your message…','Message sent to your team.',button,()=>{
        const draft='finding:'+phase;
        if(readDraft(draft)!==text)return;
        removeDraft(draft);
        const input=$('#ws-finding-text');
        if(phase===selected&&input?.value===text)input.value='';
      });
    }else if(form.id==='ws-decision-form'){
      event.preventDefault();send('workspace-decision',{text:$('#ws-decision-text').value},'Recording decision…','Team decision recorded.',button,()=>removeDraft('decision'));
    }else if(form.id==='ws-recommendation-form'){
      event.preventDefault();const kind=form.dataset.kind;
      send('workspace-decision',{kind,choice:$('#ws-recommendation-choice').value,text:$('#ws-recommendation-reason').value},'Recording recommendation…','Recommendation recorded in your team ledger.',button,()=>{removeDraft('recommendation:'+kind);removeDraft('recommendation-choice:'+kind);});
    }else if(form.id==='ws-audit-form'){
      event.preventDefault();send('workspace-audit',{plan:$('#ws-audit-plan').value,reason:$('#ws-audit-reason')?.value||''},
        'Opening the audit results…','Audit purchased. Calculate the test result from the figures below.',button,
        ()=>{removeDraft('audit-reason');removeDraft('audit-plan');selectedPacket='';});
    }else if(form.hasAttribute('data-leader-handoff')){
      event.preventDefault();send('workspace-transfer-leader',{toMember:Number(form.querySelector('select').value)},'Transferring leadership…','Team leadership transferred. Your saved work stays with the team.',button);
    }else if(form.dataset.handoff){
      event.preventDefault();const component=current().components.find(c=>c.id===form.dataset.handoff),toMember=Number(form.querySelector('select').value),note=$('#ws-note-'+component.id).value;
      ctx.handoff({component:component.id,version:component.version,note,status:component.status==='done'?'done':'in_progress'},toMember,button,()=>removeDraft('component:'+component.id));
    }
  }
  return {render,setFlash,renderBallotStatus,syncState:data=>{state=data;}};
})();
