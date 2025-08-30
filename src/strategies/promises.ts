import { Promise as RsvpPromise, all } from 'rsvp';
import {
  createTitleHandlerPromise,
  type TitleStrategyPromise,
} from '../handlers';
import { getHtml } from '../core/http-get';
import { extractTitle } from '../core/extract-title';
import { formatLine } from '../core/format-line';

function getHtmlRsvp(addr: string): RsvpPromise<string | null> {
  return new RsvpPromise<string | null>((resolve) => {
    getHtml(addr, (err, html) => {
      if (err || !html) resolve(null);
      else resolve(html);
    });
  });
}

const strategyPromises: TitleStrategyPromise = (addresses) => {
  const tasks = addresses.map((addr) =>
    getHtmlRsvp(addr).then((html) => {
      const title = html ? extractTitle(html) || 'NO RESPONSE' : 'NO RESPONSE';
      return formatLine(addr, title);
    }),
  );

  return all(tasks);
};

export const titleHandlerPromises = createTitleHandlerPromise(strategyPromises);
