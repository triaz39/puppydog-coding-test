import { HTTP_STATUS } from '../constants';
import { Handler } from '../models';
import { send } from '../utils';

export const health: Handler = (_req, res) => send(res, HTTP_STATUS.OK, 'ok');
