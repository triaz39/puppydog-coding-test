export function extractTitle(html: string): string {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const t = m?.[1]?.trim() ?? '';
  return t.replace(/\s+/g, ' ');
}
