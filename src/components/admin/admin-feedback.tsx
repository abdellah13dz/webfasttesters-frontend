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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Star,
  Trash2,
  Clock,
  CheckCircle2,
  Archive,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MessageSquareHeart,
  Eye,
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  rating: number;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FeedbackResponse {
  data: FeedbackItem[];
  total: number;
  page: number;
  pageSize: number;
}

type StatusFilter = 'all' | 'new' | 'reviewed' | 'archived';

const statusConfig: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
  new: {
    label: 'New',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    dotClass: 'bg-blue-500',
  },
  reviewed: {
    label: 'Reviewed',
    badgeClass: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    dotClass: 'bg-green-500',
  },
  archived: {
    label: 'Archived',
    badgeClass: 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20',
    dotClass: 'bg-gray-500',
  },
};

const filterTabs: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'reviewed', label: 'Reviewed' },
  { id: 'archived', label: 'Archived' },
];

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminFeedback() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewItem, setViewItem] = useState<FeedbackItem | null>(null);
  const [viewNotes, setViewNotes] = useState('');
  const [viewStatus, setViewStatus] = useState<string>('reviewed');
  const [saving, setSaving] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single'; id: string } | { type: 'bulk' } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState<string | null>(null);

  const [allItems, setAllItems] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      const res = await apiFetch(`/api/admin/feedback?${params.toString()}`);
      if (res.ok) {
        const data: FeedbackResponse = await res.json();
        setItems(data.data || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [statusFilter]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await apiFetch('/api/admin/feedback?pageSize=1000');
        if (res.ok) {
          const data: FeedbackResponse = await res.json();
          setAllItems(data.data || []);
        }
      } catch {
        // ignore
      }
    };
    fetchAll();
  }, [fetchFeedback]);

  const stats = {
    new: allItems.filter((f) => f.status === 'new').length,
    reviewed: allItems.filter((f) => f.status === 'reviewed').length,
    archived: allItems.filter((f) => f.status === 'archived').length,
    avgRating:
      allItems.length > 0
        ? (allItems.reduce((sum, f) => sum + f.rating, 0) / allItems.length).toFixed(1)
        : '—',
  };

  const filteredItems = searchDebounced
    ? items.filter((f) => f.message.toLowerCase().includes(searchDebounced.toLowerCase()))
    : items;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((f) => f.id)));
    }
  };

  const allSelected = filteredItems.length > 0 && selectedIds.size === filteredItems.length;

  const openViewDialog = (item: FeedbackItem) => {
    setViewItem(item);
    setViewNotes(item.notes || '');
    setViewStatus(item.status === 'new' ? 'reviewed' : item.status);
  };

  const handleSaveView = async () => {
    if (!viewItem) return;
    try {
      setSaving(true);
      const res = await apiFetch(`/api/admin/feedback/${viewItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: viewStatus, notes: viewNotes.trim() || null }),
      });
      if (!res.ok) throw new Error('Failed to update feedback');
      setViewItem(null);
      fetchFeedback();
    } catch (error) {
      console.error('Error updating feedback:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (item: FeedbackItem, newStatus: string) => {
    try {
      setStatusChangeLoading(item.id);
      const res = await apiFetch(`/api/admin/feedback/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchFeedback();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusChangeLoading(null);
    }
  };

  const openSingleDelete = (id: string) => {
    setDeleteTarget({ type: 'single', id });
    setDeleteDialogOpen(true);
  };

  const openBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setDeleteTarget({ type: 'bulk' });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      if (deleteTarget.type === 'single') {
        const res = await apiFetch(`/api/admin/feedback/${deleteTarget.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete feedback');
      } else {
        const res = await apiFetch('/api/admin/feedback', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: Array.from(selectedIds) }),
        });
        if (!res.ok) throw new Error('Failed to bulk delete feedback');
      }
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      setSelectedIds(new Set());
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Feedback Manager</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage user feedback submissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-48 sm:w-64 bg-muted/30"
            />
          </div>
          {selectedIds.size > 0 && (
            <Button variant="destructive" size="sm" onClick={openBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedIds.size})
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
              <MessageSquareHeart className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New</p>
              <p className="text-2xl font-bold text-foreground">{stats.new}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reviewed</p>
              <p className="text-2xl font-bold text-foreground">{stats.reviewed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10 shrink-0">
              <Archive className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Archived</p>
              <p className="text-2xl font-bold text-foreground">{stats.archived}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgRating}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-0">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              statusFilter === tab.id
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab.label}
            {tab.id !== 'all' && stats[tab.id as keyof typeof stats] > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({stats[tab.id as keyof typeof stats]})</span>
            )}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquareHeart className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-medium">No feedback found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {searchDebounced
                ? 'Try adjusting your search query'
                : 'User feedback will appear here once submitted'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50 overflow-hidden">
          <div className="hidden md:grid md:grid-cols-[2.5rem_5rem_1fr_7rem_7rem_7rem] items-center gap-4 px-4 py-3 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center justify-center">
              <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} aria-label="Select all" />
            </div>
            <div>Rating</div>
            <div>Message</div>
            <div className="text-center">Date</div>
            <div className="text-center">Status</div>
            <div className="text-center">Actions</div>
          </div>

          <div className="divide-y divide-border/50">
            {filteredItems.map((item) => {
              const cfg = statusConfig[item.status] || statusConfig.new;
              const isSelected = selectedIds.has(item.id);
              const isStatusLoading = statusChangeLoading === item.id;

              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-1 md:grid-cols-[2.5rem_5rem_1fr_7rem_7rem_7rem] items-center gap-2 md:gap-4 px-4 py-3 transition-colors ${
                    isSelected ? 'bg-blue-500/5' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center md:justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(item.id)}
                      aria-label="Select feedback"
                    />
                  </div>

                  <div>
                    <StarRating rating={item.rating} />
                    <span className="text-xs text-muted-foreground md:hidden mt-1 block">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-foreground line-clamp-2">{item.message}</p>
                    <div className="flex items-center gap-2 mt-1 md:hidden">
                      <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${cfg.badgeClass}`}>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${cfg.dotClass}`} />
                        {cfg.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="hidden md:block text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <div className="hidden md:flex justify-center">
                    {isStatusLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Select value={item.status} onValueChange={(val) => handleStatusChange(item, val)}>
                        <SelectTrigger className="h-7 w-[7rem] text-xs border-0 bg-transparent focus:ring-0 p-0 gap-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="flex items-center md:justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                      onClick={() => openViewDialog(item)}
                      title="View"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => openSingleDelete(item.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {total > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquareHeart className="h-4 w-4 text-blue-500" />
              Feedback Details
            </DialogTitle>
          </DialogHeader>

          {viewItem && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between">
                <StarRating rating={viewItem.rating} />
                <span className="text-xs text-muted-foreground">{formatDateTime(viewItem.createdAt)}</span>
              </div>

              <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{viewItem.message}</p>
              </div>

              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  value={viewNotes}
                  onChange={(e) => setViewNotes(e.target.value)}
                  placeholder="Internal notes about this feedback..."
                  rows={3}
                  className="bg-muted/30 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={viewStatus} onValueChange={setViewStatus}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setViewItem(null)} disabled={saving}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveView}
                  disabled={saving}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              {deleteTarget?.type === 'bulk' ? 'Delete Selected Feedback' : 'Delete Feedback'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {deleteTarget?.type === 'bulk'
              ? `Are you sure you want to delete ${selectedIds.size} selected item(s)? This cannot be undone.`
              : 'Are you sure you want to delete this feedback? This cannot be undone.'}
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
