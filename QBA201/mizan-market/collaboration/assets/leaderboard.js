'use strict';
/** Shared display for the instructor projection and students' end-of-class results. */
window.TeamLeaderboard = (() => {
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function membersHTML(members){
    return members.length?'<ul class="leaderboard-members">'+members.map(member=>'<li><strong>'+escape(member.name)+'</strong><span>'+escape(member.roles.length?member.roles.join(' · '):'Team member')+'</span></li>').join('')+'</ul>':'<span class="fine">No participating members</span>';
  }
  function podium(view){
    const leaders=view.ranking.filter(team=>team.rank!==null&&team.rank<=3&&team.ready);
    if(!leaders.length)return '';
    return '<div class="lb-podium" aria-label="Leading teams">'+leaders.map(team=>{
      const rank=Math.max(1,Math.min(3,team.rank));
      return '<article class="lb-medal lb-place-'+rank+'"><div class="lb-medal-top"><span class="lb-place">'+(team.tied?'JOINT ':'')+'#'+rank+'</span><span aria-hidden="true">'+(['','★','◆','✦'][rank])+'</span></div><h3>'+escape(team.name)+'</h3><div class="lb-hero-score">'+(team.total??'—')+'<small> / '+(view.maxPoints||12)+' pts</small></div><p>'+(view.finalized?(team.winner?'Winner':'Final standing'):'Current standing · awards pending')+'</p></article>';
    }).join('')+'</div>';
  }
  function table(view){
    const showMembers=view.ranking.some(team=>Array.isArray(team.members));
    const rounds=view.phases||[],max=view.maxPoints??12;
    const automatic=view.scoring==='automatic'||view.scoring===undefined;
    const bonuses=view.finalized&&view.bonusPolicy==='team-pool';
    return '<section class="lb-arena"><header class="lb-banner"><div><span class="lb-eyebrow">MIZAN MARKET · TEAM CHALLENGE</span><h2>'+(view.finalized?'The final standings':'The leaderboard')+'</h2><p>Smart decisions. Strong teams. Every round counts.</p></div><span class="lb-stage">'+(view.finalized?'FINAL RESULTS':'SCORES SO FAR')+'</span></header>'+podium(view)+'<div class="scroll" role="region" aria-label="Team leaderboard" tabindex="0"><table class="leaderboard"><caption>'+
      (view.finalized?'Final team ranking':showMembers?'End-of-class scores · awards pending':'Team ranking · closed rounds')+
      '</caption><thead><tr><th scope="col">Rank</th><th scope="col">Team ID</th>'+
      (showMembers?'<th scope="col">Team members and roles</th>':'')+
      (automatic?rounds.map((_,index)=>'<th scope="col">R'+(index+1)+'</th>').join(''):'')+
      '<th scope="col">Total / '+max+'</th>'+(bonuses?'<th scope="col">Course bonus</th>':'')+'<th scope="col">Status</th></tr></thead><tbody>'+
      view.ranking.map(team=>'<tr class="'+(team.winner?'top-team':'')+'"><td class="rank">'+
        (team.rank===null?'—':team.rank+(team.tied?' =':''))+'</td><th scope="row" class="leaderboard-team">'+escape(team.name)+
        '<details class="leaderboard-record"><summary>Record ID</summary><span>'+escape(team.id)+'</span></details></th>'+
        (showMembers?'<td>'+membersHTML(team.members||[])+'</td>':'')+
        (automatic?team.rounds.map(round=>'<td class="leaderboard-points">'+(round.skipped?(round.possible?'Vote '+round.earned+' / '+round.possible:'Skipped'):round.earned===null?'—':round.earned+' / '+round.possible)+'</td>').join(''):'')+
        '<td class="lb-total"><strong>'+(team.total??'—')+'</strong><span class="lb-meter" aria-hidden="true"><i style="width:'+Math.max(0,Math.min(100,100*(Number(team.total)||0)/(max||1)))+'%"></i></span></td>'+
        (bonuses?'<td>'+escape(Number(team.coursePercentagePoints).toFixed(3).replace(/\.?0+$/,''))+' percentage points<br><small>Subject to roster verification</small></td>':'')+'<td>'+
        (team.winner?'Winner':!team.ready?(automatic?'Awaiting submission':'Review needed'):view.finalized?'Final':showMembers?'Awards pending':automatic?'Automatic':'Provisional')+
        '</td></tr>').join('')+'</tbody></table></div></section>';
  }
  return {table};
})();
