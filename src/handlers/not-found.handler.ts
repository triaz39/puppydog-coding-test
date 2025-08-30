import { HTTP_STATUS } from '../constants';
import { Handler } from '../models';
import { send } from '../utils/http.util';

export const notFound: Handler = (_req, res) =>
  send(res, HTTP_STATUS.NOT_FOUND, 'Not Found');
