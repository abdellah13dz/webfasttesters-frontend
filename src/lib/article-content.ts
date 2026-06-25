/** True when stored body should be rendered as HTML (not Markdown). */
export function isHtmlArticleContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith('<') && /<\/[a-z][\s\S]*>/i.test(trimmed);
}
