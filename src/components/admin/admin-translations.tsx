'use client';

import { apiFetch } from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Languages, Search } from 'lucide-react';

interface TranslationRow {
  id: string;
  locale: string;
  key: string;
  value: string;
}

const locales = ['en', 'es', 'tr', 'ar'];

export default function AdminTranslations() {
  const [items, setItems] = useState<TranslationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('en');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TranslationRow | null>(null);
  const [form, setForm] = useState({ locale: 'en', key: '', value: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ locale });
      if (search.trim()) params.set('search', search.trim());
      const res = await apiFetch(`/api/admin/translations?${params}`);
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [locale, search]);

  const save = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/translations/${editing.id}` : '/api/admin/translations';
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2"><Languages className="h-5 w-5 text-blue-500" />Translations</h2>
          <p className="text-sm text-muted-foreground">DB overrides layered on top of locale files (en/es/tr/ar).</p>
        </div>
        <Button onClick={() => { setEditing(null); setForm({ locale, key: '', value: '' }); setOpen(true); }} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />Add override
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={locale} onValueChange={setLocale}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{locales.map((l) => <SelectItem key={l} value={l}>{l.toUpperCase()}</SelectItem>)}</SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search keys or values..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id}><CardContent className="p-4 flex justify-between gap-3">
              <div className="min-w-0">
                <div className="flex gap-2 mb-1"><Badge variant="outline">{item.locale}</Badge><code className="text-xs">{item.key}</code></div>
                <p className="text-sm text-muted-foreground truncate">{item.value}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => { setEditing(item); setForm({ locale: item.locale, key: item.key, value: item.value }); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={async () => { if (confirm('Delete?')) { await apiFetch(`/api/admin/translations/${item.id}`, { method: 'DELETE' }); load(); } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent></Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? 'Edit translation' : 'New override'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2"><Label>Locale</Label>
              <Select value={form.locale} onValueChange={(v) => setForm({ ...form, locale: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{locales.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Key</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="banner.message" /></div>
            <div className="space-y-2"><Label>Value</Label><Textarea rows={3} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></div>
            <Button onClick={save} disabled={saving || !form.key || !form.value} className="w-full bg-blue-500 hover:bg-blue-600 text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
