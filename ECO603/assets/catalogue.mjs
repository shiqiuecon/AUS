import {data,url} from './common.mjs?v=28599d1f2c26';

// Preserve bookmarks to the former index player, including a selected slide.
// A normal course visit stays on the lecture chooser.
const params=new URLSearchParams(location.search);
if(params.has('meeting')||params.has('slide')){
 const first=String(data.course[0].week).padStart(2,'0');
 const key=(params.get('meeting')||first).padStart(2,'0');
 if(Object.hasOwn(data.lessons,key)){
  const bookmarkMap=data.bookmarksByRevision?.[params.get('v')]||(data.previousRevision===params.get('v')?data.bookmarks:null);
  const legacy=bookmarkMap?.[`${key}:${params.get('slide')||1}`];
  params.set('meeting',legacy?.meeting||key);if(legacy)params.set('slide',legacy.slide);params.set('v',data.revision);
  location.replace(url(`lesson.html?${params}${location.hash}`));
 }
}
