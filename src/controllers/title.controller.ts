import type { Handler } from '../models';
import { MODE } from '../config/env';
import { MODES, HTTP_STATUS } from '../constants';
import { titleHandlerCallbacks } from '../strategies/callbacks';
import { titleHandlerAsyncLib } from '../strategies/async-lib';
import { titleHandlerPromises } from '../strategies/promises';
import { titleHandlerAsyncAwait } from '../strategies/async-await';

export const getTitlesController: Handler = (req, res) => {
  if (MODE === MODES.CALLBACKS) return titleHandlerCallbacks(req, res);
  if (MODE === MODES.ASYNC) return titleHandlerAsyncLib(req, res);
  if (MODE === MODES.PROMISES) return titleHandlerPromises(req, res);
  if (MODE === MODES.ASYNC_AWAIT) return titleHandlerAsyncAwait(req, res);

  res.writeHead(HTTP_STATUS.NOT_IMPLEMENTED, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('Not Implemented for current MODE');
};
