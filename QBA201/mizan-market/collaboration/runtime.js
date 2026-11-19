'use strict';
window.MizanRuntime=(()=>{
  const root=new URL('.',document.currentScript.src);
  const deployment=window.MIZAN_DEPLOYMENT||{};
  const preview=new URLSearchParams(location.search).get('preview')==='sample';
  if(preview){localStorage.setItem('qba-mizan-preview-host',JSON.stringify({code:'DEMA26',secret:'2'.repeat(32)}));localStorage.setItem('qba-lobby-member-DEMA26','1'.repeat(32));}
  const paths={host:'host.html',lobby:'lobby.html',challenge:'challenge.html',home:'index.html'};
  let sample;
  function page(name){return new URL(paths[name]||paths.home,root).pathname;}
  async function sampleState(){
    if(!sample)sample=window.fetch(new URL('sample-workspace.json',root),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('The sample workspace could not load.');return r.json();});
    return sample;
  }
  async function request(path,options={}){
    if(preview){
      const data=await sampleState();
      if(options.method==='POST')return Response.json({error:'This is a read-only sample. Live answers and voting require the classroom connection.'},{status:409});
      if(path==='/api/mizan-check-in')return Response.json({code:null});
      const host=document.body?.dataset.mizanPage==='host';
      const result=structuredClone(host?data.host:data.student);
      if(host&&new URLSearchParams(location.search).get('minutes')==='75'){result.timing.minutes=75;result.maxPoints=32;}
      return Response.json(result);
    }
    if(!deployment.apiOrigin)throw Object.assign(Error('The live classroom connection is not configured. Return to the Mizan Market page.'),{status:503});
    const origin=new URL(deployment.apiOrigin);
    if(origin.protocol!=='https:'&&!['127.0.0.1','localhost'].includes(origin.hostname))throw Error('The classroom connection requires HTTPS.');
    if(!path.startsWith('/api/'))throw Error('Invalid classroom endpoint.');
    return window.fetch(new URL(path,origin),{...options,credentials:'omit'});
  }
  document.addEventListener('DOMContentLoaded',async()=>{
    if(preview){
      document.body.dataset.sampleWorkspace='true';
      const note=document.createElement('aside');note.className='github-preview-note';note.textContent='Sample workspace · fictional students · read only';document.body.append(note);
      const data=await sampleState();
      if(document.body.dataset.mizanPage==='host')localStorage.setItem('qba-mizan-preview-host',JSON.stringify({code:data.host.code,secret:'2'.repeat(32)}));
      else localStorage.setItem('qba-lobby-member-'+data.student.code,'1'.repeat(32));
      document.addEventListener('submit',event=>{event.preventDefault();},true);
      document.addEventListener('click',event=>{
        const button=event.target.closest('button');if(!button)return;
        const allowed=button.dataset.nav||button.dataset.resource||button.hasAttribute('data-close-resource')||button.id==='ws-menu'||button.id==='ws-mobile-team'||button.dataset.hostChannel||button.dataset.inspectTeam||button.id==='show-lobby-qr'||button.id==='show-board'||button.closest('form[method="dialog"]');
        if(!allowed){event.preventDefault();event.stopImmediatePropagation();}
      },true);
    }else if(!deployment.apiOrigin&&document.body.dataset.mizanPage){
      const panel=document.createElement('main');panel.className='github-connection-note';
      panel.innerHTML='<h1>Mizan Market</h1><p>The dashboard and team workspace are hosted here. The live classroom connection has not been configured yet.</p><p><a href="index.html">Open the workspace preview</a></p><p><a href="../">Return to the current activity</a></p>';
      document.body.replaceChildren(panel);
    }
  });
  return {fetch:request,page,preview};
})();
