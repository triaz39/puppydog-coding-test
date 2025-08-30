import async from 'async';
import { TitleStrategyCb, createTitleHandlerCb } from '../handlers';
import { extractTitle } from '../core/extract-title';
import { getHtml } from '../core/http-get';
import { formatLine } from '../core/format-line';
import { DEFAULT_CONCURRENCY } from '../constants';

export const strategyAsyncLib: TitleStrategyCb = (addresses, done) => {
  const lines = new Array<string>(addresses.length);

  async.eachOfLimit<string, unknown>(
    addresses,
    DEFAULT_CONCURRENCY,
    (addr, key, cb) => {
      const i = typeof key === 'number' ? key : Number(key);

      getHtml(addr, (err, html) => {
        lines[i] =
          err || !html
            ? formatLine(addr, 'NO RESPONSE')
            : formatLine(addr, extractTitle(html) || 'NO RESPONSE');

        cb();
      });
    },
    () => done(lines),
  );
};

export const titleHandlerAsyncLib = createTitleHandlerCb(strategyAsyncLib);
