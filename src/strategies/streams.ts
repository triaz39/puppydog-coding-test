import { from, of, lastValueFrom } from 'rxjs';
import { mergeMap, map, catchError, toArray } from 'rxjs/operators';
import { TitleStrategyPromise, createTitleHandlerPromise } from '../handlers';
import { getHtmlP } from '../core/http-get-promise';
import { extractTitle } from '../core/extract-title';
import { formatLine } from '../core/format-line';
import { DEFAULT_CONCURRENCY } from '../constants';

export const strategyStreams: TitleStrategyPromise = async (addresses) => {
  const source$ = from(addresses.map((addr, index) => ({ addr, index })));

  const lines$ = source$.pipe(
    mergeMap(
      ({ addr, index }) =>
        from(getHtmlP(addr)).pipe(
          map((html) => {
            const title = html
              ? extractTitle(html) || 'NO RESPONSE'
              : 'NO RESPONSE';
            return { index, line: formatLine(addr, title) };
          }),
          catchError(() =>
            of({ index, line: formatLine(addr, 'NO RESPONSE') }),
          ),
        ),
      DEFAULT_CONCURRENCY,
    ),
    toArray(),
    map((arr) => arr.sort((a, b) => a.index - b.index).map((x) => x.line)), // restore input order
  );

  return lastValueFrom(lines$);
};

export const titleHandlerStreams = createTitleHandlerPromise(strategyStreams);
