/* Resolve a bookmark before fetching the selected lecture. */
export function courseLocation(data,search,{mapLegacy=true}={}) {
 const params=new URLSearchParams(search);
 const first=String(data.course.find(({week})=>Object.hasOwn(data.lessons,String(week).padStart(2,'0'))).week).padStart(2,'0');
 const requested=(params.get('meeting')||first).padStart(2,'0');
 const version=params.get('v');
 const mapping=mapLegacy&&(data.bookmarksByRevision?.[version]||(version===data.previousRevision?data.bookmarks:null));
 const previous=mapping?.[`${requested}:${params.get('slide')||1}`];
 const key=previous?.meeting||requested;
 return {params,requested,key:Object.hasOwn(data.lessons,key)?key:first,previous};
}
