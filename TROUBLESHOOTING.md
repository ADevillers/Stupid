# Troubleshooting

## Dev server won't start

```bash
node -v   # need v24+
corepack enable
rm -rf node_modules .next
pnpm install
pnpm dev
```

## Chat always answers the same way

Expected. `/api/chat` is a local mock: it rebuilds the learning note from your user messages and picks a naïve reply. No external network calls.

## Topic category looks wrong

Categorization is keyword-based (`src/lib/topicClassifier.ts`). You can still change category via the New Concept modal, or teach under **General**.

## Docker

```bash
docker compose up -d --build
docker compose logs -f app
```

Container listens on host port **3002**. No env secrets required.

## Build / TypeScript errors after upgrade

```bash
pnpm install
pnpm build
```

This project targets Next.js 16 (`src/proxy.ts` for locale routing) and Node 24.
