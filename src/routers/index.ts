import type { Handler } from '../models';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

function normalizePath(p: string): string {
  if (!p || p === '/') return '/';
  return p.endsWith('/') ? p.slice(0, -1) : p;
}

export class Router {
  private readonly routes = new Map<string, Handler>();
  constructor(private readonly onNotFound: Handler) {}

  private key(method: Method, path: string) {
    return `${method} ${normalizePath(path)}`;
  }

  register(method: Method, path: string, handler: Handler) {
    this.routes.set(this.key(method, path), handler);
    return this;
  }

  get(path: string, handler: Handler) {
    return this.register('GET', path, handler);
  }
  post(path: string, handler: Handler) {
    return this.register('POST', path, handler);
  }
  put(path: string, handler: Handler) {
    return this.register('PUT', path, handler);
  }
  patch(path: string, handler: Handler) {
    return this.register('PATCH', path, handler);
  }
  delete(path: string, handler: Handler) {
    return this.register('DELETE', path, handler);
  }

  handle: Handler = (req, res) => {
    const method = (req.method ?? 'GET').toUpperCase() as Method;
    const url = new URL(
      req.url ?? '/',
      `http://${req.headers.host ?? 'localhost'}`,
    );
    const pathname = normalizePath(url.pathname);
    const handler = this.routes.get(`${method} ${pathname}`) ?? this.onNotFound;
    return handler(req, res);
  };
}
