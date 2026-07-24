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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Loader2, Activity } from 'lucide-react';
import type { StatusService, StatusIncident } from '@/lib/cms';

const serviceIcons = ['Smartphone', 'Users', 'BarChart3', 'CreditCard', 'Mail', 'Code'];
const serviceStatuses = ['operational', 'degraded', 'outage', 'maintenance'];
const incidentStatuses = ['resolved', 'investigating', 'scheduled'];

export default function AdminStatus() {
  const [services, setServices] = useState<StatusService[]>([]);
  const [incidents, setIncidents] = useState<StatusIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogType, setDialogType] = useState<'service' | 'incident' | null>(null);
  const [editingService, setEditingService] = useState<StatusService | null>(null);
  const [editingIncident, setEditingIncident] = useState<StatusIncident | null>(null);
  const [serviceForm, setServiceForm] = useState({ name: '', icon: 'Smartphone', uptime30Day: '99.99%', status: 'operational', sortOrder: 0, active: true });
  const [incidentForm, setIncidentForm] = useState({ title: '', description: '', status: 'resolved', occurredAt: new Date().toISOString().slice(0, 10), duration: '', sortOrder: 0, published: true });

  const load = async () => {
    try {
      const [sRes, iRes] = await Promise.all([
        apiFetch('/api/admin/status/services'),
        apiFetch('/api/admin/status/incidents'),
      ]);
      if (sRes.ok) setServices(await sRes.json());
      if (iRes.ok) setIncidents(await iRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const saveService = async () => {
    setSaving(true);
    try {
      const url = editingService ? `/api/admin/status/services/${editingService.id}` : '/api/admin/status/services';
      const res = await apiFetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm),
      });
      if (res.ok) {
        setDialogType(null);
        load();
      }
    } finally {
      setSaving(false);
    }
  };

  const saveIncident = async () => {
    setSaving(true);
    try {
      const url = editingIncident ? `/api/admin/status/incidents/${editingIncident.id}` : '/api/admin/status/incidents';
      const res = await apiFetch(url, {
        method: editingIncident ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...incidentForm, occurredAt: new Date(incidentForm.occurredAt).toISOString() }),
      });
      if (res.ok) {
        setDialogType(null);
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
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2"><Activity className="h-5 w-5 text-blue-500" />Status Page</h2>
        <p className="text-sm text-muted-foreground">Manage service uptime and incident history.</p>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
          <TabsTrigger value="incidents">Incidents ({incidents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4 mt-4">
          <Button onClick={() => { setEditingService(null); setServiceForm({ name: '', icon: 'Smartphone', uptime30Day: '99.99%', status: 'operational', sortOrder: services.length, active: true }); setDialogType('service'); }} className="bg-blue-500 hover:bg-blue-600 text-white"><Plus className="h-4 w-4 mr-2" />Add service</Button>
          {services.map((s) => (
            <Card key={s.id}><CardContent className="p-4 flex justify-between gap-3">
              <div><p className="font-medium">{s.name}</p><p className="text-sm text-muted-foreground">Uptime: {s.uptime30Day} · {s.status}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingService(s); setServiceForm({ name: s.name, icon: s.icon, uptime30Day: s.uptime30Day, status: s.status, sortOrder: s.sortOrder, active: s.active }); setDialogType('service'); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={async () => { if (!confirm('Delete service?')) return; try { await apiFetch(`/api/admin/status/services/${s.id}`, { method: 'DELETE' }); await load(); } catch { /* ignore */ } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4 mt-4">
          <Button onClick={() => { setEditingIncident(null); setIncidentForm({ title: '', description: '', status: 'resolved', occurredAt: new Date().toISOString().slice(0, 10), duration: '', sortOrder: incidents.length, published: true }); setDialogType('incident'); }} className="bg-blue-500 hover:bg-blue-600 text-white"><Plus className="h-4 w-4 mr-2" />Add incident</Button>
          {incidents.map((i) => (
            <Card key={i.id}><CardContent className="p-4 flex justify-between gap-3">
              <div><div className="flex gap-2 mb-1"><Badge variant="outline">{i.status}</Badge></div><p className="font-medium">{i.title}</p><p className="text-sm text-muted-foreground line-clamp-2">{i.description}</p></div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingIncident(i); setIncidentForm({ title: i.title, description: i.description, status: i.status, occurredAt: i.occurredAt.slice(0, 10), duration: i.duration || '', sortOrder: i.sortOrder, published: i.published }); setDialogType('incident'); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={async () => { if (!confirm('Delete incident?')) return; try { await apiFetch(`/api/admin/status/incidents/${i.id}`, { method: 'DELETE' }); await load(); } catch { /* ignore */ } }}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogType === 'service'} onOpenChange={(o) => !o && setDialogType(null)}>
        <DialogContent><DialogHeader><DialogTitle>{editingService ? 'Edit service' : 'New service'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2"><Label>Name</Label><Input value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Uptime (30d)</Label><Input value={serviceForm.uptime30Day} onChange={(e) => setServiceForm({ ...serviceForm, uptime30Day: e.target.value })} /></div>
              <div className="space-y-2"><Label>Status</Label><Select value={serviceForm.status} onValueChange={(v) => setServiceForm({ ...serviceForm, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{serviceStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Icon</Label><Select value={serviceForm.icon} onValueChange={(v) => setServiceForm({ ...serviceForm, icon: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{serviceIcons.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
            <div className="flex items-center gap-2"><Switch checked={serviceForm.active} onCheckedChange={(c) => setServiceForm({ ...serviceForm, active: c })} /><Label>Active</Label></div>
            <Button onClick={saveService} disabled={saving || !serviceForm.name} className="w-full bg-blue-500 hover:bg-blue-600 text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save service'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === 'incident'} onOpenChange={(o) => !o && setDialogType(null)}>
        <DialogContent><DialogHeader><DialogTitle>{editingIncident ? 'Edit incident' : 'New incident'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2"><Label>Title</Label><Input value={incidentForm.title} onChange={(e) => setIncidentForm({ ...incidentForm, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={incidentForm.description} onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Date</Label><Input type="date" value={incidentForm.occurredAt} onChange={(e) => setIncidentForm({ ...incidentForm, occurredAt: e.target.value })} /></div>
              <div className="space-y-2"><Label>Duration</Label><Input value={incidentForm.duration} onChange={(e) => setIncidentForm({ ...incidentForm, duration: e.target.value })} placeholder="15 minutes" /></div>
            </div>
            <div className="space-y-2"><Label>Status</Label><Select value={incidentForm.status} onValueChange={(v) => setIncidentForm({ ...incidentForm, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{incidentStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
            <Button onClick={saveIncident} disabled={saving || !incidentForm.title || !incidentForm.description} className="w-full bg-blue-500 hover:bg-blue-600 text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save incident'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
