import fs from 'fs';
import path from 'path';

const dir = path.join('src', 'lib', 'i18n', 'locales', 'legal-pages');
const esPath = path.join(dir, 'es-supplement.ts');
const esContent = fs.readFileSync(esPath, 'utf8');
const keyValuePairs = [...esContent.matchAll(/'([^']+)': '((?:\\'|[^'])*)',/g)].map((m) => [
  m[1],
  m[2].replace(/\\'/g, "'"),
]);

function writeSupplement(locale, exportName, comment, translations) {
  const lines = [`/** ${comment} */`, `export const ${exportName}: Record<string, string> = {`];
  for (const [key, _enFallback] of keyValuePairs) {
    const value = translations[key];
    if (!value) {
      console.warn(`Missing ${locale} translation for ${key}`);
      continue;
    }
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    lines.push(`  '${key}': '${escaped}',`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(dir, `${locale}-supplement.ts`), lines.join('\n'));
  console.log(`Wrote ${locale}-supplement.ts (${keyValuePairs.length} keys)`);
}

// Load translations from JSON files if present
for (const locale of ['tr', 'ar']) {
  const jsonPath = path.join(dir, `${locale}-supplement.json`);
  if (fs.existsSync(jsonPath)) {
    const translations = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    writeSupplement(
      locale,
      locale === 'tr' ? 'legalPagesTrSupplement' : 'legalPagesArSupplement',
      locale === 'tr'
        ? 'Turkish translations for legal pages (Jun 2026)'
        : 'Arabic translations for legal pages (Jun 2026)',
      translations
    );
  }
}
