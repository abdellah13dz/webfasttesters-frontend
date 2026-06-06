import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

for (const locale of ['es', 'tr', 'ar']) {
  const dir = join(__dirname, locale);
  const merged = {};
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    Object.assign(merged, JSON.parse(readFileSync(join(dir, file), 'utf8')));
  }
  const out = join(__dirname, '..', `content-pages-${locale}.json`);
  writeFileSync(out, JSON.stringify(merged));
  console.log(`${locale}: ${Object.keys(merged).length} keys -> ${out}`);
}
