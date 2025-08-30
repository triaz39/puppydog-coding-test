import { TitleStrategyCb, createTitleHandlerCb } from '../handlers';
import { extractTitle } from '../core/extract-title';
import { getHtml } from '../core/http-get';
import { formatLine } from '../core/format-line';

export const strategyCallbacks: TitleStrategyCb = (addresses, done) => {
  const results = new Array<string>(addresses.length);
  let pending = addresses.length;
  let finished = false;

  const maybeFinish = () => {
    if (finished) return;
    if (--pending > 0) return;
    finished = true;
    done(results);
  };

  addresses.forEach((addr, i) => {
    getHtml(addr, (err, html) => {
      if (err || !html) {
        results[i] = formatLine(addr, 'NO RESPONSE');
        return maybeFinish();
      }
      const title = extractTitle(html) || 'NO RESPONSE';
      results[i] = formatLine(addr, title);
      return maybeFinish();
    });
  });
};

export const titleHandlerCallbacks = createTitleHandlerCb(strategyCallbacks);
