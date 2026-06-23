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
  Mail,
  Reply,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'closed';
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  data: Contact[];
  total: number;
  page: number;
  pageSize: number;
}

type StatusFilter = 'all' | 'pending' | 'replied' | 'closed';

// ---------------------------------------------------------------------------
// Status configuration
// ---------------------------------------------------------------------------

const statusConfig: Record<string, { label: string; icon: React.ElementType; badgeClass: string; dotClass: string }> = {
  pending: {
    label: 'Pending',
    icon: Clock,
    badgeClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    dotClass: 'bg-orange-500',
  },
  replied: {
    label: 'Replied',
    icon: CheckCircle2,
    badgeClass: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    dotClass: 'bg-green-500',
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    badgeClass: 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20',
    dotClass: 'bg-gray-500',
  },
};

const filterTabs: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'replied', label: 'Replied' },
  { id: 'closed', label: 'Closed' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
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
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminContacts() {
  // Data state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter & pagination state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyContact, setReplyContact] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState<string>('replied');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState<{ type: 'success' | 'warning'; message: string } | null>(null);

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single'; id: string } | { type: 'bulk' } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Status change state
  const [statusChangeLoading, setStatusChangeLoading] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Debounced search
  // -------------------------------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // -------------------------------------------------------------------------
  // Fetch contacts
  // -------------------------------------------------------------------------

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      const res = await apiFetch(`/api/admin/contacts?${params.toString()}`);
      if (res.ok) {
        const data: ContactsResponse = await res.json();
        setContacts(data.data || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Reset page & selection when filter changes
  useEffect(() => {
    setPage(1);
    setSelectedIds(new Set());
  }, [statusFilter]);

  // -------------------------------------------------------------------------
  // Stats computation
  // -------------------------------------------------------------------------

  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await apiFetch('/api/admin/contacts?pageSize=1000');
        if (res.ok) {
          const data: ContactsResponse = await res.json();
          setAllContacts(data.data || []);
        }
      } catch {
        // silently ignore
      }
    };
    fetchAll();
  }, [fetchContacts]);

  const stats = {
    pending: allContacts.filter((c) => c.status === 'pending').length,
    replied: allContacts.filter((c) => c.status === 'replied').length,
    closed: allContacts.filter((c) => c.status === 'closed').length,
  };

  // -------------------------------------------------------------------------
  // Filtered contacts by search
  // -------------------------------------------------------------------------

  const filteredContacts = searchDebounced
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(searchDebounced.toLowerCase()) ||
          c.email.toLowerCase().includes(searchDebounced.toLowerCase()) ||
          c.subject.toLowerCase().includes(searchDebounced.toLowerCase())
      )
    : contacts;

  // -------------------------------------------------------------------------
  // Pagination
  // -------------------------------------------------------------------------

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // -------------------------------------------------------------------------
  // Selection handlers
  // -------------------------------------------------------------------------

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

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredContacts.length && filteredContacts.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredContacts.map((c) => c.id)));
    }
  };

  const allSelected = filteredContacts.length > 0 && selectedIds.size === filteredContacts.length;

  // -------------------------------------------------------------------------
  // View handlers
  // -------------------------------------------------------------------------

  const openViewDialog = (contact: Contact) => {
    setViewContact(contact);
    setViewDialogOpen(true);
  };

  const openReplyFromView = () => {
    if (!viewContact) return;
    setViewDialogOpen(false);
    openReplyDialog(viewContact);
  };

  // -------------------------------------------------------------------------
  // Reply handlers
  // -------------------------------------------------------------------------

  const openReplyDialog = (contact: Contact) => {
    setReplyContact(contact);
    setReplyText(contact.reply || '');
    setReplyStatus(contact.status === 'pending' ? 'replied' : contact.status);
    setReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyContact) return;
    if (!replyText.trim()) return;

    try {
      setSendingReply(true);
      const res = await apiFetch(`/api/admin/contacts/${replyContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reply: replyText.trim(),
          status: replyStatus,
        }),
      });
      if (!res.ok) throw new Error('Failed to send reply');
      const data = await res.json();
      setReplyDialogOpen(false);
      setReplyContact(null);
      setReplyText('');
      fetchContacts();
      if (data.emailSent === false) {
        setReplyFeedback({
          type: 'warning',
          message: data.emailError || 'Reply saved, but the email could not be sent. Check SMTP settings.',
        });
      } else {
        setReplyFeedback({
          type: 'success',
          message: 'Reply saved and email sent successfully.',
        });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setSendingReply(false);
    }
  };

  // -------------------------------------------------------------------------
  // Status change handler
  // -------------------------------------------------------------------------

  const handleStatusChange = async (contact: Contact, newStatus: string) => {
    try {
      setStatusChangeLoading(contact.id);
      const res = await apiFetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusChangeLoading(null);
    }
  };

  // -------------------------------------------------------------------------
  // Delete handlers
  // -------------------------------------------------------------------------

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
        const res = await apiFetch(`/api/admin/contacts/${deleteTarget.id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete contact');
      } else {
        const res = await apiFetch('/api/admin/contacts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: Array.from(selectedIds) }),
        });
        if (!res.ok) throw new Error('Failed to bulk delete contacts');
      }

      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      setSelectedIds(new Set());
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact(s):', error);
    } finally {
      setDeleting(false);
    }
  };

  // -------------------------------------------------------------------------
  // Render: Loading
  // -------------------------------------------------------------------------

  if (loading && contacts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: Main
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {replyFeedback && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            replyFeedback.type === 'success'
              ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600'
              : 'border-amber-500/20 bg-amber-500/5 text-amber-700'
          }`}
        >
          {replyFeedback.message}
        </div>
      )}
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Contacts Manager</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage incoming contact messages and replies
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-48 sm:w-64 bg-muted/30"
            />
          </div>

          {/* Bulk Delete */}
          {selectedIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={openBulkDelete}
              className="shadow-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedIds.size})
            </Button>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Stats Row                                                         */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending */}
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>

        {/* Replied */}
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Replied</p>
              <p className="text-2xl font-bold text-foreground">{stats.replied}</p>
            </div>
          </CardContent>
        </Card>

        {/* Closed */}
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10 shrink-0">
              <XCircle className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Closed</p>
              <p className="text-2xl font-bold text-foreground">{stats.closed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Filter Tabs                                                       */}
      {/* ----------------------------------------------------------------- */}
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
              <span className="ml-1.5 text-xs opacity-70">
                ({stats[tab.id as keyof typeof stats]})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Contacts List                                                     */}
      {/* ----------------------------------------------------------------- */}
      {filteredContacts.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Mail className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-medium">No contacts found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {searchDebounced
                ? 'Try adjusting your search query'
                : statusFilter !== 'all'
                  ? `No ${statusFilter} contacts at the moment`
                  : 'Contact messages will appear here'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50 overflow-hidden">
          {/* Table header — desktop */}
          <div className="hidden md:grid md:grid-cols-[2.5rem_1fr_1fr_1fr_7rem_8.5rem] items-center gap-4 px-4 py-3 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center justify-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all contacts"
              />
            </div>
            <div>Contact</div>
            <div>Email</div>
            <div>Subject</div>
            <div className="text-center">Status</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Contact rows */}
          <div className="divide-y divide-border/50">
            {filteredContacts.map((contact) => {
              const cfg = statusConfig[contact.status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              const isSelected = selectedIds.has(contact.id);
              const isStatusLoading = statusChangeLoading === contact.id;

              return (
                <div
                  key={contact.id}
                  className={`grid grid-cols-1 md:grid-cols-[2.5rem_1fr_1fr_1fr_7rem_8.5rem] items-center gap-2 md:gap-4 px-4 py-3 transition-colors ${
                    isSelected ? 'bg-blue-500/5' : 'hover:bg-muted/30'
                  }`}
                >
                  {/* Checkbox */}
                  <div className="flex items-center md:justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(contact.id)}
                      aria-label={`Select ${contact.name}`}
                    />
                  </div>

                  {/* Name + date — mobile shows more context */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground md:hidden flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.email}
                    </p>
                  </div>

                  {/* Subject + status on mobile */}
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate">{contact.subject}</p>
                    {/* Mobile-only status + date */}
                    <div className="flex items-center gap-2 mt-1 md:hidden">
                      <Badge
                        variant="outline"
                        className={`text-[10px] h-5 px-1.5 ${cfg.badgeClass}`}
                      >
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${cfg.dotClass}`} />
                        {cfg.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Status — desktop */}
                  <div className="hidden md:flex justify-center">
                    {isStatusLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Select
                        value={contact.status}
                        onValueChange={(val) => handleStatusChange(contact, val)}
                      >
                        <SelectTrigger className="h-7 w-[7rem] text-xs border-0 bg-transparent focus:ring-0 p-0 gap-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                              Pending
                            </span>
                          </SelectItem>
                          <SelectItem value="replied">
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Replied
                            </span>
                          </SelectItem>
                          <SelectItem value="closed">
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                              Closed
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center md:justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => openViewDialog(contact)}
                      title="View message"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                      onClick={() => openReplyDialog(contact)}
                      title="Reply"
                    >
                      <Reply className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => openSingleDelete(contact.id)}
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

      {/* ----------------------------------------------------------------- */}
      {/* Pagination                                                        */}
      {/* ----------------------------------------------------------------- */}
      {total > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} contacts
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  // Show first, last, current, and neighbors
                  if (p === 1 || p === totalPages) return true;
                  if (Math.abs(p - page) <= 1) return true;
                  return false;
                })
                .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                  if (idx > 0) {
                    const prev = arr[idx - 1];
                    if (p - prev > 1) acc.push('ellipsis');
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === 'ellipsis' ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground text-sm">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={item}
                      variant={page === item ? 'default' : 'outline'}
                      size="sm"
                      className={
                        page === item
                          ? 'h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white'
                          : 'h-8 w-8 p-0'
                      }
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </Button>
                  )
                )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* View Dialog                                                       */}
      {/* ----------------------------------------------------------------- */}
      <Dialog
        open={viewDialogOpen}
        onOpenChange={(open) => {
          setViewDialogOpen(open);
          if (!open) setViewContact(null);
        }}
      >
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              Contact message
            </DialogTitle>
          </DialogHeader>

          {viewContact && (
            <div className="space-y-4 pt-2">
              <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{viewContact.name}</p>
                  <Badge
                    variant="outline"
                    className={`text-[10px] h-5 px-1.5 ${(statusConfig[viewContact.status] || statusConfig.pending).badgeClass}`}
                  >
                    {(statusConfig[viewContact.status] || statusConfig.pending).label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground break-all">{viewContact.email}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDateTime(viewContact.createdAt)}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Subject</Label>
                <p className="text-sm text-foreground rounded-lg border border-border/50 bg-muted/20 p-3">
                  {viewContact.subject || '—'}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Message</Label>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/20 p-3 min-h-[4rem]">
                  {viewContact.message}
                </p>
              </div>

              {viewContact.reply && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Your reply</Label>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {viewContact.reply}
                    </p>
                    {viewContact.repliedAt && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        Replied {formatDateTime(viewContact.repliedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={openReplyFromView}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* Reply Dialog                                                      */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Reply className="h-4 w-4 text-blue-500" />
              Reply to {replyContact?.name}
            </DialogTitle>
          </DialogHeader>

          {replyContact && (
            <div className="space-y-5 pt-2">
              {/* Original message */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Original Message
                </Label>
                <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{replyContact.email}</span>
                    <span className="text-border">|</span>
                    <span>{replyContact.subject}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {replyContact.message}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDateTime(replyContact.createdAt)}
                  </p>
                </div>
              </div>

              {/* Existing reply */}
              {replyContact.reply && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Previous Reply
                  </Label>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {replyContact.reply}
                    </p>
                    {replyContact.repliedAt && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        Replied {formatDateTime(replyContact.repliedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Reply textarea */}
              <div className="space-y-2">
                <Label htmlFor="reply-text" className="text-sm font-medium text-foreground">
                  Reply <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="reply-text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                  className="bg-muted/30 resize-none"
                />
              </div>

              {/* Status selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Status
                </Label>
                <Select value={replyStatus} onValueChange={setReplyStatus}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="replied">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Replied
                      </span>
                    </SelectItem>
                    <SelectItem value="closed">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gray-500" />
                        Closed
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setReplyDialogOpen(false)}
                  disabled={sendingReply}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || sendingReply}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  {sendingReply ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ----------------------------------------------------------------- */}
      {/* Delete Confirmation Dialog                                        */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={deleteDialogOpen} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              {deleteTarget?.type === 'bulk' ? 'Delete Selected Contacts' : 'Delete Contact'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {deleteTarget?.type === 'bulk' ? (
              <>
                Are you sure you want to delete <strong>{selectedIds.size}</strong> selected contact(s)?
                This action cannot be undone.
              </>
            ) : (
              'Are you sure you want to delete this contact? This action cannot be undone.'
            )}
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
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
