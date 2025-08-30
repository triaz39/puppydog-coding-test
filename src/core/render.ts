export function renderListPage(lines: string[]): string {
  const items = lines.map((l) => `<li>${l}</li>`).join('');
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Result</title></head>
<body>
  <h1>Following are the titles of given websites:</h1>
  <ul>${items}</ul>
</body></html>`;
}
