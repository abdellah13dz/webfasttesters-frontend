'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star, Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Smartphone } from 'lucide-react';

interface Review {
  id: string;
  text: string;
  author: string;
  role: string | null;
  link: string | null;
  avatarUrl: string | null;
  appLink: string | null;
  appName: string | null;
  category: string | null;
  result: string | null;
  rating: number;
  visible: boolean;
  featured: boolean;
  caseStudy: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ReviewFormData {
  author: string;
  role: string;
  text: string;
  rating: number;
  visible: boolean;
  featured: boolean;
  caseStudy: boolean;
  sortOrder: number;
  link: string;
  avatarUrl: string;
  appLink: string;
  appName: string;
  category: string;
  result: string;
}

const emptyForm: ReviewFormData = {
  author: '',
  role: '',
  text: '',
  rating: 5,
  visible: true,
  featured: false,
  caseStudy: false,
  sortOrder: 0,
  link: '',
  avatarUrl: '',
  appLink: '',
  appName: '',
  category: '',
  result: '',
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ReviewFormData>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setDialogOpen(true);
  };

  const openEditDialog = (review: Review) => {
    setEditingId(review.id);
    setForm({
      author: review.author,
      role: review.role || '',
      text: review.text,
      rating: review.rating,
      visible: review.visible,
      featured: review.featured,
      caseStudy: review.caseStudy,
      sortOrder: review.sortOrder,
      link: review.link || '',
      avatarUrl: review.avatarUrl || '',
      appLink: review.appLink || '',
      appName: review.appName || '',
      category: review.category || '',
      result: review.result || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.author.trim() || !form.text.trim()) return;

    try {
      setSaving(true);
      const payload = {
        text: form.text.trim(),
        author: form.author.trim(),
        role: form.role.trim() || null,
        rating: form.rating,
        visible: form.visible,
        featured: form.featured,
        caseStudy: form.caseStudy,
        sortOrder: form.sortOrder,
        link: form.link.trim() || null,
        avatarUrl: form.avatarUrl.trim() || null,
        appLink: form.appLink.trim() || null,
        appName: form.appName.trim() || null,
        category: form.category.trim() || null,
        result: form.result.trim() || null,
      };

      if (editingId) {
        const res = await apiFetch(`/api/admin/reviews/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update review');
      } else {
        const res = await apiFetch('/api/admin/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create review');
      }

      setDialogOpen(false);
      setForm({ ...emptyForm });
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (review: Review) => {
    try {
      const res = await apiFetch(`/api/admin/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !review.visible }),
      });
      if (!res.ok) throw new Error('Failed to toggle visibility');
      fetchReviews();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      setDeleting(true);
      const res = await apiFetch(`/api/admin/reviews/${deleteConfirmId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete review');
      setDeleteConfirmId(null);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setDeleting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform disabled:opacity-100`}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-none text-muted-foreground/30'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reviews Manager</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <Badge variant="outline" className="border-border text-muted-foreground px-3 py-1">
          Total: {reviews.length}
        </Badge>
        <Badge variant="outline" className="border-green-500/30 text-green-600 dark:text-green-400 px-3 py-1">
          <Eye className="h-3 w-3 mr-1" />
          Visible: {reviews.filter((r) => r.visible).length}
        </Badge>
        <Badge variant="outline" className="border-orange-500/30 text-orange-600 dark:text-orange-400 px-3 py-1">
          <EyeOff className="h-3 w-3 mr-1" />
          Hidden: {reviews.filter((r) => !r.visible).length}
        </Badge>
        <Badge variant="outline" className="border-violet-500/30 text-violet-600 dark:text-violet-400 px-3 py-1">
          Case studies: {reviews.filter((r) => r.caseStudy).length}
        </Badge>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Star className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground font-medium">No reviews yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Add your first review to get started
            </p>
            <Button
              onClick={openAddDialog}
              variant="outline"
              className="mt-4 border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className={`border-border/50 transition-all hover:shadow-md ${
                !review.visible ? 'opacity-60' : ''
              }`}
            >
              <CardContent className="p-5 space-y-4">
                {/* Star rating */}
                <div className="flex items-center justify-between">
                  {renderStars(review.rating)}
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0 h-5 ${
                      review.visible
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                        : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
                    }`}
                  >
                    {review.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                  {review.featured && (
                    <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 bg-blue-500/10 text-blue-600 border-blue-500/20">
                      Featured
                    </Badge>
                  )}
                  {review.caseStudy && (
                    <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 bg-violet-500/10 text-violet-600 border-violet-500/20">
                      Case study
                    </Badge>
                  )}
                </div>

                {/* Review text */}
                <p className="text-sm text-foreground leading-relaxed">
                  &ldquo;{truncateText(review.text)}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-2">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.author}
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs shrink-0">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground truncate">
                        {review.author}
                      </p>
                      {review.link && (
                        <a
                          href={review.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-blue-400 hover:text-blue-500 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    {review.role && (
                      <p className="text-xs text-muted-foreground truncate">
                        {review.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* App Link info */}
                {review.appLink && (
                  <a
                    href={review.appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-blue-500/5 border border-blue-500/10 px-2.5 py-1.5 hover:bg-blue-500/10 transition-colors group/app"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Smartphone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
                      {review.appName || 'View App'}
                    </span>
                    <ExternalLink className="h-3 w-3 text-blue-400/50 group-hover/app:text-blue-400 shrink-0 ml-auto" />
                  </a>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={review.visible}
                      onCheckedChange={() => toggleVisibility(review)}
                      className="data-[state=checked]:bg-blue-500"
                    />
                    <span className="text-xs text-muted-foreground">
                      {review.visible ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                      onClick={() => openEditDialog(review)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteConfirmId(review.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingId ? 'Edit Review' : 'Add Review'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            {/* Author name */}
            <div className="space-y-2">
              <Label htmlFor="review-author" className="text-sm font-medium text-foreground">
                Author Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="review-author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. John Doe"
                className="bg-muted/30"
              />
            </div>

            {/* Role/Title */}
            <div className="space-y-2">
              <Label htmlFor="review-role" className="text-sm font-medium text-foreground">
                Role / Title
              </Label>
              <Input
                id="review-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Creator of MyApp"
                className="bg-muted/30"
              />
            </div>

            {/* Author Link */}
            <div className="space-y-2">
              <Label htmlFor="review-link" className="text-sm font-medium text-foreground">
                Author Link
              </Label>
              <Input
                id="review-link"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="e.g. https://example.com"
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Optional URL to the author&apos;s app or profile
              </p>
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <Label htmlFor="review-avatar" className="text-sm font-medium text-foreground">
                Avatar URL
              </Label>
              <Input
                id="review-avatar"
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                placeholder="e.g. https://example.com/avatar.jpg"
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Optional URL to the author&apos;s avatar image
              </p>
            </div>

            {/* App Name */}
            <div className="space-y-2">
              <Label htmlFor="review-app-name" className="text-sm font-medium text-foreground">
                App Name
              </Label>
              <Input
                id="review-app-name"
                value={form.appName}
                onChange={(e) => setForm({ ...form, appName: e.target.value })}
                placeholder="e.g. My Awesome App"
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Name of the app being reviewed
              </p>
            </div>

            {/* App Link */}
            <div className="space-y-2">
              <Label htmlFor="review-app-link" className="text-sm font-medium text-foreground">
                App Link
              </Label>
              <Input
                id="review-app-link"
                value={form.appLink}
                onChange={(e) => setForm({ ...form, appLink: e.target.value })}
                placeholder="e.g. https://play.google.com/store/apps/details?id=..."
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Link to the app on Google Play Store or other platform
              </p>
            </div>

            {/* Case study fields */}
            <div className="space-y-2">
              <Label htmlFor="review-category" className="text-sm font-medium text-foreground">
                App Category
              </Label>
              <Input
                id="review-category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Finance, Productivity"
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Used on case study cards (homepage success stories and case studies page)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-result" className="text-sm font-medium text-foreground">
                Outcome / Result
              </Label>
              <Input
                id="review-result"
                value={form.result}
                onChange={(e) => setForm({ ...form, result: e.target.value })}
                placeholder="e.g. Production access granted in 16 days"
                className="bg-muted/30"
              />
              <p className="text-xs text-muted-foreground">
                Short outcome headline shown on case study cards
              </p>
            </div>

            {/* Review text */}
            <div className="space-y-2">
              <Label htmlFor="review-text" className="text-sm font-medium text-foreground">
                Review Text <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="review-text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Enter the review text..."
                rows={4}
                className="bg-muted/30 resize-none"
              />
            </div>

            {/* Rating selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Rating
              </Label>
              <div className="flex items-center gap-3">
                {renderStars(form.rating, true, (r) => setForm({ ...form, rating: r }))}
                <span className="text-sm text-muted-foreground font-medium">
                  {form.rating}/5
                </span>
              </div>
            </div>

            {/* Visible toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-foreground">
                  Visible on site
                </Label>
                <p className="text-xs text-muted-foreground">
                  {form.visible
                    ? 'This review is publicly visible'
                    : 'This review is hidden from the public'}
                </p>
              </div>
              <Switch
                checked={form.visible}
                onCheckedChange={(checked) => setForm({ ...form, visible: checked })}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-foreground">
                  Featured on homepage
                </Label>
                <p className="text-xs text-muted-foreground">
                  Show in the homepage &ldquo;Trusted by Developers&rdquo; reviews section
                </p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) => setForm({ ...form, featured: checked, ...(checked ? { caseStudy: false } : {}) })}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-foreground">
                  Case study
                </Label>
                <p className="text-xs text-muted-foreground">
                  Show on homepage success stories and the case studies page (not in featured reviews)
                </p>
              </div>
              <Switch
                checked={form.caseStudy}
                onCheckedChange={(checked) => setForm({ ...form, caseStudy: checked, ...(checked ? { featured: false } : {}) })}
                className="data-[state=checked]:bg-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-order">Homepage sort order</Label>
              <Input
                id="sort-order"
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 0 })}
              />
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!form.author.trim() || !form.text.trim() || saving}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Saving...
                  </>
                ) : editingId ? (
                  'Update Review'
                ) : (
                  'Create Review'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Delete Review</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this review? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
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
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
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
