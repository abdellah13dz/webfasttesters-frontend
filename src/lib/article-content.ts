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

const COLOR_PROPERTY_RE =
  /\b(color|background-color|background|border-color|border-bottom|border-left|border-top|border-right|border-bottom-color|border-left-color|border-top-color|border-right-color)\s*:\s*([^;}{]+)/gi;

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

function inferDarkValue(lightValue: string, varName = '', prop = ''): string {
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

function toLightDark(lightValue: string, varName = '', prop = ''): string {
  const trimmed = lightValue.trim();
  if (!trimmed || trimmed.includes('light-dark(') || trimmed.startsWith('var(')) {
    return trimmed;
  }
  if (trimmed.includes('url(') || trimmed.includes('gradient(')) {
    return trimmed;
  }

  const darkValue = inferDarkValue(trimmed, varName, prop);
  if (darkValue === trimmed) return trimmed;
  return `light-dark(${trimmed}, ${darkValue})`;
}

function adaptColorTokens(value: string, varName = '', prop = ''): string {
  if (value.includes('light-dark(')) return value;
  return value.replace(/#[0-9a-f]{3,8}\b/gi, (hex) => toLightDark(hex, varName, prop));
}

function scopeEmbeddedCss(css: string): string {
  return css
    .replace(/:root\b/g, '.article-html-preview')
    .replace(/(^|})\s*body\s*\{/g, '$1.article-html-preview {');
}

export function adaptEmbeddedArticleCss(css: string): string {
  let scoped = scopeEmbeddedCss(css);

  scoped = scoped.replace(CSS_VARIABLE_RE, (_match, name: string, value: string) => {
    const adapted = adaptColorTokens(value.trim(), name, '');
    return `${name}: ${adapted};`;
  });

  scoped = scoped.replace(COLOR_PROPERTY_RE, (match, prop: string, value: string) => {
    const trimmed = value.trim();
    if (
      trimmed.includes('url(') ||
      trimmed.includes('gradient(') ||
      trimmed.includes('light-dark(')
    ) {
      return match;
    }

    const adapted = adaptColorTokens(trimmed, '', prop.toLowerCase());
    return `${prop}: ${adapted}`;
  });

  return scoped;
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
