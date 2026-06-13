import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/i18n/locales/legal-pages');

function parseTsRecord(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return Object.fromEntries(
    [...content.matchAll(/'([^']+)': '((?:\\'|[^'])*)',/g)].map((m) => [
      m[1],
      m[2].replace(/\\'/g, "'"),
    ])
  );
}

const keys = Object.keys(parseTsRecord(path.join(dir, 'es-supplement.ts')));
const en = parseTsRecord(path.join(dir, 'en.ts'));

for (const locale of ['tr', 'ar']) {
  const out = {};
  for (const key of keys) {
    out[key] = en[key] ?? '';
  }
  fs.writeFileSync(path.join(dir, `${locale}-supplement.json`), JSON.stringify(out, null, 2));
  console.log(`${locale}: ${keys.length} keys from en.ts`);
}
