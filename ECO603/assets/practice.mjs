import {data,escapeHTML as e} from './common.mjs?v=ab6e29338788';
const select=document.querySelector('#week-filter');
const initial=new URLSearchParams(location.search).get('week');
if([...select.options].some(o=>o.value===initial))select.value=initial;
const answers=new Map();
function render(){
 document.querySelectorAll('textarea[data-key]').forEach(el=>answers.set(el.dataset.key,el.value));
 const qs=data.practice.filter(q=>select.value==='all'||q.week===Number(select.value));
 document.querySelector('#practice-count').textContent=`${qs.length} questions · Responses stay in this page and are not submitted or stored.`;
 document.querySelector('#practice-list').innerHTML=qs.map(q=>{
 const key=`${q.week}-${q.title}`;
 return `<section class="practice-item"><p class="draft-note">Meeting ${String(q.week).padStart(2,'0')}</p><h2>${e(q.title)}</h2><p>${e(q.prompt)}</p><label for="attempt-${data.practice.indexOf(q)}">Your reasoning</label><textarea id="attempt-${data.practice.indexOf(q)}" data-key="${e(key)}">${e(answers.get(key)||'')}</textarea><details><summary>Reveal worked solution</summary><p>${e(q.answer)}</p></details></section>`;
 }).join('');
}
select.addEventListener('change',render);render();
