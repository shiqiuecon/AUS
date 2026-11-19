'use strict';
window.MizanClock=(()=>{
  let clock=null,anchor=0;
  const disabledByClock=new WeakSet();
  const remaining=()=>clock?clock.deadline-clock.serverTime-(performance.now()-anchor):Infinity;
  function render(){
    const seconds=clock?Math.max(0,Math.ceil(remaining()/1000)):0;
    const text=seconds?Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0'):'Time is up';
    document.querySelectorAll('[data-mizan-countdown]').forEach(node=>{
      if(node.textContent!==text)node.textContent=text;
    });
    document.querySelectorAll('[data-mizan-clock]').forEach(node=>node.classList.toggle('clock-ended',!!clock&&seconds===0));
    document.querySelectorAll('[data-mizan-deadline]').forEach(button=>{
      const expired=clock?.stage===button.dataset.mizanDeadline&&seconds===0;
      if(expired&&!button.disabled){disabledByClock.add(button);button.disabled=true;}
      else if(!expired&&disabledByClock.delete(button))button.disabled=false;
    });
  }
  function sync(value){
    if(clock?.deadline!==value?.deadline||clock?.serverTime!==value?.serverTime){
      clock=value;
      anchor=performance.now();
    }
    render();
  }
  setInterval(render,250);
  return {sync,remaining};
})();
