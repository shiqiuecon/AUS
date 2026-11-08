import {data,escapeHTML as e,typeset} from './common.mjs?v=28599d1f2c26';
import {graph,graphKinds,scenarioCaptions,captions,chartControls} from './graphs.mjs?v=4d2768d6287f';
const key=new URLSearchParams(location.search).get('meeting')||'01',lesson=data.lessons[key];
if(!lesson)throw Error('Unknown meeting');
const initial={fit:data.stats.school_simple.slope,residual:40,arsim:.65,hac:4};
document.querySelector('#main').innerHTML=lesson.slides.map((s,i)=>{
 const scenario=s.graph?.scenario,config=chartControls[scenario];
 const value=s.kind==='causal'?{conditioned:s.graph.printConditioned??data.dags[s.graph.id].conditioned,extra:data.dags[s.graph.id].extraEnabled}:config?config[4]:(initial[s.kind]??initial[scenario]??0);
 const visual=s.output?`<pre class="stata">${e(s.output)}</pre>${s.output_note?`<p class="graph-caption">${e(s.output_note)}</p>`:''}`:graphKinds.has(s.kind)?`<div class="graph-stage">${graph(s.kind,2,value,1,s.graph)}</div><p class="graph-caption">${e(scenario?(scenarioCaptions[scenario]||captions[scenario]):captions[s.kind])}</p>`:'';
 return `<article class="pdf-slide" id="slide-${i+1}"><div class="pdf-kicker">ECO 603 · ${key}. ${e(lesson.title)}</div><h1>${e(s.title)}</h1><p class="lede">${e(s.lead)}</p><div class="pdf-content ${s.output?'has-output':''}">${visual}<div class="concept-lines">${s.body.map(b=>`<div class="concept-line">${e(b)}</div>`).join('')}</div>${s.exercise?`<div class="exercise"><h3>Practice</h3><p>${e(s.exercise)}</p>${s.answer?`<p class="worked"><strong>Explanation:</strong> ${e(s.answer)}</p>`:''}</div>`:''}</div><div class="pdf-footer"><span>Shi Qiu · American University of Sharjah</span><span>${i+1} / ${lesson.slides.length}</span></div></article>`;
}).join('');
typeset(document.querySelector('#main'));
await document.fonts.ready;
for(const a of document.querySelectorAll('.pdf-slide')){
 const c=a.querySelector('.pdf-content'),f=a.querySelector('.pdf-footer');
 const available=f.getBoundingClientRect().top-c.getBoundingClientRect().top-12;
 if(c.scrollHeight>available)a.classList.add('compact');
 const scale=Math.min(1,available/c.scrollHeight);
 c.dataset.scale=String(scale);
 if(scale<1){c.style.transform=`scale(${scale})`;c.style.transformOrigin='top center';}
}
window.printReady=true;
