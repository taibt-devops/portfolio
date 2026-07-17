'use strict';
/**
 * Replays a terminal transcript with a typing effect.
 * Markup contract: container holds .t-line rows; command rows contain .t-cmd.
 * No-JS / reduced-motion: transcript is already fully visible — we do nothing.
 */
(() => {
  const body = document.getElementById('terminal-body');
  if (!body) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = Array.from(body.querySelectorAll('.t-line'));
  const cursorLine = lines[lines.length - 1];
  // Snapshot command texts, then hide everything except a cursor.
  const plan = lines.slice(0, -1).map((el) => ({
    el,
    cmd: el.querySelector('.t-cmd'),
    text: el.querySelector('.t-cmd') ? el.querySelector('.t-cmd').textContent : null,
  }));
  plan.forEach((p) => { p.el.style.display = 'none'; if (p.cmd) p.cmd.textContent = ''; });
  cursorLine.style.display = 'none';

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeInto(el, text) {
    for (const ch of text) {
      el.textContent += ch;
      await sleep(28 + Math.random() * 45);
    }
  }

  async function run() {
    await sleep(500);
    for (const p of plan) {
      p.el.style.display = '';
      if (p.cmd) {            // command: type it
        await typeInto(p.cmd, p.text);
        await sleep(260);
      } else {                // output: reveal with a short beat
        await sleep(90);
      }
    }
    cursorLine.style.display = '';
  }
  run();
})();
