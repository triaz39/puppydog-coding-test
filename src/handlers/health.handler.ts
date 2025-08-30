import { Handler } from '../models';
import { send } from '../utils';

export const health: Handler = (_req, res) => send(res, 200, 'ok');
