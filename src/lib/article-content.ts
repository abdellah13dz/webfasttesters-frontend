/** True when stored body should be rendered as HTML (not Markdown). */
export function isHtmlArticleContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith('<') && /<\/[a-z][\s\S]*>/i.test(trimmed);
}

export type PreparedArticleHtml = {
  styles: string[];
  bodyHtml: string;
  hasEmbeddedStyles: boolean;
};

const LIGHT_BACKGROUND_RE =
  /^(?:#(?:fff(?:fff)?|fafafa|f5f5f5|f8f9fa|f9fafb|eeeeee|f0f0f0|fefefe|e8f0fe|f1f3f4)|white|window|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*[^)]*\))$/i;

const COLOR_PROPERTY_NAMES =
  'color|background-color|background|border-color|border-bottom|border-left|border-top|border-right|border-bottom-color|border-left-color|border-top-color|border-right-color';

const COLOR_PROPERTY_RE = new RegExp(
  `\\b(${COLOR_PROPERTY_NAMES})\\s*:\\s*([^;}{]+)`,
  'gi'
);

const CSS_VARIABLE_RE = /(--[\w-]+)\s*:\s*([^;}{]+)/g;

function hexLuminance(hex: string): number {
  const normalized = hex.replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(full)) return 0.5;

  const red = parseInt(full.slice(0, 2), 16) / 255;
  const green = parseInt(full.slice(2, 4), 16) / 255;
  const blue = parseInt(full.slice(4, 6), 16) / 255;

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function isLightBackground(value: string): boolean {
  return LIGHT_BACKGROUND_RE.test(value.trim());
}

export function inferDarkValue(lightValue: string, varName = '', prop = ''): string {
  const value = lightValue.trim();
  const lowerValue = value.toLowerCase();
  const lowerName = varName.toLowerCase();
  const lowerProp = prop.toLowerCase();

  if (lowerName.includes('success') && lowerName.includes('bg')) {
    return 'color-mix(in oklch, #137333 22%, var(--card))';
  }
  if (lowerName.includes('warning') && lowerName.includes('bg')) {
    return 'color-mix(in oklch, #f4b400 18%, var(--card))';
  }
  if (lowerName.includes('error') && lowerName.includes('bg')) {
    return 'color-mix(in oklch, #c5221f 18%, var(--card))';
  }

  if (
    lowerProp.includes('background') ||
    lowerName.includes('bg') ||
    lowerName.includes('background') ||
    lowerName.includes('light')
  ) {
    if (isLightBackground(lowerValue) || (lowerValue.startsWith('#') && hexLuminance(lowerValue) > 0.82)) {
      return 'var(--card)';
    }
  }

  if (lowerName.includes('border') || lowerProp.includes('border')) {
    if (lowerValue.startsWith('#') || lowerValue.includes('rgb')) {
      return 'var(--border)';
    }
  }

  if (lowerName.includes('primary') || lowerValue === '#1a73e8' || lowerValue === '#1557b0') {
    return '#8ab4f8';
  }
  if (lowerName.includes('success') && !lowerName.includes('bg')) return '#81c995';
  if (lowerName.includes('warning') && !lowerName.includes('bg')) return '#fdd663';
  if (lowerName.includes('error') && !lowerName.includes('bg')) return '#f28b82';

  if (
    lowerProp === 'color' ||
    lowerName.includes('text') ||
    lowerName.includes('foreground') ||
    lowerName.includes('dark')
  ) {
    if (lowerValue === '#000' || lowerValue === '#000000' || lowerValue === 'black') {
      return 'var(--foreground)';
    }
    if (lowerValue.startsWith('#')) {
      const luminance = hexLuminance(lowerValue);
      if (luminance < 0.22) return 'var(--foreground)';
      if (luminance < 0.55) return 'var(--foreground)';
      if (luminance < 0.72) return 'var(--muted-foreground)';
    }
  }

  if (lowerValue.startsWith('#')) {
    const luminance = hexLuminance(lowerValue);
    if (luminance > 0.82) return 'var(--card)';
    if (luminance < 0.55) return 'var(--foreground)';
  }

  return value;
}

function scopeEmbeddedCss(css: string): string {
  return css
    .replace(/:root\b/g, '.article-html-preview')
    .replace(/(^|})\s*body\s*\{/g, '$1.article-html-preview {');
}

function scopeSelectorForDark(selector: string): string {
  return selector
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('.dark')) return trimmed;
      return `.dark .article-html-preview ${trimmed}`;
    })
    .filter(Boolean)
    .join(', ');
}

function collectColorOverrides(declarations: string): string[] {
  const overrides: string[] = [];

  COLOR_PROPERTY_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = COLOR_PROPERTY_RE.exec(declarations)) !== null) {
    const prop = match[1].toLowerCase();
    const value = match[2].trim();

    if (value.includes('var(') || value.includes('url(') || value.includes('gradient(')) {
      continue;
    }

    const darkValue = inferDarkValue(value, '', prop);
    if (darkValue !== value) {
      overrides.push(`${prop}: ${darkValue} !important`);
    }
  }

  return overrides;
}

function buildDarkCompanion(scopedCss: string): string {
  const parts: string[] = [];

  const variableBlock = scopedCss.match(/\.article-html-preview\s*\{([^{}]*)\}/);
  if (variableBlock) {
    const darkVariables: string[] = [];

    CSS_VARIABLE_RE.lastIndex = 0;
    let variableMatch: RegExpExecArray | null;
    while ((variableMatch = CSS_VARIABLE_RE.exec(variableBlock[1])) !== null) {
      const name = variableMatch[1];
      const value = variableMatch[2].trim();
      darkVariables.push(`${name}: ${inferDarkValue(value, name, '')}`);
    }

    if (darkVariables.length) {
      parts.push(
        `.dark .article-html-preview {\n  ${darkVariables.join(';\n  ')};\n}`
      );
    }
  }

  const ruleRegex = /([^{}@/][^{}]*)\{([^{}]*)\}/g;
  const propertyOverrides: string[] = [];

  for (const ruleMatch of scopedCss.matchAll(ruleRegex)) {
    const selector = ruleMatch[1].trim();
    const declarations = ruleMatch[2];

    if (!selector || selector.startsWith('@')) continue;
    if (/^\.article-html-preview\s*$/.test(selector)) continue;

    const overrides = collectColorOverrides(declarations);
    if (!overrides.length) continue;

    propertyOverrides.push(
      `${scopeSelectorForDark(selector)} {\n  ${overrides.join(';\n  ')};\n}`
    );
  }

  if (propertyOverrides.length) {
    parts.push(propertyOverrides.join('\n\n'));
  }

  return parts.join('\n\n');
}

/** Adapt embedded article CSS for site theme toggle (.dark class), not prefers-color-scheme. */
export function adaptEmbeddedArticleCss(css: string): string {
  const scoped = scopeEmbeddedCss(css);
  const darkCompanion = buildDarkCompanion(scoped);
  return darkCompanion ? `${scoped}\n\n${darkCompanion}` : scoped;
}

function extractEmbeddedStyles(html: string): { styles: string[]; htmlWithoutStyles: string } {
  const styles: string[] = [];

  const htmlWithoutStyles = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (_match, css: string) => {
    styles.push(adaptEmbeddedArticleCss(css));
    return '';
  });

  return { styles, htmlWithoutStyles: htmlWithoutStyles.trim() };
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

function sanitizeInlineStyles(html: string): string {
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('link[rel="stylesheet"]').forEach((node) => node.remove());

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

  let result = html.replace(/<link\b[^>]*\brel\s*=\s*["']?stylesheet["']?[^>]*>/gi, '');

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

/** Prepare embedded-style HTML articles for themed display without mutating stored content. */
export function prepareHtmlArticleForDisplay(html: string): PreparedArticleHtml {
  const trimmed = html.trim();
  if (!trimmed) {
    return { styles: [], bodyHtml: html, hasEmbeddedStyles: false };
  }

  const { styles, htmlWithoutStyles } = extractEmbeddedStyles(trimmed);
  const bodyHtml = sanitizeInlineStyles(htmlWithoutStyles);

  return {
    styles,
    bodyHtml,
    hasEmbeddedStyles: styles.length > 0,
  };
}

/** @deprecated Use prepareHtmlArticleForDisplay */
export function sanitizeHtmlArticleForTheme(html: string): string {
  return prepareHtmlArticleForDisplay(html).bodyHtml;
}
