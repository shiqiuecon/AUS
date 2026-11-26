import {escapeHTML,typeset} from './common.mjs?v=82d1f092741c';
import {analyseDAG,dagControlHTML,dagInitialState,dagSVG} from './dag.mjs?v=cf000bedae04';
import {dagExperimentIds} from './experiments.mjs?v=81c9cd16191a';
import {openExperiment} from './experiment-view.mjs?v=603b840f3bb6';
import {playVisualChanges,visualSnapshot} from './visual-reveals.mjs?v=73e3f1f37c3d';

const dagSpecial = {
 iv: analysis => analysis.openCausal.length>1
  ? 'The instrument now reaches the outcome outside the price channel. This breaks the exclusion restriction in the diagram.'
  : 'The only directed route from the instrument to the outcome goes through price. The instrument argument also needs a first stage and a credible source of variation.',
 iv_threat: analysis => dagSpecial.iv(analysis),
 feedback: () => 'Trace the route from the current unexpected cause to next period’s policy. A policy responding to earlier shocks can fail assumptions about regressors at all dates.',
 serial: () => 'The outcome disturbances can be related across dates. Uncertainty depends on that link even when the input has no open noncausal path to its outcome.',
 variance: () => 'The diagram displays the sources of the outcome. The spread of its disturbance can still vary with the input, which matters for standard errors.',
 selection_x: analysis => analysis.conditioned.includes('S')
  ? 'The sample is restricted to observed records. Under the arrows shown, observing a record depends on the regressor and leaves its link with the disturbance closed.'
  : 'The full sample includes every record. Compare its paths with those for observed records only.',
 selection_y: analysis => analysis.openAlternative.length
  ? 'Restricting to observed records opens an alternative route between the regressor and the outcome disturbance. The sample can give a biased slope.'
  : 'The outcome joins two incoming arrows. Without conditioning on the outcome or its downstream selection, that route is closed.',
 applicants: analysis => analysis.openAlternative.length
  ? 'Among applicants, burden can be related to unmeasured readiness through the selection node. The slope among applicants can reflect this relation as well as a causal effect.'
  : 'Before restricting to applicants, the selection route is closed at application.'
};

export function dagVerdict(spec,analysis,id) {
 if(dagSpecial[id])return {tone:'neutral',text:dagSpecial[id](analysis)};
 const open=analysis.openAlternative.length;
 const names=analysis.forbidden.map(key=>spec.nodes.find(node=>node.id===key).label).join(', ');
 if(!analysis.causal.length)return {tone:open?'caution':'neutral',text:open
  ? 'No directed effect is drawn. An open alternative path can still create an association.'
  : 'No directed effect is drawn. The alternative paths shown are blocked.'};
 if(names)return {tone:'caution',text:`Total-effect check fails. The controls include ${names}, on or downstream of a directed route. ${open?'An alternative path is open as well.':'This can remove part of the effect.'}`};
 if(open)return {tone:'caution',text:`Total-effect check fails. ${open===1?'One alternative path is':open+' alternative paths are'} open, so the estimate can mix association with the effect.`};
 return {tone:'pass',text:'Total-effect check passes in this DAG. The controls block the alternative paths and preserve the directed routes.'};
}

function dagRouteReason(path,names) {
 if(!path.reasons.length)return path.causal?'The arrows run from the starting variable to the outcome.':'No intermediate variable can block this path.';
 return path.reasons.map(({id,collider,selected,via,blocks})=>{
  const name=names.get(id).label;
  if(!collider)return `${name} blocks the path when controlled for.`;
  if(blocks)return `${name} receives two arrows along this path. This collider blocks the path while it and the variables it causes are left alone.`;
  if(selected)return `Controlling for the collider ${name} opens the path at that box.`;
  return `Controlling for ${via.map(v=>names.get(v).label).join(' and ')} opens the path at its upstream collider ${name}.`;
 }).join(' ');
}

function dagRoutes(analysis,names,route) {
 const has=(a,b)=>analysis.edges.some(edge=>edge.a===a&&edge.b===b);
 return analysis.paths.map(p=>{
  const key=p.nodes.join('|'), selected=key===route;
  const tex=p.nodes.map((id,i)=>i?(has(p.nodes[i-1],id)?' \\rightarrow ':' \\leftarrow ')+names.get(id).tex:names.get(id).tex).join('');
  const tone=p.open?(p.causal?'directed':'alternative'):'blocked';
  return `<li><button type="button" data-dag-route="${key}" aria-pressed="${selected}"><span class="dag-swatch ${tone}"></span>${p.open?'Open':'Blocked'} · ${p.causal?'directed':'alternative'} <span>\\(${escapeHTML(tex)}\\)</span></button>${selected?`<p>${escapeHTML(dagRouteReason(p,names))}</p>`:''}</li>`;
 }).join('');
}

export function dagExplorerHTML(spec,id,state,prefix) {
 const choices=!!spec.controls?.length;
 const controls=dagControlHTML(spec,state,prefix,true);
 return `<div class="dag-explorer">
  ${choices?`<div class="dag-drop" data-dag-drop><strong>Control for</strong><div class="dag-controls">${controls}</div></div>`:controls?`<div class="dag-controls">${controls}</div>`:''}
  <div class="dag-stage graph-stage"></div>
  <p class="dag-hint">${choices?'Click an available control or drop it in “Control for”. Drag boxes to rearrange the diagram.':'Drag boxes to rearrange the diagram.'}</p>
  <ul class="dag-legend" hidden></ul>
  <p class="dag-diagnosis" role="status"></p>
  <details class="path-analysis"><summary>Trace the paths</summary><ul class="dag-paths" id="${prefix==='lesson-dag'?'dag-paths':prefix+'-paths'}"></ul></details>
  ${dagExperimentIds.has(id)?'<button class="activity-button" type="button" data-dag-simulate>Simulate the estimates</button>':''}
 </div>`;
}

export function bindDAGExplorer(root,{spec,id,prefix,initial,step=2,onChange,onInteract,onResize}) {
 const stage=root.querySelector('.dag-stage'), drop=root.querySelector('[data-dag-drop]');
 const pathList=root.querySelector('.dag-paths'), diagnosis=root.querySelector('.dag-diagnosis'),legend=root.querySelector('.dag-legend');
 const inputs=[...root.querySelectorAll('[data-condition]')], extra=root.querySelector('[data-dag-extra]');
 const eligible=new Set(spec.controls||[]), names=new Map(spec.nodes.map(node=>[node.id,node]));
 const positions=new Map();
 let state=initial, stageStep=step, route=null, gesture=null, spoken=[];
 const displayStep=()=>id==='reading'?(stageStep>=4?2:0):stageStep;

 function paint(viewPositions=positions) {
  stage.innerHTML=dagSVG(spec,displayStep(),state,{positions:viewPositions,route,prefix,spoken});
 }
 function render(next=state,nextStep=stageStep,focusId,focusRoute,spokenEdges=[]) {
  state=next;stageStep=nextStep;spoken=spokenEdges;
  for(const input of inputs)input.checked=state.conditioned.includes(input.dataset.condition);
  if(extra)extra.checked=state.extra;
  paint();
  const analysis=analyseDAG(spec,state);
  const counts=[analysis.openCausal.length,analysis.openAlternative.length,analysis.paths.filter(p=>!p.open).length];
  const shown=displayStep();
  legend.hidden=shown<2&&!route;
  legend.innerHTML=['Open directed','Open alternative','Blocked'].map((label,i)=>`<li><i class="dag-swatch ${['directed','alternative','blocked'][i]}"></i>${label} ${counts[i]}</li>`).join('');
  const result=shown<2
   ? {tone:'neutral',text:spoken.length?'Follow the highlighted arrow.':shown===1?'Teal highlights the directed routes. Trace the other paths.':'Use Next step to follow the arrows and trace the paths.'}
   : dagVerdict(spec,analysis,id);
  if(diagnosis.textContent!==result.text)diagnosis.textContent=result.text;
  diagnosis.dataset.tone=result.tone;
  pathList.innerHTML=dagRoutes(analysis,names,route)||'<li>No path joins the two variables.</li>';
  typeset(pathList);
  if(focusId)stage.querySelector(`[data-dag-node="${focusId}"]`)?.focus({preventScroll:true});
  if(focusRoute)pathList.querySelector(`[data-dag-route="${focusRoute}"]`)?.focus({preventScroll:true});
 }
 function change(next,focusId) {
  const previous=visualSnapshot(stage);
  route=null;
  onChange?.(next);
  render(next,2,focusId);
  playVisualChanges(stage,previous);
  onResize?.();
 }
 function toggle(id,force,focusId) {
  const selected=new Set(state.conditioned);
  if(force===true||!selected.has(id))selected.add(id);else selected.delete(id);
  change({conditioned:[...selected],extra:state.extra},focusId);
 }
 root.addEventListener('change',event=>{
  if(!event.target.matches('[data-condition],[data-dag-extra]'))return;
  change({conditioned:inputs.filter(input=>input.checked).map(input=>input.dataset.condition),extra:!!extra?.checked});
 });
 root.querySelector('.path-analysis').addEventListener('toggle',onResize||(()=>{}));
 pathList.addEventListener('click',event=>{
  const button=event.target.closest('[data-dag-route]');
  if(!button)return;
  onInteract?.();
  const previous=visualSnapshot(stage);
  const key=button.dataset.dagRoute;
  route=route===key?null:key;
  render(state,stageStep,undefined,key);
  playVisualChanges(stage,previous);
  onResize?.();
 });
 root.querySelector('[data-dag-simulate]')?.addEventListener('click',()=>{
  onInteract?.();
  openExperiment('ols','Try a different adjustment set on the diagram, then compare its bias and spread with the regression that uses no controls.',{spec,state});
 });
 stage.addEventListener('keydown',event=>{
  const node=event.target.closest('[data-dag-select]');
  if(!node||!['Enter',' '].includes(event.key))return;
  event.preventDefault();event.stopPropagation();
  toggle(node.dataset.dagNode,undefined,node.dataset.dagNode);
 });
 stage.addEventListener('click',event=>{
  // Assistive technology can emit a click without a pointer event.
  const node=event.target.closest('[data-dag-select]');
  if(node&&event.detail===0)toggle(node.dataset.dagNode,undefined,node.dataset.dagNode);
 });

 function inside(element,event) {
  if(!element)return false;
  const bounds=element.getBoundingClientRect();
  return event.clientX>=bounds.left&&event.clientX<=bounds.right&&event.clientY>=bounds.top&&event.clientY<=bounds.bottom;
 }
 function movePosition(event) {
  const svg=stage.querySelector('svg'),screen=svg?.getScreenCTM();
  if(!screen)return null;
  const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(screen.inverse());
  const x=Math.max(96,Math.min(804,point.x-gesture.offset.x));
  const y=Math.max(35,Math.min(365,point.y-gesture.offset.y));
  if([...names.values()].some(node=>{
   const at=positions.get(node.id)||node;
   return node.id!==gesture.id&&Math.abs(at.x-x)<188&&Math.abs(at.y-y)<68;
  }))return null;
  return {x,y};
 }
 stage.addEventListener('pointerdown',event=>{
  const node=event.target.closest('[data-dag-node]');
  if(!node||event.button!==0||gesture)return;
  const svg=node.ownerSVGElement,screen=svg.getScreenCTM();
  if(!screen)return;
  const id=node.dataset.dagNode,at=positions.get(id)||names.get(id);
  const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(screen.inverse());
  gesture={id,pointer:event.pointerId,x:event.clientX,y:event.clientY,offset:{x:point.x-at.x,y:point.y-at.y},moved:false,frame:0,ghost:null};
  stage.setPointerCapture(event.pointerId);
  event.stopPropagation();
 });
 stage.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.pointer)return;
  if(!gesture.moved&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)<6)return;
  if(!gesture.moved){
   gesture.moved=true;
   onInteract?.();
   gesture.ghost=document.createElement('span');
   gesture.ghost.className='dag-drag-ghost';
   gesture.ghost.textContent=names.get(gesture.id).label;
   gesture.ghost.setAttribute('aria-hidden','true');
   document.body.append(gesture.ghost);
  }
  gesture.ghost.style.left=event.clientX+'px';
  gesture.ghost.style.top=event.clientY+'px';
  const dropping=eligible.has(gesture.id)&&inside(drop,event),inGraph=inside(stage,event);
  gesture.ghost.hidden=inGraph&&!dropping;
  drop?.classList.toggle('drop-ready',dropping);
  if(!gesture.frame)gesture.frame=requestAnimationFrame(()=>{
   gesture.frame=0;
   const at=inGraph?movePosition(event):null;
   const preview=new Map(positions);
   if(at)preview.set(gesture.id,at);
   paint(preview);
  });
 });
 function finish(event) {
  if(!gesture||event.pointerId!==gesture.pointer)return;
  const {id,moved,frame,ghost}=gesture;
  cancelAnimationFrame(frame);ghost?.remove();
  drop?.classList.remove('drop-ready');
  if(event.type==='pointerup'){
   if(eligible.has(id)&&(!moved||inside(drop,event))){
    gesture=null;toggle(id,moved,id);return;
   }
   if(moved&&inside(stage,event)){
    const at=movePosition(event);
    if(at)positions.set(id,at);
   }
  }
  gesture=null;
  if(moved)paint();
 }
 stage.addEventListener('pointerup',finish);
 stage.addEventListener('pointercancel',finish);
 stage.addEventListener('lostpointercapture',finish);
 render();
 return {
  render,
  dispose() {
   if(gesture){
    cancelAnimationFrame(gesture.frame);
    gesture.ghost?.remove();
    gesture=null;
   }
  },
  reset(nextStep) {
   route=null;positions.clear();
   render(dagInitialState(spec),nextStep);
   onResize?.();
  }
 };
}
