# WebCom Media — Website Context Audit

Read-only reference for the marketing site in `webcomtest-main`. Last updated: May 2026 (AI consulting rebrand).

## What This Project Is

**WebCom Media** is an **AI consulting** practice for growing businesses — led solo by **Ansh Malviya**.

**Positioning:** Advisory-first. Discovery calls, system audits, and roadmaps that show where AI fits across operations, sales, marketing, teams, and data. **Selective implementation support** when scope and capacity fit — not full-service agency retainers.

**Tagline:** “We Help You Implement AI Where It Matters.”

**Primary conversion:** “Book a Free AI Discovery Call” — 15-minute call via `mailto:`.

**Domain:** `webcommedia.in`  
**Contact:** `webcommedia1@gmail.com`

---

## Tech Stack

React 18 + TypeScript, Vite 8, Tailwind 3, shadcn/ui, GSAP, Motion, Three.js. Shared copy in [`src/content/consultingCopy.ts`](src/content/consultingCopy.ts).

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Single-page consulting site |
| `/tools/:slug` | Embedded free assessment tools (Lovable iframes) |
| `*` | 404 |

---

## Home Page Flow

1. `CardNav` — consulting nav
2. `Hero` — consulting headline + business audit terminal visual
3. `MetricBar` — businesses advised, opportunities mapped, domains reviewed
4. `Philosophy` — 4-step consult process
5. `Services` — consulting domains + engagement types
6. `OrbSection` — where we look for AI (6 business areas)
7. `Tools` — free self-serve assessments
8. `TrustLogos` / `Clients` — social proof
9. `Values` — consulting principles
10. `Founder` — solo consultant story (`id="founder"`)
11. `CTA` — discovery call booking
12. `Footer`

---

## How to Run

```bash
npm install
npm run dev    # http://localhost:8080
npm run build
```
