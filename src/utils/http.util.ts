import { ServerResponse } from 'http';
import { MODE } from '../config/env';

export function send(
  res: ServerResponse,
  status: number,
  body: string,
  headers: Record<string, string> = {},
) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Mode': MODE,
    ...headers,
  });
  res.end(body);
}
