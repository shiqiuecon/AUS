/* The models are independent of the plots and controls. A seed fixes the draws for a fair comparison. */
import {activeEdges} from './dag.mjs?v=cf000bedae04';

export const dagExperimentIds = new Set([
 'fork','chain','staffing_chain','collider','scholarship','scholarship_descendant','group_mediation','headstart'
]);

function experimentRandom(seed) {
 let word = seed >>> 0;
 return () => {
  word = (word + 0x6d2b79f5) >>> 0;
  let mixed = Math.imul(word ^ (word >>> 15), word | 1);
  mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
  return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
 };
}

function experimentNormal(random) {
 let spare;
 return () => {
  if (spare !== undefined) {
   const draw = spare;
   spare = undefined;
   return draw;
  }
  const radius = Math.sqrt(-2 * Math.log(1 - random()));
  const angle = 2 * Math.PI * random();
  spare = radius * Math.sin(angle);
  return radius * Math.cos(angle);
 };
}

function experimentDot(a,b) {
 return a.reduce((sum,x,i) => sum + x * b[i], 0);
}

// Residualize the exposure in a small covariance matrix. The same calculation
// works with exact graph-implied covariances and centered sample cross-products.
function experimentSlope(cov, x, y, controls) {
 const a = cov.map(row => [...row]);
 for (const c of controls) {
  const remaining = [x,y,...controls.slice(controls.indexOf(c)+1)];
  for (const i of remaining) for (const j of remaining) {
   a[i][j] -= a[i][c] * a[c][j] / a[c][c];
  }
 }
 return a[x][y] / a[x][x];
}

function experimentMoments(size) {
 let count = 0;
 const mean = Array(size).fill(0);
 const cross = mean.map(() => Array(size).fill(0));
 const delta = [...mean];
 return {
  add(values) {
   count++;
   for (let i=0;i<size;i++) {
    delta[i] = values[i] - mean[i];
    mean[i] += delta[i] / count;
   }
   const correction = (count-1)/count;
   for (let i=0;i<size;i++) for (let j=0;j<size;j++) {
    cross[i][j] += correction * delta[i] * delta[j];
   }
  },
  cross
 };
}

export function dagExperimentModel(spec,state) {
 const edges = activeEdges(spec,state);
 const ordered = [];
 const waiting = new Set(spec.nodes.map(node => node.id));
 while (waiting.size) {
  const next = [...waiting].find(id => !edges.some(arrow => arrow.b === id && waiting.has(arrow.a)));
  if (!next) throw Error('Simulation requires an acyclic graph');
  waiting.delete(next);
  ordered.push(next);
 }
 const parents = ordered.map(id => edges.filter(edge => edge.b === id).map(edge => ordered.indexOf(edge.a)));
 const loadings = [];
 parents.forEach((list,i) => {
  loadings.push(ordered.map((_,j) => Number(i===j) + list.reduce((sum,p) => sum + loadings[p][j],0)));
 });
 const cov = loadings.map(row => loadings.map(other => experimentDot(row,other)));
 const x = ordered.indexOf(spec.x), y = ordered.indexOf(spec.y);
 const controls = (state.conditioned || []).map(id => ordered.indexOf(id));
 return {
  parents, x, y, controls,
  truth: loadings[y][x],
  short: experimentSlope(cov,x,y,[]),
  adjusted: experimentSlope(cov,x,y,controls)
 };
}

export function OLSExperiment({spec,state,n,reps=240,seed}) {
 const model = dagExperimentModel(spec,state);
 const {parents,x,y,controls} = model;
 const unadjusted = [], adjusted = [];
 for (let rep=0;rep<reps;rep++) {
  const normal = experimentNormal(experimentRandom(seed + rep * 0x9e3779b9));
  const moment = experimentMoments(parents.length);
  const values = Array(parents.length).fill(0);
  for (let i=0;i<n;i++) {
   for (let j=0;j<values.length;j++) {
    let next = normal();
    for (const p of parents[j]) next += values[p];
    values[j] = next;
   }
   moment.add(values);
  }
  unadjusted.push(experimentSlope(moment.cross,x,y,[]));
  adjusted.push(experimentSlope(moment.cross,x,y,controls));
 }
 return {model,unadjusted,adjusted};
}

export function coinExperiment({n,reps=240,seed}) {
 const means = [], scaled = [], running = [];
 for (let rep=0;rep<reps;rep++) {
  const random = experimentRandom(seed + rep * 0x9e3779b9);
  let heads = 0;
  for (let i=1;i<=n;i++) {
   if (random() < .5) heads++;
   if (rep === 0) running.push(heads/i);
  }
  means.push(heads/n);
  scaled.push((heads/n-.5)*Math.sqrt(n));
 }
 return {running,means,scaled};
}

export function dependenceExperiment({n,rho,reps=240,seed}) {
 const independent = [], dependent = [];
 const innovationScale = Math.sqrt(1-rho*rho);
 for (let rep=0;rep<reps;rep++) {
  const normal = experimentNormal(experimentRandom(seed + rep * 0x9e3779b9));
  let a = normal(), sumA = a, sumB = a;
  for (let i=1;i<n;i++) {
   const b = normal();
   a = rho*a+innovationScale*b;
   sumA += a;
   sumB += b;
  }
  independent.push(sumB/n);
  dependent.push(sumA/n);
 }
 let weighted = 0;
 for (let k=1;k<n;k++) weighted += (n-k)*rho**k;
 return {independent,dependent,iidSD:1/Math.sqrt(n),dependentSD:Math.sqrt(n+2*weighted)/n};
}

export function instrumentExperiment({n,strength,reps=240,seed}) {
 const iv = [], ols = [];
 for (let rep=0;rep<reps;rep++) {
  const normal = experimentNormal(experimentRandom(seed + rep * 0x9e3779b9));
  const moment = experimentMoments(3);
  for (let i=0;i<n;i++) {
   const z=normal(),v=normal(),u=normal(),x=strength*z+v;
   moment.add([z,x,x+.6*v+.8*u]);
  }
  const a = moment.cross;
  iv.push(a[0][2]/a[0][1]);
  ols.push(a[1][2]/a[1][1]);
 }
 return {iv,ols,olsTarget:1+.6/(1+strength**2)};
}
