'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Pencil, Check, Loader2, Plus, X, Star, Shield } from 'lucide-react';
import { parsePlanFeatures } from '@/lib/pricing';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string | null;
  features: string;
  popular: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({
    name: '',
    price: 0,
    currency: 'USD',
    period: 'one-time',
    description: '',
    features: [''] as string[],
    popular: false,
    active: true,
  });

  const fetchPlans = async () => {
    try {
      const res = await apiFetch('/api/admin/pricing');
      if (res.ok) {
        const data = await res.json();
        setPlans(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const openEdit = (plan: PricingPlan) => {
    setEditing(plan.id);
    setShowNew(false);
    setForm({
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      period: plan.period,
      description: plan.description || '',
      features: parsePlanFeatures(plan.features || '[]'),
      popular: plan.popular,
      active: plan.active,
    });
  };

  const openNew = () => {
    setShowNew(true);
    setEditing(null);
    setForm({
      name: '',
      price: 0,
      currency: 'USD',
      period: 'one-time',
      description: '',
      features: [''],
      popular: false,
      active: true,
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setShowNew(false);
  };

  const handleSave = async (id?: string) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        features: JSON.stringify(form.features.filter(f => f.trim())),
      };

      const url = id ? `/api/admin/pricing/${id}` : '/api/admin/pricing';
      const method = id ? 'PUT' : 'POST';

      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditing(null);
        setShowNew(false);
        fetchPlans();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;
    try {
      await apiFetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
      fetchPlans();
    } catch (e) {
      console.error(e);
    }
  };

  const addFeature = () => setForm(f => ({ ...f, features: [...f.features, ''] }));
  const removeFeature = (idx: number) => setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  const updateFeature = (idx: number, value: string) => setForm(f => ({ ...f, features: f.features.map((feat, i) => i === idx ? value : feat) }));

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-8"><div className="h-40 bg-muted rounded" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pricing Plans</h2>
          <p className="text-muted-foreground text-sm">Manage your pricing plans</p>
        </div>
        <Button onClick={openNew} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* New Plan Form */}
      {showNew && (
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-lg">New Pricing Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PricingForm form={form} setForm={setForm} addFeature={addFeature} removeFeature={removeFeature} updateFeature={updateFeature} />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
              <Button onClick={() => handleSave()} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Create Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Plans */}
      {plans.map(plan => (
        <Card key={plan.id} className={`border-border/50 ${editing === plan.id ? 'border-blue-500/30' : ''}`}>
          <CardContent className="p-6">
            {editing === plan.id ? (
              <div className="space-y-4">
                <PricingForm form={form} setForm={setForm} addFeature={addFeature} removeFeature={removeFeature} updateFeature={updateFeature} />
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                  <Button onClick={() => handleSave(plan.id)} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
                    {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Update Plan
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Plan Preview */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10">
                      <DollarSign className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                        <span className="text-muted-foreground text-sm">{plan.period}</span>
                      </div>
                    </div>
                    {plan.popular && (
                      <Badge className="bg-blue-500 text-white ml-2">Most Popular</Badge>
                    )}
                    {!plan.active && (
                      <Badge variant="outline" className="text-red-500 border-red-500/20">Inactive</Badge>
                    )}
                  </div>

                  {plan.description && (
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    {parsePlanFeatures(plan.features || '[]').map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:items-end">
                  <Button variant="outline" size="sm" onClick={() => openEdit(plan)}>
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(plan.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {plans.length === 0 && !showNew && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <DollarSign className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No pricing plans yet</p>
            <Button onClick={openNew} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PricingForm({ form, setForm, addFeature, removeFeature, updateFeature }: {
  form: any;
  setForm: any;
  addFeature: () => void;
  removeFeature: (idx: number) => void;
  updateFeature: (idx: number, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Plan Name</Label>
          <Input value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Android Apps" className="bg-muted/30" />
        </div>
        <div className="space-y-2">
          <Label>Price ($)</Label>
          <Input type="number" value={form.price} onChange={e => setForm((f: any) => ({ ...f, price: parseFloat(e.target.value) || 0 }))} placeholder="15" className="bg-muted/30" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Currency</Label>
          <Input value={form.currency} onChange={e => setForm((f: any) => ({ ...f, currency: e.target.value }))} placeholder="USD" className="bg-muted/30" />
        </div>
        <div className="space-y-2">
          <Label>Period</Label>
          <Input value={form.period} onChange={e => setForm((f: any) => ({ ...f, period: e.target.value }))} placeholder="one-time" className="bg-muted/30" />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input value={form.description} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} placeholder="Brief plan description" className="bg-muted/30" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Features</Label>
          <Button variant="outline" size="sm" onClick={addFeature}>
            <Plus className="h-3 w-3 mr-1" /> Add Feature
          </Button>
        </div>
        {form.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-blue-500 shrink-0" />
            <Input
              value={feature}
              onChange={e => updateFeature(idx, e.target.value)}
              placeholder="Feature description"
              className="bg-muted/30"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeFeature(idx)}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch checked={form.popular} onCheckedChange={v => setForm((f: any) => ({ ...f, popular: v }))} />
          <Label className="text-sm">Mark as Popular</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={form.active} onCheckedChange={v => setForm((f: any) => ({ ...f, active: v }))} />
          <Label className="text-sm">Active</Label>
        </div>
      </div>
    </div>
  );
}
