export function normalizeAddress(addr: string): string {
  const a = addr.trim();
  if (/^https?:\/\//i.test(a)) return a;
  return `http://${a}`; // default scheme if missing
}

export function parseAddresses(url: URL): string[] {
  const raw = url.searchParams.getAll('address');
  const split = raw.flatMap((item) => item.split(','));
  const uniq = Array.from(new Set(split.map((s) => s.trim()).filter(Boolean)));
  return uniq.map(normalizeAddress);
}
