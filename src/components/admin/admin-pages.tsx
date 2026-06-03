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
import { Plus, Pencil, Trash2, Loader2, FileText } from 'lucide-react';
import type { CmsPage } from '@/lib/cms';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminPages() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CmsPage | null>(null);
  const [form, setForm] = useState({
    slug: '',
    title: '',
    content: '',
    pageType: 'content',
    status: 'published',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogImage: '',
  });

  const load = async () => {
    try {
      const res = await apiFetch('/api/admin/pages');
      if (res.ok) setPages(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ slug: '', title: '', content: '', pageType: 'legal', status: 'published', seoTitle: '', seoDescription: '', seoKeywords: '', ogImage: '' });
    setOpen(true);
  };

  const openEdit = (page: CmsPage) => {
    setEditing(page);
    setForm({
      slug: page.slug,
      title: page.title,
      content: page.content,
      pageType: page.pageType,
      status: page.status,
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      seoKeywords: page.seoKeywords || '',
      ogImage: page.ogImage || '',
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
        seoKeywords: form.seoKeywords || null,
        ogImage: form.ogImage || null,
      };
      const url = editing ? `/api/admin/pages/${editing.id}` : '/api/admin/pages';
      const res = await apiFetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setOpen(false);
        load();
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-blue-500" />CMS Pages</h2>
          <p className="text-sm text-muted-foreground">Legal and content pages (markdown). Slug maps to site route.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-500 hover:bg-blue-600 text-white"><Plus className="h-4 w-4 mr-2" />Add page</Button>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-4 flex justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="outline">/{page.slug}</Badge>
                  <Badge variant="secondary">{page.pageType}</Badge>
                  {page.status !== 'published' && <Badge>Draft</Badge>}
                </div>
                <p className="font-medium">{page.title}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(page)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={async () => { if (confirm('Delete page?')) { await apiFetch(`/api/admin/pages/${page.id}`, { method: 'DELETE' }); load(); } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit page' : 'New page'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Type</Label><Select value={form.pageType} onValueChange={(v) => setForm({ ...form, pageType: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="legal">Legal</SelectItem><SelectItem value="content">Content</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Status</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Content (Markdown)</Label><Textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
            <div className="space-y-2"><Label>SEO title</Label><Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} /></div>
            <div className="space-y-2"><Label>SEO description</Label><Textarea rows={2} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>SEO keywords</Label><Input value={form.seoKeywords} onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })} /></div>
              <div className="space-y-2"><Label>OG image URL</Label><Input value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} /></div>
            </div>
            <Button onClick={save} disabled={saving || !form.slug || !form.title} className="w-full bg-blue-500 hover:bg-blue-600 text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save page'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
