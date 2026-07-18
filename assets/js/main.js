'use strict';
(() => {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile menu toggle (accessible button + Esc/close-on-select)
(() => {
  const burger = document.querySelector('.nav-burger');
  const menu = document.getElementById('nav-menu');
  if (!burger || !menu) return;
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); burger.focus(); }
  });
})();

// 3D tilt on work cards (pointer devices only; skipped for reduced motion)
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();
