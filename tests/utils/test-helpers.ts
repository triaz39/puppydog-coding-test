// tests/utils/test-helpers.ts
import { createServer } from 'http';
import { vi } from 'vitest';
import { MODES } from '../../src/constants';

/* ---------------------------
   Mutable state for the mocks
----------------------------*/
let currentMode: MODES = MODES.CALLBACKS;
let htmlMap: Record<string, string | null> = {}; // substring -> HTML (null = fail)

/* ---------------------------
   Hoisted (top-level) mocks
   NOTE: specifiers must be string literals, not variables.
----------------------------*/

// Mock env (used by app.ts)
vi.mock('../../src/config/env', () => ({
  get MODE() {
    return currentMode;
  },
  get CONFIG() {
    return Object.freeze({ MODE: currentMode, PORT: 0, NODE_ENV: 'test' });
  },
}));

// Mock network fetcher (used by all strategies)
vi.mock('../../src/core/http-get', () => ({
  getHtml: (url: string, cb: (err: Error | null, html?: string) => void) => {
    const key = Object.keys(htmlMap).find((k) => url.includes(k));
    const val = key ? htmlMap[key] : null;
    if (val === null) cb(new Error('boom'));
    else cb(null, val);
  },
}));

/* ---------------------------
   Public helpers for tests
----------------------------*/

export function mockMode(mode: MODES) {
  currentMode = mode;
}

export function mockGetHtml(map: Record<string, string | null>) {
  htmlMap = map;
}

export async function makeServer() {
  // Mocks must be set BEFORE this import
  const { createApp } = await import('../../src/app');
  const app = createApp();
  return createServer(app);
}

export function resetAll() {
  // Reset mutable state between tests
  currentMode = MODES.CALLBACKS;
  htmlMap = {};
  vi.resetModules(); // fresh import graph next time
  vi.clearAllMocks(); // clear spies/timers if you add any
  vi.restoreAllMocks(); // restore any stubbed globals
}
