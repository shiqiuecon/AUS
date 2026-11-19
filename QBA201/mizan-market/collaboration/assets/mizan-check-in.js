'use strict';
(() => {
  const panel = document.querySelector('[data-current-check-in]');
  if (!panel) return;
  const form = document.querySelector('#room-form');
  const params = new URLSearchParams(location.search);
  if (form && (params.get('classroom') !== 'mizan' || params.has('room'))) return;

  const serviceOrigin = new URL(document.currentScript.src).origin;
  const codePattern = /^[A-HJ-NP-Z2-9]{6}$/;
  const qr = panel.querySelector('[data-current-qr]');
  const join = panel.querySelector('[data-current-link]');
  let pending = false;

  async function refresh() {
    if (pending || document.hidden || form?.hidden) return;
    pending = true;
    try {
      const response = await MizanRuntime.fetch('/api/mizan-check-in', {
        cache: 'no-store', signal: AbortSignal.timeout(4500)
      });
      if (!response.ok) throw new Error('Could not load the current section.');
      const {code,mode} = await response.json();
      if (!codePattern.test(code || '') || form?.hidden) {
        panel.hidden = true;
        return;
      }
      const url = new URL(MizanRuntime.page('lobby'),location.origin);
      url.searchParams.set('room', code);
      const image = window.LobbyQR?.image(url.href);
      if (image && qr.getAttribute('src') !== image) qr.src = image;
      qr.hidden = !image;
      join.href = url.href;
      const heading=panel.querySelector('h2'),help=panel.querySelector('p');
      if(heading)heading.textContent=mode==='observer'?'Late arrivals: join as an observer':'Check-in is open';
      if(help)help.textContent=mode==='observer'?'Scan to observe an existing team. The competing rosters are locked.':'Scan with your phone camera.';
      panel.hidden = false;
    } catch {
      panel.hidden = true;
    } finally {
      pending = false;
    }
  }

  refresh();
  setInterval(refresh, 5000);
  document.addEventListener('visibilitychange', refresh);
})();
