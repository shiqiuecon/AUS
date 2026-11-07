import {data,escapeHTML as e} from './common.mjs';
import {graph,graphKinds,captions} from './graphs.mjs';
const params=new URLSearchParams(location.search);
const requested=params.get('meeting')||'01';
const key=Object.hasOwn(data.lessons,requested)?requested:'01';
const lesson=data.lessons[key];
let index=Math.max(0,Math.min(lesson.slides.length-1,(Number(params.get('slide'))||1)-1));
let step=0,value=0,frame=0,playing=false,progress=1;
const $=s=>document.querySelector(s);
function stop(){cancelAnimationFrame(frame);playing=false;const p=$('#animate');if(p)p.textContent='Animate reveal';}
function updateGraph(){
 const s=lesson.slides[index];
 $('.graph-stage').innerHTML=graph(s.kind,step,value,progress);
 const out=$('#control-value');if(out)out.textContent=s.kind==='fit'?`Slope ${Number(value).toFixed(2)}`:s.kind==='residual'?`District ${value}`:s.kind==='arsim'?`ρ = ${Number(value).toFixed(2)}`:`L = ${value}`;
}
function showVisual(){
 const s=lesson.slides[index];
 if(s.kind==='output'){$('#visual').innerHTML=`<pre class="stata" tabindex="0" aria-label="Actual Stata output">${e(s.output)}</pre>`;return;}
 if(!graphKinds.has(s.kind)){$('#visual').innerHTML='';return;}
 let controls='<button id="zoom-graph" type="button" aria-pressed="false">Enlarge graph</button>';
 const config={fit:['Candidate slope',-5,1,.01,data.stats.school_simple.slope],residual:['Choose district',1,420,1,40],arsim:['Error persistence ρ',-.9,.95,.05,.65],hac:['Maximum covariance lag L',0,12,1,4]}[s.kind];
 if(config){value=config[4];controls=`<label for="graph-input">${config[0]}</label><input id="graph-input" type="range" min="${config[1]}" max="${config[2]}" step="${config[3]}" value="${value}"><output id="control-value" for="graph-input"></output>`;}
 if(['schools','serial','traffic'].includes(s.kind))controls+='<button id="animate" type="button">Animate reveal</button>';
 if(['schools','serial','traffic','dag','counterfactual','adjustment','residual'].includes(s.kind))controls+='<button id="reset-graph" type="button">Reset graph</button>';
 $('#visual').innerHTML=`<div class="graph-stage"></div><p class="graph-caption">${e(captions[s.kind])}</p>${controls?`<div class="graph-control">${controls}</div>`:''}`;
 if(config)$('#graph-input').addEventListener('input',ev=>{stop();value=Number(ev.target.value);updateGraph();});
 $('#reset-graph')?.addEventListener('click',()=>{stop();step=0;progress=1;updateGraph();});
 $('#animate')?.addEventListener('click',()=>{
  if(playing){stop();return;}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){progress=1;step=1;updateGraph();return;}
  playing=true;$('#animate').textContent='Pause animation';const began=performance.now();
  const tick=now=>{progress=Math.min(1,(now-began)/5000);updateGraph();if(progress<1)frame=requestAnimationFrame(tick);else stop();};
  frame=requestAnimationFrame(tick);
 });
 updateGraph();
 $('#zoom-graph').addEventListener('click',()=>{
  const on=$('.graph-stage').classList.toggle('zoomed');
  $('#zoom-graph').setAttribute('aria-pressed',String(on));
  $('#zoom-graph').textContent=on?'Fit graph to slide':'Enlarge graph';
 });
}
function render(){
 stop();step=0;progress=1;
 const s=lesson.slides[index];
 $('#meeting-label').textContent=`Meeting ${key} / ${lesson.title}`;
 $('#slide-title').textContent=s.title;$('#lead').textContent=s.lead;
 $('#script').innerHTML=s.script.split('\n\n').map(p=>`<p>${e(p)}</p>`).join('');
 $('.transcript').scrollTop=0;
 $('#slide-body').innerHTML=s.body.length?`<div class="concept-lines">${s.body.map(b=>`<div class="concept-line">${e(b)}</div>`).join('')}</div>`:'';
 $('#slide-exercise').innerHTML=s.exercise?`<div class="exercise"><h3>Try it before revealing</h3><p>${e(s.exercise)}</p><details><summary>Reveal explanation</summary><p>${e(s.answer)}</p></details></div>`:'';
 $('#position').textContent=`${index+1} / ${lesson.slides.length}`;
 $('#previous').disabled=index===0;$('#next').disabled=index===lesson.slides.length-1;
 $('#step').disabled=false;
 for(const sel of ['#full-script','#script-link'])$(sel).href=`transcript_${key}.html#slide-${index+1}`;
 $('#do-file').href=`downloads/meeting_${key}.do`;
 history.replaceState(null,'',`?meeting=${key}&slide=${index+1}`);
 document.title=`Meeting ${key} · ${index+1}. ${s.title} · ECO 603`;
 showVisual();
}
function move(delta){const n=Math.max(0,Math.min(lesson.slides.length-1,index+delta));if(n===index)return;index=n;render();$('#slide-title').focus({preventScroll:true});}
$('#previous').addEventListener('click',()=>move(-1));$('#next').addEventListener('click',()=>move(1));
$('#step').addEventListener('click',()=>{
 const s=lesson.slides[index];
 const limit={schools:1,dag:2,counterfactual:2,adjustment:1,residual:1,serial:1,traffic:1}[s.kind]||0;
 if(step<limit){stop();step++;updateGraph();return;}
 const details=$('#slide-exercise details');if(details&&!details.open){details.open=true;return;}
 if(index<lesson.slides.length-1)move(1);else $('#step').disabled=true;
});
function focusSlides(){document.body.classList.toggle('focus');const on=document.body.classList.contains('focus');$('#transcript-toggle').setAttribute('aria-expanded',String(!on));$('#present').textContent=on?'Show transcript':'Focus slides';}
$('#transcript-toggle').addEventListener('click',focusSlides);$('#present').addEventListener('click',focusSlides);
document.addEventListener('keydown',ev=>{
 if($('#map-dialog').open||ev.target.closest('input,textarea,select,button,summary,a'))return;
 if(ev.key==='ArrowRight'||ev.key==='PageDown'){ev.preventDefault();$('#step').click();}
 if(ev.key==='ArrowLeft'||ev.key==='PageUp'){ev.preventDefault();move(-1);}
 if(ev.key==='Home'){ev.preventDefault();index=0;render();}
 if(ev.key==='End'){ev.preventDefault();index=lesson.slides.length-1;render();}
});
render();
