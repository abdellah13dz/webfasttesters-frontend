import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../src/lib/i18n/locales/legal-pages');
const esContent = fs.readFileSync(path.join(dir, 'es-supplement.ts'), 'utf8');
const pairs = [...esContent.matchAll(/'([^']+)': '((?:\\'|[^'])*)',/g)].map((m) => [
  m[1],
  m[2].replace(/\\'/g, "'"),
]);

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function build(locale, exportName, comment, map) {
  const lines = [`/** ${comment} */`, `export const ${exportName}: Record<string, string> = {`];
  let missing = 0;
  for (const [key] of pairs) {
    const val = map[key];
    if (!val) {
      missing++;
      console.warn(`Missing ${locale}: ${key}`);
      continue;
    }
    lines.push(`  '${key}': '${esc(val)}',`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(dir, `${locale}-supplement.ts`), lines.join('\n'));
  console.log(`${locale}: wrote ${pairs.length - missing}/${pairs.length} keys`);
  return missing;
}

// Turkish translations
const tr = JSON.parse(fs.readFileSync(path.join(dir, 'tr-supplement.json'), 'utf8'));
const ar = JSON.parse(fs.readFileSync(path.join(dir, 'ar-supplement.json'), 'utf8'));

const trMissing = build('tr', 'legalPagesTrSupplement', 'Turkish translations for legal pages (Jun 2026)', tr);
const arMissing = build('ar', 'legalPagesArSupplement', 'Arabic translations for legal pages (Jun 2026)', ar);
if (trMissing || arMissing) process.exit(1);
