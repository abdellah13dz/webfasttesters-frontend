'use client';

import { apiFetch } from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Loader2, Rocket } from 'lucide-react';
import type { ChangelogEntry } from '@/lib/cms';
import { parseChangelogTags } from '@/lib/cms';

const iconOptions = ['Sparkles', 'Zap', 'Bug', 'LayoutDashboard', 'Gift', 'Globe', 'Rocket', 'Users'];
const tagOptions = ['newFeature', 'improvement', 'bugFix'];

export default function AdminChangelog() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ChangelogEntry | null>(null);
  const [form, setForm] = useState({ version: '', title: '', description: '', tags: ['newFeature'] as string[], icon: 'Sparkles', publishedAt: new Date().toISOString().slice(0, 10), sortOrder: 0, published: true });

  const load = async () => {
    try {
      const res = await apiFetch('/api/admin/changelog');
      if (res.ok) setEntries(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ version: '', title: '', description: '', tags: ['newFeature'], icon: 'Sparkles', publishedAt: new Date().toISOString().slice(0, 10), sortOrder: entries.length, published: true });
    setOpen(true);
  };

  const openEdit = (entry: ChangelogEntry) => {
    setEditing(entry);
    setForm({
      version: entry.version,
      title: entry.title,
      description: entry.description,
      tags: parseChangelogTags(entry.tags),
      icon: entry.icon,
      publishedAt: entry.publishedAt.slice(0, 10),
      sortOrder: entry.sortOrder,
      published: entry.published,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/changelog/${editing.id}` : '/api/admin/changelog';
      const res = await apiFetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, publishedAt: new Date(form.publishedAt).toISOString() }),
      });
      if (res.ok) {
        setOpen(false);
        load();
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this changelog entry?')) return;
    await apiFetch(`/api/admin/changelog/${id}`, { method: 'DELETE' });
    load();
  };

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2"><Rocket className="h-5 w-5 text-blue-500" />Changelog</h2>
          <p className="text-sm text-muted-foreground">Release notes on the public changelog page.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-500 hover:bg-blue-600 text-white"><Plus className="h-4 w-4 mr-2" />Add entry</Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="outline">{entry.version}</Badge>
                  {!entry.published && <Badge variant="secondary">Draft</Badge>}
                  {parseChangelogTags(entry.tags).map((tag) => <Badge key={tag} className="text-xs">{tag}</Badge>)}
                </div>
                <p className="font-medium">{entry.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{entry.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(entry)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => remove(entry.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit entry' : 'New changelog entry'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Version</Label><Input value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} placeholder="v2.4.0" /></div>
              <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="space-y-2"><Label>Icon</Label>
              <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{iconOptions.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Tags</Label>
              <div className="flex flex-wrap gap-2">{tagOptions.map((tag) => (
                <Button key={tag} type="button" size="sm" variant={form.tags.includes(tag) ? 'default' : 'outline'} onClick={() => toggleTag(tag)}>{tag}</Button>
              ))}</div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.published} onCheckedChange={(c) => setForm({ ...form, published: c })} /><Label>Published</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={save} disabled={saving || !form.version || !form.title || !form.description} className="bg-blue-500 hover:bg-blue-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
