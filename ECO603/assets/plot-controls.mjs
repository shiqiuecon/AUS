import {data} from './common.mjs?v=82d1f092741c';

const plotActions = {
 fit:'Drag the handle to rotate the line. Watch the sum of squared errors change.',
 residual:'Select a district dot to see its residual.',
 test:'Select or drag the hypothesised slope on the horizontal axis.',
 lp:'Select a quarter on the graph to compare the estimate with the known response.',
 binary:'Select a payment-to-income ratio on the plot to compare the fitted probabilities.',
 hac:'Select the last lag to include in the window.',
 arResponse:'Drag the point at period one to vary persistence.',
 didHeadStart:'Drag the end of the untreated path to try a different assumption.',
 ridgePenalty:'Select a penalty on the graph to see how the coefficient changes.',
 penalty:'Select a penalty on the graph to compare ridge and lasso.',
 validation:'Select the fold you would use for validation.'
};

const plotClamp = (v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const plotX = (v,lo,hi)=>85+(v-lo)*765/(hi-lo);
const plotY = (v,lo,hi)=>345-(v-lo)*290/(hi-lo);
const plotSVG = 'http://www.w3.org/2000/svg';

export function plotAction(scenario) {return plotActions[scenario];}

export function bindPlotControls(stage,scenario,input,change) {
 if(!plotAction(scenario)||!input)return null;
 const fit = scenario==='fit'?{
  mx:data.schools.reduce((sum,r)=>sum+r.str,0)/data.schools.length,
  my:data.schools.reduce((sum,r)=>sum+r.score,0)/data.schools.length
 }:null;
 const districts=scenario==='residual'?data.schools.map(row=>[plotX(row.str,14,26),plotY(row.score,600,720)]):null;
 const min=Number(input.min),max=Number(input.max),increment=Number(input.step);
 const canDrag=!['residual','validation'].includes(scenario);
 let pointer=null, frame=0, pending;

 function select(point) {
  if(fit)return (600+(345-point.y)*120/290-fit.my)/(26-fit.mx);
  if(scenario==='residual'){
   const closest=districts.reduce((best,[x,y],i)=>{
    const distance=(x-point.x)**2+(y-point.y)**2;
    return distance<best.distance?{distance,i}:best;
   },{distance:Infinity,i:0});
   return closest.i+1;
  }
  if(scenario==='arResponse')return -1+(345-point.y)*2.2/290;
  if(scenario==='didHeadStart')return 30+(345-point.y)*45/290-43;
  if(scenario==='validation')return Math.floor((point.x-45)/162)+1;
  const axis=scenario==='test'?[-3.1,1.1]:[min,max];
  return axis[0]+(point.x-85)*(axis[1]-axis[0])/765;
 }
 function updateValue() {
  frame=0;
  if(pending===undefined)return;
  const value=pending;pending=undefined;
  change(plotClamp(Number((min+increment*Math.round((value-min)/increment)).toFixed(6)),min,max));
 }
 function readPoint(event) {
  const transform=stage.querySelector('svg')?.getScreenCTM();
  if(!transform)return;
  const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(transform.inverse());
  pending=select(point);
 }
 stage.addEventListener('pointerdown',event=>{
  if(!event.target.closest('[data-plot-target]')||pointer!==null||event.button!==0)return;
  event.stopPropagation();
  pointer=event.pointerId;
  stage.setPointerCapture(pointer);
  readPoint(event);
  updateValue();
 });
 stage.addEventListener('pointermove',event=>{
  if(pointer!==event.pointerId||!canDrag)return;
  readPoint(event);
  if(!frame)frame=requestAnimationFrame(updateValue);
 });
 function release(event) {
  if(pointer!==event.pointerId)return;
  if(event.type==='pointerup'&&canDrag)readPoint(event);
  cancelAnimationFrame(frame);
  updateValue();
  pointer=null;
 }
 stage.addEventListener('pointerup',release);
 stage.addEventListener('pointercancel',release);
 stage.addEventListener('lostpointercapture',release);
 return (value,step)=>{
  const svg=stage.querySelector('svg');
  if(!svg)return;
  let layer=svg.querySelector('[data-plot-controls]');
  if(layer)layer.replaceChildren();
  else{
   layer=document.createElementNS(plotSVG,'g');
   layer.setAttribute('data-plot-controls','');
   svg.append(layer);
  }
  function append(tag,attrs) {
   const object=document.createElementNS(plotSVG,tag);
   for(const [key,v] of Object.entries(attrs))object.setAttribute(key,v);
   layer.append(object);
  }
  function box(x,y,width,height) {
   append('rect',{x,y,width,height,fill:'transparent','data-plot-target':canDrag?'drag':'pick'});
  }
  function handle(cx,cy,show=true) {
   if(show)append('circle',{cx,cy,r:9,fill:'#fffaf0',stroke:'#94630e','stroke-width':3,'pointer-events':'none'});
   box(cx-25,cy-29,50,58);
  }
  if(fit){
   handle(850,plotY(fit.my+value*(26-fit.mx),600,720));
   return;
  }
  if(scenario==='arResponse'){
   handle(plotX(1,0,8),plotY(value,-1,1.2));
   return;
  }
  if(scenario==='didHeadStart'){
   handle(850,plotY(43+value,30,75),step>=3);
   return;
  }
  if(scenario==='validation'){
   for(let i=0;i<5;i++)box(45+i*162,90,145,105);
   return;
  }
  box(69,45,798,318);
 };
}
