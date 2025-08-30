import type { Handler } from '../models';
import { HTTP_STATUS } from '../constants';

export const healthController: Handler = (_req, res) => {
  res.writeHead(HTTP_STATUS.OK, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ok');
};
