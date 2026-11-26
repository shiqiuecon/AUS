/* Pure graph logic: path blocking is independent of the DOM and rendering. */
import {visualLayer} from './visual-reveals.mjs?v=73e3f1f37c3d';

const DAG_COLORS={ink:'#15324d',causal:'#087e83',alternative:'#b64e3a',condition:'#ba8a3c',blocked:'#657387',line:'#d2dce2'};
const dagEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function activeEdges(spec,state={}){return [...spec.edges,...((state.extra??spec.extraEnabled)?spec.extra?.edges||[]:[])];}
export function validateDAG(spec){
 const ids=new Set(spec.nodes.map(n=>n.id));if(ids.size!==spec.nodes.length)throw Error('Duplicate DAG node');
 const edges=[...spec.edges,...(spec.extra?.edges||[])],visiting=new Set(),seen=new Set();
 for(const e of edges)if(!ids.has(e.a)||!ids.has(e.b)||e.a===e.b)throw Error('Invalid DAG edge');
 function visit(v){if(visiting.has(v))throw Error('Directed cycle in DAG');if(seen.has(v))return;visiting.add(v);for(const e of edges)if(e.a===v)visit(e.b);visiting.delete(v);seen.add(v);}
 for(const id of ids)visit(id);return true;
}
export function analyseDAG(spec,state={}){
 const edges=activeEdges(spec,state),has=(a,b)=>edges.some(e=>e.a===a&&e.b===b),conditioned=new Set(state.conditioned??spec.conditioned??[]);
 const descendants=v=>{const found=new Set();const stack=[v];while(stack.length){const a=stack.pop();for(const e of edges)if(e.a===a&&!found.has(e.b)){found.add(e.b);stack.push(e.b);}}return found;};
 const neighbours=v=>[...new Set(edges.flatMap(e=>e.a===v?[e.b]:e.b===v?[e.a]:[]))],paths=[];
 function walk(path){const v=path.at(-1);if(v===spec.y){
  const reasons=[];
  for(let i=1;i<path.length-1;i++){
   const id=path[i],collider=has(path[i-1],id)&&has(path[i+1],id),selected=conditioned.has(id);
   const via=collider&&!selected?[...descendants(id)].filter(d=>conditioned.has(d)):[];
   if(collider||selected)reasons.push({id,collider,selected,via,blocks:collider?!selected&&!via.length:selected});
  }
  const blockers=reasons.filter(r=>r.blocks).map(r=>r.id);
  const causal=path.slice(1).every((n,i)=>has(path[i],n));paths.push({nodes:path.slice(),open:!blockers.length,causal,backdoor:path.length>1&&has(path[1],path[0]),blockers,reasons});return;
 }for(const n of neighbours(v))if(!path.includes(n))walk([...path,n]);}
 walk([spec.x]);
 const causal=paths.filter(p=>p.causal),forbidden=new Set();
 for(const p of causal)for(const id of p.nodes.slice(1)){
  forbidden.add(id);for(const d of descendants(id))forbidden.add(d);
 }
 return {paths,edges,conditioned:[...conditioned],causal,forbidden:[...conditioned].filter(id=>forbidden.has(id)),openCausal:causal.filter(p=>p.open),openAlternative:paths.filter(p=>p.open&&!p.causal)};
}
const edgeKey=(a,b)=>[a,b].sort().join('|');
function dagPathEdges(paths) {
 return new Set(paths.flatMap(path=>path.nodes.slice(1).map((node,i)=>edgeKey(path.nodes[i],node))));
}
function dagDisplayLabel(text) {
 if(text.length<=16)return [text];
 const words=text.split(' ');
 const breaks=words.slice(1).map((_,i)=>[words.slice(0,i+1).join(' '),words.slice(i+1).join(' ')]);
 return breaks.sort((a,b)=>Math.max(...a.map(s=>s.length))-Math.max(...b.map(s=>s.length)))[0]||[text];
}
function terminal(a,b,w=184,h=64){const dx=b.x-a.x,dy=b.y-a.y,t=Math.min(w/2/Math.abs(dx||1e-12),h/2/Math.abs(dy||1e-12));return{x:a.x+t*dx,y:a.y+t*dy};}
export function dagSVG(spec,step=2,state={},view){
 validateDAG(spec);if(typeof state!=='object'||state===null)state={};
 const a=analyseDAG(spec,state),nodes=new Map(spec.nodes.map(n=>[n.id,{...n,...view?.positions.get(n.id)}]));
 const conditioned=new Set(a.conditioned),causal=dagPathEdges(a.openCausal),alternative=dagPathEdges(a.openAlternative);
 const blocked=dagPathEdges(a.paths.filter(p=>!p.open)),focus=a.paths.find(p=>p.nodes.join('|')===view?.route),focused=dagPathEdges(focus?[focus]:[]);
 const markerPrefix=view?.prefix||'dag';
 const defs=Object.entries(DAG_COLORS).filter(([k])=>['ink','causal','alternative'].includes(k)||(view&&k==='blocked')).map(([k,c])=>`<marker id="${markerPrefix}-${k}" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="${c}"/></marker>`).join('');
 let body='';
 for(const arrow of a.edges){
  const x=nodes.get(arrow.a),y=nodes.get(arrow.b),key=edgeKey(arrow.a,arrow.b);
  const moved=view&&(view.positions.has(arrow.a)||view.positions.has(arrow.b));
  const control=arrow.curve&&!moved?{x:arrow.curve[0],y:arrow.curve[1]}:null,start=terminal(x,control||y),end=terminal(y,control||x);
  let type='ink',opacity=step===0?.55:1;
  if(step>0&&causal.has(key))type='causal';
  if(step>1&&view&&blocked.has(key)&&!causal.has(key))type='blocked';
  if((step>1&&alternative.has(key))||arrow.threat)type='alternative';
  if(focus){
   if(focused.has(key))type=focus.open?(focus.causal?'causal':'alternative'):'blocked';
   else{type='ink';opacity=.16;}
  }
  const dash=view&&({blocked:'3 5',alternative:'10 5'}[type]);
  const d=control?`M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`:`M${start.x},${start.y} L${end.x},${end.y}`;
  const part=`dag-edge-${arrow.a}-${arrow.b}`;
  const spoken=view?.spoken?.includes(part);
  const backing=spoken?'#f2d79d':'white';
  const edge=`<path d="${d}" fill="none" stroke="${backing}" stroke-width="${spoken?10:7}"${spoken?' data-spoken-arrow=""':''}/><path d="${d}" fill="none" stroke="${DAG_COLORS[type]}" stroke-width="${spoken?4:type==='ink'?2:3.5}" opacity="${spoken?1:opacity}" ${dash?`stroke-dasharray="${dash}"`:''} marker-end="url(#${markerPrefix}-${type})"/>`;
  body+=view?visualLayer(part,'emphasize',edge):edge;
 }
 for(const n of nodes.values()){
  const selected=conditioned.has(n.id);
  const label=view?dagDisplayLabel(n.label):n.label.length>20?n.label.split(/ (?=[^ ]+$)/):[n.label];
  const size=view?Math.min(24,Math.floor(325/Math.max(...label.map(s=>s.length)))):18;
  const eligible=view&&spec.controls?.includes(n.id);
  const attributes=view?` data-reveal="dag-node-${n.id}" data-effect="emphasize" data-dag-node="${n.id}"${eligible?` data-dag-select tabindex="0" role="button" aria-pressed="${selected}" aria-label="Control for ${dagEscape(n.label)}"`:''}`:'';
  body+=`<g${attributes}><rect x="${n.x-92}" y="${n.y-32}" width="184" height="64" rx="3" fill="${selected?'#fff3d8':'white'}" stroke="${selected?DAG_COLORS.condition:DAG_COLORS.ink}" stroke-width="${selected?2.5:1.4}" ${n.observed===false?'stroke-dasharray="6 4"':''}/>`;
  label.forEach((s,i)=>{body+=`<text x="${n.x}" y="${n.y+(label.length===1?0:-10)+i*19}" text-anchor="middle" font-family="Georgia,serif" font-size="${size}" fill="${DAG_COLORS.ink}">${dagEscape(s)}</text>`;});
  body+=`<text x="${n.x}" y="${n.y+27}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${view?14:12}" fill="${selected?'#90691d':'#506374'}">${selected?'Conditioned on':n.observed===false?dagEscape(n.tex===n.id?n.id+' · unobserved':'Unobserved'):dagEscape(n.tex===n.id?n.id:'Observed')}</text></g>`;
 }
 const message=step===0?'Assumed causal arrows · predict the paths before revealing':step===1?'Teal: open directed routes · next, inspect alternatives':`${a.openCausal.length} open directed route${a.openCausal.length===1?'':'s'} · ${a.openAlternative.length} open alternative${a.openAlternative.length===1?'':'s'} · gold: conditioned on`;
 if(!view)body+=`<text x="450" y="425" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="${DAG_COLORS.ink}">${message}</text>`;
 return `<svg viewBox="0 0 900 ${view?400:440}" role="${view?'group':'img'}" aria-label="${dagEscape(spec.title)}. Dashed boxes indicate unobserved variables. Gold boxes indicate conditioning."><defs>${defs}</defs>${body}</svg>`;
}
export function dagPathHTML(spec,state={}){
 const a=analyseDAG(spec,state),nodes=new Map(spec.nodes.map(n=>[n.id,n])),has=(x,y)=>a.edges.some(e=>e.a===x&&e.b===y);
 return a.paths.slice(0,10).map(p=>{let tex=nodes.get(p.nodes[0]).tex;for(let i=1;i<p.nodes.length;i++)tex+=(has(p.nodes[i-1],p.nodes[i])?' \\rightarrow ':' \\leftarrow ')+nodes.get(p.nodes[i]).tex;return `<li><span class="path-status ${p.open?'open':'closed'}">${p.open?'Open':'Blocked'}</span> <span>\\(${dagEscape(tex)}\\)</span> · ${p.causal?'directed route':'alternative route'}</li>`;}).join('');
}
export function dagInitialState(spec){return{conditioned:[...(spec.conditioned||[])],extra:!!spec.extraEnabled};}
export function dagControlHTML(spec,state={},prefix='dag',compact=false){
 const selected=new Set(state.conditioned??spec.conditioned??[]),nodes=new Map(spec.nodes.map(n=>[n.id,n]));
 let html=(spec.controls||[]).map(id=>`<label class="dag-check" for="${prefix}-${id}"><input id="${prefix}-${id}" type="checkbox" data-condition="${id}" aria-label="Control for ${dagEscape(nodes.get(id).label)}" ${selected.has(id)?'checked':''}>${compact?'':'Condition on '}${dagEscape(nodes.get(id).label)}</label>`).join('');
 if(spec.extra)html+=`<label class="dag-check" for="${prefix}-extra"><input id="${prefix}-extra" type="checkbox" data-dag-extra ${state.extra??spec.extraEnabled?'checked':''}>${dagEscape(spec.extra.label)}</label>`;
 return html;
}
