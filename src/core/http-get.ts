import http from 'http';
import https from 'https';
import { URL } from 'url';
import {
  DEFAULT_REQUEST_TIMEOUT_MS,
  DEFAULT_MAX_REDIRECTS,
  DEFAULT_USER_AGENT,
} from '../constants';

export interface GetHtmlOptions {
  maxRedirects?: number;
  timeoutMs?: number;
  userAgent?: string;
}

/** Raw-callback HTML getter with redirects/timeout/UA. */
export function getHtml(
  urlStr: string,
  cb: (err: Error | null, html?: string) => void,
  opts: GetHtmlOptions = {},
  redirectsLeft = opts.maxRedirects ?? DEFAULT_MAX_REDIRECTS,
): void {
  let target: URL;
  try {
    target = new URL(urlStr);
  } catch {
    cb(new Error('Invalid URL'));
    return;
  }

  const client = target.protocol === 'https:' ? https : http;
  const req = client.get(
    target,
    {
      headers: {
        'User-Agent': opts.userAgent ?? DEFAULT_USER_AGENT,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'identity',
      },
    },
    (res) => {
      const status = res.statusCode ?? 0;

      // follow 3xx
      if (
        status >= 300 &&
        status < 400 &&
        res.headers.location &&
        redirectsLeft > 0
      ) {
        const next = new URL(res.headers.location, target).toString();
        res.resume();
        return getHtml(next, cb, opts, redirectsLeft - 1);
      }

      if (status < 200 || status >= 300) {
        res.resume();
        cb(new Error(`Bad status: ${status}`));
        return;
      }

      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => {
        data += c;
      });
      res.on('end', () => cb(null, data));
    },
  );

  req.setTimeout(opts.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS, () => {
    req.destroy(new Error('Timeout'));
  });
  req.on('error', (err) => cb(err));
}
