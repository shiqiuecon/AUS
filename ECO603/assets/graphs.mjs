import {data,escapeHTML as e} from './common.mjs?v=ab6e29338788';
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
const mx=average(data.schools,'str'),my=average(data.schools,'score');
function schoolplot({mode='schools',step=0,value=0,progress=1}){
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
 s+=node(70,200,330,'Ratio of 20','Potential score: Yᵢ(20)')+node(500,200,330,'Ratio of 22','Potential score: Yᵢ(22)');
 if(step>0)s+=text(450,330,'Policy difference: Yᵢ(20) − Yᵢ(22)',28);
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
 s+=text(835,30,`uₜ = ${rho.toFixed(2)}uₜ₋₁ + εₜ · fixed innovations · 300-period burn-in`,18,'end');
 return svg(s,'Illustrative AR(1) simulation with fixed innovation draws, not estimated traffic residuals.');
}
function hac(L){
 let s=axes(0,12,0,1.05,[0,2,4,6,8,10,12],[0,.5,1],'Lag k (observation periods)','Bartlett weight');
 for(let k=0;k<=12;k++){
   const w=k<=L?1-k/(L+1):0;
   if(w>0)s+=`<rect x="${X(k,0,12)-16}" y="${Y(w,0,1.05)}" width="32" height="${345-Y(w,0,1.05)}" fill="${k===0?ink:teal}"/>`;
 }
 s+=text(835,30,`L = ${L} · wₖ = 1 − k/(L+1), k ≤ L`,20,'end');
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
export const graphKinds=new Set(['schools','fit','residual','adjustment','dag','counterfactual','traffic','serial','lagplot','arsim','hac','intervals']);
export function graph(kind,step,value,progress=1){
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
export const captions={schools:'California school districts · 420 observed districts',fit:'Rotate around the mean point. The loss uses all 420 observed districts.',residual:'Vertical distance from the observed score to the fitted line · actual district data',adjustment:'Adjusted line fixes English-learner share at its sample mean. Both fits use the same 420 districts.',dag:'Arrows show the proposed explanation. The scatterplot alone does not establish it.',counterfactual:'Conceptual policy comparison · no numerical effect is assumed',traffic:'Historical California traffic data · monthly observations',serial:'Residuals from the actual log-accident regression · 108 months',lagplot:'Actual residual pairs · one initial observation lost to lagging',arsim:'Illustrative simulation · fixed innovations · vertical range adapts to the selected persistence',hac:'Declining lag weights only. The slider does not recalculate the Stata standard errors.',intervals:'Actual Stata estimates and SEs · approximate intervals = b ± 1.96 × SE. Exact software intervals are in the output.'};
