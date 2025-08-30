import { MODE } from './config/env';
import type { Handler } from './models';
import { health, notFound } from './handlers';

export function createApp(): Handler {
  return async (req, res) => {
    try {
      const url = new URL(
        req.url ?? '/',
        `http://${req.headers.host ?? 'localhost'}`,
      );
      const pathname = url.pathname;
      const method = req.method ?? 'GET';

      if (method === 'GET' && pathname === '/health') return health(req, res);

      return notFound(req, res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      // only write if we still can
      if (!res.writableEnded) {
        if (!res.headersSent) {
          res.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Mode': MODE,
          });
        }
        res.end('Internal Server Error');
      }
    }
  };
}
