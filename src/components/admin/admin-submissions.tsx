'use client';

import { apiFetch } from '@/lib/api';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Smartphone,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
} from 'lucide-react';

interface AppSubmission {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  appName: string;
  packageName: string;
  playUrl: string | null;
  testingLink: string;
  pricingPlanId: string | null;
  planLabel: string | null;
  instructions: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SubmissionsResponse {
  data: AppSubmission[];
  total: number;
  page: number;
  pageSize: number;
}

type StatusFilter = 'all' | 'pending' | 'reviewing' | 'approved' | 'rejected' | 'closed';

const statusConfig: Record<string, { label: string; badgeClass: string }> = {
  pending: { label: 'Pending', badgeClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  reviewing: { label: 'Reviewing', badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  approved: { label: 'Approved', badgeClass: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  rejected: { label: 'Rejected', badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
  closed: { label: 'Closed', badgeClass: 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20' },
};

const filterTabs: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'reviewing', label: 'Reviewing' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'closed', label: 'Closed' },
];

function formatDateTime(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function AdminSubmissions() {
  const [items, setItems] = useState<AppSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [viewItem, setViewItem] = useState<AppSubmission | null>(null);
  const [viewNotes, setViewNotes] = useState('');
  const [viewStatus, setViewStatus] = useState('pending');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await apiFetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const data: SubmissionsResponse = await res.json();
        setItems(data.data || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const filteredItems = items.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.appName.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.packageName.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const openView = (item: AppSubmission) => {
    setViewItem(item);
    setViewNotes(item.notes || '');
    setViewStatus(item.status);
  };

  const handleSave = async () => {
    if (!viewItem) return;
    try {
      setSaving(true);
      const res = await apiFetch(`/api/admin/submissions/${viewItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: viewStatus, notes: viewNotes.trim() || null }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setViewItem(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      const res = await apiFetch(`/api/admin/submissions/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setDeleteId(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">App Submissions</h2>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">
            {total}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === tab.id
                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by app, name, email, or package..."
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center text-muted-foreground">No submissions found.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const config = statusConfig[item.status] || statusConfig.pending;
            return (
              <Card key={item.id} className="border-border/50 hover:border-blue-500/20 transition-colors">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{item.appName}</h3>
                        <Badge variant="outline" className={config.badgeClass}>
                          {config.label}
                        </Badge>
                        {item.planLabel && (
                          <Badge variant="outline" className="text-xs">{item.planLabel}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.packageName}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.name} · {item.email}
                        {item.whatsapp ? ` · WhatsApp: ${item.whatsapp}` : ''}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateTime(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openView(item)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteId(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewItem?.appName}</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 bg-muted/20 p-3 text-sm space-y-2">
                <p><span className="text-muted-foreground">Contact:</span> {viewItem.name} ({viewItem.email})</p>
                {viewItem.whatsapp && (
                  <p>
                    <span className="text-muted-foreground">WhatsApp:</span>{' '}
                    <a
                      href={`https://wa.me/${viewItem.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 inline-flex items-center gap-1"
                    >
                      {viewItem.whatsapp}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                )}
                <p><span className="text-muted-foreground">Package:</span> {viewItem.packageName}</p>
                {viewItem.planLabel && <p><span className="text-muted-foreground">Plan:</span> {viewItem.planLabel}</p>}
                <p className="break-all">
                  <span className="text-muted-foreground">Testing link:</span>{' '}
                  <a href={viewItem.testingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 inline-flex items-center gap-1">
                    {viewItem.testingLink}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
                {viewItem.playUrl && (
                  <p className="break-all">
                    <span className="text-muted-foreground">Play Store:</span>{' '}
                    <a href={viewItem.playUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{viewItem.playUrl}</a>
                  </p>
                )}
                {viewItem.instructions && (
                  <p><span className="text-muted-foreground">Instructions:</span> {viewItem.instructions}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={viewStatus} onValueChange={setViewStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([value, cfg]) => (
                      <SelectItem key={value} value={value}>{cfg.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Internal notes</Label>
                <Textarea value={viewNotes} onChange={(e) => setViewNotes(e.target.value)} rows={4} placeholder="Admin notes..." />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewItem(null)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete submission?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
