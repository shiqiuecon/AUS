import {escapeHTML} from './common.mjs?v=28599d1f2c26';
import {OLSExperiment,coinExperiment,dependenceExperiment,instrumentExperiment} from './experiments.mjs?v=7bf398ef0f4e';
import {playVisualChanges,visualLayer,visualSnapshot} from './visual-reveals.mjs?v=67f857b36df0';

const experimentSizes = [16,32,64,100,200,400,800,1000,1600];
const experimentRuns = 240;
const experimentPalette = ['#087e83','#b64e3a'];
const experimentConfig = {
 lln: {
  title:'Run the fair-coin experiment', n:100,
  setup:'Imagine recording one for heads and zero for tails. The graph adds one toss at a time and plots the share of heads so far.'
 },
 ols: {
  title:'Compare the two regressions in repeated samples', n:100,
  setup:'This model generates a continuous score for each box. Each arrow carries a coefficient of one, and each box has its own independent normal disturbance with variance one. The two regressions use the same data and include an intercept.'
 },
 clt: {
  title:'Compare the distribution before and after scaling', n:64,
  setup:'Each repetition tosses a fair coin and records the share of heads. Compare that share with its difference from one half multiplied by the square root of the sample size.'
 },
 dependence: {
  title:'Compare independent and persistent data', n:100,
  setup:'Both series have mean zero and variance one at every date. Persistence says how much of the previous value carries over. Each repetition computes the mean of one series of the chosen length.'
 },
 iv: {
  title:'Vary the strength of the instrument', n:200,
  setup:'In this generated model the instrument is valid and the effect of the regressor is one. The regressor and the outcome disturbance share an unobserved cause. Strength is the slope of the instrument in the first stage.'
 }
};

function experimentNumber(value,digits=3) {
 return Math.abs(value)<.5*10**(-digits)?(0).toFixed(digits):value.toFixed(digits);
}

function experimentStats(draws) {
 const ordered = [...draws].sort((a,b) => a-b);
 const mean = draws.reduce((s,v) => s+v,0)/draws.length;
 const sd = Math.sqrt(draws.reduce((s,v) => s+(v-mean)**2,0)/(draws.length-1));
 const quantile = p => {
  const at = p*(ordered.length-1), i = Math.floor(at);
  return ordered[i]+(at-i)*(ordered[Math.ceil(at)]-ordered[i]);
 };
 return {mean,sd,mid:quantile(.5),lo:quantile(.05),hi:quantile(.95)};
}

function experimentAxes({min,max,ceiling,label,draw}) {
 const left=76,right=718,base=264,top=12;
 const x=v => left+(right-left)*(v-min)/(max-min);
 const y=v => base-(base-top)*v/ceiling;
 const grid=Array.from({length:5},(_,i)=>{
  const h=i*ceiling/4,py=y(h),value=min+i*(max-min)/4;
  const tick=experimentNumber(value,Number.isInteger(value)?0:2);
  const vertical=experimentNumber(h,Number.isInteger(h)?0:2);
  return `<path d="M${left} ${py}H${right}" stroke="#e2e8ed"/><text x="${left-12}" y="${py+5}" text-anchor="end">${vertical}</text><text x="${x(value)}" y="${base+24}" text-anchor="middle">${tick}</text>`;
 }).join('');
 return `<svg viewBox="0 0 740 324" role="img" aria-label="${escapeHTML(label)}"><g font-family="Arial,sans-serif" font-size="16" fill="#15324d">${grid}${draw(x,y,top,base)}<path d="M${left} ${top}V${base}H${right}" fill="none" stroke="#56697d"/></g></svg>`;
}

function experimentBins({series,min,max,reference,label}) {
 const bins=36;
 const seriesCounts=series.map(({draws})=>{
  const counts=Array(bins).fill(0);
  for (const value of draws) if (value>=min&&value<=max) counts[Math.min(bins-1,Math.floor(bins*(value-min)/(max-min)))]++;
  return counts;
 });
 const peak=Math.max(1,...seriesCounts.flat());
 const ceiling=Math.ceil(peak/4)*4;
 const markup=experimentAxes({min,max,ceiling,label,
  draw:(x,y,top,base)=>{
   const width=(x(max)-x(min))/bins;
   const bars=seriesCounts.map((counts,j)=>{
    const color=series[j].color||experimentPalette[j];
    const steps=counts.map((count,i)=>`V${y(count)}H${x(min)+(i+1)*width}`).join('');
    return `<path d="M${x(min)},${base}${steps}V${base}Z" fill="${color}" fill-opacity=".22" stroke="${color}" stroke-width="2"/>`;
   }).join('');
   return bars+`<path d="M${x(reference)} ${top}V${base}" stroke="#15324d" stroke-width="2" stroke-dasharray="6 5"/>`;
  }});
 return {
  markup,
  outside:seriesCounts.map(counts=>experimentRuns-counts.reduce((s,v)=>s+v,0))
 };
}

function experimentLine(running) {
 const coords=running.map((v,i)=>[i+1,v]);
 return experimentAxes({min:0,max:running.length,ceiling:1,label:'Share of heads as each toss is added. The dashed reference line is one half.',
  draw:(x,y)=>`<path d="M${x(0)} ${y(.5)}H${x(running.length)}" stroke="#15324d" stroke-width="2" stroke-dasharray="6 5"/>`+
   visualLayer('running-share','trace',`<polyline points="${coords.map(([i,v])=>x(i)+','+y(v)).join(' ')}" fill="none" stroke="${experimentPalette[0]}" stroke-width="2.5"/><circle cx="${x(running.length)}" cy="${y(running.at(-1))}" r="4" fill="${experimentPalette[0]}"/>`)
 });
}

function experimentTable(head,rows) {
 return `<table class="experiment-table"><thead><tr>${head.map(h=>`<th scope="col">${escapeHTML(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(([name,...cells])=>`<tr><th scope="row">${escapeHTML(name)}</th>${cells.map(v=>`<td>${escapeHTML(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function experimentComparison(series,min,max,reference,label) {
 const {markup,outside}=experimentBins({series,min,max,reference,label});
 return `<p class="experiment-axis">Vertical axis shows repetitions. Horizontal axis shows ${escapeHTML(label)}.</p><div class="experiment-plot">${markup}</div>
  <ul class="experiment-legend">${series.map(({name,color},i)=>`<li><i style="--swatch:${color||experimentPalette[i]}"></i>${escapeHTML(name)}</li>`).join('')}<li><i class="reference"></i>Reference ${experimentNumber(reference,2)}</li></ul>
  ${outside.some(Boolean)?`<p class="experiment-axis">Outside the plot among the ${experimentRuns} draws for each series. ${series.map(({name},i)=>`${name} ${outside[i]}`).join(' · ')}.</p>`:''}`;
}

function experimentOutput(kind,settings,context) {
 const {n,seed,rho,strength,scaled}=settings;
 const options={n,seed,reps:experimentRuns};
 if(kind==='lln'){
  const {running}=coinExperiment({...options,reps:1});
  const note=`Of the ${n} tosses, ${Math.round(running.at(-1)*n)} came up heads. The final share is ${experimentNumber(running.at(-1))}.`;
  return `<p class="experiment-axis">Vertical axis shows the share of heads. Horizontal axis counts tosses.</p><div class="experiment-plot">${experimentLine(running)}</div><p>${note}</p>`;
 }
 if(kind==='ols'){
  const {model,unadjusted,adjusted}=OLSExperiment({...options,...context});
  const selected=context.spec.nodes.filter(node=>context.state.conditioned.includes(node.id)).map(node=>node.label).join(', ');
  const series=[{name:'No controls',draws:unadjusted,target:model.short,color:'#94630e'},{name:'With chosen controls',draws:adjusted,target:model.adjusted,color:'#087e83'}];
  const targets=[model.truth,model.short,model.adjusted];
  const bottom=Math.floor(Math.min(...targets)-.5), top=Math.ceil(Math.max(...targets)+.5);
  const titles=['Regression','Population slope','Bias vs. total effect','Average estimate','Across-sample SD'];
  const values=series.map(({name,draws,target})=>{
   const {mean,sd}=experimentStats(draws);
   return [name,...[target,target-model.truth,mean,sd].map(v=>experimentNumber(v))];
  });
  return `<p><strong>Known total effect ${experimentNumber(model.truth,2)}.</strong> Controls in the second fit: ${escapeHTML(selected||'none')}. The population slope is what the fitted slope approaches as the sample grows. In this model it is also the average slope in repeated sampling. Bias is the difference from the known effect.</p>
   ${experimentComparison(series,bottom,top,model.truth,'estimated slopes')}${experimentTable(titles,values)}
   <p>Change the sample size to compare the spread with the bias. Each average in the table comes from ${experimentRuns} generated samples. SD is standard deviation.</p>`;
 }
 if(kind==='clt'){
  const sample=coinExperiment(options),draws=scaled?sample.scaled:sample.means,{mean,sd}=experimentStats(draws);
  return experimentComparison([{name:scaled?'Scaled difference':'Share of heads',draws}],scaled?-2:0,scaled?2:1,scaled?0:.5,scaled?'scaled differences':'shares of heads')
   +experimentTable(['Statistic','Average across draws','Simulated SD','Exact SD'],[[scaled?'Scaled difference':'Share of heads',experimentNumber(mean),experimentNumber(sd),experimentNumber(scaled ? .5 : .5/Math.sqrt(n))]])
   +'<p>As the sample grows, the raw share concentrates around one half. The scaled difference keeps the same standard deviation. Its distribution approaches a bell shape.</p>';
 }
 if(kind==='dependence'){
  const {independent,dependent,iidSD,dependentSD}=dependenceExperiment({...options,rho});
  const series=[{name:'Independent draws',draws:independent,sd:iidSD},{name:'Persistent draws',draws:dependent,sd:dependentSD}];
  return experimentComparison(series,-1.5,1.5,0,'sample means')
   +experimentTable(['Series','Simulated SD of the mean','Exact SD of the mean'],series.map(s=>[s.name,experimentNumber(experimentStats(s.draws).sd),experimentNumber(s.sd)]))
   +'<p>Positive persistence makes nearby observations carry overlapping information. The mean is less precise even when the sample size and the variance of each observation are the same.</p>';
 }
 const {iv,ols,olsTarget}=instrumentExperiment({...options,strength});
 const series=[{name:'Instrumental variables',draws:iv},{name:'Ordinary least squares',draws:ols}];
 const summaries=series.map(({name,draws})=>{
  const {mid,lo,hi}=experimentStats(draws);
  return [name,...[mid,lo,hi].map(v=>experimentNumber(v))];
 });
 return experimentComparison(series,-2,4,1,'estimated slopes')
  +experimentTable(['Estimator','Median','5th percentile','95th percentile'],summaries)
  +`<p>The middle 90% of estimates lies between the two percentiles. The OLS population slope is ${experimentNumber(olsTarget)}. Even a valid instrument can give extreme estimates when its sample first stage is close to zero.</p>`;
}

export function openExperiment(kind,description,context={}) {
 const config=experimentConfig[kind];
 const dialog=document.createElement('dialog');
 dialog.className='experiment-dialog';
 dialog.setAttribute('aria-labelledby','experiment-title');
 const extra=kind==='dependence'?'<label for="experiment-extra">Persistence <output for="experiment-extra"></output></label><input id="experiment-extra" type="range" min=".0" max=".95" step=".05" value=".8">'
  :kind==='iv'?'<label for="experiment-extra">First-stage strength <output for="experiment-extra"></output></label><input id="experiment-extra" type="range" min=".02" max="1.02" step=".05" value=".12">'
  :kind==='clt'?'<label class="experiment-toggle"><input id="experiment-scaled" type="checkbox"> Show the scaled difference</label>':'';
 dialog.innerHTML=`<div class="dialog-head"><h2 id="experiment-title">${config.title}</h2><button type="button" class="experiment-close">Close</button></div>
  <p class="experiment-prompt">${escapeHTML(description)}</p><p>${config.setup}</p>
  <div class="experiment-controls"><div><label for="experiment-size">${kind==='lln'?'Tosses':'Sample size'} <output for="experiment-size"></output></label><input id="experiment-size" type="range" min="0" max="${experimentSizes.length-1}" value="${experimentSizes.indexOf(config.n)}"></div>
  ${extra?`<div>${extra}</div>`:''}<button type="button" class="experiment-new">${kind==='lln'?'Toss again':'Draw new samples'}</button>
  ${kind==='lln'?'<button type="button" class="experiment-trace">Play the tosses</button>':''}</div>
  <div class="experiment-result"></div><p class="experiment-announcement" role="status"></p>`;
 const opener=document.activeElement;
 document.body.append(dialog);
 const size=dialog.querySelector('#experiment-size'), extraInput=dialog.querySelector('#experiment-extra');
 const redraw=dialog.querySelector('.experiment-new');
 const trace=dialog.querySelector('.experiment-trace');
 let runningReveal=null;
 let seed=603, pending=0;
 function updateExperiment() {
  pending=0;
  runningReveal?.stop();
  const n=experimentSizes[Number(size.value)], v=Number(extraInput?.value);
  const scaled=!!dialog.querySelector('#experiment-scaled')?.checked;
  dialog.querySelector('output[for="experiment-size"]').textContent=n;
  size.setAttribute('aria-valuetext',String(n));
  if(extraInput)dialog.querySelector('output[for="experiment-extra"]').textContent=v.toFixed(2);
  dialog.querySelector('.experiment-result').innerHTML=experimentOutput(kind,{n,seed,rho:v,strength:v,scaled},context);
  dialog.querySelector('.experiment-announcement').textContent=`Results updated for ${n} observations${kind==='dependence'?`, persistence ${v}`:kind==='iv'?`, strength ${v}`:''}.`;
 }
 function queueExperiment() {
  if(!pending)pending=requestAnimationFrame(updateExperiment);
 }
 dialog.addEventListener('input',queueExperiment);
 redraw.onclick=()=>{seed++;queueExperiment();};
 trace?.addEventListener('click',()=>{
  runningReveal?.stop();
  const plot=dialog.querySelector('.experiment-plot');
  runningReveal=playVisualChanges(plot,visualSnapshot(plot),{replay:['running-share'],duration:2.25});
 });
 dialog.querySelector('.experiment-close').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{
  cancelAnimationFrame(pending);
  runningReveal?.stop();
  dialog.remove();
  opener?.focus({preventScroll:true});
 },{once:true});
 updateExperiment();
 dialog.showModal();
}
