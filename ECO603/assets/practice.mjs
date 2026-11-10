import {dagSVG,dagInitialState,dagControlHTML,dagPathHTML} from './dag.mjs?v=50e65922206d';
import {data,escapeHTML as e,typeset} from './common.mjs?v=28599d1f2c26';
const $=s=>document.querySelector(s),select=$('#week-filter'),initial=new URLSearchParams(location.search).get('week'),storageKey='eco603-practice-v1';
if([...select.options].some(o=>o.value===initial))select.value=initial;
let notes={},reviewed={},index=0,migrationApplied=false;const dagStates=new Map();
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');notes=saved.notes||{};reviewed=saved.reviewed||{};migrationApplied=saved.syllabusMigration===1;}catch{}
const id=q=>`${q.week}:${q.title}`;
let migrated=false;
if(!migrationApplied)for(const q of data.practice){
 if(q.origin_week===undefined)continue;
 const previous=`${q.origin_week}:${q.origin_title||q.title}`,current=id(q);
 if(previous!==current){
  if(!(current in notes)&&previous in notes){notes[current]=notes[previous];migrated=true;}
  if(!(current in reviewed)&&previous in reviewed){reviewed[current]=reviewed[previous];migrated=true;}
 }
}
if(!migrationApplied)try{localStorage.setItem(storageKey,JSON.stringify({notes,reviewed,syllabusMigration:1}));}catch{}
const questions=()=>data.practice.filter(q=>select.value==='all'||q.week===Number(select.value)).sort((a,b)=>a.week-b.week);
function save(){try{localStorage.setItem(storageKey,JSON.stringify({notes,reviewed,syllabusMigration:1}));$('#save-state').textContent='Notes and review marks saved on this device.';}catch{$('#save-state').textContent='Notes and review marks stay in this page.';}}
function progress(){const qs=questions();$('#practice-count').textContent=`${qs.length} questions · ${qs.filter(q=>reviewed[id(q)]).length} reviewed`;}
function render(){
 const qs=questions(),all=$('#practice-view').value==='all';index=Math.max(0,Math.min(qs.length-1,index));
 $('#practice-navigation').hidden=all;$('#question-picker').innerHTML=qs.map((q,i)=>`<option value="${i}">${i+1}. ${e(q.title)}${q.recommended?' (recommended)':''}</option>`).join('');$('#question-picker').value=String(index);
 $('#question-previous').disabled=index===0;$('#question-next').disabled=index===qs.length-1;
 $('#question-position').textContent=`Question ${index+1} / ${qs.length}`;
 $('#practice-list').innerHTML=(all?qs:[qs[index]]).map(q=>{const key=id(q),n=data.practice.indexOf(q);let visual='';if(q.graph){const spec=data.dags[q.graph.id],state=dagStates.get(key)||dagInitialState(spec);dagStates.set(key,state);visual=`<div class="practice-dag" data-question="${n}"><div class="dag-stage">${dagSVG(spec,2,state)}</div><p class="graph-caption">Assumed causal structure · dashed: unobserved · gold: conditioned on</p><div class="dag-controls">${dagControlHTML(spec,state,'practice-dag-'+n)}</div><details class="path-analysis"><summary>Trace the paths</summary><ul class="dag-paths">${dagPathHTML(spec,state)}</ul></details></div>`;}return `<section class="practice-item"><p class="eyebrow">Lesson ${String(q.week).padStart(2,'0')}${q.recommended?' · Recommended':''}</p><h2>${e(q.title)}</h2><p>${e(q.prompt)}</p>${visual}<label for="attempt-${n}">Your reasoning</label><textarea id="attempt-${n}" data-key="${e(key)}">${e(notes[key]||'')}</textarea><details><summary>Reveal worked explanation</summary><p>${e(q.answer)}</p></details><label class="review-check"><input type="checkbox" data-reviewed="${e(key)}" ${reviewed[key]?'checked':''}> I have worked through this question</label></section>`;}).join('');
 $('#practice-list').querySelectorAll('textarea').forEach(el=>el.oninput=()=>{notes[el.dataset.key]=el.value;save();});
 $('#practice-list').querySelectorAll('[data-reviewed]').forEach(el=>el.onchange=()=>{reviewed[el.dataset.reviewed]=el.checked;save();progress();});
 $('#practice-list').querySelectorAll('.practice-dag').forEach(container=>{const q=data.practice[Number(container.dataset.question)],spec=data.dags[q.graph.id];container.querySelectorAll('[data-condition],[data-dag-extra]').forEach(input=>input.onchange=()=>{const state={conditioned:[...container.querySelectorAll('[data-condition]:checked')].map(n=>n.dataset.condition),extra:!!container.querySelector('[data-dag-extra]')?.checked};dagStates.set(id(q),state);container.querySelector('.dag-stage').innerHTML=dagSVG(spec,2,state);container.querySelector('.dag-paths').innerHTML=dagPathHTML(spec,state);typeset(container);});});
 progress();typeset($('#practice-list'));
}
select.onchange=()=>{index=0;render();history.replaceState(null,'',select.value==='all'?'practice.html':`?week=${select.value}`);};
$('#practice-view').onchange=render;$('#question-picker').onchange=()=>{index=Number($('#question-picker').value);render();};
$('#question-previous').onclick=()=>{index--;render();};$('#question-next').onclick=()=>{index++;render();};
$('#clear-progress').onclick=()=>{if(!confirm('Clear the notes and review marks for the selected topic?'))return;for(const q of questions()){delete notes[id(q)];delete reviewed[id(q)];}save();render();};
render();
