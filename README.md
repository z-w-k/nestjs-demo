# NestJS Demo Monorepo (Turborepo)

## Workspace Structure

```txt
.
├─ apps/
│  ├─ api/                  # NestJS API
│  └─ web/                  # Vue 3 + Vite frontend
└─ packages/
   └─ contracts/            # Shared contracts (Prisma -> zod/types)
```

## Install

```bash
pnpm install
```

## Run From Root

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
```

## Run Specific Package

```bash
pnpm --filter @repo/api dev
pnpm --filter @repo/web dev
pnpm --filter @repo/api test
pnpm --filter @repo/web build
pnpm --filter @repo/contracts generate
```

## Frontend App

`apps/web` is a Vue 3 frontend powered by Vite, TypeScript, and Axios.

Useful commands:

```bash
pnpm --filter @repo/web dev
pnpm --filter @repo/web build
pnpm --filter @repo/web lint
```

## Contracts Package

`packages/contracts` uses Prisma schema as the source of truth and generates shared zod/types into `packages/contracts/src/generated`.

Generate contracts:

```bash
pnpm --filter @repo/contracts generate
```
