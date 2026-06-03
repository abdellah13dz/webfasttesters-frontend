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
import { Plus, Pencil, Trash2, Loader2, HelpCircle } from 'lucide-react';
import type { FaqItem } from '@/lib/cms';

const iconOptions = ['Smartphone', 'Users', 'CreditCard', 'Shield', 'Clock', 'CheckCircle2', 'Globe', 'Lock', 'HelpCircle'];

export default function AdminFaq() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState({ category: 'General', question: '', answer: '', icon: 'HelpCircle', sortOrder: 0, published: true });

  const load = async () => {
    try {
      const res = await apiFetch('/api/admin/faq');
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ category: 'General', question: '', answer: '', icon: 'HelpCircle', sortOrder: items.length, published: true });
    setOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditing(item);
    setForm({ category: item.category, question: item.question, answer: item.answer, icon: item.icon || 'HelpCircle', sortOrder: item.sortOrder, published: item.published });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/faq/${editing.id}` : '/api/admin/faq';
      const res = await apiFetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    if (!confirm('Delete this FAQ item?')) return;
    await apiFetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
    load();
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2"><HelpCircle className="h-5 w-5 text-blue-500" />FAQ Management</h2>
          <p className="text-sm text-muted-foreground">Questions shown on the public FAQ page.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-500 hover:bg-blue-600 text-white"><Plus className="h-4 w-4 mr-2" />Add item</Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="outline">{item.category}</Badge>
                  {!item.published && <Badge variant="secondary">Draft</Badge>}
                  <span className="text-xs text-muted-foreground">Order: {item.sortOrder}</span>
                </div>
                <p className="font-medium text-foreground">{item.question}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.answer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit FAQ' : 'New FAQ item'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 0 })} /></div>
            </div>
            <div className="space-y-2"><Label>Icon</Label>
              <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{iconOptions.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Question</Label><Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></div>
            <div className="space-y-2"><Label>Answer</Label><Textarea rows={5} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.published} onCheckedChange={(c) => setForm({ ...form, published: c })} /><Label>Published</Label></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={save} disabled={saving || !form.question.trim() || !form.answer.trim()} className="bg-blue-500 hover:bg-blue-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
