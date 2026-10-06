# STUPID — The AI that starts with nothing

An experimental web app that inverts the usual AI learning paradigm: instead of the AI teaching the human, the human teaches the AI.

**Live demo:** [https://stupid.dev.furet.network](https://stupid.dev.furet.network)

## Features

- Blank-slate learner that only knows what you teach it
- Chat-based teaching interface with live learning notes
- Comprehension levels: Novice → Intermediate → Expert
- Multi-category tracking (Technology, Science, Education, …)
- In-memory only — no database, no auth, no paid APIs

## Requirements

- Node.js 24 or later
- pnpm 12 (via Corepack)

No API keys. Chat replies and topic classification are local mocks.

## Quick start

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. Create a concept (or pick a demo one).
2. Explain it in the chat.
3. Watch the learning note fill with what you taught, and the comprehension level rise with the number of user messages.
4. Switch concepts in the sidebar — each keeps its own session until you refresh.

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript 5.9
- Tailwind CSS 4
- next-intl
- Local mock learner (`/api/chat`) — no OpenAI

## Docker

```bash
docker compose up -d --build
```

Serves on host port **3002** (`stupid-app`). No environment secrets required.

## Project structure

```text
src/
  app/
    api/chat/          # Local mock learner (no external calls)
    [locale]/          # Landing + teach UI
  components/          # Chat, notes, radar, concept list
  context/             # In-memory concept state
  lib/                 # aiService + local topic classifier
  proxy.ts             # next-intl locale routing (Next 16)
```

## License

MIT — feel free to use for educational and experimental purposes.
