import {data,url} from './common.mjs?v=82d1f092741c';
import {courseLocation} from './course-location.mjs?v=776a6a7a44ca';

// Preserve bookmarks to the former index player, including a selected slide.
// A normal course visit stays on the lecture chooser.
const {params,requested,key,previous}=courseLocation(data,location.search);
if(params.has('meeting')||params.has('slide')){
 if(Object.hasOwn(data.lessons,requested)||previous){
  params.set('meeting',key);if(previous)params.set('slide',previous.slide);params.set('v',data.revision);
  location.replace(url(`lesson.html?${params}${location.hash}`));
 }
}
