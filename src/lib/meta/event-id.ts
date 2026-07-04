export function createMetaEventId(prefix?: string): string {
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `meta_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${id}` : id;
}

/** Deterministic purchase event id shared by browser + server deduplication. */
export function purchaseEventId(orderId: string): string {
  return `purchase_${orderId}`;
}
