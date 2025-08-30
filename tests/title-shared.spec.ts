import request from 'supertest';
import { resetAll, mockMode, makeServer } from './utils/test-helpers';
import { afterEach, describe, expect, it } from 'vitest';
import { MODES } from '../src/constants';

afterEach(() => resetAll());

describe('health & 404', () => {
  it('GET /health -> 200 ok', async () => {
    mockMode(MODES.CALLBACKS);
    const server = await makeServer();
    await request(server).get('/health').expect(200, 'ok');
  });

  it('GET /unknown -> 404 Not Found', async () => {
    mockMode(MODES.CALLBACKS);
    const server = await makeServer();
    const res = await request(server).get('/nope');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Not Found');
  });
});
