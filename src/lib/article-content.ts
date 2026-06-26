/** True when stored body should be rendered as HTML (not Markdown). */
export function isHtmlArticleContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith('<') && /<\/[a-z][\s\S]*>/i.test(trimmed);
}

const LIGHT_BACKGROUND_RE =
  /^(?:#(?:fff(?:fff)?|fafafa|f5f5f5|f8f9fa|f9fafb|eeeeee|f0f0f0|fefefe)|white|window|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*[^)]*\))$/i;

function isLightBackground(value: string): boolean {
  return LIGHT_BACKGROUND_RE.test(value.trim());
}

function cleanInlineStyle(style: string): string {
  const kept: string[] = [];

  for (const part of style.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const colon = trimmed.indexOf(':');
    if (colon === -1) continue;

    const prop = trimmed.slice(0, colon).trim().toLowerCase();
    const value = trimmed.slice(colon + 1).trim();

    if (prop === 'color' || prop === '-webkit-text-fill-color') {
      continue;
    }

    if (prop === 'background' || prop === 'background-color') {
      if (isLightBackground(value)) continue;
    }

    kept.push(trimmed);
  }

  return kept.join('; ');
}

function sanitizeWithDom(html: string): string | null {
  if (typeof DOMParser === 'undefined') return null;

  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => node.remove());

  doc.body.querySelectorAll('*').forEach((element) => {
    element.removeAttribute('color');
    element.removeAttribute('bgcolor');

    if (!element.hasAttribute('style')) return;

    const cleaned = cleanInlineStyle(element.getAttribute('style') || '');
    if (cleaned) {
      element.setAttribute('style', cleaned);
    } else {
      element.removeAttribute('style');
    }
  });

  return doc.body.innerHTML;
}

function sanitizeWithRegex(html: string): string {
  let result = html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<link\b[^>]*\brel\s*=\s*["']?stylesheet["']?[^>]*>/gi, '');

  result = result.replace(
    /\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi,
    (_match, _quote, doubleQuoted: string, singleQuoted: string) => {
      const style = doubleQuoted ?? singleQuoted ?? '';
      const cleaned = cleanInlineStyle(style);
      if (!cleaned) return '';
      return ` style="${cleaned}"`;
    }
  );

  result = result.replace(/\s(?:color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  return result;
}

/**
 * Strip inline colors and embedded stylesheets so theme CSS controls light/dark rendering.
 * Original HTML is preserved in the database; this runs only at display time.
 */
export function sanitizeHtmlArticleForTheme(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return html;

  return sanitizeWithDom(trimmed) ?? sanitizeWithRegex(trimmed);
}
