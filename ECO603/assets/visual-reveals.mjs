/* Quantities stay fixed. Motion reveals the marks belonging to the current step. */
export function visualLayer(name, effect, markup) {
 return `<g data-reveal="${name}" data-effect="${effect}">${markup}</g>`;
}

export function visualSnapshot(stage) {
 return new Map([...stage.querySelectorAll('[data-reveal]')].map(layer => [
  layer.dataset.reveal, layer.innerHTML
 ]));
}

function revealFrames(layer) {
 if (layer.dataset.effect !== 'trace' || !CSS.supports('clip-path','inset(0 100% 0 0)')) {
  return [{opacity:.28},{opacity:1}];
 }
 const box = layer.getBBox();
 const view = layer.ownerSVGElement.viewBox.baseVal;
 if (!view.width || box.width < 1) return [{opacity:.28},{opacity:1}];
 const edge = x => Math.max(0,100*(1-(x-view.x)/view.width));
 const from = edge(box.x-8);
 const to = edge(box.x+box.width+8);
 return [
  {clipPath:`inset(-16px ${from}% -16px -16px)`},
  {clipPath:`inset(-16px ${to}% -16px -16px)`}
 ];
}

export function playVisualChanges(stage, previous, {time, start, duration=.58, replay=[]}={}) {
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
 const timed = Number.isFinite(start);
 const elapsed = timed ? Math.max(0,time-start) : 0;
 if (elapsed>=duration) return null;
 const effects = [];
 for (const layer of stage.querySelectorAll('[data-reveal]')) {
  const name = layer.dataset.reveal;
  if (previous.get(name)===layer.innerHTML && !replay.includes(name)) continue;
  if (typeof layer.animate!=='function') continue;
  const motion=layer.animate(revealFrames(layer),{
   duration:duration*1000, easing:layer.dataset.effect==='trace'?'linear':'ease-out',fill:'both'
  });
  if(timed)motion.pause();
  else motion.onfinish=()=>motion.cancel();
  effects.push(motion);
 }
 if(!effects.length)return null;
 function stop() {
  for(const effect of effects)effect.cancel();
  effects.length=0;
 }
 function advance(now) {
  if(now>=start+duration||matchMedia('(prefers-reduced-motion: reduce)').matches)stop();
  for(const effect of effects)effect.currentTime=1000*Math.max(0,now-start);
 }
 if(timed)advance(time);
 return {advance:timed?advance:()=>{},stop};
}
