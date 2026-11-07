/* Pure graph logic: path blocking is independent of the DOM and rendering. */
const DAG_COLORS={ink:'#15324d',causal:'#087e83',alternative:'#b64e3a',condition:'#ba8a3c',line:'#d2dce2'};
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
  let open=true;const blockers=[];
  for(let i=1;i<path.length-1;i++){const n=path[i],collider=has(path[i-1],n)&&has(path[i+1],n);const opened=conditioned.has(n)||[...descendants(n)].some(d=>conditioned.has(d));if(collider&&!opened){open=false;blockers.push(n);}else if(!collider&&conditioned.has(n)){open=false;blockers.push(n);}}
  const causal=path.slice(1).every((n,i)=>has(path[i],n));paths.push({nodes:path.slice(),open,causal,backdoor:path.length>1&&has(path[1],path[0]),blockers});return;
 }for(const n of neighbours(v))if(!path.includes(n))walk([...path,n]);}
 walk([spec.x]);return {paths,edges,conditioned:[...conditioned],openCausal:paths.filter(p=>p.open&&p.causal),openAlternative:paths.filter(p=>p.open&&!p.causal)};
}
const edgeKey=(a,b)=>[a,b].sort().join('|');
function terminal(a,b,w=184,h=64){const dx=b.x-a.x,dy=b.y-a.y,t=Math.min(w/2/Math.abs(dx||1e-12),h/2/Math.abs(dy||1e-12));return{x:a.x+t*dx,y:a.y+t*dy};}
export function dagSVG(spec,step=2,state={}){
 validateDAG(spec);if(typeof state!=='object'||state===null)state={};const a=analyseDAG(spec,state),nodes=new Map(spec.nodes.map(n=>[n.id,n])),conditioned=new Set(a.conditioned),causal=new Set(),alternative=new Set();
 for(const [paths,set] of [[a.openCausal,causal],[a.openAlternative,alternative]])for(const p of paths)for(let i=1;i<p.nodes.length;i++)set.add(edgeKey(p.nodes[i-1],p.nodes[i]));
 const defs=Object.entries(DAG_COLORS).filter(([k])=>['ink','causal','alternative'].includes(k)).map(([k,c])=>`<marker id="dag-${k}" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9" fill="${c}"/></marker>`).join('');
 let body='';for(const e of a.edges){const x=nodes.get(e.a),y=nodes.get(e.b),control=e.curve?{x:e.curve[0],y:e.curve[1]}:null,start=terminal(x,control||y),end=terminal(y,control||x);let type='ink';if(step>0&&causal.has(edgeKey(e.a,e.b)))type='causal';if(step>1&&alternative.has(edgeKey(e.a,e.b))||e.threat)type='alternative';const d=control?`M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`:`M${start.x},${start.y} L${end.x},${end.y}`;body+=`<path d="${d}" fill="none" stroke="white" stroke-width="7"/><path d="${d}" fill="none" stroke="${DAG_COLORS[type]}" stroke-width="${type==='ink'?2:3.5}" opacity="${step===0?.55:1}" marker-end="url(#dag-${type})"/>`;}
 for(const n of spec.nodes){const selected=conditioned.has(n.id),label=n.label.length>20?n.label.split(/ (?=[^ ]+$)/):[n.label];body+=`<g><rect x="${n.x-92}" y="${n.y-32}" width="184" height="64" rx="3" fill="${selected?'#fff3d8':'white'}" stroke="${selected?DAG_COLORS.condition:DAG_COLORS.ink}" stroke-width="${selected?2.5:1.4}" ${n.observed===false?'stroke-dasharray="6 4"':''}/>`;label.forEach((s,i)=>{body+=`<text x="${n.x}" y="${n.y+(label.length===1?0:-10)+i*19}" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="${DAG_COLORS.ink}">${dagEscape(s)}</text>`;});body+=`<text x="${n.x}" y="${n.y+27}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="${selected?'#90691d':'#506374'}">${selected?'Conditioned on':n.observed===false?dagEscape(n.tex===n.id?n.id+' · unobserved':'Unobserved'):dagEscape(n.tex===n.id?n.id:'Observed')}</text></g>`;}
 const message=step===0?'Assumed causal arrows · predict the paths before revealing':step===1?'Teal: open directed routes · next, inspect alternatives':`${a.openCausal.length} open directed route${a.openCausal.length===1?'':'s'} · ${a.openAlternative.length} open alternative${a.openAlternative.length===1?'':'s'} · gold: conditioned on`;
 body+=`<text x="450" y="425" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="${DAG_COLORS.ink}">${message}</text>`;
 return `<svg viewBox="0 0 900 440" role="img" aria-label="${dagEscape(spec.title)}. Dashed boxes indicate unobserved variables. Gold boxes indicate conditioning."><defs>${defs}</defs>${body}</svg>`;
}
export function dagPathHTML(spec,state={}){
 const a=analyseDAG(spec,state),nodes=new Map(spec.nodes.map(n=>[n.id,n])),has=(x,y)=>a.edges.some(e=>e.a===x&&e.b===y);
 return a.paths.slice(0,10).map(p=>{let tex=nodes.get(p.nodes[0]).tex;for(let i=1;i<p.nodes.length;i++)tex+=(has(p.nodes[i-1],p.nodes[i])?' \\rightarrow ':' \\leftarrow ')+nodes.get(p.nodes[i]).tex;return `<li><span class="path-status ${p.open?'open':'closed'}">${p.open?'Open':'Blocked'}</span> <span>\\(${dagEscape(tex)}\\)</span> · ${p.causal?'directed route':'alternative route'}</li>`;}).join('');
}
export function dagInitialState(spec){return{conditioned:[...(spec.conditioned||[])],extra:!!spec.extraEnabled};}
export function dagControlHTML(spec,state={},prefix='dag'){
 const selected=new Set(state.conditioned??spec.conditioned??[]),nodes=new Map(spec.nodes.map(n=>[n.id,n]));
 let html=(spec.controls||[]).map(id=>`<label class="dag-check" for="${prefix}-${id}"><input id="${prefix}-${id}" type="checkbox" data-condition="${id}" ${selected.has(id)?'checked':''}>Condition on ${dagEscape(nodes.get(id).label)}</label>`).join('');
 if(spec.extra)html+=`<label class="dag-check" for="${prefix}-extra"><input id="${prefix}-extra" type="checkbox" data-dag-extra ${state.extra??spec.extraEnabled?'checked':''}>${dagEscape(spec.extra.label)}</label>`;
 return html;
}
