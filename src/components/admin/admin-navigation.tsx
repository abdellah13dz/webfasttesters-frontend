'use client';

import { apiFetch } from '@/lib/api';
import { invalidateSiteSettingsCache } from '@/lib/site-settings';
import { FALLBACK_NAVIGATION } from '@/lib/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Save, Navigation } from 'lucide-react';
import type { SiteNavigation, NavLink } from '@/lib/site-settings';

function LinkEditor({
  links,
  onChange,
}: {
  links: NavLink[];
  onChange: (links: NavLink[]) => void;
}) {
  const update = (index: number, patch: Partial<NavLink>) => {
    onChange(links.map((link, i) => (i === index ? { ...link, ...patch } : link)));
  };

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={`${link.path}-${index}`} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 border rounded-lg">
          <Input placeholder="Label override" value={link.label || ''} onChange={(e) => update(index, { label: e.target.value })} />
          <Input placeholder="i18n key" value={link.labelKey || ''} onChange={(e) => update(index, { labelKey: e.target.value })} />
          <Input placeholder="/path" value={link.path} onChange={(e) => update(index, { path: e.target.value })} />
        </div>
      ))}
    </div>
  );
}

export default function AdminNavigation() {
  const [navigation, setNavigation] = useState<SiteNavigation>(FALLBACK_NAVIGATION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/admin/site-settings');
        if (res.ok) {
          const data = await res.json();
          if (data.navigation) setNavigation(data.navigation);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await apiFetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation }),
      });
      if (res.ok) {
        invalidateSiteSettingsCache();
        setMessage('Navigation saved.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2"><Navigation className="h-5 w-5 text-blue-500" />Navigation & Footer</h2>
        <p className="text-sm text-muted-foreground">Edit header and footer links. Leave label empty to use i18n key.</p>
      </div>
      {message && <p className="text-sm text-green-600">{message}</p>}

      <Card>
        <CardHeader><CardTitle className="text-base">Header main links</CardTitle></CardHeader>
        <CardContent><LinkEditor links={navigation.headerMain} onChange={(headerMain) => setNavigation({ ...navigation, headerMain })} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Header resources dropdown</CardTitle></CardHeader>
        <CardContent><LinkEditor links={navigation.headerResources} onChange={(headerResources) => setNavigation({ ...navigation, headerResources })} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Footer legal links</CardTitle></CardHeader>
        <CardContent><LinkEditor links={navigation.footerLegal} onChange={(footerLegal) => setNavigation({ ...navigation, footerLegal })} /></CardContent>
      </Card>

      <Button onClick={save} disabled={saving} className="bg-blue-500 hover:bg-blue-600 text-white">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
        Save navigation
      </Button>
    </div>
  );
}
