import { getHtml } from './http-get';

export function getHtmlP(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    getHtml(url, (err, html) => {
      if (err || !html) return resolve(null);
      resolve(html);
    });
  });
}
