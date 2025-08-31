export function normalizePath(p: string): string {
  if (!p || p === '/') return '/';
  return p.endsWith('/') ? p.slice(0, -1) : p;
}
