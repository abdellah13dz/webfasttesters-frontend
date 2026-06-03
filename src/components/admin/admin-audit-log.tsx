'use client';

import { apiFetch } from '@/lib/api';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, ScrollText } from 'lucide-react';

interface AuditEntry {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  entityId: string | null;
  metadata: string | null;
  ip: string | null;
  createdAt: string;
}

export default function AdminAuditLog() {
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 50;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/audit-log?page=${page}&pageSize=${pageSize}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.data || []);
        setTotal(data.total || 0);
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2"><ScrollText className="h-5 w-5 text-blue-500" />Audit Log</h2>
        <p className="text-sm text-muted-foreground">Admin mutations and login events.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
      ) : (
        <div className="space-y-2">
          {items.map((entry) => (
            <Card key={entry.id}><CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge>{entry.action}</Badge>
                  <Badge variant="outline">{entry.entity}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm">{entry.userEmail}{entry.entityId ? ` · ${entry.entityId}` : ''}</p>
                {entry.ip && <p className="text-xs text-muted-foreground">IP: {entry.ip}</p>}
              </div>
            </CardContent></Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{total} events</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm self-center">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
