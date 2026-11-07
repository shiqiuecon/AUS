import {dagInitialState,dagControlHTML,dagPathHTML} from './dag.mjs?v=50e65922206d';
import {data,escapeHTML as e,typeset,url} from './common.mjs?v=f31c2011ad1e';
import {graph,graphKinds,captions,scenarioCaptions,chartControls} from './graphs.mjs?v=ae18502977a9';
const params=new URLSearchParams(location.search),first=Object.keys(data.lessons)[0];
const requested=params.get('meeting')||first,key=Object.hasOwn(data.lessons,requested)?requested:first,lesson=data.lessons[key];
const $=s=>document.querySelector(s);
let index=Math.max(0,Math.min(lesson.slides.length-1,(Number(params.get('slide'))||1)-1));
let step=0,value=0,frame=0,animating=false,progress=1,paragraph=0,reading=false,speed=1,timer=0,following=true,highlights=true,ended=false;
const current=()=>lesson.slides[index];
const stepLimit=()=>current().steps??({schools:1,dag:2,counterfactual:2,adjustment:1,residual:1,serial:1,traffic:1}[current().kind]||0);
function stopAnimation(){cancelAnimationFrame(frame);animating=false;const p=$('#animate');if(p)p.textContent='Animate reveal';}
function stopReading(){clearTimeout(timer);reading=false;$('#play').textContent=ended?'Read again':'Read along';$('#play').setAttribute('aria-pressed','false');}
function updateGraph(){
 const s=current(),stage=$('.graph-stage');if(!stage)return;
 stage.innerHTML=graph(s.kind,step,value,progress,s.graph);
 if(s.kind==='causal'){const paths=$('#dag-paths');if(paths){paths.innerHTML=dagPathHTML(data.dags[s.graph.id],value);typeset(paths);}}
 const out=$('#control-value');
 if(out)out.textContent=s.kind==='chart'?(s.graph.scenario==='sampling'?`n = ${value<.5?100:1000}`:s.graph.scenario==='panel'?`State ${[...new Set(data.datasets.panel.map(r=>r.state))][value]}`:String(value)):s.kind==='fit'?`Slope ${Number(value).toFixed(2)}`:s.kind==='residual'?`District ${value}`:s.kind==='arsim'?`Persistence ${Number(value).toFixed(2)}`:`L = ${value}`;
 focusParagraph(paragraph,false);
}
function showVisual(){
 const s=current();
 if(s.kind==='output'){$('#visual').innerHTML=`<pre class="stata" tabindex="0" aria-label="Actual Stata output">${e(s.output)}</pre>${s.output_note?`<p class="graph-caption">${e(s.output_note)}</p>`:''}`;return;}
 if(!graphKinds.has(s.kind)){$('#visual').innerHTML='';return;}
 if(s.kind==='causal')value=dagInitialState(data.dags[s.graph.id]);
 let controls='<button id="zoom-graph" type="button" aria-pressed="false">Enlarge graph</button>';
 const config={fit:['Candidate slope',-5,1,.01,data.stats.school_simple.slope],residual:['Choose district',1,420,1,40],arsim:['Error persistence',-.9,.95,.05,.65],hac:['Maximum covariance lag',0,12,1,4]}[s.kind]||chartControls[s.graph?.scenario]||(s.graph?.scenario==='arsim'?['Error persistence',-.9,.95,.05,.65]:null);
 if(config){value=config[4];controls+=`<label for="graph-input">${config[0]}</label><input id="graph-input" type="range" min="${config[1]}" max="${config[2]}" step="${config[3]}" value="${value}"><output id="control-value" for="graph-input"></output>`;}
 if(['schools','serial','traffic'].includes(s.kind)||['ovb','fwl','retail','ivfirst','traffic'].includes(s.graph?.scenario))controls+='<button id="animate" type="button">Animate reveal</button>';
 if(s.kind==='causal')controls+=dagControlHTML(data.dags[s.graph.id],value,'lesson-dag');
 controls+='<button id="reset-graph" type="button">Reset graph</button>';
 $('#visual').innerHTML=`<div class="graph-stage"></div><p class="graph-caption">${e(s.kind==='chart'?(scenarioCaptions[s.graph.scenario]||captions[s.graph.scenario]):captions[s.kind])}</p><div class="graph-control">${controls}</div>${s.kind==='causal'?'<details class="path-analysis"><summary>Trace the paths</summary><ul id="dag-paths"></ul></details>':''}`;
 $('#visual').querySelectorAll('[data-condition],[data-dag-extra]').forEach(el=>el.onchange=()=>{value={conditioned:[...$('#visual').querySelectorAll('[data-condition]:checked')].map(n=>n.dataset.condition),extra:!!$('#visual [data-dag-extra]')?.checked};step=2;updateGraph();fitSlide();});
 $('#graph-input')?.addEventListener('input',ev=>{stopAnimation();value=Number(ev.target.value);updateGraph();});
 $('#reset-graph').onclick=()=>{stopAnimation();step=0;progress=1;if(s.kind==='causal'){value=dagInitialState(data.dags[s.graph.id]);$('#visual').querySelectorAll('[data-condition]').forEach(el=>el.checked=value.conditioned.includes(el.dataset.condition));const extra=$('#visual [data-dag-extra]');if(extra)extra.checked=value.extra;}updateGraph();};
 $('#animate')?.addEventListener('click',()=>{
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
  let target=$('#visual .graph-stage')||$('#visual .stata')||$('#lead'),best=0;
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
  else if(index+1<lesson.slides.length){
   const next=index+1;goTo(next,false);
   if(current().exercise){$('#reading-status').textContent='Practice: take time to work through the question.';return;}
   reading=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');scheduleReading();
  }else{ended=true;stopReading();$('#reading-status').textContent='End of lesson';}
 },Math.max(3000,count/150*60000/speed));
}
function readAlong(){if(reading){stopReading();return;}if(ended){ended=false;goTo(0,false);}reading=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');focusParagraph(paragraph);scheduleReading();}
function render(){
 stopAnimation();step=0;progress=1;paragraph=0;
 const s=current();
 $('#meeting-label').textContent=`${key}. ${lesson.title}`;
 $('#slide-title').textContent=s.title;$('#lead').textContent=s.lead;
 $('#script').innerHTML=s.script.split('\n\n').map((p,j)=>`<button type="button" class="script-paragraph" id="script-${key}-${index+1}-${j+1}" data-paragraph="${j+1}" aria-label="Focus paragraph ${j+1}">${e(p)}</button>`).join('');
 $('#script').scrollTop=0;
 $('#script').querySelectorAll('.script-paragraph').forEach((b,j)=>b.onclick=()=>{focusParagraph(j);if(reading)scheduleReading();});
 $('#slide-body').innerHTML=s.body.length?`<div class="concept-lines">${s.body.map((b,j)=>`<div class="concept-line" data-part="${j+1}">${e(b)}</div>`).join('')}</div>`:'';
 $('#slide-exercise').innerHTML=s.exercise?`<div class="exercise"><h3>Try it before revealing</h3><p>${e(s.exercise)}</p>${s.answer?`<details><summary>Reveal explanation</summary><p>${e(s.answer)}</p></details>`:''}</div>`:'';
 $('#position').textContent=`${index+1} / ${lesson.slides.length}`;
 $('#previous').disabled=index===0;$('#next').disabled=index===lesson.slides.length-1;$('#step').disabled=index===lesson.slides.length-1&&stepLimit()===0;
 $('#slide-picker').value=String(index);$('#slide-seek').value=index+1;$('#slide-seek').setAttribute('aria-valuetext',`Slide ${index+1} of ${lesson.slides.length}: ${s.title}`);
 $('#script-slide-title').textContent=`${index+1}. ${s.title}`;
 for(const sel of ['#full-script','#script-link'])$(sel).href=url(`transcript_${key}.html?v=${data.revision}#slide-${index+1}`);
 $('#slides-pdf').href=url(`downloads/meeting_${key}_slides.pdf?v=${data.revision}`);
 $('#download-offline').href=url(`downloads/meeting_${key}_offline.html?v=${data.revision}`);$('#download-offline').download=`ECO603_${key}_Offline.html`;
 $('#topic-practice').href=url(`practice.html?week=${Number(key)}&v=${data.revision}`);$('#do-file').href=url(`downloads/meeting_${key}.do?v=${data.revision}`);
 for(const [top,option] of [['#lesson-pdf','#slides-pdf'],['#lesson-offline','#download-offline'],['#lesson-practice','#topic-practice']])$(top).href=$(option).href;
 try{history.replaceState(null,'',`?meeting=${key}&slide=${index+1}&v=${data.revision}`);}catch{}
 document.title=`${key} · ${index+1}. ${s.title} · ECO 603`;
 showVisual();typeset(document.querySelector('.workspace'));focusParagraph(0,false);
 $('#slide-viewport').scrollTo(0,0);fitSlide();document.fonts.ready.then(fitSlide);
}
function fitSlide(){
 const view=$('#slide-viewport'),slide=view.querySelector('.slide'),z=Number($('#zoom').value),mobile=innerWidth<=720;
 slide.style.zoom='1';slide.style.width=`${view.clientWidth-6}px`;slide.style.marginLeft='0';
 const available=Math.max(300,innerHeight-325),natural=slide.scrollHeight;
 const fit=mobile?1:Math.min(1,available/natural),scale=fit*z;
 slide.style.zoom=String(scale);slide.style.marginLeft=z===1?`${Math.max(0,(view.clientWidth-(view.clientWidth-6)*scale)/2/scale)}px`:'0';
 view.classList.toggle('slide-zoomed',z>1);view.dataset.fitScale=String(fit);
}
function goTo(n,focus=true){ended=false;stopReading();index=Math.max(0,Math.min(lesson.slides.length-1,n));render();if(focus)$('#slide-title').focus({preventScroll:true});}
function nextStep(){if(step<stepLimit()){stopAnimation();step++;updateGraph();return;}const d=$('#slide-exercise details');if(d&&!d.open){d.open=true;return;}if(index+1<lesson.slides.length)goTo(index+1);}
function showScript(visible){document.body.classList.toggle('focus',!visible);$('#toggle-script').textContent=visible?'Hide script':'Show script';$('#toggle-script').setAttribute('aria-expanded',String(visible));$('#transcript-toggle').setAttribute('aria-expanded',String(visible));requestAnimationFrame(fitSlide);}
$('#previous').onclick=()=>goTo(index-1);$('#next').onclick=()=>goTo(index+1);$('#step').onclick=nextStep;
$('#play').onclick=readAlong;$('#restart').onclick=()=>goTo(0);
$('#speed').onchange=()=>{speed=Number($('#speed').value);if(reading)scheduleReading();};
$('#slide-picker').innerHTML=lesson.slides.map((s,i)=>`<option value="${i}">${i+1}. ${e(s.title)}</option>`).join('');$('#slide-picker').onchange=()=>goTo(Number($('#slide-picker').value));
$('#slide-seek').max=lesson.slides.length;$('#slide-seek').oninput=()=>goTo(Number($('#slide-seek').value)-1);
$('#lesson-picker').innerHTML=data.course.map(c=>`<option value="${String(c.week).padStart(2,'0')}">${String(c.week).padStart(2,'0')}. ${e(c.title)}</option>`).join('');$('#lesson-picker').value=key;$('#lesson-picker').onchange=()=>{location.href=url(`index.html?meeting=${$('#lesson-picker').value}&v=${data.revision}`);};
$('#toggle-script').onclick=()=>showScript(document.body.classList.contains('focus'));$('#transcript-toggle').onclick=$('#toggle-script').onclick;$('#close-script').onclick=()=>showScript(false);
$('#follow-script').onchange=()=>{following=$('#follow-script').checked;focusParagraph(paragraph);};$('#point-highlights').onchange=()=>{highlights=$('#point-highlights').checked;focusParagraph(paragraph,false);};
$('#zoom').onchange=()=>{fitSlide();$('#slide-viewport').scrollTo(0,0);};
window.addEventListener('resize',fitSlide);
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#reading-status').textContent='Use your browser’s full-screen command to expand this view.';}};
document.addEventListener('fullscreenchange',()=>{$('#fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
$('#read-transcript').onclick=()=>{stopReading();$('#transcript-title').textContent=`${index+1}. ${current().title}`;$('#transcript-text').innerHTML=current().script.split('\n\n').map(p=>`<p>${e(p)}</p>`).join('');typeset($('#transcript-text'));$('#transcript-dialog').showModal();};$('#close-transcript').onclick=()=>$('#transcript-dialog').close();
const viewport=$('#slide-viewport');let drag=null;
viewport.addEventListener('pointerdown',ev=>{if(!viewport.classList.contains('slide-zoomed')||ev.target.closest('input,select,button,a,summary,textarea'))return;drag={x:ev.clientX,y:ev.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(ev.pointerId);viewport.classList.add('panning');});
viewport.addEventListener('pointermove',ev=>{if(!drag)return;viewport.scrollLeft=drag.left+drag.x-ev.clientX;viewport.scrollTop=drag.top+drag.y-ev.clientY;});
const release=()=>{drag=null;viewport.classList.remove('panning');};viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
document.addEventListener('keydown',ev=>{if(document.querySelector('dialog[open]')||ev.target.closest('input,textarea,select,button,summary,a'))return;if(ev.code==='Space'){ev.preventDefault();readAlong();}if(ev.key==='ArrowRight'||ev.key==='PageDown'){ev.preventDefault();goTo(index+1);}if(ev.key==='ArrowLeft'||ev.key==='PageUp'){ev.preventDefault();goTo(index-1);}if(ev.key==='Home'){ev.preventDefault();goTo(0);}if(ev.key==='End'){ev.preventDefault();goTo(lesson.slides.length-1);}if(ev.key==='ArrowDown'){ev.preventDefault();nextStep();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopReading();stopAnimation();}});
window.ECODeck=Object.freeze({getState:()=>({index,step,paragraph,playing:reading,speed,slides:lesson.slides.length,mode:'reading'}),goTo:(i)=>goTo(i),play:readAlong,pause:stopReading,focusParagraph,metadata:()=>lesson.slides.map(s=>({title:s.title,script:s.script,kind:s.kind}))});
render();
