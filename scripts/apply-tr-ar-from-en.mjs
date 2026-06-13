/**
 * Builds TR/AR legal supplements from English legal-pages/en.ts keys
 * that exist in es-supplement (Stripe compliance additions).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/i18n/locales/legal-pages');

function parseTsRecord(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const entries = [...content.matchAll(/'([^']+)': '((?:\\'|[^'])*)',/g)].map((m) => [
    m[1],
    m[2].replace(/\\'/g, "'"),
  ]);
  return Object.fromEntries(entries);
}

const supplementKeys = Object.keys(parseTsRecord(path.join(dir, 'es-supplement.ts')));
const enLegal = parseTsRecord(path.join(dir, 'en.ts'));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function writeSupplement(locale, exportName, comment, translations) {
  const lines = [`/** ${comment} */`, `export const ${exportName}: Record<string, string> = {`];
  for (const key of supplementKeys) {
    const val = translations[key];
    if (!val) throw new Error(`Missing ${locale} translation: ${key}`);
    lines.push(`  '${key}': '${esc(val)}',`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(dir, `${locale}-supplement.ts`), lines.join('\n'));
  console.log(`Wrote ${locale}-supplement.ts (${supplementKeys.length} keys)`);
}

// Load hand-authored translations
const tr = JSON.parse(fs.readFileSync(path.join(dir, 'tr-supplement.json'), 'utf8'));
const ar = JSON.parse(fs.readFileSync(path.join(dir, 'ar-supplement.json'), 'utf8'));

writeSupplement('tr', 'legalPagesTrSupplement', 'Turkish translations for legal pages (Jun 2026)', tr);
writeSupplement('ar', 'legalPagesArSupplement', 'Arabic translations for legal pages (Jun 2026)', ar);
