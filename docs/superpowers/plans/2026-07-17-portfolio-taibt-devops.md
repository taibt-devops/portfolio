# Portfolio Website (taibt — DevOps Terminal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page, English, DevOps/terminal-styled static portfolio for Bui Thanh Tai on GitHub Pages.

**Architecture:** One semantic `index.html` + one `main.css` (design tokens via CSS custom properties) + three small dependency-free JS modules (`terminal.js` typing engine, `reveal.js` scroll reveals/count-up, `main.js` page wiring). All content is present in HTML (JS is progressive enhancement). CI validates HTML then deploys to GitHub Pages.

**Tech Stack:** Pure HTML5/CSS3/ES2020. Dev-time only: `html-validate` (via npx), GitHub Actions (`actions/deploy-pages`). Fonts: Google Fonts (JetBrains Mono, Space Grotesk, Inter). Icons: self-hosted devicon SVGs.

**Spec:** `docs/superpowers/specs/2026-07-17-portfolio-taibt-devops-design.md`

**Working directory:** `f:/git/portfolio-taibt-devops` (git repo already initialized, branch `main`).

**Verification model:** Static site — each task ends with (a) `npx html-validate index.html` passing and (b) a concrete visual check in the browser (open `index.html` directly; no server needed — the site never fetches at runtime). Full content must be visible with JS disabled.

---

### Task 1: Scaffold — HTML skeleton, design tokens, background

**Files:**
- Create: `index.html`
- Create: `assets/css/main.css`
- Create: `.htmlvalidate.json`
- Create: `.gitignore`

- [ ] **Step 1: Create `.gitignore` and `.htmlvalidate.json`**

`.gitignore`:
```
node_modules/
.DS_Store
Thumbs.db
```

`.htmlvalidate.json`:
```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "no-trailing-whitespace": "off",
    "long-title": "off"
  }
}
```

- [ ] **Step 2: Create `index.html` skeleton**

Full file (sections are empty landmarks for now; later tasks fill them):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bui Thanh Tai — Senior DevOps Engineer</title>
  <meta name="description" content="Senior DevOps Engineer — 5+ years building and running cloud-native infrastructure on AWS, Kubernetes, GitOps and observability. Available for freelance.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header id="site-nav"><!-- Task 2 --></header>
  <main id="main">
    <section id="hero" aria-label="Introduction"><!-- Task 3 --></section>
    <section id="stats" aria-label="Key numbers"><!-- Task 4 --></section>
    <section id="about" aria-label="About me"><!-- Task 5 --></section>
    <section id="skills" aria-label="Skills"><!-- Task 6 --></section>
    <section id="experience" aria-label="Experience"><!-- Task 7 --></section>
    <section id="work" aria-label="Featured work"><!-- Task 8 --></section>
    <section id="contact" aria-label="Contact"><!-- Task 9 --></section>
  </main>
  <footer id="site-footer"><!-- Task 9 --></footer>
  <script src="assets/js/terminal.js" defer></script>
  <script src="assets/js/reveal.js" defer></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

Note: the three `<script>` tags reference files created in Tasks 3–4 and 8. To keep every intermediate state working, ALSO create three empty files now: `assets/js/terminal.js`, `assets/js/reveal.js`, `assets/js/main.js`, each containing only `'use strict';`.

- [ ] **Step 3: Create `assets/css/main.css` — tokens, reset, background**

```css
/* ============ Design tokens ============ */
:root {
  --bg: #050a12;
  --bg-raise: #0a1220;
  --bg-terminal: #070d17;
  --line: #12233d;
  --text: #c9d6e8;
  --text-dim: #7c8ba3;
  --accent: #00ff9c;
  --accent-dim: #00c97b;
  --cyan: #39c5ff;
  --amber: #ffb347;
  --danger: #ff5f56;
  --mono: "JetBrains Mono", ui-monospace, Consolas, monospace;
  --head: "Space Grotesk", system-ui, sans-serif;
  --body: "Inter", system-ui, sans-serif;
  --radius: 10px;
  --maxw: 1100px;
  --glow: 0 0 24px rgba(0, 255, 156, 0.25);
}

/* ============ Reset & base ============ */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
img, svg { max-width: 100%; display: block; }
a { color: var(--accent); }
a:hover { color: var(--cyan); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
h1, h2, h3, h4 { font-family: var(--head); line-height: 1.15; color: #fff; }

.skip-link {
  position: absolute; left: -9999px; top: 0; z-index: 100;
  background: var(--accent); color: #04220f; padding: 8px 16px; font-family: var(--mono);
}
.skip-link:focus { left: 8px; }

/* Blueprint grid + scanline backdrop */
body::before {
  content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background-image:
    linear-gradient(rgba(57, 197, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 197, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%);
}
body::after {
  content: ""; position: fixed; inset: 0; z-index: 2; pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 3px);
}

/* Layout helpers */
.wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
section { padding: 88px 0; }
.section-title {
  font-family: var(--mono); font-size: 15px; color: var(--accent);
  letter-spacing: 0.08em; margin-bottom: 8px;
}
.section-title::before { content: "$ "; color: var(--text-dim); }
.section-heading { font-size: clamp(28px, 4vw, 40px); margin-bottom: 40px; }
```

- [ ] **Step 4: Validate + visual check**

Run: `cd f:/git/portfolio-taibt-devops && npx --yes html-validate index.html`
Expected: no errors (exit 0).
Open `index.html` in a browser. Expected: near-black blue page, faint grid fading toward the bottom, subtle scanlines. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold page skeleton, design tokens, blueprint background"
```

---

### Task 2: Navigation bar

**Files:**
- Modify: `index.html` (fill `<header id="site-nav">`)
- Modify: `assets/css/main.css` (append)
- Modify: `assets/js/main.js` (nav scroll state)

- [ ] **Step 1: Fill the header markup**

Replace `<header id="site-nav"><!-- Task 2 --></header>` with:

```html
<header id="site-nav">
  <nav class="wrap nav-inner" aria-label="Main">
    <a class="brand" href="#hero">taibt<span class="brand-at">@devops</span><span class="brand-path">:~$</span></a>
    <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="Toggle menu">
    <label for="nav-toggle" class="nav-burger" aria-hidden="true"><span></span><span></span><span></span></label>
    <ul class="nav-links">
      <li><a href="#about">about</a></li>
      <li><a href="#skills">skills</a></li>
      <li><a href="#experience">experience</a></li>
      <li><a href="#work">work</a></li>
      <li><a href="#contact">contact</a></li>
      <li><a class="btn btn-ghost" href="cv/BUI_THANH_TAI_CV.pdf" download>download cv</a></li>
    </ul>
  </nav>
</header>
```

- [ ] **Step 2: Append nav + button styles to `main.css`**

```css
/* ============ Nav ============ */
#site-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  transition: background 0.3s, box-shadow 0.3s;
}
#site-nav.scrolled {
  background: rgba(5, 10, 18, 0.82);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.brand { font-family: var(--mono); font-weight: 700; font-size: 18px; text-decoration: none; color: #fff; }
.brand-at { color: var(--accent); }
.brand-path { color: var(--text-dim); }
.nav-links { display: flex; gap: 26px; list-style: none; padding: 0; align-items: center; }
.nav-links a { font-family: var(--mono); font-size: 14px; text-decoration: none; color: var(--text); }
.nav-links a:hover { color: var(--accent); }
.nav-toggle, .nav-burger { display: none; }

/* Buttons */
.btn {
  display: inline-block; font-family: var(--mono); font-weight: 500; text-decoration: none;
  padding: 10px 22px; border-radius: 6px; border: 1px solid var(--accent);
}
.btn-solid { background: var(--accent); color: #04220f; box-shadow: 0 4px 0 0 var(--accent-dim); }
.btn-solid:hover { transform: translateY(2px); box-shadow: 0 2px 0 0 var(--accent-dim); color: #04220f; }
.btn-ghost { color: var(--accent); background: transparent; }
.btn-ghost:hover { background: rgba(0, 255, 156, 0.08); color: var(--accent); }

/* Mobile nav */
@media (max-width: 760px) {
  .nav-burger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; }
  .nav-burger span { width: 22px; height: 2px; background: var(--accent); }
  .nav-links {
    display: none; position: absolute; top: 64px; left: 0; right: 0;
    flex-direction: column; background: rgba(5, 10, 18, 0.97); padding: 20px; gap: 18px;
    border-bottom: 1px solid var(--line);
  }
  .nav-toggle:checked ~ .nav-links { display: flex; }
}
```

- [ ] **Step 3: Add scroll state to `main.js`** (replace file content)

```js
'use strict';
(() => {
  const nav = document.getElementById('site-nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: fixed nav with `taibt@devops:~$` brand; scrolling blurs the bar; at ≤760px width the burger toggles the menu; Tab shows visible focus rings.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: fixed navigation with mobile menu and button system"
```

---

### Task 3: Hero — terminal window + typing engine

**Files:**
- Modify: `index.html` (fill `#hero`)
- Modify: `assets/css/main.css` (append)
- Create (replace stub): `assets/js/terminal.js`

- [ ] **Step 1: Fill `#hero` markup**

The transcript is fully present in HTML (no-JS fallback). JS replays it with typing.

```html
<section id="hero" aria-label="Introduction">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="hero-kicker">// senior devops engineer · da nang, vietnam</p>
      <h1 class="hero-title">I build &amp; run<br><span class="grad">cloud infrastructure</span><br>at scale.</h1>
      <p class="hero-sub">20+ production projects · AWS · Kubernetes · GitOps · Observability</p>
      <div class="hero-cta">
        <a class="btn btn-solid" href="#work">VIEW PROJECTS</a>
        <a class="btn btn-ghost" href="#contact">HIRE ME</a>
      </div>
    </div>
    <div class="terminal" id="hero-terminal">
      <div class="terminal-bar" aria-hidden="true">
        <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
        <span class="terminal-title">taibt@devops: ~</span>
      </div>
      <div class="terminal-body" id="terminal-body">
        <div class="t-line"><span class="t-prompt">$</span> <span class="t-cmd">whoami</span></div>
        <div class="t-line t-out">Bui Thanh Tai — Senior DevOps Engineer</div>
        <div class="t-line"><span class="t-prompt">$</span> <span class="t-cmd">cat summary.txt</span></div>
        <div class="t-line t-out">5+ years cloud-native infra · EKS · ArgoCD · OpenTelemetry.</div>
        <div class="t-line t-out">Proven production incident response. Full-stack capable.</div>
        <div class="t-line"><span class="t-prompt">$</span> <span class="t-cmd">kubectl get skills</span></div>
        <div class="t-line t-out t-table">NAME            AGE   STATUS</div>
        <div class="t-line t-out t-table">aws-eks         5y    <span class="t-ok">Running</span></div>
        <div class="t-line t-out t-table">gitops-argocd   4y    <span class="t-ok">Running</span></div>
        <div class="t-line t-out t-table">observability   3y    <span class="t-ok">Running</span></div>
        <div class="t-line t-out t-table">devsecops       2y    <span class="t-ok">Running</span></div>
        <div class="t-line"><span class="t-prompt">$</span> <span class="t-cursor" aria-hidden="true"></span></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero + terminal styles**

```css
/* ============ Hero ============ */
#hero { padding: 150px 0 90px; }
.hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 48px; align-items: center; }
.hero-kicker { font-family: var(--mono); color: var(--cyan); font-size: 14px; margin-bottom: 14px; }
.hero-title { font-size: clamp(34px, 5vw, 56px); margin-bottom: 18px; }
.grad {
  background: linear-gradient(120deg, var(--accent) 10%, var(--cyan) 90%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
.hero-sub { color: var(--text-dim); font-family: var(--mono); font-size: 15px; margin-bottom: 28px; }
.hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }

/* Terminal window */
.terminal {
  background: var(--bg-terminal); border: 1px solid var(--line); border-radius: var(--radius);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55), var(--glow);
  overflow: hidden; font-family: var(--mono); font-size: 13.5px;
}
.terminal-bar {
  display: flex; align-items: center; gap: 7px; padding: 10px 14px;
  background: #0b1524; border-bottom: 1px solid var(--line);
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-r { background: var(--danger); } .dot-y { background: #ffbd2e; } .dot-g { background: #27c93f; }
.terminal-title { margin-left: 8px; color: var(--text-dim); font-size: 12px; }
.terminal-body { padding: 18px 18px 22px; min-height: 320px; }
.t-line { white-space: pre-wrap; line-height: 1.7; }
.t-prompt { color: var(--accent); font-weight: 700; }
.t-cmd { color: #fff; }
.t-out { color: var(--text-dim); }
.t-table { color: var(--text); }
.t-ok { color: var(--accent); }
.t-cursor {
  display: inline-block; width: 9px; height: 17px; vertical-align: -3px;
  background: var(--accent); animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  #hero { padding-top: 120px; }
}
```

- [ ] **Step 3: Write `assets/js/terminal.js`** (replace stub)

```js
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
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: terminal types `whoami`, prints output, continues through `kubectl get skills`, ends with blinking cursor. Reload with DevTools → Rendering → "Emulate prefers-reduced-motion: reduce": full transcript shows instantly, no typing. Disable JS: transcript fully visible.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: hero with auto-typing terminal and no-JS fallback"
```

---

### Task 4: Reveal engine + stats bar

**Files:**
- Modify: `index.html` (fill `#stats`)
- Modify: `assets/css/main.css` (append)
- Create (replace stub): `assets/js/reveal.js`

- [ ] **Step 1: Fill `#stats` markup**

```html
<section id="stats" aria-label="Key numbers">
  <div class="wrap stats-grid">
    <div class="stat" data-reveal><span class="stat-num" data-count-to="5">5</span><span class="stat-plus">+</span><span class="stat-label">years in DevOps</span></div>
    <div class="stat" data-reveal data-reveal-delay="100"><span class="stat-num" data-count-to="20">20</span><span class="stat-plus">+</span><span class="stat-label">production projects</span></div>
    <div class="stat" data-reveal data-reveal-delay="200"><span class="stat-num" data-count-to="4">4</span><span class="stat-plus"></span><span class="stat-label">cloud platforms</span></div>
    <div class="stat" data-reveal data-reveal-delay="300"><span class="stat-num" data-count-to="100">100</span><span class="stat-plus">+</span><span class="stat-label">K8s nodes operated</span></div>
  </div>
</section>
```

- [ ] **Step 2: Append stats + reveal styles**

```css
/* ============ Stats ============ */
#stats { padding: 30px 0 60px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.stat {
  background: var(--bg-raise); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 22px 20px; text-align: center;
}
.stat-num, .stat-plus { font-family: var(--head); font-size: 40px; font-weight: 700; color: var(--accent); }
.stat-label { display: block; font-family: var(--mono); font-size: 13px; color: var(--text-dim); margin-top: 4px; }
@media (max-width: 760px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }

/* ============ Reveal (JS adds .is-hidden up-front, then .revealed) ============ */
.is-hidden { opacity: 0; transform: translateY(26px); }
.revealed { opacity: 1; transform: none; transition: opacity 0.6s ease, transform 0.6s ease; }
```

- [ ] **Step 3: Write `assets/js/reveal.js`** (replace stub)

```js
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
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: scroll to stats — four cards slide up one after another, numbers count 0→5/20/4/100. With reduced-motion emulated: cards just sit there fully visible with final numbers. Disable JS: same.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: reveal engine with staggered count-up stats"
```

---

### Task 5: About section

**Files:**
- Modify: `index.html` (fill `#about`)
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Fill `#about` markup**

```html
<section id="about" aria-label="About me">
  <div class="wrap">
    <p class="section-title">cat about.md</p>
    <h2 class="section-heading">About</h2>
    <div class="about-grid">
      <div class="about-text" data-reveal>
        <p>I'm <strong>Tai</strong> — a Senior DevOps Engineer from Da Nang, Vietnam. For the last 5+ years I've designed, built and operated cloud-native infrastructure for gaming, fintech, e-commerce, logistics and government platforms.</p>
        <p>Today I lead DevOps at MTL Technology: <strong>20+ production projects</strong> across multiple AWS accounts — full ownership of CI/CD (Jenkins, ArgoCD, GitLab CI), EKS clusters with cost-optimized spot strategies, and an OpenTelemetry-based observability stack with SLO/error-budget dashboards and burn-rate alerting.</p>
        <p>I practice shift-left security (SonarQube, Snyk, Trivy, Gitleaks in the pipeline), and when a project needs it I ship product code too — Java/Spring Boot on the backend, React/Next.js on the frontend.</p>
        <p class="about-status"><span class="pulse-dot" aria-hidden="true"></span> Available for freelance &amp; consulting</p>
      </div>
      <div class="about-card" data-reveal data-reveal-delay="150">
        <div class="monogram" aria-hidden="true">TAI</div>
        <ul class="about-facts">
          <li><span>Location</span>Da Nang, Vietnam (UTC+7)</li>
          <li><span>Role</span>Senior DevOps Engineer</li>
          <li><span>Focus</span>AWS · EKS · GitOps · o11y</li>
          <li><span>Languages</span>Vietnamese · English</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append about styles**

```css
/* ============ About ============ */
.about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: start; }
.about-text p { margin-bottom: 16px; }
.about-text strong { color: #fff; }
.about-status { font-family: var(--mono); color: var(--accent); font-size: 15px; }
.pulse-dot {
  display: inline-block; width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent); margin-right: 8px;
  animation: pulse 1.6s ease-out infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 156, 0.55); }
  100% { box-shadow: 0 0 0 12px rgba(0, 255, 156, 0); }
}
.about-card {
  background: var(--bg-raise); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 26px;
}
.monogram {
  font-family: var(--head); font-weight: 700; font-size: 54px; text-align: center;
  color: #04220f; background: linear-gradient(120deg, var(--accent), var(--cyan));
  border-radius: var(--radius); padding: 34px 0; margin-bottom: 22px; letter-spacing: 0.1em;
}
.about-facts { list-style: none; padding: 0; font-family: var(--mono); font-size: 14px; }
.about-facts li { padding: 9px 0; border-bottom: 1px dashed var(--line); }
.about-facts li:last-child { border-bottom: 0; }
.about-facts span { display: inline-block; width: 110px; color: var(--text-dim); }
@media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .pulse-dot { animation: none; } }
```

- [ ] **Step 3: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: two-column about with pulsing green "Available" dot and gradient TAI monogram card; single column below 860px.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: about section with availability status and fact card"
```

---

### Task 6: Skills grid with devicon logos

**Files:**
- Create: `assets/img/icons/*.svg` (downloaded)
- Modify: `index.html` (fill `#skills`)
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Download devicon SVGs (self-hosted, MIT license)**

```bash
cd f:/git/portfolio-taibt-devops && mkdir -p assets/img/icons
base=https://raw.githubusercontent.com/devicons/devicon/master/icons
curl -fsSL -o assets/img/icons/aws.svg        $base/amazonwebservices/amazonwebservices-plain-wordmark.svg
curl -fsSL -o assets/img/icons/kubernetes.svg $base/kubernetes/kubernetes-plain.svg
curl -fsSL -o assets/img/icons/docker.svg     $base/docker/docker-original.svg
curl -fsSL -o assets/img/icons/terraform.svg  $base/terraform/terraform-original.svg
curl -fsSL -o assets/img/icons/ansible.svg    $base/ansible/ansible-original.svg
curl -fsSL -o assets/img/icons/jenkins.svg    $base/jenkins/jenkins-original.svg
curl -fsSL -o assets/img/icons/argocd.svg     $base/argocd/argocd-original.svg
curl -fsSL -o assets/img/icons/gitlab.svg     $base/gitlab/gitlab-original.svg
curl -fsSL -o assets/img/icons/prometheus.svg $base/prometheus/prometheus-original.svg
curl -fsSL -o assets/img/icons/grafana.svg    $base/grafana/grafana-original.svg
curl -fsSL -o assets/img/icons/vault.svg      $base/vault/vault-original.svg
curl -fsSL -o assets/img/icons/postgresql.svg $base/postgresql/postgresql-original.svg
curl -fsSL -o assets/img/icons/redis.svg      $base/redis/redis-original.svg
curl -fsSL -o assets/img/icons/kafka.svg      $base/apachekafka/apachekafka-original.svg
curl -fsSL -o assets/img/icons/java.svg       $base/java/java-original.svg
curl -fsSL -o assets/img/icons/nextjs.svg     $base/nextjs/nextjs-original.svg
ls assets/img/icons | wc -l   # expect 16
```

If any URL 404s, find the icon folder name at https://github.com/devicons/devicon/tree/master/icons and adjust.

- [ ] **Step 2: Fill `#skills` markup**

8 cards; each lists concrete tools from the CV. Two icons per card header.

```html
<section id="skills" aria-label="Skills">
  <div class="wrap">
    <p class="section-title">kubectl get skills -o wide</p>
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      <article class="skill-card" data-reveal>
        <header><img src="assets/img/icons/aws.svg" alt="" width="34" height="34"><h3>Cloud Platforms</h3></header>
        <p>AWS (EC2, EKS, RDS, ALB, S3, CloudFront, SQS/SNS, WAF, IAM, CloudWatch) · GCP (GKE, Pub/Sub) · Azure (AKS, DevOps) · Alibaba Cloud</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="60">
        <header><img src="assets/img/icons/kubernetes.svg" alt="" width="34" height="34"><h3>Containers &amp; Orchestration</h3></header>
        <p>Kubernetes (EKS, GKE, AKS) · Docker &amp; Compose · Helm Charts · TargetGroupBinding / NLB sharing · spot node strategies</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="120">
        <header><img src="assets/img/icons/argocd.svg" alt="" width="34" height="34"><h3>CI/CD &amp; GitOps</h3></header>
        <p>Jenkins (Shared Libraries) · ArgoCD · GitLab CI · AWS CodePipeline · Azure DevOps</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="180">
        <header><img src="assets/img/icons/terraform.svg" alt="" width="34" height="34"><h3>IaC &amp; Config Mgmt</h3></header>
        <p>Terraform · Ansible (+ AWS SSM for Windows) · Salt Stack</p>
      </article>
      <article class="skill-card" data-reveal>
        <header><img src="assets/img/icons/grafana.svg" alt="" width="34" height="34"><h3>Observability</h3></header>
        <p>OpenTelemetry · Prometheus · Grafana (SLO / error budget, burn-rate alerts) · ELK · Loki · Fluent Bit · PostHog (self-hosted)</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="60">
        <header><img src="assets/img/icons/vault.svg" alt="" width="34" height="34"><h3>Security &amp; DevSecOps</h3></header>
        <p>SonarQube (SAST) · Snyk (SCA) · Trivy · Gitleaks · HashiCorp Vault · AWS WAF · OWASP Top 10</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="120">
        <header><img src="assets/img/icons/postgresql.svg" alt="" width="34" height="34"><h3>Data &amp; Messaging</h3></header>
        <p>MySQL · PostgreSQL · MongoDB · Redis · OpenSearch/Elasticsearch · Kafka · ActiveMQ · SQS/SNS</p>
      </article>
      <article class="skill-card" data-reveal data-reveal-delay="180">
        <header><img src="assets/img/icons/java.svg" alt="" width="34" height="34"><h3>Development</h3></header>
        <p>Shell/Bash · Groovy · Java 17 / Spring Boot 3 · React 18 / Next.js 14 · TypeScript</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append skills styles**

```css
/* ============ Skills ============ */
.skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.skill-card {
  background: var(--bg-raise); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 22px; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.skill-card:hover { border-color: var(--accent-dim); box-shadow: var(--glow); transform: translateY(-4px); }
.skill-card header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.skill-card h3 { font-size: 16px; }
.skill-card img { filter: grayscale(0.2); }
.skill-card p { font-size: 13.5px; color: var(--text-dim); font-family: var(--mono); line-height: 1.7; }
@media (max-width: 1000px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: 4×2 grid of cards with logos; hover lifts a card with green glow; 2 columns at ≤1000px, 1 at ≤560px.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: skills grid with self-hosted devicon logos"
```

---

### Task 7: Experience — git-log timeline

**Files:**
- Modify: `index.html` (fill `#experience`)
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Fill `#experience` markup**

```html
<section id="experience" aria-label="Experience">
  <div class="wrap">
    <p class="section-title">git log --oneline --graph career</p>
    <h2 class="section-heading">Experience</h2>
    <ol class="timeline">
      <li class="commit" data-reveal>
        <div class="commit-meta"><span class="hash">f4b1e2a</span><span class="commit-date">08/2024 — present</span><span class="tag">HEAD → main</span></div>
        <h3>Senior DevOps Engineer · MTL Technology <span class="commit-loc">Da Nang</span></h3>
        <ul>
          <li>Own CI/CD for 20+ production projects (Jenkins, ArgoCD, GitLab CI) across multiple AWS accounts.</li>
          <li>Architect EKS clusters: TargetGroupBinding NLB sharing, autoscaling node groups, spot cost optimization.</li>
          <li>Built OpenTelemetry + Prometheus + Grafana SLO/error-budget stack with burn-rate alerting.</li>
          <li>Integrated SonarQube, Snyk, Trivy and Gitleaks gates into pipelines; mentor junior DevOps engineers.</li>
        </ul>
      </li>
      <li class="commit" data-reveal>
        <div class="commit-meta"><span class="hash">c9d3a71</span><span class="commit-date">02/2024 — 07/2024</span></div>
        <h3>DevOps Engineer · Rikkei Software <span class="commit-loc">Da Nang</span></h3>
        <ul>
          <li>Designed multi-environment deployment (on-prem + Alibaba Cloud) for a 70+ member microservices program.</li>
          <li>Ran Jenkins-on-K8s, Nexus, SonarQube, ArgoCD, Prometheus/Grafana, ELK; authored org-wide Helm charts and Jenkins shared libraries.</li>
        </ul>
      </li>
      <li class="commit" data-reveal>
        <div class="commit-meta"><span class="hash">8e02b5c</span><span class="commit-date">12/2022 — 01/2024</span></div>
        <h3>DevOps Engineer · Synodus <span class="commit-loc">Ha Noi</span></h3>
        <ul>
          <li>XECA (GCP/GKE logistics, 35+ garages): Terraform-provisioned GKE + Pub/Sub, end-to-end CI/CD, −15% downtime.</li>
          <li>BANCA (Azure/AKS blockchain, 25+ services): Vault, ArgoCD GitOps, full ELK + Prometheus stack, OWASP-aligned scanning.</li>
          <li>CLEO (AWS fintech): Control Tower multi-account, CodePipeline with automated rollback. DTC (Ministry of Finance): SharePoint/SQL Server HA farm.</li>
        </ul>
      </li>
      <li class="commit" data-reveal>
        <div class="commit-meta"><span class="hash">51a9d04</span><span class="commit-date">01/2021 — 12/2022</span></div>
        <h3>DevOps Engineer · FPT Software <span class="commit-loc">Da Nang</span></h3>
        <ul>
          <li>US banking platform, 200K+ customers: 150+ VMs, 100+ K8s nodes; zero-downtime scaling events 90→150 nodes.</li>
          <li>Salt Stack config management for Hadoop/HBase/Zookeeper stack; Terraform on AWS &amp; GCP.</li>
        </ul>
      </li>
      <li class="commit" data-reveal>
        <div class="commit-meta"><span class="hash">0000001</span><span class="commit-date">2019 — 2020</span><span class="tag tag-init">initial commit</span></div>
        <h3>Software Developer · Freelance <span class="commit-loc">Da Nang</span></h3>
        <ul>
          <li>Java/Spring Boot + Angular web apps and REST APIs — the origin story that led into DevOps.</li>
        </ul>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Append timeline styles**

```css
/* ============ Experience (git log) ============ */
.timeline { list-style: none; padding: 0; position: relative; }
.timeline::before {
  content: ""; position: absolute; left: 7px; top: 6px; bottom: 6px;
  width: 2px; background: linear-gradient(var(--accent), var(--line));
}
.commit { position: relative; padding: 0 0 42px 40px; }
.commit::before {
  content: ""; position: absolute; left: 0; top: 6px; width: 16px; height: 16px;
  border-radius: 50%; background: var(--bg); border: 3px solid var(--accent);
}
.commit-meta { display: flex; gap: 14px; align-items: center; font-family: var(--mono); font-size: 13px; margin-bottom: 6px; flex-wrap: wrap; }
.hash { color: var(--amber); }
.commit-date { color: var(--text-dim); }
.tag { color: var(--cyan); border: 1px solid var(--cyan); border-radius: 4px; padding: 1px 8px; font-size: 12px; }
.tag-init { color: var(--text-dim); border-color: var(--line); }
.commit h3 { font-size: 19px; margin-bottom: 10px; }
.commit-loc { font-family: var(--mono); font-size: 13px; color: var(--text-dim); font-weight: 400; }
.commit ul { padding-left: 20px; color: var(--text-dim); }
.commit ul li { margin-bottom: 6px; font-size: 15px; }
```

- [ ] **Step 3: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: vertical line with green commit dots; first entry tagged `HEAD → main`, last tagged `initial commit`; amber hashes; entries reveal on scroll.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: experience timeline styled as git log"
```

---

### Task 8: Featured work cards + 3D tilt

**Files:**
- Modify: `index.html` (fill `#work`)
- Modify: `assets/css/main.css` (append)
- Modify: `assets/js/main.js` (append tilt)

- [ ] **Step 1: Fill `#work` markup**

```html
<section id="work" aria-label="Featured work">
  <div class="wrap">
    <p class="section-title">ls -la ./featured-work</p>
    <h2 class="section-heading">Featured Work</h2>
    <div class="work-grid">
      <article class="work-card" data-reveal>
        <span class="work-type work-type-incident">INCIDENT RESPONSE</span>
        <h3>MySQL exposed via public NLB — found, recovered, hardened</h3>
        <p>Discovered a legacy MySQL on EKS reachable from the internet (ap-northeast-1). Recovered data using binary logs + EBS snapshots, converted the service to ClusterIP and locked down Security Groups. Zero data loss.</p>
        <p class="work-stack">AWS · EKS · NLB · MySQL · binlog · EBS</p>
      </article>
      <article class="work-card" data-reveal data-reveal-delay="80">
        <span class="work-type">PLATFORM</span>
        <h3>Observability platform with SLO &amp; burn-rate alerting</h3>
        <p>Designed the org-wide observability stack: OpenTelemetry pipelines into Prometheus/Grafana with SLO error-budget dashboards and multi-window burn-rate alerts for proactive incident detection.</p>
        <p class="work-stack">OpenTelemetry · Prometheus · Grafana · Loki</p>
      </article>
      <article class="work-card" data-reveal data-reveal-delay="160">
        <span class="work-type">ARCHITECTURE</span>
        <h3>EKS multi-tenant networking with TargetGroupBinding</h3>
        <p>NLB sharing across namespaces via TargetGroupBinding, autoscaling node groups and spot-instance strategies — standardized through org-wide Helm chart patterns.</p>
        <p class="work-stack">EKS · Helm · ArgoCD · Karpenter-style autoscaling</p>
      </article>
      <article class="work-card" data-reveal>
        <span class="work-type">TOOLING</span>
        <h3>aws-ops — multi-account automation toolkit</h3>
        <p>Custom IaC automation with a three-tier permission model, auto-discovery scripts and MCP integrations (GitLab, Google Docs, DBHub) to streamline operations across AWS accounts.</p>
        <p class="work-stack">Terraform · Bash · MCP · AWS Organizations</p>
      </article>
      <article class="work-card" data-reveal data-reveal-delay="80">
        <span class="work-type work-type-dev">FULL-STACK</span>
        <h3>INFAXIA gaming platform — CRA → Next.js 14 migration</h3>
        <p>Led the frontend migration for a Web3 gaming platform: Web3Auth, MetaMask, WalletConnect, ethers, Redux (14 slices), styled-components, antd v4.</p>
        <p class="work-stack">Next.js 14 · TypeScript · Web3 · Redux</p>
      </article>
      <article class="work-card" data-reveal data-reveal-delay="160">
        <span class="work-type work-type-dev">FULL-STACK</span>
        <h3>BibleQuiz — non-profit Vietnamese quiz platform</h3>
        <p>Co-developed end-to-end: Java 17 / Spring Boot 3.3 backend (~75 endpoints, ~30 tables, ~370 tests) with React 18 + Vite 5 + TypeScript frontend.</p>
        <p class="work-stack">Java 17 · Spring Boot 3 · React 18 · Vite</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append work card styles**

```css
/* ============ Featured work ============ */
.work-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; perspective: 1200px; }
.work-card {
  background: var(--bg-raise); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 24px; transition: border-color 0.25s, box-shadow 0.25s;
  transform-style: preserve-3d; will-change: transform;
}
.work-card:hover { border-color: var(--accent-dim); box-shadow: var(--glow); }
.work-type {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
  color: var(--cyan); border: 1px solid var(--cyan); border-radius: 4px; padding: 2px 8px;
  display: inline-block; margin-bottom: 14px;
}
.work-type-incident { color: var(--danger); border-color: var(--danger); }
.work-type-dev { color: var(--amber); border-color: var(--amber); }
.work-card h3 { font-size: 17px; margin-bottom: 10px; }
.work-card p { font-size: 14px; color: var(--text-dim); margin-bottom: 12px; }
.work-stack { font-family: var(--mono); font-size: 12.5px; color: var(--accent-dim); }
@media (max-width: 1000px) { .work-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 620px) { .work-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Append tilt handler to `assets/js/main.js`**

```js
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
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: 6 cards in a 3-column grid; INCIDENT badge red, FULL-STACK amber; cards tilt toward the cursor and reset on leave; no tilt when emulating reduced motion.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: featured work cards with 3D tilt"
```

---

### Task 9: Contact + footer

**Files:**
- Modify: `index.html` (fill `#contact` and `#site-footer`)
- Modify: `assets/css/main.css` (append)

- [ ] **Step 1: Fill `#contact` markup**

```html
<section id="contact" aria-label="Contact">
  <div class="wrap contact-wrap">
    <p class="section-title">./contact-me.sh</p>
    <h2 class="section-heading">Let's build something reliable</h2>
    <p class="contact-lede" data-reveal>Need someone to own your infrastructure, unblock your pipeline, or rescue a production incident? <span class="nowrap"><span class="pulse-dot" aria-hidden="true"></span>Available for freelance &amp; full-time.</span></p>
    <div class="contact-cta" data-reveal data-reveal-delay="120">
      <a class="btn btn-solid" href="mailto:thanhtai18021994@gmail.com">EMAIL ME</a>
      <a class="btn btn-ghost" href="cv/BUI_THANH_TAI_CV.pdf" download>DOWNLOAD CV</a>
    </div>
    <ul class="contact-links" data-reveal data-reveal-delay="240">
      <li><a href="https://github.com/thanhtai18021994" rel="me noopener" target="_blank">github</a></li>
      <li><a href="https://www.linkedin.com/in/thanhtai18021994" rel="me noopener" target="_blank">linkedin</a></li>
      <li><a href="https://www.upwork.com/freelancers/~thanhtai" rel="me noopener" target="_blank">upwork</a></li>
      <li><a href="https://www.freelancer.com/u/thanhtai18021994" rel="me noopener" target="_blank">freelancer</a></li>
    </ul>
  </div>
</section>
```

**NOTE — executor must confirm with the user:** the GitHub/LinkedIn/Upwork/Freelancer profile URLs above are constructed guesses. Ask the user for the real URLs before this task's commit; if a profile doesn't exist, delete that list item.

- [ ] **Step 2: Fill `#site-footer` markup**

```html
<footer id="site-footer">
  <div class="wrap footer-inner">
    <p class="footer-line">© 2026 Bui Thanh Tai · built with plain HTML/CSS/JS — no frameworks harmed</p>
    <p class="footer-line"><a href="https://github.com/thanhtai18021994/portfolio-taibt-devops/actions" rel="noopener" target="_blank">deployed via GitHub Actions <span class="t-ok">✓</span></a></p>
  </div>
</footer>
```

- [ ] **Step 3: Append contact/footer styles**

```css
/* ============ Contact & footer ============ */
.contact-wrap { text-align: center; }
.contact-wrap .section-title { text-align: center; }
.contact-lede { max-width: 640px; margin: 0 auto 30px; color: var(--text-dim); }
.nowrap { white-space: nowrap; color: var(--accent); font-family: var(--mono); font-size: 15px; }
.contact-cta { display: flex; gap: 16px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap; }
.contact-links { list-style: none; padding: 0; display: flex; gap: 26px; justify-content: center; font-family: var(--mono); font-size: 14px; }
#site-footer { border-top: 1px solid var(--line); padding: 28px 0; }
.footer-inner { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.footer-line { font-family: var(--mono); font-size: 13px; color: var(--text-dim); }
.footer-line a { color: var(--text-dim); text-decoration: none; }
.footer-line a:hover { color: var(--accent); }
```

- [ ] **Step 4: Validate + visual check**

Run: `npx --yes html-validate index.html` → exit 0.
Browser: centered contact block, pulsing dot, two CTAs, four profile links, footer with Actions badge.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section and footer with pipeline badge"
```

---

### Task 10: CV file, SEO, favicons, OG image, sitemap

**Files:**
- Create: `cv/BUI_THANH_TAI_CV.pdf` (from user)
- Create: `assets/img/og-image.png`, `assets/img/favicon.svg`
- Create: `sitemap.xml`, `robots.txt`
- Modify: `index.html` `<head>`

- [ ] **Step 1: CV PDF**

Ask the user for their exported CV PDF and save it as `cv/BUI_THANH_TAI_CV.pdf`. (Source content lives in `BUI_THANH_TAI_2026-CV.docx.md`; if no PDF is provided, open that file in VS Code, print to PDF, and use that.)

- [ ] **Step 2: Create `assets/img/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#050a12"/>
  <text x="10" y="42" font-family="monospace" font-size="30" fill="#00ff9c" font-weight="bold">&gt;_</text>
</svg>
```

- [ ] **Step 3: Generate `assets/img/og-image.png` (1200×630)**

Create a throwaway `og.html` next to `index.html`:

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>
body{margin:0;width:1200px;height:630px;background:#050a12;display:flex;flex-direction:column;
justify-content:center;padding:0 90px;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
h1{color:#fff;font-size:64px;margin:0 0 10px}
p{color:#00ff9c;font-family:Consolas,monospace;font-size:30px;margin:6px 0}
small{color:#7c8ba3;font-family:Consolas,monospace;font-size:24px}
</style><title>og</title></head><body>
<p>taibt@devops:~$ whoami</p>
<h1>Bui Thanh Tai — Senior DevOps Engineer</h1>
<small>AWS · Kubernetes · GitOps · Observability · 20+ production projects</small>
</body></html>
```

Screenshot it (adjust Chrome path if needed):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --screenshot="f:\git\portfolio-taibt-devops\assets\img\og-image.png" --window-size=1200,630 --default-background-color=00000000 "f:\git\portfolio-taibt-devops\og.html"
```

Then delete `og.html`. Verify the PNG is 1200×630 and readable.

- [ ] **Step 4: Extend `<head>` in `index.html`**

Insert after the `<meta name="description">` line (replace `USER` with the real GitHub username / final URL):

```html
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
  <link rel="canonical" href="https://USER.github.io/portfolio-taibt-devops/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Bui Thanh Tai — Senior DevOps Engineer">
  <meta property="og:description" content="5+ years building and running cloud-native infrastructure. AWS · Kubernetes · GitOps · Observability. Available for freelance.">
  <meta property="og:image" content="https://USER.github.io/portfolio-taibt-devops/assets/img/og-image.png">
  <meta property="og:url" content="https://USER.github.io/portfolio-taibt-devops/">
  <meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 5: Create `sitemap.xml` and `robots.txt`**

`sitemap.xml` (same URL substitution):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://USER.github.io/portfolio-taibt-devops/</loc></url>
</urlset>
```

`robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://USER.github.io/portfolio-taibt-devops/sitemap.xml
```

- [ ] **Step 6: Validate + commit**

Run: `npx --yes html-validate index.html` → exit 0.
```bash
git add -A && git commit -m "feat: CV download, favicon, OG image, sitemap and SEO meta"
```

---

### Task 11: GitHub Actions — validate & deploy to Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow**

```yaml
name: validate-and-deploy
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - name: Validate HTML
        run: npx --yes html-validate index.html

  deploy:
    needs: validate
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: . }
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create GitHub repo and push** (requires user's GitHub account; `gh` CLI assumed authenticated)

```bash
cd f:/git/portfolio-taibt-devops
gh repo create portfolio-taibt-devops --public --source=. --push
```

Then in repo Settings → Pages, set Source = "GitHub Actions" (or: `gh api -X POST repos/{owner}/portfolio-taibt-devops/pages -f build_type=workflow`).

- [ ] **Step 3: Verify pipeline + live site**

Run: `gh run watch` → both jobs green.
Open `https://<user>.github.io/portfolio-taibt-devops/` — full site renders. Update the footer Actions link + all `USER` placeholders from Task 10 with the real username if not already done, commit and push again.

- [ ] **Step 4: Commit** (workflow file was pushed in Step 2; this step is only needed if URL substitutions changed)

```bash
git add -A && git commit -m "ci: validate and deploy to GitHub Pages" && git push
```

---

### Task 12: Final polish — responsive, a11y, Lighthouse

**Files:**
- Modify: `assets/css/main.css` (only if fixes needed)

- [ ] **Step 1: Reduced-motion sweep**

Emulate `prefers-reduced-motion: reduce` in DevTools. Expected: no typing (full transcript shown), no reveals/count-up (content visible), no pulse, no tilt. Fix any violation by gating it behind the media query.

- [ ] **Step 2: Responsive sweep**

DevTools device toolbar at 360px, 768px, 1024px, 1440px. Expected: no horizontal scrollbar at any width; nav burger works at 360px; terminal readable; grids collapse (4→2→1).

- [ ] **Step 3: Keyboard sweep**

Tab through the whole page. Expected: skip-link appears first; every link/button reachable with a visible green outline; menu operable.

- [ ] **Step 4: Lighthouse**

Run Lighthouse (mobile) on the live GitHub Pages URL. Expected: ≥95 in Performance, Accessibility, Best Practices, SEO. Common fixes if short: font `display=swap` already set; add `width`/`height` to any unsized images; check contrast of `--text-dim` on `--bg` (bump to `#8b9ab3` if flagged).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A && git commit -m "polish: responsive, reduced-motion and a11y fixes" && git push
```

---

## Self-Review Notes

- **Spec coverage:** every spec section maps to a task — visual identity (T1), nav (T2), hero terminal + fallback (T3), stats (T4), about (T5), skills (T6), experience (T7), featured work (T8), contact/footer (T9), SEO/CV/OG (T10), CI/deploy (T11), quality bar (T12). Out-of-scope items excluded.
- **Known user-input dependencies:** CV PDF (T10), real profile URLs for GitHub/LinkedIn/Upwork/Freelancer (T9), GitHub username for canonical URLs (T10–11). Executor must ask, not guess.
- **Type consistency:** attribute names `data-reveal` / `data-reveal-delay` / `data-count-to` used identically in T4 markup and reveal.js; class names in JS (`#site-nav`, `.work-card`, `#terminal-body`) match markup tasks.
