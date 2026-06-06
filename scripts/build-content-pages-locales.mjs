/**
 * Builds content-pages locale files (es, tr, ar, index) from en.ts + translation maps.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../src/lib/i18n/locales/content-pages');
const enPath = join(outDir, 'en.ts');

function parseEn(content) {
  const entries = [];
  let currentComment = '';
  for (const line of content.split('\n')) {
    const commentMatch = line.match(/^\s*\/\/ ═+/);
    if (commentMatch) {
      currentComment = line;
      continue;
    }
    const sectionMatch = line.match(/^\s*\/\/ ([A-Z].*)$/);
    if (sectionMatch && !line.includes('═')) {
      currentComment = line;
      continue;
    }
    const keyMatch = line.match(/^\s+'([^']+)':\s*(.+),?\s*$/);
    if (keyMatch) {
      let val = keyMatch[2].trim();
      if (val.endsWith(',')) val = val.slice(0, -1);
      entries.push({ key: keyMatch[1], value: val, comment: currentComment });
    }
  }
  return entries;
}

function escapeTsString(str) {
  return JSON.stringify(str);
}

function buildLocaleFile(exportName, entries, translations) {
  const lines = [`export const ${exportName}: Record<string, string> = {`, ''];
  let lastComment = '';
  for (const { key, value, comment } of entries) {
    if (comment && comment !== lastComment) {
      if (comment.includes('═')) {
        lines.push(`  ${comment}`);
      } else {
        lines.push(`  ${comment}`);
      }
      lastComment = comment;
    }
    const enVal = evalValue(value);
    const translated = translations[key] ?? enVal;
    lines.push(`  '${key}': ${escapeTsString(translated)},`);
  }
  lines.push('};', '');
  return lines.join('\n');
}

function evalValue(raw) {
  try {
    return Function(`"use strict"; return (${raw});`)();
  } catch {
    return raw.replace(/^"|"$/g, '').replace(/\\"/g, '"');
  }
}

function loadTranslations(locale) {
  const path = join(__dirname, `content-pages-${locale}.json`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

const enContent = readFileSync(enPath, 'utf8');
const entries = parseEn(enContent);

mkdirSync(outDir, { recursive: true });

for (const locale of ['es', 'tr', 'ar']) {
  const translations = loadTranslations(locale);
  const exportName = `contentPages${locale.charAt(0).toUpperCase()}${locale.slice(1)}`;
  const missing = entries.filter((e) => !translations[e.key]);
  if (missing.length) {
    console.error(`${locale}: missing ${missing.length} keys`, missing.slice(0, 5).map((m) => m.key));
    process.exit(1);
  }
  const content = buildLocaleFile(exportName, entries, translations);
  writeFileSync(join(outDir, `${locale}.ts`), content, 'utf8');
  console.log(`Wrote ${locale}.ts (${entries.length} keys)`);
}

const indexContent = `export { contentPagesEn } from './en';
export { contentPagesEs } from './es';
export { contentPagesTr } from './tr';
export { contentPagesAr } from './ar';
`;
writeFileSync(join(outDir, 'index.ts'), indexContent, 'utf8');
console.log('Wrote index.ts');
