export const data=window.ECO603;
export const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function setupMap(){
 const dialog=document.querySelector('#map-dialog');
 const list=document.querySelector('#map-list');
 list.innerHTML=data.course.map(c=>`<div class="map-row"><span>${String(c.week).padStart(2,'0')}</span><div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.question)}</p><details><summary>Teaching outline</summary><ol>${c.blocks.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ol><p><strong>Graduate step:</strong> ${escapeHTML(c.depth)}</p><p><strong>Visual plan:</strong> ${escapeHTML(c.visual)}</p><p><strong>Stata:</strong> ${escapeHTML(c.stata)}</p><p>${escapeHTML(c.reading)} · Bridge: ${escapeHTML(c.bridge)}</p><a href="practice.html?week=${c.week}">Practice this topic</a></details></div>${c.state==='draft'?`<a href="index.html?meeting=${String(c.week).padStart(2,'0')}">Open draft lesson</a>`:`<span class="map-state">${c.state==='assessment'?'Reserved for assessment':'Outline; script pending'}</span>`}</div>`).join('');
 document.querySelector('#course-map').addEventListener('click',()=>dialog.showModal());
 document.querySelector('#close-map').addEventListener('click',()=>dialog.close());
 const toggle=document.querySelector('#transcript-toggle');
 if(!document.querySelector('.transcript')){
   toggle.setAttribute('aria-expanded','false');
   toggle.addEventListener('click',()=>{location.href='transcript_01.html';});
 }
}
setupMap();
