import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import {
  resetAll,
  mockMode,
  mockGetHtml,
  makeServer,
} from './utils/test-helpers';
import { MODES } from '../src/constants';

const QUERY = '/I/want/title?address=ok.com&address=bad.com';

afterEach(() => resetAll());

function assertOkAndLines(text: string) {
  expect(text).toContain('<ul>');
  expect(text).toContain('ok.com - "Hello Title"');
  expect(text).toContain('bad.com - "NO RESPONSE"');
}

describe.each([
  [MODES.CALLBACKS] as const,
  [MODES.ASYNC] as const,
  [MODES.PROMISES] as const,
  [MODES.ASYNC_AWAIT] as const,
])('mode=%s', (mode) => {
  it(`returns rendered list with titles and NO RESPONSE (${mode})`, async () => {
    mockMode(mode);
    mockGetHtml({
      'ok.com': '<title>Hello Title</title>',
      'bad.com': null,
    });

    const server = await makeServer();

    const res = await request(server).get(QUERY);

    expect(res.statusCode).toBe(200);
    assertOkAndLines(res.text);
  });
});
