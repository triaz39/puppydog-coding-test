import { Handler } from '../models';
import { send } from '../utils/http.util';

export const notFound: Handler = (_req, res) => send(res, 404, 'Not Found');
