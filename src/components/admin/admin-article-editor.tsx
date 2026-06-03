'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
} from 'lucide-react';
import TiptapEditor from '@/components/admin/tiptap-editor';

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  category: string;
  status: string;
  readTime: string;
  featured: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  createdAt: string;
  updatedAt: string;
}

const categories = ['GOOGLE PLAY', 'APP TESTING', 'BETA TESTING', 'CLOSED TESTING', 'APP REJECTION', 'INTERNATIONAL', 'PUBLISHING'];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface AdminArticleEditorProps {
  articleId?: string; // If provided, we're editing; otherwise creating new
}

export default function AdminArticleEditor({ articleId }: AdminArticleEditorProps) {
  const { navigate } = useRouter();
  const isEditing = !!articleId;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    coverImage: '',
    category: 'GOOGLE PLAY',
    status: 'draft',
    readTime: '5 min read',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Fetch article data if editing
  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const res = await apiFetch(`/api/admin/articles/${articleId}`);
        if (res.ok) {
          const article: Article = await res.json();
          setForm({
            title: article.title,
            slug: article.slug,
            description: article.description,
            content: article.content,
            coverImage: article.coverImage || '',
            category: article.category,
            status: article.status,
            readTime: article.readTime,
            featured: article.featured,
            seoTitle: article.seoTitle || '',
            seoDescription: article.seoDescription || '',
            seoKeywords: article.seoKeywords || '',
          });
        } else {
          setError('Article not found');
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      slug: slugManuallyEdited ? f.slug : slugify(title),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setSlugManuallyEdited(true);
    setForm(f => ({ ...f, slug }));
  };

  const handleContentChange = (html: string) => {
    setForm(f => ({ ...f, content: html }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
        seoKeywords: form.seoKeywords || null,
      };

      const url = isEditing ? `/api/admin/articles/${articleId}` : '/api/admin/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate('/admin/articles');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to save article');
      }
    } catch (e) {
      console.error(e);
      setError('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/articles');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error && isEditing && !form.title) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleCancel} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Button>
        <Card className="border-destructive/50">
          <CardContent className="p-12 text-center">
            <FileText className="h-10 w-10 text-destructive mx-auto mb-3" />
            <p className="text-destructive font-medium">{error}</p>
            <Button variant="outline" onClick={handleCancel} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleCancel} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'New Article'}</h2>
            <p className="text-muted-foreground text-sm">
              {isEditing ? 'Update article content and settings' : 'Create a new blog article'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {isEditing ? 'Update Article' : 'Create Article'}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Enter article title..."
                  className="bg-muted/30 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-medium">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={e => handleSlugChange(e.target.value)}
                  placeholder="article-url-slug"
                  className="bg-muted/30"
                />
                <p className="text-xs text-muted-foreground">URL-friendly identifier. Auto-generated from title.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief article description..."
                  className="bg-muted/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-0">
              <TiptapEditor
                content={form.content}
                onChange={handleContentChange}
                placeholder="Start writing your article content..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Settings */}
        <div className="space-y-6">
          {/* Status & Visibility */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px]">Draft</Badge>
                      </span>
                    </SelectItem>
                    <SelectItem value="published">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">Published</Badge>
                      </span>
                    </SelectItem>
                    <SelectItem value="hidden">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">Hidden</Badge>
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Featured</Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={form.featured}
                    onCheckedChange={v => setForm(f => ({ ...f, featured: v }))}
                  />
                  <span className="text-sm text-muted-foreground">{form.featured ? 'Featured article' : 'Not featured'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category & Read Time */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
                <Input
                  id="readTime"
                  value={form.readTime}
                  onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
                  placeholder="5 min read"
                  className="bg-muted/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-sm font-medium">Image URL</Label>
                <Input
                  id="coverImage"
                  value={form.coverImage}
                  onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                  placeholder="/images/blog/example.png"
                  className="bg-muted/30"
                />
              </div>
              {form.coverImage && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle" className="text-sm font-medium">SEO title</Label>
                <Input id="seoTitle" value={form.seoTitle} onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))} placeholder="Optional override" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription" className="text-sm font-medium">SEO description</Label>
                <Input id="seoDescription" value={form.seoDescription} onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))} placeholder="Optional override" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoKeywords" className="text-sm font-medium">SEO keywords</Label>
                <Input id="seoKeywords" value={form.seoKeywords} onChange={e => setForm(f => ({ ...f, seoKeywords: e.target.value }))} placeholder="comma, separated" className="bg-muted/30" />
              </div>
            </CardContent>
          </Card>

          {/* Save Actions (Mobile) */}
          <div className="lg:hidden flex flex-col gap-2">
            <Button onClick={handleSave} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white w-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {isEditing ? 'Update Article' : 'Create Article'}
            </Button>
            <Button variant="outline" onClick={handleCancel} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
