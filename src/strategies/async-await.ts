import { TitleStrategyPromise, createTitleHandlerPromise } from '../handlers';
import { getHtmlP } from '../core/http-get-promise';
import { extractTitle } from '../core/extract-title';
import { formatLine } from '../core/format-line';

export const strategyAsyncAwait: TitleStrategyPromise = async (addresses) => {
  const tasks = addresses.map(async (addr) => {
    const html = await getHtmlP(addr);
    const title = html ? extractTitle(html) || 'NO RESPONSE' : 'NO RESPONSE';
    return formatLine(addr, title);
  });

  return await Promise.all(tasks);
};

export const titleHandlerAsyncAwait =
  createTitleHandlerPromise(strategyAsyncAwait);
