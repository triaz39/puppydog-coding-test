import { escapeHtml } from '../utils';

export function formatLine(address: string, title: string) {
  return `${escapeHtml(address)} - "${escapeHtml(title)}"`;
}
