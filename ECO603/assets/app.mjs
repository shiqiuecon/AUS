import {dagInitialState} from './dag.mjs?v=cf000bedae04';
import {data,escapeHTML as e,typeset,url} from './common.mjs?v=82d1f092741c';
import {graph,graphKinds,captions,scenarioCaptions,chartControls,schoolOverlay} from './graphs.mjs?v=1c3647611397';
import {bindDAGExplorer,dagExplorerHTML} from './dag-explorer.mjs?v=9f5239def987';
import {openExperiment} from './experiment-view.mjs?v=603b840f3bb6';
import {bindPlotControls,plotAction} from './plot-controls.mjs?v=d9f4538d6c10';
import {playVisualChanges,visualSnapshot} from './visual-reveals.mjs?v=73e3f1f37c3d';
import {courseLocation} from './course-location.mjs?v=776a6a7a44ca';
const {params,key,previous}=courseLocation(data,location.search),lesson=data.lessons[key];
const $=s=>document.querySelector(s);
let index=Math.max(0,Math.min(lesson.slides.length-1,(Math.trunc(Number(previous?.slide??params.get('slide')))||1)-1));
let step=0,value=0,initialGraphValue=0,frame=0,animating=false,progress=1,paragraph=0,reading=false,speed=1,timer=0,following=true,highlights=true,ended=false;
let dagExplorer=null,paintPlotControl=null;
let graphCue=null,graphReveal=null;
const current=()=>lesson.slides[index];
const coreCount=lesson.delivery.core;
const inAppendix=()=>index>=coreCount;
const routeStart=()=>inAppendix()?coreCount:0;
const routeEnd=()=>inAppendix()?lesson.slides.length-1:coreCount-1;
const routeName=()=>inAppendix()?'Appendix':'Core lesson';
const practiceStatus=()=>index===routeEnd()?'Work through the practice to finish this section.':'Work through the practice, then select Next.';
const audio=lesson.narration?new Audio():null;
let audioFrame=0,audioRequest=0,desiredTime=0,deferredSeek=false,seenEvents=-1,finishing=false;
const track=lesson.narration?.src;
const storedTrack=track==='__INLINE_AUDIO__'?null:track&&url(/^(blob:|data:)/.test(track)?track:`${track}?v=${data.revision}`);
const seekControl=$('#audio-seek'),timeLabel=$('#audio-time');
let displayedClip,displayedTick=-1,displayedSecond=-1;
if(audio){
 audio.preload='none';audio.preservesPitch=true;
 const download=$('#audio-download');
 download.download=`ECO603_${key}.m4a`;
 if(storedTrack)download.href=storedTrack;
 else{
  download.href='#';
  download.addEventListener('click',()=>download.href=window.ECO603_AUDIO(),{once:true});
 }
}
const voiceMode=()=>!!audio&&!!current().narration&&!!$('#voice-enabled')?.checked;
const clock=t=>`${Math.floor(Math.max(0,t)/60)}:${String(Math.floor(Math.max(0,t)%60)).padStart(2,'0')}`;
const audioPosition=()=>deferredSeek||!audio.readyState||audio.seeking?desiredTime:audio.currentTime;
function seekAudio(relative,defer=false){
 if(!audio||!current().narration)return;
 const c=current().narration;desiredTime=c.offset+Math.max(0,Math.min(c.duration,relative));
 deferredSeek=defer;
 if(audio.hasAttribute('src')&&!defer&&Math.abs(audio.currentTime-desiredTime)>.002)audio.currentTime=desiredTime;
 displayedTick=-1;
 invalidateGraphCue();
 updateAudio(desiredTime-c.offset,false);
}
function paintAudioTime(clip,time){
 if(displayedClip!==clip){
  displayedClip=clip;displayedTick=-1;displayedSecond=-1;
  seekControl.max=clip.duration;
 }
 const tick=Math.round(time*10),second=Math.floor(time);
 if(tick!==displayedTick){seekControl.value=time;displayedTick=tick;}
 if(second!==displayedSecond){
  const elapsed=clock(time),total=clock(clip.duration);
  timeLabel.textContent=`${elapsed} / ${total}`;
  seekControl.setAttribute('aria-valuetext',`${elapsed} of ${total}`);
  displayedSecond=second;
 }
}
function setGraphValue(next){
 if(current().kind==='causal'){
  value={conditioned:[...next.conditioned],extra:next.extra};
 }else{
  value=next;
  const control=$('#graph-input');if(control)control.value=value;
 }
}
function updateAudio(relative,animate=relative===undefined&&reading&&!audio?.paused){
 const c=current().narration;if(!c)return;
 const time=relative??Math.max(0,Math.min(c.duration,audio.currentTime-c.offset));
 graphReveal?.advance(time);
 paintAudioTime(c,time);
 const threshold=time+.02;
 let part=0;
 for(const cue of c.cues){if(cue.time>threshold)break;part=cue.paragraph;}
 const events=c.events||[];
 let count=0;
 while(count<events.length&&events[count].time<=threshold)count++;
 if(count===seenEvents&&part===paragraph)return;
 seenEvents=count;
 focusParagraph(part,part!==paragraph);
 const latest=events.slice(0,count).reverse();
 const cue=latest.find(ev=>ev.target==='graph')||null;
 if(cue!==graphCue&&graphKinds.has(current().kind)){
  graphCue=cue;
  const stepEvent=latest.find(ev=>ev.dag||ev.step!==undefined);
  const valueEvent=latest.find(ev=>Number.isFinite(ev.value));
  step=Math.min(stepLimit(),stepEvent?.dag?.step??stepEvent?.step??0);
  setGraphValue(stepEvent?.dag??valueEvent?.value??initialGraphValue);
  progress=1;
  // Normal playback follows measured word onsets. A seek displays the
  // complete state at the new position, including in a paused recording.
  const transition=animate&&cue?.time>0?{time,start:cue.time,duration:cue.duration,replay:cue.replay}:null;
  updateGraph(transition);
 }
 paintSpokenHighlights(c,part,latest);
}
function paintSpokenHighlights(clip,part,latest){
 const point=latest.find(ev=>ev.target==='point'&&ev.time>=clip.cues[part].time-.03);
 if(point&&highlights){document.querySelectorAll('.point-current').forEach(n=>n.classList.remove('point-current'));document.querySelectorAll('#slide-body .concept-line')[point.part]?.classList.add('point-current');}
 document.querySelectorAll('.spoken-row').forEach(n=>n.classList.remove('spoken-row'));
 const row=latest.find(ev=>ev.target==='row');
 if(row&&highlights)document.querySelectorAll('.stata-row').forEach(n=>{if(n.textContent.trim().startsWith(row.row))n.classList.add('spoken-row');});
}
function finishAudioSlide(){
 if(finishing||!reading)return;finishing=true;
 const practice=!!current().exercise;stopReading();
 if(practice){$('#reading-status').textContent=practiceStatus();}
 else if(index<routeEnd()&&$('#auto-advance').checked){
  goTo(index+1,false);
  if(current().exercise)$('#reading-status').textContent='Practice: take time to work through the question.';
  else startAudio();
 }else if(index===routeEnd()){ended=true;stopReading();$('#reading-status').textContent=`End of ${routeName().toLowerCase()}`;}
 finishing=false;
}
function tickAudio(){
 if(!reading||!voiceMode())return;
 if(audio.seeking){audioFrame=requestAnimationFrame(tickAudio);return;}
 const c=current().narration;updateAudio();
 if(audio.currentTime>=c.offset+c.duration-.025){finishAudioSlide();return;}
 audioFrame=requestAnimationFrame(tickAudio);
}
async function startAudio(){
 if(!voiceMode())return;
 const c=current().narration,request=++audioRequest,slideIndex=index;
 const position=audioPosition();
 stopAnimation();
 try{
  if(!audio.hasAttribute('src'))audio.src=storedTrack||window.ECO603_AUDIO();
  if(position<c.offset-.05||position>=c.offset+c.duration-.05)seekAudio(0);
  else if(deferredSeek||!audio.readyState)seekAudio(position-c.offset);
  else updateAudio(Math.max(0,position-c.offset),false);
  reading=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');audio.playbackRate=speed;
  await audio.play();
  if(request!==audioRequest||!reading||slideIndex!==index)return;
  cancelAnimationFrame(audioFrame);audioFrame=requestAnimationFrame(tickAudio);
 }
 catch{if(request!==audioRequest)return;stopReading();$('#reading-status').textContent='Audio could not play. Select Play to retry, or turn Narration off to read along.';}
}
if(audio){
 audio.addEventListener('loadedmetadata',()=>{if(!deferredSeek&&Math.abs(audio.currentTime-desiredTime)>.002)audio.currentTime=desiredTime;});
 audio.addEventListener('timeupdate',()=>{if(reading&&voiceMode()&&!audio.seeking){updateAudio();if(audio.currentTime>=current().narration.offset+current().narration.duration-.025)finishAudioSlide();}});
 audio.addEventListener('seeked',()=>{if(voiceMode()&&!deferredSeek)updateAudio(undefined,false);});
 audio.addEventListener('ended',finishAudioSlide);
 audio.addEventListener('error',()=>{if(reading){stopReading();$('#reading-status').textContent='Audio could not load. Select Play to retry.';}});
}

const stepLimit=()=>current().steps??({schools:1,dag:2,counterfactual:2,adjustment:1,residual:1,serial:1,traffic:1}[current().kind]||0);
function stopAnimation(){cancelAnimationFrame(frame);animating=false;const p=$('#animate');if(p)p.textContent='Animate reveal';}
function stopReading(){audioRequest++;clearTimeout(timer);cancelAnimationFrame(audioFrame);if(audio&&!audio.paused)audio.pause();reading=false;$('#play').textContent=ended?'Play again':voiceMode()?'Play':'Read along';$('#play').setAttribute('aria-pressed','false');}
function clearGraphReveal(){graphReveal?.stop();graphReveal=null;}
function invalidateGraphCue(){seenEvents=-1;graphCue=null;clearGraphReveal();}
function updateGraph(transition){
 const s=current(),stage=$('.graph-stage');if(!stage)return;
 clearGraphReveal();
 const previous=transition?visualSnapshot(stage):null;
 if(dagExplorer)dagExplorer.render(value,step,undefined,undefined,graphCue?.edges);
 else{
  const overlay=progress===1&&stage.querySelector('[data-school-overlay][data-complete="true"]');
  if(overlay)overlay.innerHTML=schoolOverlay(overlay.dataset.schoolOverlay,step,value);
  else stage.innerHTML=graph(s.kind,step,value,progress,s.graph);
  paintPlotControl?.(value,step);
 }
 if(previous)graphReveal=playVisualChanges(stage,previous,transition);
 const out=$('#control-value');
 if(out)out.textContent=s.kind==='chart'?(s.graph.scenario==='sampling'?`n = ${value<.5?100:1000}`:s.graph.scenario==='panel'?`State ${[...new Set(data.datasets.panel.map(r=>r.state))][value]}`:String(value)):s.kind==='fit'?`Slope ${Number(value).toFixed(2)}`:s.kind==='residual'?`District ${value}`:s.kind==='arsim'?`Persistence ${Number(value).toFixed(2)}`:`L = ${value}`;
}
function showVisual(){
 const s=current(),visual=$('#visual'),activity=data.activities?.[key]?.[index+1];
 dagExplorer?.dispose();dagExplorer=null;paintPlotControl=null;
 if(s.kind==='output')visual.innerHTML=`<pre class="stata" tabindex="0" aria-label="Actual Stata output">${s.output.split("\n").map(line=>`<span class="stata-row">${e(line)}</span>`).join("")}</pre>${s.output_note?`<p class="graph-caption">${e(s.output_note)}</p>`:''}`;
 else if(!graphKinds.has(s.kind))visual.innerHTML='';
 else buildGraph(s,visual);
 if(activity){
  const button=document.createElement('button');
  button.type='button';button.className='activity-button';button.textContent=activity.label;
  button.addEventListener('click',()=>{
   stopReading();stopAnimation();clearGraphReveal();
   const context=activity.kind==='ols'?{spec:data.dags.fork,state:{conditioned:['C'],extra:false}}:{};
   openExperiment(activity.kind,activity.prompt,context);
  });
  visual.append(button);
 }
}
function buildGraph(s,visual){
 value=s.kind==='causal'?dagInitialState(data.dags[s.graph.id]):0;
 const scenario=s.graph?.scenario||s.kind;
 let controls='<button id="zoom-graph" type="button" aria-pressed="false">Enlarge graph</button>';
 const config={fit:['Candidate slope',-5,1,.01,data.stats.school_simple.slope],residual:['Choose district',1,420,1,40],arsim:['Error persistence',-.9,.95,.05,.65],hac:['Maximum covariance lag',0,12,1,4]}[s.kind]||chartControls[s.graph?.scenario]||(s.graph?.scenario==='arsim'?['Error persistence',-.9,.95,.05,.65]:null);
 if(config){value=config[4];controls+=`<label for="graph-input">${config[0]}</label><input id="graph-input" type="range" min="${config[1]}" max="${config[2]}" step="${config[3]}" value="${value}"><output id="control-value" for="graph-input"></output>`;}
 initialGraphValue=value;
 if(['schools','serial','traffic'].includes(s.kind)||['ovb','fwl','retail','ivfirst','traffic'].includes(s.graph?.scenario))controls+='<button id="animate" type="button">Animate reveal</button>';
 controls+='<button id="reset-graph" type="button">Reset graph</button>';
 const spec=s.kind==='causal'?data.dags[s.graph.id]:null;
 const caption=s.kind==='chart'?(scenarioCaptions[scenario]||captions[scenario]):captions[s.kind];
 const hint=plotAction(scenario);
 visual.innerHTML=`${spec?dagExplorerHTML(spec,s.graph.id,value,'lesson-dag'):`<div class="graph-stage"></div><p class="graph-caption">${e(caption)}</p>${hint?`<p class="plot-action">${e(hint)}</p>`:''}`}<div class="graph-control">${controls}</div>`;
 const pauseGraph=()=>{
  if(reading)stopReading();
  if(animating)stopAnimation();
  invalidateGraphCue();
 };
 if(spec)dagExplorer=bindDAGExplorer(visual,{
  spec,id:s.graph.id,prefix:'lesson-dag',initial:value,step,
  onChange:next=>{pauseGraph();value=next;step=2;focusParagraph(paragraph,false);},
  onInteract:pauseGraph,onResize:fitSlide
 });
 const controlStep={ovb:1,didHeadStart:4,didConditional:2,residual:1,penalty:1}[scenario]??0;
 function choose(nextValue,byPlot=false){
  pauseGraph();
  const nextStep=byPlot&&scenario==='validation'?0:Math.max(step,controlStep);
  if(value===nextValue&&step===nextStep&&progress===1)return;
  step=nextStep;
  progress=1;setGraphValue(nextValue);updateGraph();
 }
 const input=$('#graph-input');
 input?.addEventListener('input',ev=>choose(Number(ev.target.value)));
 paintPlotControl=bindPlotControls($('.graph-stage'),scenario,input,v=>choose(v,true));
 $('#reset-graph').onclick=()=>{
  pauseGraph();step=0;progress=1;setGraphValue(initialGraphValue);
  dagExplorer?.reset(step);updateGraph();
 };
 $('#animate')?.addEventListener('click',()=>{
  stopReading();invalidateGraphCue();
  if(animating){stopAnimation();return;}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){progress=1;step=1;updateGraph();return;}
  animating=true;$('#animate').textContent='Pause animation';const began=performance.now();
  const tick=now=>{progress=Math.min(1,(now-began)/5000);updateGraph();if(progress<1)frame=requestAnimationFrame(tick);else stopAnimation();};frame=requestAnimationFrame(tick);
 });
 updateGraph();
 $('#zoom-graph').onclick=()=>{const on=$('.graph-stage').classList.toggle('zoomed');$('#zoom-graph').setAttribute('aria-pressed',String(on));$('#zoom-graph').textContent=on?'Fit graph':'Enlarge graph';};
}
function focusParagraph(i,scroll=true){
 const buttons=[...document.querySelectorAll('.script-paragraph')];if(!buttons.length)return;
 paragraph=Math.max(0,Math.min(buttons.length-1,i));
 buttons.forEach((b,j)=>{b.classList.toggle('active',j===paragraph);if(j===paragraph)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
 document.querySelectorAll('.point-current').forEach(n=>n.classList.remove('point-current'));
 if(highlights){
  const lines=[...document.querySelectorAll('#slide-body .concept-line')],words=new Set(buttons[paragraph].textContent.toLowerCase().match(/[a-z]{4,}/g)||[]);
  let target=$('#visual .graph-stage')||$('#visual .stata')||$('#lead:not([hidden])')||$('#slide-title'),best=0;
  for(const line of lines){const score=(line.textContent.toLowerCase().match(/[a-z]{4,}/g)||[]).filter(w=>words.has(w)&&!['that','this','with','from','when','have','than','which','their'].includes(w)).length;if(score>best){target=line;best=score;}}
  target?.classList.add('point-current');
 }
 if(scroll&&following){const b=buttons[paragraph].getBoundingClientRect(),c=$('#script').getBoundingClientRect();if(b.top<c.top+8||b.bottom>c.bottom-8)$('#script').scrollTo({top:$('#script').scrollTop+b.top-c.top-10,behavior:'auto'});}
 $('#reading-status').textContent=`Paragraph ${paragraph+1} / ${buttons.length}`;
}
function scheduleReading(){
 clearTimeout(timer);if(!reading)return;
 const count=(current().script.split('\n\n')[paragraph].match(/\S+/g)||[]).length;
 timer=setTimeout(()=>{
  if(!reading)return;
  if(paragraph+1<current().script.split('\n\n').length){focusParagraph(paragraph+1);scheduleReading();}
  else if(current().exercise||!$('#auto-advance').checked){stopReading();$('#reading-status').textContent=current().exercise?practiceStatus():'End of slide';}
  else if(index<routeEnd()){
   const next=index+1;goTo(next,false);
   if(current().exercise){$('#reading-status').textContent='Practice: take time to work through the question.';return;}
   reading=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');scheduleReading();
  }else{ended=true;stopReading();$('#reading-status').textContent=`End of ${routeName().toLowerCase()}`;}
 },Math.max(3000,count/150*60000/speed));
}
function readAlong(){if(reading){stopReading();return;}if(ended){ended=false;goTo(routeStart(),false);}if(voiceMode()){startAudio();return;}reading=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');focusParagraph(paragraph);scheduleReading();}
function render(){
 stopAnimation();invalidateGraphCue();step=0;progress=1;paragraph=0;
 const s=current();
 $('#meeting-label').textContent=`${key}. ${lesson.title}`;
 $('#slide-title').textContent=s.title;$('#lead').textContent=s.lead;
 $('#lead').hidden=!s.lead||s.lead===s.title;
 $('#script').innerHTML=s.script.split('\n\n').map((p,j)=>`<button type="button" class="script-paragraph" id="script-${key}-${index+1}-${j+1}" data-paragraph="${j+1}" aria-label="Focus paragraph ${j+1}">${e(p)}</button>`).join('');
 $('#script').scrollTop=0;
 $('#script').querySelectorAll('.script-paragraph').forEach((b,j)=>b.onclick=()=>{focusParagraph(j);if(voiceMode()){seekAudio(current().narration.cues[j].time);startAudio();}else if(reading)scheduleReading();});
 $('#slide-body').innerHTML=s.body.length?`<div class="concept-lines">${s.body.map((b,j)=>`<div class="concept-line" data-part="${j+1}">${e(b)}</div>`).join('')}</div>`:'';
 $('#slide-exercise').innerHTML=s.exercise?`<div class="exercise"><h3>Try it before revealing</h3><p>${e(s.exercise)}</p>${s.answer?`<details><summary>Reveal explanation</summary><p>${e(s.answer)}</p></details>`:''}</div>`:'';
 const position=index-routeStart()+1,count=routeEnd()-routeStart()+1;
 $('#route-label').textContent=s.appendix||routeName();
 $('#appendix-toggle').textContent=inAppendix()?'Back to core':'Open appendix';
 $('#position').textContent=`${position} / ${count}`;
 $('#previous').disabled=index===routeStart();$('#next').disabled=index===routeEnd();$('#step').disabled=index===routeEnd()&&stepLimit()===0&&!s.answer;
 $('#slide-picker').value=String(index);
 $('#slide-seek').min=routeStart()+1;$('#slide-seek').max=routeEnd()+1;$('#slide-seek').value=index+1;
 $('#slide-seek').setAttribute('aria-valuetext',`${routeName()}, slide ${position} of ${count}, ${s.title}`);
 $('#script-slide-title').textContent=`${index+1}. ${s.title}`;
 for(const sel of ['#full-script','#script-link'])$(sel).href=url(`transcript_${key}.html?v=${data.revision}#slide-${index+1}`);
 $('#slides-pdf').href=url(`downloads/meeting_${key}_slides.pdf?v=${data.revision}`);
 $('#download-offline').href=url(`downloads/meeting_${key}_offline.zip?v=${data.revision}`);$('#download-offline').download=`ECO603_${key}_Offline.zip`;
 $('#topic-practice').href=url(`practice.html?week=${Number(key)}&v=${data.revision}`);$('#do-file').href=url(`downloads/meeting_${key}.do?v=${data.revision}`);
 for(const [top,option] of [['#lesson-pdf','#slides-pdf'],['#lesson-offline','#download-offline'],['#lesson-practice','#topic-practice']])$(top).href=$(option).href;
 try{history.replaceState(null,'',`?meeting=${key}&slide=${index+1}&v=${data.revision}`);}catch{}
 document.title=`${key} · ${index+1}. ${s.title} · ECO 603`;
 showVisual();typeset(document.querySelector('.workspace'));focusParagraph(0,false);
 $('#voice-enabled').disabled=!audio;seekControl.disabled=!voiceMode();
 $('.audio-progress').hidden=!voiceMode();
 $('#audio-download').hidden=!audio;
 // Reset visual cues without requesting audio while browsing paused slides.
 if(voiceMode())seekAudio(0,true);
 $('#slide-viewport').scrollTo(0,0);fitSlide();document.fonts.ready.then(fitSlide);
}
function fitSlide(){
 const view=$('#slide-viewport'),slide=view.querySelector('.slide'),z=Number($('#zoom').value),mobile=innerWidth<=720;
 slide.style.zoom='1';slide.style.width=`${view.clientWidth-6}px`;slide.style.marginLeft='0';
 const available=Math.max(300,innerHeight-355),natural=slide.scrollHeight;
 const readable=dagExplorer ? .85 : 0;
 const fit=mobile?1:Math.max(readable,Math.min(1,available/natural)),scale=fit*z;
 slide.style.zoom=String(scale);slide.style.marginLeft=z===1?`${Math.max(0,(view.clientWidth-(view.clientWidth-6)*scale)/2/scale)}px`:'0';
 view.classList.toggle('slide-zoomed',z>1);view.dataset.fitScale=String(fit);
}
function goTo(n,focus=true){ended=false;stopReading();index=Math.max(0,Math.min(lesson.slides.length-1,n));render();if(focus)$('#slide-title').focus({preventScroll:true});}
function moveWithinRoute(offset){const target=index+offset;if(target>=routeStart()&&target<=routeEnd())goTo(target);}
function nextStep(){
 stopReading();
 if(step<stepLimit()){
  stopAnimation();invalidateGraphCue();step++;
  const cue=current().narration?.events.find(ev=>ev.manual&&(ev.dag?.step??ev.step)===step);
  if(cue){
   graphCue=cue;
   if(cue.dag||Number.isFinite(cue.value))setGraphValue(cue.dag??cue.value);
  }
  updateGraph({duration:cue?.duration,replay:cue?.replay});return;
 }
 const practice=$('#slide-exercise details');
 if(practice&&!practice.open){practice.open=true;return;}
 moveWithinRoute(1);
}
function showScript(visible){document.body.classList.toggle('focus',!visible);$('#toggle-script').textContent=visible?'Hide script':'Show script';$('#toggle-script').setAttribute('aria-expanded',String(visible));$('#transcript-toggle').setAttribute('aria-expanded',String(visible));requestAnimationFrame(fitSlide);}
$('#previous').onclick=()=>moveWithinRoute(-1);$('#next').onclick=()=>moveWithinRoute(1);$('#step').onclick=nextStep;
$('#play').onclick=readAlong;$('#restart').onclick=()=>goTo(routeStart());
$('#appendix-toggle').onclick=()=>goTo(inAppendix()?0:coreCount);
const plan=$('#class-plan-dialog');
$('#class-outcome').textContent=lesson.delivery.outcome;
$('#class-blocks').innerHTML=lesson.delivery.blocks.map(block=>
 `<li><button type="button" data-block-slide="${block.slide}"><strong>${e(block.time)}</strong> ${e(block.task)}</button></li>`
).join('');
plan.querySelectorAll('[data-block-slide]').forEach(button=>button.onclick=()=>{
 plan.close();goTo(Number(button.dataset.blockSlide)-1);
});
$('#class-practice').href=url(`practice.html?week=${Number(key)}&v=${data.revision}`);
$('#class-plan').onclick=()=>{stopReading();plan.showModal();};
$('#close-plan').onclick=()=>plan.close();
$('#speed').onchange=()=>{speed=Number($('#speed').value);if(audio)audio.playbackRate=speed;if(reading&&!voiceMode())scheduleReading();};
$('#audio-seek').oninput=()=>seekAudio(Number($('#audio-seek').value),!reading);
$('#voice-enabled').onchange=()=>{stopReading();clearGraphReveal();$('.audio-progress').hidden=!voiceMode();$('#audio-seek').disabled=!voiceMode();if(voiceMode())seekAudio(current().narration.cues[paragraph].time,true);stopReading();};
const slideOptions=lesson.slides.map((s,i)=>`<option value="${i}">${i+1}. ${e(s.title)}</option>`);
$('#slide-picker').innerHTML=`<optgroup label="Core lesson">${slideOptions.slice(0,coreCount).join('')}</optgroup><optgroup label="Appendix">${slideOptions.slice(coreCount).join('')}</optgroup>`;
$('#slide-picker').onchange=()=>goTo(Number($('#slide-picker').value));
$('#slide-seek').oninput=()=>goTo(Number($('#slide-seek').value)-1);
$('#lesson-picker').innerHTML=data.course.map(c=>`<option value="${String(c.week).padStart(2,'0')}">${String(c.week).padStart(2,'0')}. ${e(c.title)}</option>`).join('');$('#lesson-picker').value=key;$('#lesson-picker').onchange=()=>{location.href=url(`lesson.html?meeting=${$('#lesson-picker').value}&v=${data.revision}`);};
$('#toggle-script').onclick=()=>showScript(document.body.classList.contains('focus'));$('#transcript-toggle').onclick=$('#toggle-script').onclick;$('#close-script').onclick=()=>showScript(false);
$('#follow-script').onchange=()=>{following=$('#follow-script').checked;focusParagraph(paragraph);};
$('#point-highlights').onchange=()=>{
 highlights=$('#point-highlights').checked;
 focusParagraph(paragraph,false);
 const clip=current().narration;
 const latest=voiceMode()?clip.events.filter(event=>event.time<=audioPosition()-clip.offset+.02).reverse():[];
 if(clip)paintSpokenHighlights(clip,paragraph,latest);
};
$('#zoom').onchange=()=>{fitSlide();$('#slide-viewport').scrollTo(0,0);};
window.addEventListener('resize',fitSlide);
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#reading-status').textContent='Use your browser’s full-screen command to expand this view.';}};
document.addEventListener('fullscreenchange',()=>{$('#fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
$('#read-transcript').onclick=()=>{stopReading();$('#transcript-title').textContent=`${index+1}. ${current().title}`;$('#transcript-text').innerHTML=current().script.split('\n\n').map(p=>`<p>${e(p)}</p>`).join('');typeset($('#transcript-text'));$('#transcript-dialog').showModal();};$('#close-transcript').onclick=()=>$('#transcript-dialog').close();
const viewport=$('#slide-viewport');let drag=null;
viewport.addEventListener('pointerdown',ev=>{if(!viewport.classList.contains('slide-zoomed')||ev.target.closest('input,select,button,a,summary,textarea,[data-dag-node],[data-plot-target]'))return;drag={x:ev.clientX,y:ev.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(ev.pointerId);viewport.classList.add('panning');});
viewport.addEventListener('pointermove',ev=>{if(!drag)return;viewport.scrollLeft=drag.left+drag.x-ev.clientX;viewport.scrollTop=drag.top+drag.y-ev.clientY;});
const release=()=>{drag=null;viewport.classList.remove('panning');};viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
document.addEventListener('keydown',ev=>{if(document.querySelector('dialog[open]')||ev.target.closest('input,textarea,select,button,summary,a,[role="button"]'))return;if(ev.code==='Space'){ev.preventDefault();readAlong();}if(ev.key==='ArrowRight'||ev.key==='PageDown'){ev.preventDefault();moveWithinRoute(1);}if(ev.key==='ArrowLeft'||ev.key==='PageUp'){ev.preventDefault();moveWithinRoute(-1);}if(ev.key==='Home'){ev.preventDefault();goTo(routeStart());}if(ev.key==='End'){ev.preventDefault();goTo(routeEnd());}if(ev.key==='ArrowDown'){ev.preventDefault();nextStep();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopReading();stopAnimation();}});
window.ECODeck=Object.freeze({getState:()=>({index,step,paragraph,playing:reading,speed,slides:lesson.slides.length,mode:voiceMode()?'audio':'reading',audioTime:audio?Math.max(0,audioPosition()-(current().narration?.offset||0)):0,audioDuration:current().narration?.duration||0,audioStatus:audio?{ready:audio.readyState,seeking:audio.seeking,paused:audio.paused,seekable:[...Array(audio.seekable.length)].map((_,i)=>[audio.seekable.start(i),audio.seekable.end(i)])}:null,dagState:current().kind==='causal'?value:null}),goTo:(i)=>goTo(i),play:readAlong,pause:stopReading,focusParagraph,metadata:()=>lesson.slides.map(s=>({title:s.title,script:s.script,kind:s.kind}))});
render();
