import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/i18n/locales/legal-pages');
const es = fs.readFileSync(path.join(dir, 'es-supplement.ts'), 'utf8');
const pairs = [...es.matchAll(/'([^']+)': '((?:\\'|[^'])*)',/g)].map((m) => [
  m[1],
  m[2].replace(/\\'/g, "'"),
]);
fs.writeFileSync(path.join(dir, '_es-keys.json'), JSON.stringify(Object.fromEntries(pairs), null, 2));
console.log('keys:', pairs.length);
