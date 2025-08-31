import { createServer } from 'http';
import { vi } from 'vitest';
import { MODES } from '../../src/constants';

let currentMode: MODES = MODES.CALLBACKS;
let htmlMap: Record<string, string | null> = {}; // substring -> HTML (null = fail)

vi.mock('../../src/config/env', () => ({
  get MODE() {
    return currentMode;
  },
  get CONFIG() {
    return Object.freeze({ MODE: currentMode, PORT: 0, NODE_ENV: 'test' });
  },
}));

vi.mock('../../src/core/http-get', () => ({
  getHtml: (url: string, cb: (err: Error | null, html?: string) => void) => {
    const key = Object.keys(htmlMap).find((k) => url.includes(k));
    const val = key ? htmlMap[key] : null;
    if (val === null) cb(new Error('boom'));
    else cb(null, val);
  },
}));

export function mockMode(mode: MODES) {
  currentMode = mode;
}

export function mockGetHtml(map: Record<string, string | null>) {
  htmlMap = map;
}

export async function makeServer() {
  const { createApp } = await import('../../src/app');
  const app = createApp();
  return createServer(app);
}

export function resetAll() {
  currentMode = MODES.CALLBACKS;
  htmlMap = {};
  vi.resetModules();
  vi.clearAllMocks();
  vi.restoreAllMocks();
}
