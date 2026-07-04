const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

export function metaDebug(message: string, data?: unknown): void {
  if (!isDev) return;
  if (data !== undefined) {
    console.debug(`[Meta] ${message}`, data);
    return;
  }
  console.debug(`[Meta] ${message}`);
}

export function metaWarn(message: string, data?: unknown): void {
  if (!isDev) return;
  if (data !== undefined) {
    console.warn(`[Meta] ${message}`, data);
    return;
  }
  console.warn(`[Meta] ${message}`);
}
