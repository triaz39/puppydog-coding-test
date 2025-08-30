# Coding Test – Node + TypeScript (CJS)

**Author:** Muhammad Talha  
**Email:** your.email@example.com

A minimal, production-lean Node server in TypeScript with a clean structure (models, constants, utils, handlers), environment-based configuration, and cross-platform scripts. This repo will host **four implementations** of `/I/want/title` (callbacks, async lib, promises, async/await) behind a single server.

---

## Requirements

- **Node.js:** `>=20.19.0 <21` (LTS)
  - `.nvmrc` contains the recommended version.
- **npm:** v10+
- Environment files: `.env` (and optionally `.env.test`)

---

## Project Structure

- **models/** → All TypeScript shapes: interfaces/types (`*.model.ts`)
- **constants/** → Enums and readonly values only
- **utils/** → Stateless helpers (e.g., type guards, small HTTP helpers)
- **handlers/** → Request handlers per route (clean separation from app wiring)
- **config/** → Environment & runtime configuration (single source of truth)
- **app.ts** keeps routing logic; **server.ts** only boots & listens
- **app.ts** keeps routing logic; **server.ts** only boots & listens

### Barrel files

Each of `models/`, `utils/`, and `handlers/` can export from an `index.ts`:

```ts
// models/index.ts
export * from './env.model';
export * from './http.model';
```

Barrels make imports clean: `import type { Handler } from './models'`.

---

## Environment & Configuration

We load environment variables early via `src/config/env.ts`, which:

- Reads `.env` by default, `.env.test` when `NODE_ENV=test`
- Validates and normalizes:
  - `MODE`: one of `callbacks | async | promises | await` (defaults to `await`)
  - `PORT`: defaults to `3000` if unset/invalid
  - `NODE_ENV`: `development | test | production` (defaults to `development`)
- Exposes `CONFIG = { MODE, PORT, NODE_ENV }`

**Files:**

- `.env.example` (committed): template for required vars
- `.env` (local): not committed
- `.env.test` (optional): used when running tests

Example `.env`:

```
MODE=await
PORT=3000
NODE_ENV=development
```

## Running

**Dev (auto-reload):**

```bash
npm run dev
# or pick a mode explicitly:
npm run dev:callbacks
```

**Hit health check:**

```
GET http://localhost:3000/health
→ 200 OK (text/plain: "ok")
```


**Build & run prod:**

```bash
npm run build
npm start
```