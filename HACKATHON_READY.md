# STUPID is ready to demo

## What is built

- Landing page with radar chart and demo concepts
- Teaching UI (concepts / chat / learning notes)
- Local mock learner — no OpenAI, no API keys, no cost
- Comprehension levels Novice → Intermediate → Expert
- Keyword-based topic categorization
- Dark theme UI
- In-memory sessions only

## Run it

```bash
corepack enable
pnpm install
pnpm dev
```

Live: [https://stupid.dev.furet.network](https://stupid.dev.furet.network)

## Demo script (~5 minutes)

### Act 1 — Landing (30s)
Show the “Stupid” branding, radar chart, and empty-ish progress.

### Act 2 — Teach (3 min)
1. Enter `Photosynthesis` and press Enter.
2. Message 1: “Photosynthesis is how plants make food.”
3. Message 2: “Plants use chlorophyll to capture sunlight.”
4. Message 3–4: add CO₂ / water → glucose / oxygen.
5. Point at the learning note filling with your own sentences and the level rising.

### Act 3 — Switch concepts (1.5 min)
Create `Recursion`, teach briefly, switch in the sidebar, return home to show category progress.

## Pitch points

- Learning-by-teaching made visible
- No paid APIs — safe to leave running on a public URL
- Modern stack: Next.js 16, React 19, Node 24

## Stack

- Next.js 16.3 / React 19 / TypeScript 5.9 / Tailwind 4
- next-intl
- Local `/api/chat` mock + `topicClassifier`

## Checklist

- [ ] `pnpm install` / `pnpm dev` work with no `.env`
- [ ] Can create a concept and chat
- [ ] Learning note updates from user messages
- [ ] Level changes with more teaching
- [ ] Demo concepts load on first visit
