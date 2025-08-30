import type { Handler } from './models';
import { MODE } from './config/env';
import { HTTP_STATUS } from './constants';
import { createRoutes } from './routes';

export function createApp(): Handler {
  const router = createRoutes();

  return (req, res) => {
    try {
      return router.handle(req, res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      if (!res.writableEnded) {
        if (!res.headersSent) {
          res.writeHead(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Mode': MODE,
          });
        }
        res.end('Internal Server Error');
      }
    }
  };
}
