'use strict';
/**
 * Attribute-driven scroll effects. Usage:
 *   data-reveal                 -> fade/slide in when 15% visible
 *   data-reveal-delay="200"     -> stagger (ms)
 *   data-count-to="100"         -> count text content from 0 to N on reveal
 * Reduced motion: elements stay visible, counters show final values (we do nothing).
 */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  els.forEach((el) => el.classList.add('is-hidden'));

  const countUp = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    const dur = 900;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      setTimeout(() => {
        el.classList.add('revealed');
        el.querySelectorAll('[data-count-to]').forEach(countUp);
      }, parseInt(el.dataset.revealDelay || '0', 10));
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();
