'use client';

import { apiFetch, apiUrl, getAdminToken } from '@/lib/api';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  Download,
  Trash2,
  Mail,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Send,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Subscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

interface NewslettersResponse {
  data: Subscriber[];
  total: number;
  page: number;
  pageSize: number;
}

export default function AdminNewsletters() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(20);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [campaignOpen, setCampaignOpen] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignBody, setCampaignBody] = useState('');
  const [campaignTestEmail, setCampaignTestEmail] = useState('');
  const [sendTestOnly, setSendTestOnly] = useState(false);
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [campaignResult, setCampaignResult] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 300);
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      const searchParam = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : '';
      const res = await apiFetch(
        `/api/admin/newsletters?page=${page}&pageSize=${pageSize}${searchParam}`
      );
      if (res.ok) {
        const data: NewslettersResponse = await res.json();
        setSubscribers(data.data || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  // Reset selection when page changes
  useEffect(() => {
    setSelectedIds(new Set());
  }, [page]);

  const allOnPageSelected =
    subscribers.length > 0 &&
    subscribers.every((s) => selectedIds.has(s.id));

  const someOnPageSelected =
    subscribers.some((s) => selectedIds.has(s.id)) &&
    !allOnPageSelected;

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(subscribers.map((s) => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDeleteSingle = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/admin/newsletters/${deleteConfirm}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(deleteConfirm);
          return next;
        });
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setBulkDeleting(true);
    try {
      const res = await apiFetch('/api/admin/newsletters', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (res.ok) {
        setSelectedIds(new Set());
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error bulk deleting subscribers:', error);
    } finally {
      setBulkDeleting(false);
      setBulkDeleteConfirm(false);
    }
  };

  const exportCSV = async () => {
    try {
      const token = getAdminToken();
      const res = await fetch(apiUrl('/api/admin/newsletters/export'), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const sendCampaign = async () => {
    if (!campaignSubject.trim() || !campaignBody.trim()) return;
    if (sendTestOnly && !campaignTestEmail.trim()) return;

    try {
      setSendingCampaign(true);
      setCampaignResult(null);

      const res = await apiFetch('/api/admin/newsletters/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: campaignSubject.trim(),
          body: campaignBody.trim(),
          html: `<div style="font-family:sans-serif;line-height:1.6">${campaignBody.trim().replace(/\n/g, '<br>')}</div>`,
          ...(sendTestOnly ? { testEmail: campaignTestEmail.trim() } : {}),
          ...(selectedIds.size > 0 && !sendTestOnly ? { subscriberIds: Array.from(selectedIds) } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCampaignResult(data.error || 'Campaign failed');
        return;
      }

      setCampaignResult(data.message || `Sent to ${data.sent} recipient(s)`);
      if (data.failed > 0) {
        setCampaignResult(`${data.message}. ${data.failed} failed.`);
      }
    } catch (error) {
      console.error('Campaign error:', error);
      setCampaignResult('Network error while sending campaign');
    } finally {
      setSendingCampaign(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">
            Newsletter Subscribers
          </h2>
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1"
          >
            {total}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCampaignOpen(true);
              setCampaignResult(null);
            }}
            className="gap-2 border-border"
          >
            <Send className="h-4 w-4" />
            Send campaign
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="gap-2 border-border"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setBulkDeleteConfirm(true)}
            disabled={selectedIds.size === 0}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Bulk Delete
            {selectedIds.size > 0 && (
              <Badge className="bg-white/20 text-white ml-1 px-1.5 py-0 h-5 text-[10px]">
                {selectedIds.size}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-muted/30 max-w-md"
        />
      </div>

      {/* Subscribers List */}
      {loading ? (
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-12 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : subscribers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {search
                ? 'No subscribers match your search'
                : 'No newsletter subscribers yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Select All Bar */}
          <div className="flex items-center gap-3 px-1">
            <Checkbox
              checked={allOnPageSelected}
              ref={(el) => {
                if (el) {
                  (el as unknown as HTMLButtonElement).dataset.state = someOnPageSelected
                    ? 'indeterminate'
                    : allOnPageSelected
                      ? 'checked'
                      : 'unchecked';
                }
              }}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              {allOnPageSelected
                ? 'All on this page selected'
                : someOnPageSelected
                  ? `${selectedIds.size} selected`
                  : 'Select all on this page'}
            </span>
          </div>

          {/* Subscriber Cards */}
          <div className="grid gap-2">
            {subscribers.map((subscriber) => (
              <Card
                key={subscriber.id}
                className={`border-border/50 hover:border-border transition-colors ${
                  selectedIds.has(subscriber.id) ? 'bg-blue-500/5 border-blue-500/30' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <Checkbox
                      checked={selectedIds.has(subscriber.id)}
                      onCheckedChange={() => toggleSelect(subscriber.id)}
                    />

                    {/* Email Icon + Email */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
                        <Mail className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {subscriber.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Subscribed {formatDate(subscriber.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant="outline"
                      className={`shrink-0 text-[11px] ${
                        subscriber.active
                          ? 'bg-green-500/10 text-green-600 border-green-500/20'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                      }`}
                    >
                      {subscriber.active ? 'Active' : 'Inactive'}
                    </Badge>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => setDeleteConfirm(subscriber.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, total)} of {total}
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show first, last, current, and neighbors
                    if (p === 1 || p === totalPages) return true;
                    if (Math.abs(p - page) <= 1) return true;
                    return false;
                  })
                  .reduce<(number | string)[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                      acc.push('...');
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    typeof p === 'string' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-sm text-muted-foreground"
                      >
                        ...
                      </span>
                    ) : (
                      <Button
                        key={p}
                        variant={page === p ? 'default' : 'outline'}
                        size="icon"
                        className={`h-8 w-8 ${
                          page === p
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : ''
                        }`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    )
                  )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Single Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Subscriber
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to remove this subscriber? This action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSingle}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation */}
      <Dialog
        open={bulkDeleteConfirm}
        onOpenChange={() => setBulkDeleteConfirm(false)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Bulk Delete Subscribers
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">
              {selectedIds.size}
            </span>{' '}
            selected subscriber{selectedIds.size > 1 ? 's' : ''}? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setBulkDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
            >
              {bulkDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete {selectedIds.size} Subscriber
              {selectedIds.size > 1 ? 's' : ''}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={campaignOpen} onOpenChange={setCampaignOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-500" />
              Send newsletter campaign
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-subject">Subject</Label>
              <Input
                id="campaign-subject"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
                placeholder="Campaign subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-body">Message</Label>
              <Textarea
                id="campaign-body"
                value={campaignBody}
                onChange={(e) => setCampaignBody(e.target.value)}
                rows={6}
                placeholder="Write your newsletter message..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="send-test"
                checked={sendTestOnly}
                onCheckedChange={(checked) => setSendTestOnly(checked === true)}
              />
              <Label htmlFor="send-test" className="text-sm font-normal">
                Send test email only
              </Label>
            </div>
            {sendTestOnly && (
              <div className="space-y-2">
                <Label htmlFor="test-email">Test email address</Label>
                <Input
                  id="test-email"
                  type="email"
                  value={campaignTestEmail}
                  onChange={(e) => setCampaignTestEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            )}
            {!sendTestOnly && selectedIds.size > 0 && (
              <p className="text-xs text-muted-foreground">
                Will send to {selectedIds.size} selected subscriber(s).
              </p>
            )}
            {!sendTestOnly && selectedIds.size === 0 && (
              <p className="text-xs text-muted-foreground">
                Will send to all active subscribers.
              </p>
            )}
            {campaignResult && (
              <p className="text-sm text-muted-foreground">{campaignResult}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCampaignOpen(false)}>Cancel</Button>
              <Button
                onClick={sendCampaign}
                disabled={sendingCampaign || !campaignSubject.trim() || !campaignBody.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {sendingCampaign ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
