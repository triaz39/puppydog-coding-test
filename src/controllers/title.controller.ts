import type { Handler } from '../models';
import { MODE } from '../config/env';
import { MODES, HTTP_STATUS } from '../constants';
import {
  titleHandlerCallbacks,
  titleHandlerAsyncLib,
  titleHandlerPromises,
  titleHandlerAsyncAwait,
  titleHandlerStreams,
} from '../strategies';

export const getTitlesController: Handler = (req, res) => {
  if (MODE === MODES.CALLBACKS) return titleHandlerCallbacks(req, res);
  if (MODE === MODES.ASYNC) return titleHandlerAsyncLib(req, res);
  if (MODE === MODES.PROMISES) return titleHandlerPromises(req, res);
  if (MODE === MODES.ASYNC_AWAIT) return titleHandlerAsyncAwait(req, res);
  if (MODE === MODES.STREAM) return titleHandlerStreams(req, res);

  res.writeHead(HTTP_STATUS.NOT_IMPLEMENTED, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('Not Implemented for current MODE');
};
