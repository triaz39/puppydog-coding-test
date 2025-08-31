import type { Handler } from '../models';
import { parseAddresses } from '../utils/url.util';
import { renderListPage } from '../core/render';
import { HTTP_STATUS } from '../constants';

export type TitleStrategyCb = (
  addresses: string[],
  done: (lines: string[]) => void,
) => void;

export type TitleStrategyPromise = (
  addresses: string[],
) => PromiseLike<string[]>;

const HTML_CT = { 'Content-Type': 'text/html; charset=utf-8' } as const;
const BAD_REQUEST_HTML =
  '<h1>Bad Request</h1><p>Provide at least one <code>address</code> query parameter.</p>';

function respondHtml(
  res: import('http').ServerResponse,
  status: number,
  body: string,
): void {
  res.writeHead(status, HTML_CT);
  res.end(body);
}

function createTitleHandlerCore(
  run: (addresses: string[]) => PromiseLike<string[]>,
): Handler {
  return async (req, res) => {
    const url = new URL(
      req.url ?? '/',
      `http://${req.headers.host ?? 'localhost'}`,
    );
    const routePath = url.pathname.endsWith('/')
      ? url.pathname.slice(0, -1)
      : url.pathname;

    if (routePath !== '/I/want/title') {
      res.writeHead(HTTP_STATUS.NOT_FOUND, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('Not Found');
    }
    const addresses = parseAddresses(url);

    if (addresses.length === 0) {
      respondHtml(res, HTTP_STATUS.BAD_REQUEST, BAD_REQUEST_HTML);
      return;
    }

    const lines = await run(addresses);
    respondHtml(res, HTTP_STATUS.OK, renderListPage(lines));
  };
}

function fromCallback(
  strategy: TitleStrategyCb,
): (addresses: string[]) => PromiseLike<string[]> {
  return (addresses) =>
    new Promise<string[]>((resolve) => {
      strategy(addresses, resolve);
    });
}

export function createTitleHandlerCb(strategy: TitleStrategyCb): Handler {
  return createTitleHandlerCore(fromCallback(strategy));
}

export function createTitleHandlerPromise(
  strategy: TitleStrategyPromise,
): Handler {
  return createTitleHandlerCore(strategy);
}
