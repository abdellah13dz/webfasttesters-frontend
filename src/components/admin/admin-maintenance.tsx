'use client';

import { apiFetch } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, AlertTriangle, CheckCircle2, Server } from 'lucide-react';

interface SeedStatus {
  environment: string;
  seedAllowed: boolean;
  allowSeedEnv: boolean;
}

export default function AdminMaintenance() {
  const [status, setStatus] = useState<SeedStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/admin/seed');
        if (res.ok) {
          setStatus(await res.json());
        }
      } catch {
        setMessage({ type: 'error', text: 'Failed to load maintenance status' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSeed = async () => {
    if (!status?.seedAllowed) return;
    if (!window.confirm('Seed the database with default admin, articles, reviews, and pricing? Existing records may be updated.')) {
      return;
    }

    setSeeding(true);
    setMessage(null);

    try {
      const res = await apiFetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed-all' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Seed failed' });
        return;
      }
      setMessage({ type: 'success', text: data.message || 'Database seeded successfully' });
    } catch {
      setMessage({ type: 'error', text: 'Network error while seeding' });
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Maintenance</h2>
        <p className="text-muted-foreground mt-1">Database seeding and environment tools.</p>
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Server className="h-5 w-5 text-blue-500" />
            Environment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Environment</span>
            <Badge variant="outline">{status?.environment || 'unknown'}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Seed allowed</span>
            <Badge variant="outline" className={status?.seedAllowed ? 'text-green-600' : 'text-orange-600'}>
              {status?.seedAllowed ? 'Yes' : 'No'}
            </Badge>
          </div>
          {!status?.seedAllowed && (
            <p className="text-xs text-muted-foreground">
              Seeding is disabled in production. Set ALLOW_SEED=true on the backend to enable.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Database className="h-5 w-5 text-blue-500" />
            Seed database
          </CardTitle>
          <CardDescription>
            Populates admin user, sample articles, reviews, and pricing plans. Safe to run in development; use with caution elsewhere.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status?.environment === 'production' && (
            <Alert className="mb-4 border-orange-500/30 bg-orange-500/5">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription>
                You are in production. Seeding may overwrite content. Only proceed if you understand the impact.
              </AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleSeed}
            disabled={!status?.seedAllowed || seeding}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {seeding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Seeding...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Run seed-all
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
