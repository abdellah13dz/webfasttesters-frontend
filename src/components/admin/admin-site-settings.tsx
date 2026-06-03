'use client';

import { apiFetch } from '@/lib/api';
import { invalidateSiteSettingsCache } from '@/lib/site-settings';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Megaphone, BarChart3, Search } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';

export default function AdminSiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/admin/site-settings');
        if (res.ok) setSettings(await res.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await apiFetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettings(await res.json());
        invalidateSiteSettingsCache();
        setMessage('Settings saved successfully.');
      } else {
        setMessage('Failed to save settings.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {message && <p className="text-sm text-green-600">{message}</p>}

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Megaphone className="h-4 w-4 text-blue-500" />Announcement banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2"><Switch checked={settings.announcementBanner.enabled} onCheckedChange={(c) => setSettings({ ...settings, announcementBanner: { ...settings.announcementBanner, enabled: c } })} /><Label>Show banner on site</Label></div>
          <div className="space-y-2"><Label>Message</Label><Input value={settings.announcementBanner.message} onChange={(e) => setSettings({ ...settings, announcementBanner: { ...settings.announcementBanner, message: e.target.value } })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>CTA text</Label><Input value={settings.announcementBanner.ctaText} onChange={(e) => setSettings({ ...settings, announcementBanner: { ...settings.announcementBanner, ctaText: e.target.value } })} /></div>
            <div className="space-y-2"><Label>CTA link</Label><Input value={settings.announcementBanner.ctaLink} onChange={(e) => setSettings({ ...settings, announcementBanner: { ...settings.announcementBanner, ctaLink: e.target.value } })} /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="h-4 w-4 text-blue-500" />Homepage hero stats</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {(['heroCount', 'successRate', 'appsCount', 'countriesCount'] as const).map((key) => (
            <div key={key} className="space-y-2">
              <Label>{key}</Label>
              <Input type="number" value={settings.heroStats[key]} onChange={(e) => setSettings({ ...settings, heroStats: { ...settings.heroStats, [key]: parseInt(e.target.value, 10) || 0 } })} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4 text-blue-500" />Default SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Site URL</Label><Input value={settings.defaultSeo.siteUrl} onChange={(e) => setSettings({ ...settings, defaultSeo: { ...settings.defaultSeo, siteUrl: e.target.value } })} /></div>
          <div className="space-y-2"><Label>Default title</Label><Input value={settings.defaultSeo.title} onChange={(e) => setSettings({ ...settings, defaultSeo: { ...settings.defaultSeo, title: e.target.value } })} /></div>
          <div className="space-y-2"><Label>Default description</Label><Textarea rows={3} value={settings.defaultSeo.description} onChange={(e) => setSettings({ ...settings, defaultSeo: { ...settings.defaultSeo, description: e.target.value } })} /></div>
          <div className="space-y-2"><Label>Default keywords</Label><Input value={settings.defaultSeo.keywords} onChange={(e) => setSettings({ ...settings, defaultSeo: { ...settings.defaultSeo, keywords: e.target.value } })} /></div>
          <div className="space-y-2"><Label>Default OG image</Label><Input value={settings.defaultSeo.ogImage} onChange={(e) => setSettings({ ...settings, defaultSeo: { ...settings.defaultSeo, ogImage: e.target.value } })} /></div>
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
        Save site settings
      </Button>
    </div>
  );
}
