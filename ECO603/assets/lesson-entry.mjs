import {courseLocation} from './course-location.mjs?v=776a6a7a44ca';

const directory=window.ECO603;
const entry=document.querySelector('script[data-course-entry]').dataset.courseEntry;
const {key}=courseLocation(directory,location.search,{mapLegacy:entry==='app'});
const suffix=`?v=${directory.revision}`;

async function loadLecture() {
 const path=new URL(`./lesson-data/meeting_${key}.mjs${suffix}`,import.meta.url);
 const {default:contents}=await import(path.href);
 if(contents.revision!==directory.revision)throw Error('Course resources are from different releases');
 window.ECO603={...directory,...contents,lessons:{...directory.lessons,...contents.lessons}};
 await import(new URL(`./${entry}.mjs${suffix}`,import.meta.url).href);
}

loadLecture().catch(error=>{
 console.error(error);
 const message=document.createElement('p');
 message.setAttribute('role','alert');
 message.textContent='The lecture could not load. ';
 const retry=document.createElement('button');
 retry.type='button';retry.textContent='Reload lecture';retry.onclick=()=>location.reload();
 message.append(retry);
 document.querySelector('#main').prepend(message);
});
