import {dagSVG} from './dag.mjs?v=50e65922206d';
import {data,escapeHTML as e} from './common.mjs?v=28599d1f2c26';
const ink='#15324d',teal='#087e83',gold='#ba8a3c',rule='#d2dce2';
const W=900,H=420;
const X=(v,lo,hi)=>85+(v-lo)/(hi-lo)*765;
const Y=(v,lo,hi)=>345-(v-lo)/(hi-lo)*290;
const text=(x,y,s,size=19,anchor='middle',fill=ink)=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" style="fill:${fill}">${e(s)}</text>`;
const line=(x1,y1,x2,y2,color=ink,width=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const circle=(x,y,r=3.2,color=teal,opacity=.64)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
function svg(body,label){return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(label)}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="${ink}" stroke-width="1.4"/></marker></defs>${body}</svg>`;}
function axes(xmin,xmax,ymin,ymax,xticks,yticks,xlabel,ylabel){
 let s=line(85,345,850,345)+line(85,55,85,345);
 for(const v of xticks)s+=line(X(v,xmin,xmax),345,X(v,xmin,xmax),351)+text(X(v,xmin,xmax),377,typeof v==='number'?String(v):v);
 for(const v of yticks)s+=line(78,Y(v,ymin,ymax),850,Y(v,ymin,ymax),rule,1)+text(69,Y(v,ymin,ymax)+6,v,18,'end');
 s+=text(468,410,xlabel,22)+`<text transform="translate(25,200) rotate(-90)" font-size="22" text-anchor="middle">${e(ylabel)}</text>`;
 return s;
}
const average=(rows,key)=>rows.reduce((a,b)=>a+b[key],0)/rows.length;
function schoolplot({mode='schools',step=0,value=0,progress=1}){
 const mx=average(data.schools,'str'),my=average(data.schools,'score');
 let s=axes(14,26,600,720,[15,20,25],[600,650,700],'Students per teacher','Test score (points)');
 const n=Math.floor(data.schools.length*progress);
 for(const d of data.schools.slice(0,n))s+=circle(X(d.str,14,26),Y(d.score,600,720));
 const simple=data.stats.school_simple;
 let slope=simple.slope;
 if(mode==='fit')slope=Number(value);
 if(mode==='adjustment'&&step>0)slope=data.stats.school_adjusted.slope;
 const intercept=my-slope*mx;
 const show=mode!=='schools'||step>0;
 if(show){
   if(mode==='adjustment'&&step>0)s+=line(X(14,14,26),Y(simple.intercept+simple.slope*14,600,720),X(26,14,26),Y(simple.intercept+simple.slope*26,600,720),gold,2,'8 6');
   s+=line(X(14,14,26),Y(intercept+slope*14,600,720),X(26,14,26),Y(intercept+slope*26,600,720),ink,3);
 }
 if(mode==='fit'){
   const loss=data.schools.reduce((sum,d)=>sum+(d.score-intercept-slope*d.str)**2,0);
   s+=text(835,34,`Slope ${slope.toFixed(2)} · SSE ${Math.round(loss).toLocaleString('en-US')}`,19,'end');
   s+=circle(X(mx,14,26),Y(my,600,720),5,gold,1);
 }
 if(mode==='adjustment')s+=text(835,34,step>0?'Navy: adjusted at mean Z · Gold: simple':'Simple regression; select Next step to adjust',17,'end');
 if(mode==='residual'){
   const d=data.schools[Math.max(0,Math.min(419,Math.round(value)-1))];
   const fitted=intercept+slope*d.str,r=d.score-fitted;
   s+=circle(X(d.str,14,26),Y(d.score,600,720),7,gold,1);
   if(step>0){
     s+=line(X(d.str,14,26),Y(d.score,600,720),X(d.str,14,26),Y(fitted,600,720),gold,4);
     s+=text(835,34,`District ${Math.round(value)} · residual ${r.toFixed(2)} score points`,18,'end');
   }else s+=text(835,34,'Predict the residual sign. Select Next step.',18,'end');
 }
 return svg(s,'Actual California school district scores and student–teacher ratios. Each dot is a district.');
}
function node(x,y,w,title,sub=''){
 return `<rect x="${x}" y="${y}" width="${w}" height="80" rx="2" fill="white" stroke="${rule}" stroke-width="1.5"/>`+text(x+w/2,y+33,title,23)+text(x+w/2,y+60,sub,17);
}
function arrow(x1,y1,x2,y2,color=ink){return `<path d="M${x1},${y1} L${x2},${y2}" stroke="${color}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>`;}
function dag(step){
 let s=node(325,45,250,'Language composition','Z: pre-policy characteristic')+node(75,250,290,'Student–teacher ratio','X: staffing comparison')+node(545,250,280,'Test score','Y: average outcome');
 if(step>0)s+=arrow(365,290,535,290)+text(450,325,'Target effect?',19);
 if(step>1)s+=arrow(350,128,235,240,gold)+arrow(550,128,680,240,gold)+text(455,198,'Alternative path: X ← Z → Y',22,'middle',gold);
 s+=text(450,397,'Proposed causal structure, not a relationship proved by the scatterplot.',18);
 return svg(s,'Confounding diagram with staffing X, language composition Z and score Y.');
}
function counterfactual(step){
 let s=node(295,25,310,'One target district','Same population, two policy states');
 s+=arrow(365,108,245,185)+arrow(535,108,660,185);
 s+=node(70,200,330,'Ratio of 20','Potential score under ratio 20')+node(500,200,330,'Ratio of 22','Potential score under ratio 22');
 if(step>0)s+=text(450,330,'Score under 20 minus score under 22',28);
 if(step>1)s+=text(450,382,'Only one state is observed for a district in this period.',21,'middle',gold);
 return svg(s,'Two potential outcomes for the same district. Only one staffing state can be observed.');
}
function timepath(kind,step=0,progress=1){
 const residual=kind==='serial';
 const rows=data.traffic;
 const lo=residual?-.12:30000,hi=residual?.12:55000;
 let s=axes(0,107,lo,hi,[0,48,107],residual?[-.1,0,.1]:[30000,40000,50000],'Months since January 1981',residual?'Residual (log points)':'Total reported accidents');
 if(residual)s+=line(85,Y(0,lo,hi),850,Y(0,lo,hi),ink,1,'4 4');
 const n=Math.max(1,Math.round(rows.length*progress));
 let points=rows.slice(0,n).map((d,i)=>`${X(i,0,107)},${Y(d[residual?'residual':'totacc'],lo,hi)}`).join(' ');
 s+=`<polyline points="${points}" fill="none" stroke="${teal}" stroke-width="2.2"/>`;
 if(step>0)for(let i=0;i<n;i++)s+=circle(X(i,0,107),Y(rows[i][residual?'residual':'totacc'],lo,hi),2.5);
 s+=text(835,30,'Observed monthly data · January 1981–December 1989',18,'end');
 return svg(s,residual?'Actual residuals from the traffic regression over 108 months.':'Actual total reported traffic accidents over 108 months.');
}
function lagplot(){
 let s=axes(-.12,.12,-.12,.12,[-.1,0,.1],[-.1,0,.1],'Previous-month residual','Current-month residual');
 s+=line(X(0,-.12,.12),55,X(0,-.12,.12),345,rule,1)+line(85,Y(0,-.12,.12),850,Y(0,-.12,.12),rule,1);
 for(const d of data.traffic)if(d.lag_residual!==null)s+=circle(X(d.lag_residual,-.12,.12),Y(d.residual,-.12,.12),4,teal,.8);
 s+=text(835,30,'107 observed adjacent-month pairs',19,'end');
 return svg(s,'Current residual versus previous-month residual for the actual traffic regression.');
}
function innovations(){
 let seed=60311;const uniform=()=>{seed=(1664525*seed+1013904223)>>>0;return (seed+.5)/4294967296;};
 return Array.from({length:400},()=>Math.sqrt(-2*Math.log(uniform()))*Math.cos(2*Math.PI*uniform()));
}
const eps=innovations();
function arsim(rho){
 let u=0;const a=[];
 for(let i=0;i<400;i++){u=rho*u+eps[i];if(i>=300)a.push(u);}
 const lim=Math.max(4,Math.ceil(Math.max(...a.map(Math.abs))));
 let s=axes(1,100,-lim,lim,[1,50,100],[-lim,0,lim],'Simulated month','Illustrative error');
 s+=line(85,Y(0,-lim,lim),850,Y(0,-lim,lim),rule,1,'4 4');
 s+=`<polyline points="${a.map((v,i)=>`${X(i+1,1,100)},${Y(v,-lim,lim)}`).join(' ')}" stroke="${teal}" stroke-width="2.5" fill="none"/>`;
 s+=text(835,30,`Persistence ${rho.toFixed(2)} · fixed innovations · 300-period burn-in`,18,'end');
 return svg(s,'Illustrative AR(1) simulation with fixed innovation draws, not estimated traffic residuals.');
}
function hac(L){
 let s=axes(0,12,0,1.05,[0,2,4,6,8,10,12],[0,.5,1],'Lag k (observation periods)','Bartlett weight');
 for(let k=0;k<=12;k++){
   const w=k<=L?1-k/(L+1):0;
   if(w>0)s+=`<rect x="${X(k,0,12)-16}" y="${Y(w,0,1.05)}" width="32" height="${345-Y(w,0,1.05)}" fill="${k===0?ink:teal}"/>`;
 }
 s+=text(835,30,`Maximum lag ${L} · later covariances receive less weight`,20,'end');
 return svg(s,'Illustrative Bartlett weights in a Newey–West lag window. This is not a recalculation of the covariance matrix.');
}
function intervals(){
 const rows=data.stats.traffic;
 let s=line(180,330,850,330);
 const xx=v=>180+(v-.04)/.12*660;
 for(const v of [.04,.08,.12,.16])s+=line(xx(v),330,xx(v),336)+text(xx(v),364,v.toFixed(2),20);
 rows.forEach((r,i)=>{
   const y=95+i*90,c=i===2?teal:ink;
   s+=text(160,y+6,['Conventional','Robust','HAC, 4 lags'][i],20,'end');
   s+=line(xx(r.coefficient-1.96*r.se),y,xx(r.coefficient+1.96*r.se),y,c,4)+circle(xx(r.coefficient),y,6,c,1);
   s+=text(850,y+30,`SE ${r.se.toFixed(5)}`,17,'end');
 });
 s+=text(510,404,'Law coefficient (log-accident units) · approximate 95% intervals',20);
 s+=text(835,32,'Same OLS coefficient; different uncertainty estimates',20,'end');
 return svg(s,'Three coefficient intervals based on actual Stata standard errors; all point estimates agree. Intervals use plus or minus 1.96 standard errors.');
}
export const graphKinds=new Set(['causal','chart','schools','fit','residual','adjustment','dag','counterfactual','traffic','serial','lagplot','arsim','hac','intervals']);
export function graph(kind,step,value,progress=1,spec={}){
 if(kind==='causal')return dagSVG(data.dags[spec.id],step,typeof value==='object'?value:{});
 if(kind==='chart'){const scenario=spec?.scenario;if(graphKinds.has(scenario)&&scenario!=='chart')return graph(scenario,step,value,progress);return extendedChart(scenario,step,value,progress);}
 if(['schools','fit','residual','adjustment'].includes(kind))return schoolplot({mode:kind,step,value,progress});
 if(kind==='dag')return dag(step);
 if(kind==='counterfactual')return counterfactual(step);
 if(kind==='traffic'||kind==='serial')return timepath(kind,step,progress);
 if(kind==='lagplot')return lagplot();
 if(kind==='arsim')return arsim(Number(value));
 if(kind==='hac')return hac(Number(value));
 if(kind==='intervals')return intervals();
 return '';
}
export const captions={causal:'Assumed causal structure · dashed boxes: unobserved · gold boxes: conditioned on',schools:'California school districts · 420 observed districts',fit:'Rotate around the mean point. The loss uses all 420 observed districts.',residual:'Vertical distance from the observed score to the fitted line · actual district data',adjustment:'Adjusted line fixes English-learner share at its sample mean. Both fits use the same 420 districts.',dag:'Arrows show the proposed explanation. The scatterplot alone does not establish it.',counterfactual:'Conceptual policy comparison · no numerical effect is assumed',traffic:'Historical California traffic data · monthly observations',serial:'Residuals from the actual log-accident regression · 108 months',lagplot:'Actual residual pairs · one initial observation lost to lagging',arsim:'Illustrative simulation · fixed innovations · vertical range adapts to the selected persistence',hac:'Declining lag weights only. The slider does not recalculate the Stata standard errors.',intervals:'Actual Stata estimates and SEs · approximate intervals = b ± 1.96 × SE. Exact software intervals are in the output.'};

const ticks=(lo,hi,n=5)=>Array.from({length:n},(_,i)=>Number((lo+(hi-lo)*i/(n-1)).toPrecision(3)));
const extent=values=>{let a=Math.min(...values),b=Math.max(...values),p=(b-a)*.08||1;return[a-p,b+p];};
const pathLine=(points,color=ink,width=3,dash='')=>`<path d="${points.map((p,i)=>`${i?'L':'M'}${p[0]},${p[1]}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
function scatter(rows,xkey,ykey,slope,label,{step=2,progress=1,intercept=null,xlabel=xkey,ylabel=ykey}={}){
 const [xl,xh]=extent(rows.map(r=>r[xkey])),[yl,yh]=extent(rows.map(r=>r[ykey]));
 let s=axes(xl,xh,yl,yh,ticks(xl,xh),ticks(yl,yh),xlabel,ylabel);
 for(const r of rows.slice(0,Math.ceil(rows.length*progress)))s+=circle(X(r[xkey],xl,xh),Y(r[ykey],yl,yh),3,teal,.5);
 if(step>0&&slope!==null){const a=intercept??average(rows,ykey)-slope*average(rows,xkey);s+=line(X(xl,xl,xh),Y(a+slope*xl,yl,yh),X(xh,xl,xh),Y(a+slope*xh,yl,yh),ink,3);}
 s+=text(840,29,label,18,'end');
 return {s,xl,xh,yl,yh};
}
export const scenarioCaptions={
 ovb:'Observed school data. The control moves an illustrative slope between the two fitted endpoints; intermediate slopes are not new regressions.',
 fwl:'Actual residuals after removing English-learner share and income from both variables. The slope matches the full regression.',
 test:'Actual staffing estimate and robust SE. The reference curve is a large-sample normal approximation, not the distribution of district outcomes.',
 retail:'401 observed positive-price and positive-income records. Lines use the actual level and quadratic regressions; no geographic sampling claim is made.',
 sampling:'Actual Stata Monte Carlo estimates: 300 repetitions at each sample size. The data-generating staffing coefficient is 1; the omitted-variable target is 1.5.',
 interaction:'Actual group-specific fitted lines at the overall sample mean of income. High language share means at least 10 percent English learners.',
 lagbars:'Actual monthly unemployment coefficients from the finite distributed-lag regression. Cumulative means the sum through the selected lag.',
 lp:'Constructed quarterly process; actual local-projection estimates with approximate pointwise 95% intervals. The dashed path is the known response.',
 panel:'Observed state fatality rates, 1982–1988. The control selects a state; pale paths show the remaining states.',
 did:'Constructed earnings example, in thousand dirhams per month. The dashed counterfactual assumes the untreated group’s three-unit change.',
 ivfirst:'Actual 1995 state price and tax data. The first stage describes relevance; it cannot establish the exclusion restriction.',
 binary:'Actual fitted LPM, probit and logit predictions from the same 2,380 applications. Payment-to-income is a fraction; these are descriptive fits.'
};
export const chartControls={ovb:['Contribution of omitted factor',0,1,.05,1],test:['Hypothesised staffing slope',-3,1,.05,0],sampling:['Sample size (100 or 1,000)',0,1,1,0],panel:['Selected state',0,47,1,0],lp:['Response horizon (quarters)',0,8,1,4],binary:['Payment-to-income ratio',0,1.5,.01,.4]};
function extendedChart(scenario,step,value,progress){
 const extra=appliedExtension(scenario,step,value,progress);if(extra)return extra;
 const ds=data.datasets,est=data.estimates;
 if(scenario==='ovb'){
  const b=est['02'].short.b+(1-Number(value))*(est['02'].long.b-est['02'].short.b);
  const r=scatter(ds.fwl,'str','score',b,`Short ${est['02'].short.b.toFixed(2)} · adjusted ${est['02'].long.b.toFixed(2)}`,{step,progress,xlabel:'Students per teacher',ylabel:'Test score (points)'});
  return svg(r.s,'School scatterplot and illustrative slope movement between short and adjusted regression endpoints.');
 }
 if(scenario==='fwl'){
  const r=scatter(ds.fwl,'rx','ry',est['03'].full.b,'Both variables adjusted for language share and income',{step,progress,intercept:0,xlabel:'Staffing residual (students per teacher)',ylabel:'Score residual (points)'}),first=ds.fwl[0],cx=X(first.rx,r.xl,r.xh),cy=Y(first.ry,r.yl,r.yh);
  r.s+=circle(cx,cy,6,gold,1)+text(cx-9,cy-12,'First district',16,'end',gold);
  return svg(r.s,'Actual residual plot; gold marks the first exported district used in the worked subtraction.');
 }
 if(scenario==='test'){
  const b=est['04'].robust.b,se=est['04'].robust.se;let s=axes(-3.1,1.1,0,1.05,[-3,-2,-1,0,1],[0,.5,1],'Staffing slope (score points per student/teacher)','Relative density');
  s+=pathLine(Array.from({length:150},(_,i)=>{const x=-3.1+i*4.2/149;return[X(x,-3.1,1.1),Y(Math.exp(-.5*((x-b)/se)**2),0,1.05)];}),teal);
  const h=Number(value);s+=line(X(h,-3.1,1.1),55,X(h,-3.1,1.1),345,gold,3,'7 5');
  if(step>0)s+=line(X(b-1.96*se,-3.1,1.1),320,X(b+1.96*se,-3.1,1.1),320,ink,5);
  s+=text(840,29,`Estimate ${b.toFixed(3)} · SE ${se.toFixed(3)} · t = ${((b-h)/se).toFixed(2)}`,19,'end');return svg(s,'Approximate sampling-density illustration, actual robust interval and chosen null value.');
 }
 if(scenario==='retail'){
  const r=scatter(ds.retail,'inc10','sprice',est['05'].levels.b,'Navy: linear · Gold: quadratic',{step,progress,xlabel:'Local income (ten-thousand-dollar units)',ylabel:'Retail price (dollars)'});
  if(step>1){const b=est['05'].linear.b,c=est['05'].squared.b,a=average(ds.retail,'sprice')-b*average(ds.retail,'inc10')-c*ds.retail.reduce((s,d)=>s+d.inc10**2,0)/ds.retail.length;
   r.s+=pathLine(Array.from({length:100},(_,i)=>{const x=r.xl+(r.xh-r.xl)*i/99;return[X(x,r.xl,r.xh),Y(a+b*x+c*x*x,r.yl,r.yh)];}),gold);}
  return svg(r.s,'Observed retail prices and local income with fitted level and quadratic relationships.');
 }
 if(scenario==='sampling'){
  const n=Number(value)<.5?100:1000,rs=ds.sampling.filter(r=>r.n===n),lo=.4,hi=2.1,bins=34;
  let s=axes(lo,hi,0,150,[.5,1,1.5,2],[0,50,100,150],'Estimated coefficient','Repetitions');
  for(const [field,c] of [['b_short',gold],['b_adjusted',teal]]){
   const counts=Array(bins).fill(0);for(const r of rs){const j=Math.floor((r[field]-lo)/(hi-lo)*bins);if(j>=0&&j<bins)counts[j]++;}
   counts.forEach((v,j)=>{const x=lo+j*(hi-lo)/bins;s+=`<rect x="${X(x,lo,hi)}" y="${Y(v,0,150)}" width="${765/bins-1}" height="${345-Y(v,0,150)}" fill="${c}" opacity=".65"/>`;});
  }
  for(const [x,c] of [[1,teal],[1.5,gold]])s+=line(X(x,lo,hi),55,X(x,lo,hi),345,c,2,'6 5');
  s+=text(840,29,`n = ${n} · Teal: controlled · Gold: omitted factor`,20,'end');return svg(s,'Monte Carlo distributions at the selected sample size, centred on different population targets.');
 }
 if(scenario==='interaction'){
  const rs=ds.interaction,meanIncome=average(rs,'income'),a=est['07'].base.b+est['07'].income.b*meanIncome,b=est['07'].low.b,c=est['07'].intercept_difference.b,d=est['07'].difference.b;
  let s=axes(14,26,610,710,[14,18,22,26],[620,650,680,710],'Students per teacher','Fitted score at mean income');
  s+=line(X(14,14,26),Y(a+b*14,610,710),X(26,14,26),Y(a+b*26,610,710),teal,3);
  if(step>0)s+=line(X(14,14,26),Y(a+c+(b+d)*14,610,710),X(26,14,26),Y(a+c+(b+d)*26,610,710),gold,3);
  s+=text(840,29,`Teal: lower share (${b.toFixed(2)}) · Gold: higher share (${(b+d).toFixed(2)})`,19,'end');return svg(s,'Actual interaction-model fitted group slopes with income fixed at the same sample mean.');
 }
 if(scenario==='lagbars'){
  const vals=['impact','lag1','lag2'].map(k=>est['10'][k].b);let s=axes(-.5,2.5,-.03,.01,[0,1,2],[-.03,-.02,-.01,0,.01],'Unemployment lag (months)','Log-accident coefficient');
  vals.forEach((v,i)=>{const y=Y(Math.max(0,v),-.03,.01),h=Math.abs(Y(v,-.03,.01)-Y(0,-.03,.01));s+=`<rect x="${X(i,-.5,2.5)-55}" y="${y}" width="110" height="${h}" fill="${i===0?ink:teal}"/>`;});
  if(step>0)s+=pathLine(vals.map((_,i)=>[X(i,-.5,2.5),Y(vals.slice(0,i+1).reduce((a,b)=>a+b,0),-.03,.01)]),gold);
  s+=text(840,29,`Gold: cumulative coefficient · total ${vals.reduce((a,b)=>a+b,0).toFixed(4)}`,20,'end');return svg(s,'Actual impact and lag coefficients and their cumulative sum.');
 }
 if(scenario==='lp'){
  const rows=ds.lp;let s=axes(0,8,-.5,1.1,[0,2,4,6,8],[-.4,0,.4,.8],'Horizon (quarters)','Response per unit shock');
  s+=line(85,Y(0,-.5,1.1),850,Y(0,-.5,1.1),rule,2);
  if(step>0)for(const r of rows){const x=X(r.horizon,0,8);s+=line(x,Y(r.coefficient-1.96*r.se,-.5,1.1),x,Y(r.coefficient+1.96*r.se,-.5,1.1),teal,2);}
  s+=pathLine(rows.map(r=>[X(r.horizon,0,8),Y(r.coefficient,-.5,1.1)]),teal);
  if(step>1)s+=pathLine(rows.map(r=>[X(r.horizon,0,8),Y(.8*.6**r.horizon,-.5,1.1)]),gold,3,'8 5');
  const r=rows[Math.max(0,Math.min(8,Math.round(Number(value))))];s+=circle(X(r.horizon,0,8),Y(r.coefficient,-.5,1.1),7,ink,1)+text(840,29,`h = ${r.horizon} · estimate ${r.coefficient.toFixed(3)} · truth ${(.8*.6**r.horizon).toFixed(3)}`,19,'end');
  return svg(s,'Estimated and known quarterly responses. Some finite-sample estimates can have the opposite sign from the true response.');
 }
 if(scenario==='panel'){
  const rs=ds.panel,states=[...new Set(rs.map(r=>r.state))],chosen=states[Math.max(0,Math.min(states.length-1,Math.round(Number(value))))];let s=axes(1982,1988,0,5,[1982,1984,1986,1988],[0,1,2,3,4,5],'Year','Fatalities per 10,000 residents');
  for(const st of states){const group=rs.filter(r=>r.state===st);s+=pathLine(group.map(r=>[X(r.year,1982,1988),Y(r.fatality,0,5)]),st===chosen?teal:'#d7e1e7',st===chosen?4:1);}
  s+=text(840,29,`Selected state: ${chosen} · within-state changes differ from between-state levels`,18,'end');return svg(s,'Actual seven-year state trajectories with one state highlighted.');
 }
 if(scenario==='did'){
  let s=axes(0,1,6,16,[0,1],[6,8,10,12,14,16],'Period (0: before, 1: after)','Earnings (thousand dirhams)');
  s+=line(X(0,0,1),Y(8,6,16),X(1,0,1),Y(11,6,16),teal,4);
  s+=circle(X(0,0,1),Y(10,6,16),6,ink,1);
  if(step>0)s+=line(X(0,0,1),Y(10,6,16),X(1,0,1),Y(14,6,16),ink,4);
  if(step>1)s+=line(X(0,0,1),Y(10,6,16),X(1,0,1),Y(13,6,16),gold,3,'8 5')+line(825,Y(13,6,16),825,Y(14,6,16),gold,5);
  s+=text(840,29,'Navy: treated · Teal: untreated · Gold: parallel-trend counterfactual',18,'end');return svg(s,'Constructed earnings DiD: changes four and three thousand dirhams; difference one, causal only under the stated assumptions.');
 }
 if(scenario==='ivfirst')return svg(scatter(ds.iv,'salestax','logp',est['14'].first.b,'First-stage slope: '+est['14'].first.b.toFixed(4),{step,progress,xlabel:'Sales-tax component (real cents per pack)',ylabel:'Log real cigarette price'}).s,'Actual state first-stage relationship between the proposed tax instrument and cigarette price.');
 if(scenario==='binary'){
  const rs=ds.binary;let s=axes(0,1.5,-.1,1.05,[0,.3,.6,.9,1.2,1.5],[0,.25,.5,.75,1],'Payment-to-income ratio (fraction)','Fitted probability of denial');
  for(const [field,c] of [['lpm',gold],['probit',teal],...(step>0?[['logit',ink]]:[])])s+=pathLine(rs.map(r=>[X(r.pir,0,1.5),Y(r[field],-.1,1.05)]),c,3);
  const r=rs[Math.max(0,Math.min(150,Math.round(Number(value)*100)))];s+=line(X(r.pir,0,1.5),55,X(r.pir,0,1.5),345,rule,2,'6 5');
  s+=text(840,29,`At ${r.pir.toFixed(2)}: LPM ${r.lpm.toFixed(3)} · Probit ${r.probit.toFixed(3)} · Logit ${r.logit.toFixed(3)}`,18,'end');return svg(s,'Actual probability curves. Gold LPM can leave the zero-to-one range; probit and logit remain bounded.');
 }
 return '';
}

Object.assign(scenarioCaptions,{
 headstartTime:'Constructed time-allocation diagram adapted from Qiu’s Head Start lesson. Points illustrate feasible choices, not estimated responses.',
 didHeadStart:'Constructed Head Start employment-rate example using the original A/B/C/D sequence. Dashed untreated paths are assumptions; these are not estimates from the reading.',
 didConditional:'Constructed two-location comparison adapted from the Overleaf lesson. Within-location trends and effects are specified for the illustration.',
 didSupport:'Actual generated observations from the zero-effect 300-person experiment. Lowest-quarter baseline-income targeting leaves no comparison observations below the cutoff.',
 ridgePenalty:'Constructed one-standardised-predictor ridge illustration with OLS slope 0.8. The real nine-column model need not follow this one-column formula.',
 variance:'Actual OLS residuals from 420 districts. Gold points average squared residuals in five language-share ranges; these are diagnostic summaries, not a known variance curve.',
 penalty:'Constructed one-standardised-predictor illustration with OLS slope 0.8. Equal numerical penalties do not imply equal model complexity across methods.',
 validation:'Training-only cross-validation. The separate test sample is used after the fitting and tuning choices are frozen.',
 prediction:'Actual Stata errors on one fixed split: 280 training and 140 held-out districts. Lower RMSE is better for this prediction task.',
 didObserved:'Actual real sale-price means. The dashed near-group path assumes parallel untreated trends; it is not observed. Near means within three miles of the site.',
 ivSensitivity:'Supporting regression slopes are actual income-controlled estimates. The extra direct tax channel is assumed for sensitivity, not estimated.'
});
Object.assign(chartControls,{
 didHeadStart:['Alternative eligible untreated change minus comparison change (percentage points)',-3,5,.5,0],
 didConditional:['Eligible-group share in location A',0,1,.05,.75],
 ridgePenalty:['Penalty strength lambda (ridge illustration)',0,1.2,.05,.3],
 penalty:['Penalty strength lambda (illustration)',0,1.2,.05,.3],
 validation:['Training fold reserved for validation',1,5,1,1],
 ivSensitivity:['Assumed direct tax channel (log quantity / real cent)',-.015,.015,.001,0]
});
function appliedExtension(scenario,step,value,progress){
 const ds=data.datasets;
 if(scenario==='headstartTime'){
  let s=axes(0,7,0,7,[0,1,3,6],[0,2,3,5,6],'Home and other non-market time (hours)','Paid-work time (hours)');
  s+=line(X(0,0,7),Y(3,0,7),X(3,0,7),Y(0,0,7),ink,3,'7 5')+circle(X(1,0,7),Y(2,0,7),6,ink,1)+text(X(1,0,7)+12,Y(2,0,7)-12,'E1',19,'start');
  if(step>0)s+=line(X(0,0,7),Y(6,0,7),X(6,0,7),Y(0,0,7),teal,4)+circle(X(1,0,7),Y(5,0,7),6,teal,1)+text(X(1,0,7)+12,Y(5,0,7)-12,'E2',19,'start');
  if(step>1)s+=circle(X(4,0,7),Y(2,0,7),6,gold,1)+text(X(4,0,7)+12,Y(2,0,7)-12,'E3',19,'start');
  s+=text(840,29,'Three released hours can be allocated in different ways',18,'end');
  return svg(s,'Time-allocation schematic: preschool releases care time, allowing more work or other activity.');
 }
 if(scenario==='didHeadStart'){
  const delta=Number(value),pos=(t,y)=>[X(t,0,1),Y(y,30,75)];
  let s=axes(0,1,30,75,[],[30,40,50,60,70],'Period','Maternal employment rate (percent)');
  s+=text(85,377,'Before',19)+text(850,377,'After',19)+circle(...pos(0,40),6,ink,1)+circle(...pos(0,60),6,teal,1);
  s+=text(101,Y(40,30,75)-10,'A: 40',18,'start',ink)+text(101,Y(60,30,75)-10,'C: 60',18,'start',teal);
  if(step>0){s+=pathLine([pos(0,40),pos(1,48)],ink,4)+pathLine([pos(0,60),pos(1,63)],teal,4)+circle(...pos(1,48),6,ink,1)+circle(...pos(1,63),6,teal,1)+text(832,Y(48,30,75)-12,'B: 48',18,'end',ink)+text(832,Y(63,30,75)-12,'D: 63',18,'end',teal);}
  if(step>1){s+=pathLine([pos(0,40),pos(1,43)],gold,3,'7 5')+line(825,Y(43,30,75),825,Y(48,30,75),gold,5)+text(810,Y(45.5,30,75),'DiD: 5 pp',18,'end',gold);
   if(Math.abs(delta)>.001)s+=pathLine([pos(0,40),pos(1,43+delta)],ink,2,'3 5')+text(840,322,`Alternative assumed effect: ${(5-delta).toFixed(1)} pp`,18,'end');
  }
  s+=text(840,29,'Eligible: navy · Comparison: teal · Assumed untreated: dashed',17,'end');
  return svg(s,'Head Start teaching diagram with A, B, C and D employment rates and an assumption-based untreated path.');
 }
 if(scenario==='didConditional'){
  let s=text(450,20,'Employment rate (%) · Eligible: navy · Comparison: teal',17);const panel=(left,label,vals)=>{const px=t=>left+45+300*t,py=y=>320-(y-35)/35*230;
   let z=line(px(0),320,px(1),320)+line(px(0),80,px(0),320)+text(left+190,45,label,22);
   for(const y of[40,50,60,70])z+=text(px(0)-9,py(y)+5,y,16,'end')+line(px(0),py(y),px(1),py(y),rule,1);
   z+=text(px(0),350,'Before',17)+text(px(1),350,'After',17);
   const [g0,g1,c0,c1]=vals;
   z+=line(px(0),py(g0),px(1),py(g1),ink,4)+line(px(0),py(c0),px(1),py(c1),teal,4);
   z+=text(left+190,385,`Within-location DiD: ${(g1-g0)-(c1-c0)} pp`,18);
   return z;};
  s+=panel(10,'Location A',[40,43,50,52]);if(step>0)s+=panel(455,'Location B',[55,64,60,66]);
  if(step>1){const w=Number(value);s+=text(450,412,`Eligible-weighted ATT: ${(3-2*w).toFixed(2)} pp · Naive aggregate DiD: ${(4-6*w).toFixed(2)} pp`,19);}
  return svg(s,'Two illustrative within-location DiD comparisons and averages for a selected eligible-group location distribution.');
 }
 if(scenario==='didSupport'){
  const rs=ds.did_simulation,[lo,hi]=extent(rs.map(r=>r.baseline_income));
  let s=axes(lo,hi,0,1.2,ticks(lo,hi),[0,1],'Baseline income (constructed units)','Group (1: targeted, 0: comparison)');
  for(const r of rs.slice(0,Math.ceil(rs.length*progress)))s+=circle(X(r.baseline_income,lo,hi),Y(r.group,0,1.2),3,r.group?ink:teal,.5);
  const cutoff=Math.max(...rs.filter(r=>r.group===1).map(r=>r.baseline_income));
  if(step>0)s+=line(X(cutoff,lo,hi),55,X(cutoff,lo,hi),345,gold,3,'6 5');
  s+=text(840,29,'Targeted: lowest-income 75 of 300 people',19,'end');
  return svg(s,'Generated baseline incomes and deterministic assignment, showing the lack of untreated observations below the cutoff.');
 }
 if(scenario==='variance'){
  const rs=ds.variance,hi=Math.ceil(Math.max(...rs.map(r=>r.residual_sq))/1000)*1000;
  let s=axes(0,100,0,hi,[0,20,40,60,80,100],ticks(0,hi),'English learners (percent)','Squared residual (score points squared)');
  for(const r of rs.slice(0,Math.ceil(rs.length*progress)))s+=circle(X(r.el,0,100),Y(r.residual_sq,0,hi),3,teal,.45);
  if(step>0)for(let j=0;j<5;j++){const g=rs.filter(r=>Math.min(4,Math.floor(r.el/20))===j);if(g.length)s+=circle(X(average(g,'el'),0,100),Y(average(g,'residual_sq'),0,hi),7,gold,1);}
  s+=text(840,29,'Teal: district residuals · Gold: range averages',18,'end');
  return svg(s,'Observed squared OLS residuals against language share, with five range averages.');
 }
 if(scenario==='penalty'||scenario==='ridgePenalty'){
  const showLasso=scenario==='penalty';
  let s=axes(0,1.2,0,.9,[0,.3,.6,.9,1.2],[0,.2,.4,.6,.8],'Penalty strength lambda','Coefficient (standardised input)');
  s+=line(85,Y(.8,0,.9),850,Y(.8,0,.9),ink,2,'6 5');
  const path=f=>Array.from({length:100},(_,i)=>{const l=1.2*i/99;return[X(l,0,1.2),Y(f(l),0,.9)];});
  s+=pathLine(path(l=>.8/(1+l)),teal,4);
  if(showLasso&&step>0)s+=pathLine(path(l=>Math.max(.8-l,0)),gold,4);
  const l=Number(value);s+=line(X(l,0,1.2),55,X(l,0,1.2),345,rule,2,'4 4')+circle(X(l,0,1.2),Y(.8/(1+l),0,.9),6,teal,1);
  if(showLasso&&step>0)s+=circle(X(l,0,1.2),Y(Math.max(.8-l,0),0,.9),6,gold,1);
  s+=text(840,29,`Ridge ${(.8/(1+l)).toFixed(3)}${showLasso?` · Lasso ${Math.max(.8-l,0).toFixed(3)}`:''} · OLS 0.8`,18,'end');
  return svg(s,showLasso?'Single-standardised-predictor ridge and lasso paths; navy dashed line is the unpenalised slope.':'Single-standardised-predictor ridge path; navy dashed line is the unpenalised slope.');
 }
 if(scenario==='validation'){
  let s=text(450,40,step<2?'Validation uses only the 280 training districts':'Refit on training, then evaluate the separate test sample',23);
  const selected=(Math.round(Number(value))-1+(step===1?1:0))%5;
  for(let i=0;i<5;i++){
   const x=45+i*162,held=step<2&&i===selected;
   s+=`<rect x="${x}" y="95" width="145" height="95" fill="${held?gold:teal}" opacity=".16" stroke="${held?gold:teal}" stroke-width="3"/>`;
   s+=text(x+72,133,`Fold ${i+1}`,21)+text(x+72,168,held?'Validate':'Fit',18);
  }
  s+=arrow(450,211,450,250)+text(450,280,step<2?'Rotate folds; compare training-validation errors':'Freeze the fitted models before seeing test errors',21);
  s+=`<rect x="205" y="315" width="490" height="65" fill="white" stroke="${step<2?rule:gold}" stroke-width="3"/>`;
  s+=text(450,356,step<2?'140 test districts remain untouched':'140 test districts: score frozen predictions',20);
  return svg(s,'Five-fold validation inside training, followed by a separate held-out test evaluation.');
 }
 if(scenario==='prediction'){
  const names=['OLS 3','OLS 9','Ridge','Lasso'];let s=axes(-.5,3.5,0,12,[],[0,3,6,9,12],'Model fitted on the same training districts','Held-out RMSE (score points)');
  ds.prediction.forEach((r,i)=>{const c=i===2?gold:teal,x=X(i,-.5,3.5),top=Y(r.test_rmse,0,12);
   if(step>0||i===0)s+=`<rect x="${x-55}" y="${top}" width="110" height="${345-top}" fill="${c}" opacity=".8"/>`+text(x,top-12,Number(r.test_rmse).toFixed(3),20);
   s+=text(x,377,names[i],20);
  });
  s+=text(840,29,'One fixed split · 140 held-out districts',19,'end');
  return svg(s,'Actual held-out prediction errors for two OLS specifications, ridge and lasso.');
 }
 if(scenario==='didObserved'){
  const get=(near,year)=>ds.housing.find(r=>r.nearinc===near&&r.year===year).rprice/1000;
  const f0=get(0,1978),f1=get(0,1981),n0=get(1,1978),n1=get(1,1981),cf=n0+f1-f0;
  let s=axes(1978,1981,50,110,[1978,1981],[50,65,80,95,110],'Sale year','Mean sale price (thousand 1978 dollars)');
  s+=line(X(1978,1978,1981),Y(f0,50,110),X(1981,1978,1981),Y(f1,50,110),teal,4)+circle(X(1978,1978,1981),Y(f0,50,110),6,teal,1)+circle(X(1981,1978,1981),Y(f1,50,110),6,teal,1);
  s+=circle(X(1978,1978,1981),Y(n0,50,110),6,ink,1);
  if(step>0)s+=line(X(1978,1978,1981),Y(n0,50,110),X(1981,1978,1981),Y(n1,50,110),ink,4)+circle(X(1981,1978,1981),Y(n1,50,110),6,ink,1);
  if(step>1)s+=line(X(1978,1978,1981),Y(n0,50,110),X(1981,1978,1981),Y(cf,50,110),gold,3,'8 6')+line(825,Y(cf,50,110),825,Y(n1,50,110),gold,5)+text(810,Y((cf+n1)/2,50,110),'-11.864',19,'end',gold);
  s+=text(840,29,'Navy: near · Teal: far · Dashed gold: assumed untreated',17,'end');
  return svg(s,'Four actual real house-price means and the near-group counterfactual under parallel untreated trends.');
 }
 if(scenario==='ivSensitivity'){
  const r=ds.iv_controlled[0],beta=g=>(r.reduced-g)/r.first;
  let s=axes(-.015,.015,-1.8,-.5,[-.015,0,.015],[-1.8,-1.4,-1,-.6],'Assumed direct tax channel gamma','Implied price elasticity');
  s+=pathLine([-.015,.015].map(g=>[X(g,-.015,.015),Y(beta(g),-1.8,-.5)]),teal,4);
  const g=Number(value);s+=line(X(0,-.015,.015),55,X(0,-.015,.015),345,rule,2,'5 5')+circle(X(g,-.015,.015),Y(beta(g),-1.8,-.5),7,gold,1);
  s+=text(840,29,`Assumed channel ${g.toFixed(3)} · implied elasticity ${beta(g).toFixed(3)}`,18,'end');
  return svg(s,'Sensitivity of the controlled IV elasticity to an assumed direct tax channel; the channel is not estimated.');
 }
 return '';
}
