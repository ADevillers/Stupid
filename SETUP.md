# STUPID — Setup & testing

## Setup (2 minutes)

### 1. Install

```bash
corepack enable
pnpm install
```

Requires Node.js **24+**. No `.env` file and no API keys.

### 2. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Production build

```bash
pnpm build
pnpm start
```

Or with Docker:

```bash
docker compose up -d --build
```

## Test scenario

1. Open the app — you should see demo concepts and the radar chart.
2. Type `Photosynthesis` and press Enter.
3. Send: `Photosynthesis is how plants make food using sunlight`.
4. Check that:
   - the reply acknowledges your sentence
   - the learning note lists what you taught
   - the level is **Novice**
5. Send two more explanations — level should move to **Intermediate**, then **Expert** after a fourth user message.
6. Create another concept and switch between them in the sidebar.

## Troubleshooting

### Styles look wrong
Hard refresh and restart `pnpm dev`.

### Build errors

```bash
rm -rf node_modules .next
pnpm install
pnpm build
```

### Chat replies feel repetitive
Expected — the learner is a local mock that rebuilds notes from your messages. There is no LLM and no cost.

## Known limitations

- No persistence (refresh clears everything except hard-coded demos)
- Desktop-oriented layout
- Mock replies only (no real language model)
