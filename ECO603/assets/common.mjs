export const data=window.ECO603;
export const url=path=>new URL(path,window.ECO603_BASE||location.href).href;
export const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function typeset(root=document.body){
 if(!window.renderMathInElement)return;
 window.renderMathInElement(root,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:'error',trust:false,ignoredTags:['script','noscript','style','textarea','pre','code'],errorCallback:(msg)=>{window.mathErrors??=[];window.mathErrors.push(msg);console.error(msg);}});
}
export function setupMap(){
 const dialog=document.querySelector('#map-dialog'),list=document.querySelector('#map-list');
 list.innerHTML=data.course.map(c=>{const k=String(c.week).padStart(2,'0');return `<div class="map-row"><span>${k}</span><div><h3><a href="${url(`index.html?meeting=${k}&v=${data.revision}`)}">${escapeHTML(c.title)}</a></h3><p>${escapeHTML(c.question)}</p><p class="map-links"><a href="${url(`downloads/meeting_${k}_slides.pdf?v=${data.revision}`)}" download>Slides PDF</a> · <a href="${url(`transcript_${k}.html?v=${data.revision}`)}">Transcript</a> · <a href="${url(`practice.html?week=${c.week}&v=${data.revision}`)}">Practice</a></p></div><a href="${url(`index.html?meeting=${k}&v=${data.revision}`)}">Open lesson</a></div>`;}).join('');
 document.querySelector('#course-map').addEventListener('click',()=>dialog.showModal());
 document.querySelector('#close-map').addEventListener('click',()=>dialog.close());
 const toggle=document.querySelector('#transcript-toggle');
 if(!document.querySelector('.transcript')){toggle.hidden=true;}
}
setupMap();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>typeset());else typeset();
