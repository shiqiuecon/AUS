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
 // Use the marks' own box so a resized slide clips its first and last
 // frames in the same coordinates as the plotted line and endpoint labels.
 const end='inset(-18px -18px -18px -20px) fill-box';
 if (layer.dataset.effect !== 'trace' || !CSS.supports('clip-path',end) || layer.getBBox().width<1) {
  return [{opacity:.28},{opacity:1}];
 }
 return [
  {clipPath:'inset(-18px calc(100% + 10px) -18px -20px) fill-box'},
  {clipPath:end}
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
