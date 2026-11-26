import {dagSVG,dagInitialState} from './dag.mjs?v=cf000bedae04';
import {data,escapeHTML as e,typeset} from './common.mjs?v=28599d1f2c26';
import {bindDAGExplorer,dagExplorerHTML} from './dag-explorer.mjs?v=f221e0b5f131';
import {openExperiment} from './experiment-view.mjs?v=90d8d15bbfde';
const $=s=>document.querySelector(s),select=$('#week-filter'),initial=new URLSearchParams(location.search).get('week'),storageKey='eco603-practice-v1';
if([...select.options].some(o=>o.value===initial))select.value=initial;
let notes={},reviewed={},index=0,migrationApplied=false;
const dagStates=new Map();
let practiceExplorers=[];
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
 practiceExplorers.forEach(explorer=>explorer.dispose());practiceExplorers=[];
 const qs=questions(),all=$('#practice-view').value==='all';index=Math.max(0,Math.min(qs.length-1,index));
 $('#practice-navigation').hidden=all;$('#question-picker').innerHTML=qs.map((q,i)=>`<option value="${i}">${i+1}. ${e(q.title)}${q.recommended?' (recommended)':''}</option>`).join('');$('#question-picker').value=String(index);
 $('#question-previous').disabled=index===0;$('#question-next').disabled=index===qs.length-1;
 $('#question-position').textContent=`Question ${index+1} / ${qs.length}`;
 $('#practice-list').innerHTML=(all?qs:[qs[index]]).map(q=>{
  const key=id(q),n=data.practice.indexOf(q);
  let visual='';
  if(q.graph){
   const spec=data.dags[q.graph.id],state=dagStates.get(key)||dagInitialState(spec);
   dagStates.set(key,state);
   visual=`<div class="practice-dag" data-question="${n}">${dagExplorerHTML(spec,q.graph.id,state,'practice-dag-'+n)}</div>`;
  }
  if(q.activity)visual+=`<button type="button" class="activity-button" data-practice-activity="${n}">${e(q.activity.label)}</button>`;
  const workedGraph=q.worked_graph?`<div class="dag-stage">${dagSVG(q.worked_graph)}</div>`:'';
  return `<section class="practice-item"><p class="eyebrow">Lesson ${String(q.week).padStart(2,'0')}${q.recommended?' · Recommended':''}</p><h2>${e(q.title)}</h2><p>${e(q.prompt)}</p>${visual}<label for="attempt-${n}">Your reasoning</label><textarea id="attempt-${n}" data-key="${e(key)}">${e(notes[key]||'')}</textarea><details><summary>Reveal worked explanation</summary>${workedGraph}<p>${e(q.answer)}</p></details><label class="review-check"><input type="checkbox" data-reviewed="${e(key)}" ${reviewed[key]?'checked':''}> I have worked through this question</label></section>`;
 }).join('');
 $('#practice-list').querySelectorAll('textarea').forEach(el=>el.oninput=()=>{notes[el.dataset.key]=el.value;save();});
 $('#practice-list').querySelectorAll('[data-reviewed]').forEach(el=>el.onchange=()=>{reviewed[el.dataset.reviewed]=el.checked;save();progress();});
 for(const container of $('#practice-list').querySelectorAll('.practice-dag')){
  const n=Number(container.dataset.question),q=data.practice[n];
  practiceExplorers.push(bindDAGExplorer(container,{
   spec:data.dags[q.graph.id],id:q.graph.id,prefix:'practice-dag-'+n,initial:dagStates.get(id(q)),
   onChange:next=>dagStates.set(id(q),next)
  }));
 }
 for(const button of $('#practice-list').querySelectorAll('[data-practice-activity]')){
  button.onclick=()=>{
   const {kind,prompt}=data.practice[Number(button.dataset.practiceActivity)].activity;
   const context=kind==='ols'?{spec:data.dags.fork,state:{conditioned:['C'],extra:false}}:{};
   openExperiment(kind,prompt,context);
  };
 }
 progress();typeset($('#practice-list'));
}
select.onchange=()=>{index=0;render();history.replaceState(null,'',select.value==='all'?'practice.html':`?week=${select.value}`);};
$('#practice-view').onchange=render;$('#question-picker').onchange=()=>{index=Number($('#question-picker').value);render();};
$('#question-previous').onclick=()=>{index--;render();};$('#question-next').onclick=()=>{index++;render();};
$('#clear-progress').onclick=()=>{if(!confirm('Clear the notes and review marks for the selected topic?'))return;for(const q of questions()){delete notes[id(q)];delete reviewed[id(q)];}save();render();};
render();
