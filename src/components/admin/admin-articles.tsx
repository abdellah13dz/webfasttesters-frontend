'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  FileText,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  Star,
  Loader2,
} from 'lucide-react';

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
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  published: 'bg-green-500/10 text-green-500 border-green-500/20',
  draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  hidden: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminArticles() {
  const { navigate } = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchArticles = async () => {
    try {
      const url = statusFilter === 'all' ? '/api/admin/articles' : `/api/admin/articles?status=${statusFilter}`;
      const res = await apiFetch(url);
      if (res.ok) {
        const data = await res.json();
        setArticles(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, [statusFilter]);

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await apiFetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      setDeleteConfirm(null);
      fetchArticles();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (article: Article, newStatus: string) => {
    try {
      await apiFetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchArticles();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Articles</h2>
          <p className="text-muted-foreground text-sm">Manage your blog articles and guides</p>
        </div>
        <Button onClick={() => navigate('/admin/articles/new')} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-muted/30"
          />
        </div>
        <div className="flex gap-1.5">
          {['all', 'published', 'draft', 'hidden'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                statusFilter === s
                  ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                  : 'text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No articles found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map(article => (
            <Card key={article.id} className="border-border/50 hover:border-border transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-muted/50 overflow-hidden shrink-0">
                    {article.coverImage ? (
                      <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-foreground truncate">{article.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{article.description}</p>
                      </div>
                      <Badge variant="outline" className={statusColors[article.status] || ''}>
                        {article.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
                      {article.featured && (
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px]">
                          <Star className="h-2.5 w-2.5 mr-0.5" /> Featured
                        </Badge>
                      )}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {article.status !== 'published' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(article, 'published')} title="Publish">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {article.status === 'published' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(article, 'hidden')} title="Hide">
                        <EyeOff className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/admin/articles/edit/' + article.id)} title="Edit">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(article.id)} title="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">Are you sure you want to delete this article? This action cannot be undone.</p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} disabled={deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
