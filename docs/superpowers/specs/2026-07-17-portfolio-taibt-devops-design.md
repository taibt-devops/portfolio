# Portfolio Website — Design Spec

**Date:** 2026-07-17
**Owner:** Bui Thanh Tai (Senior DevOps Engineer)
**Status:** Approved by owner (chat, 2026-07-17)

## 1. Purpose & Audience

A single-page, static, English-language portfolio serving three goals:

1. **International freelance clients** (Upwork/Freelancer) — emphasize services, measurable results, and a clear "Hire me" call-to-action.
2. **Recruiters/employers** — a scannable experience timeline, tech stack, and a Download CV button; key facts absorbable in a 30-second skim.
3. **Personal brand** — a durable home base that can grow (blog, notes) in later versions.

Core message, drawn from the CV: *"I build and run cloud infrastructure at scale — 20+ production projects, 5+ years, proven incident response."*

## 2. Hard Decisions (locked)

| Decision | Choice |
|---|---|
| Language | English only |
| Aesthetic | DevOps/Terminal — dark, neon-accent, technical |
| Stack | Pure HTML/CSS/JS — zero runtime dependencies |
| Structure | Hybrid: auto-typing terminal hero + traditional scroll sections |
| Hosting | GitHub Pages, deployed via GitHub Actions (public repo) |

## 3. Visual Identity

- **Background:** very dark blue-black `#050a12`, with a faint infrastructure-blueprint grid and subtle scanline overlay (pure CSS, no images).
- **Accent colors:** terminal green `#00ff9c` (primary), cyan (secondary), amber (highlights). Glow used sparingly.
- **Fonts:** JetBrains Mono (terminal/code), Space Grotesk (headings), Inter (body). Self-hosted or Google Fonts with `font-display: swap`.
- **Motion:** staggered scroll-reveal via a hand-rolled IntersectionObserver (~30 lines), count-up stats, typing animation, subtle 3D tilt on cards.
- **Corrections over the reference sites** (INFAXIA event pages): keep visible `:focus-visible` outlines (accessibility), honor `prefers-reduced-motion`, no multi-thousand-line unused CSS.

## 4. Page Sections (scroll order)

1. **Nav** — fixed, translucent blur when scrolled; brand `taibt@devops:~$`; anchor links; **Download CV** button.
2. **Hero terminal** — macOS-style terminal window that auto-types a sequence: `whoami` → `cat summary.txt` → `kubectl get skills` (tabular output revealed line-by-line); blinking cursor; CTA buttons `[VIEW PROJECTS]` and `[HIRE ME]`.
3. **Stats bar** — count-up on scroll: `5+ years` · `20+ production projects` · `4 clouds` · `100+ K8s nodes` (per CV: auto-scaling 90→150).
4. **About** — short bio rendered as `cat about.md`, avatar/photo.
5. **Skills** — 8 grouped cards (Cloud, Kubernetes, CI/CD & GitOps, IaC, Observability, Security/DevSecOps, Data & Messaging, Dev) with real tech logos (devicon SVGs, inlined or self-hosted) and hover glow.
6. **Experience** — vertical timeline styled as `git log`: each role is a "commit" (fake hash, date range, company, 2–4 highlight bullets). Entries: MTL Technology (08/2024–present), Rikkei Software (02–07/2024), Synodus (12/2022–01/2024), FPT Software (01/2021–12/2022), Freelance (2019–2020).
7. **Featured work** — 5–6 case-study cards with hover tilt: MySQL/NLB security incident remediation (narrative), EKS TargetGroupBinding architecture, OpenTelemetry SLO/burn-rate platform, `aws-ops` automation toolkit, INFAXIA CRA→Next.js 14 migration, BibleQuiz (Java 17/Spring Boot 3 + React 18).
8. **Contact** — terminal prompt `$ ./contact-me.sh`; pulsing green **"Available for freelance"** badge; links: GitHub, LinkedIn, Upwork, Freelancer; email `thanhtai18021994@gmail.com` (mailto; no backend form in v1).
9. **Footer** — "Deployed via GitHub Actions ✓" badge linking to the live pipeline run.

## 5. Architecture & Files

```
portfolio-taibt-devops/
├── index.html                  # single page, semantic HTML5
├── assets/
│   ├── css/main.css            # variables, sections, animations
│   ├── js/terminal.js          # typing engine (~80 lines, no deps)
│   ├── js/reveal.js            # IntersectionObserver reveals + count-up
│   ├── js/main.js              # nav state, card tilt, misc
│   └── img/                    # avatar, og-image, favicons, logos
├── cv/BUI_THANH_TAI_CV.pdf     # downloadable CV
├── docs/superpowers/specs/     # this spec + future plans
└── .github/workflows/deploy.yml# validate + deploy to GitHub Pages
```

**Module boundaries:** `terminal.js` exposes one function (`runScript(el, lines, opts)`) and knows nothing about page layout; `reveal.js` is attribute-driven (`data-reveal`, `data-count-to`) and reusable on any element; `main.js` wires page-specific behavior. CSS uses custom properties for the palette so a re-theme is a one-block change.

## 6. Quality Bar

- Total custom JS < 20 KB unminified; no frameworks, no jQuery, no AOS.
- Lighthouse ≥ 95 on all four categories (mobile).
- Fully responsive (360px → 4K); wide content scrolls within its container.
- Semantic HTML, alt text, keyboard navigable, visible focus states, `prefers-reduced-motion` fallback (content appears without animation).
- SEO: title/meta description, Open Graph + Twitter card image, favicon set, `sitemap.xml`, `robots.txt`.
- Content sourced from `BUI_THANH_TAI_2026-CV.docx.md`; no fabricated metrics.

## 7. Error Handling & Edge Cases

- JS disabled: all content present in HTML; terminal hero shows the final "output" state statically (typing is progressive enhancement).
- Slow connections: fonts swap, no render-blocking JS (`defer`), images lazy-loaded.
- Reduced motion: typing/count-up/tilt disabled; reveals become instant.

## 8. Deployment

- Public GitHub repo `portfolio-taibt-devops`; GitHub Pages via Actions workflow: HTML validation step → deploy. The public pipeline itself is a DevOps showcase.
- Custom domain optional later (CNAME ready).

## 9. Out of Scope (v2 candidates)

Blog/notes, Vietnamese toggle, interactive terminal (user-typed commands / easter eggs), contact form backend (Formspree), analytics (PostHog self-hosted would be on-brand), custom domain.

## 10. Testing

- Manual cross-browser (Chrome/Firefox/Safari mobile emulation) + Lighthouse run per release.
- CI: HTML validation (e.g. `html-validate`) on every push; deploy only on green.
