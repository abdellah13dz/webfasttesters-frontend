'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Mail,
  Server,
  Shield,
  Pencil,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
  Settings,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SmtpConfig {
  id?: string;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  notifyEmail?: string;
  active: boolean;
  source?: 'database' | 'environment';
}

interface SmtpForm {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  notifyEmail: string;
  testEmail: string;
}

interface TestResult {
  success: boolean;
  message?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MASKED_PASSWORD = '••••••••';

const defaultForm: SmtpForm = {
  host: '',
  port: 587,
  secure: false,
  user: '',
  pass: '',
  fromName: 'Fast Testers',
  fromEmail: 'support@fasttesters.com',
  notifyEmail: '',
  testEmail: '',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminSmtp() {
  const [config, setConfig] = useState<SmtpConfig | null>(null);
  const [form, setForm] = useState<SmtpForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // -------------------------------------------------------------------------
  // Data fetching
  // -------------------------------------------------------------------------

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/admin/smtp');
      if (res.ok) {
        const json = await res.json();
        if (json.config) {
          const cfg = json.config as SmtpConfig;
          setConfig(cfg);
          setForm({
            host: cfg.host,
            port: cfg.port,
            secure: cfg.secure,
            user: cfg.user,
            pass: '',
            fromName: cfg.fromName,
            fromEmail: cfg.fromEmail,
            notifyEmail: cfg.notifyEmail || cfg.fromEmail,
            testEmail: cfg.notifyEmail || cfg.fromEmail,
          });
          setEditing(false);
        } else {
          // No config yet – show form
          setConfig(null);
          setEditing(true);
        }
      }
    } catch (error) {
      console.error('Failed to load SMTP config:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleEdit = () => {
    setEditing(true);
    setTestResult(null);
  };

  const handleCancel = () => {
    if (config) {
      setEditing(false);
      setForm({
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        pass: '',
        fromName: config.fromName,
        fromEmail: config.fromEmail,
        notifyEmail: config.notifyEmail || config.fromEmail,
        testEmail: config.notifyEmail || config.fromEmail,
      });
    } else {
      setForm(defaultForm);
    }
    setTestResult(null);
  };

  const handleSave = async () => {
    if (!form.host.trim() || !form.user.trim()) return;
    if (!config && !form.pass.trim()) {
      setTestResult({
        success: false,
        error: 'Password is required when saving a new SMTP configuration',
      });
      return;
    }

    setSaving(true);
    setTestResult(null);
    try {
      const payload: Record<string, unknown> = {
        host: form.host.trim(),
        port: form.port,
        secure: form.secure,
        user: form.user.trim(),
        fromName: form.fromName.trim() || 'Fast Testers',
        fromEmail: form.fromEmail.trim() || 'support@fasttesters.com',
        notifyEmail: form.notifyEmail.trim() || form.fromEmail.trim(),
      };

      if (form.pass.trim()) {
        payload.pass = form.pass;
      } else if (!config) {
        payload.pass = form.pass;
      } else {
        payload.pass = MASKED_PASSWORD;
      }

      const res = await apiFetch('/api/admin/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.config) {
          setConfig(json.config);
          setForm({
            host: json.config.host,
            port: json.config.port,
            secure: json.config.secure,
            user: json.config.user,
            pass: '',
            fromName: json.config.fromName,
            fromEmail: json.config.fromEmail,
            notifyEmail: json.config.notifyEmail || json.config.fromEmail,
            testEmail: json.config.notifyEmail || json.config.fromEmail,
          });
          setEditing(false);
        }
      } else {
        const json = await res.json();
        setTestResult({
          success: false,
          error: json.error || 'Failed to save configuration',
        });
      }
    } catch (error) {
      console.error('Failed to save SMTP config:', error);
      setTestResult({
        success: false,
        error: 'Network error – could not save configuration',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (sendEmail = false) => {
    if (!form.host.trim() || !form.user.trim()) return;

    setTesting(true);
    setTestResult(null);
    try {
      const useSaved = Boolean(config) && !form.pass.trim();
      const testEmail = form.testEmail.trim();

      if (sendEmail && !testEmail) {
        setTestResult({
          success: false,
          error: 'Enter a test email address to verify sending and receiving',
        });
        setTesting(false);
        return;
      }

      const payload: Record<string, unknown> = {
        action: 'test',
        host: form.host.trim(),
        port: form.port,
        secure: form.secure,
        user: form.user.trim(),
        fromName: form.fromName.trim() || 'Fast Testers',
        fromEmail: form.fromEmail.trim() || 'support@fasttesters.com',
        useSaved,
      };

      if (form.pass.trim()) {
        payload.pass = form.pass;
      }

      if (sendEmail) {
        payload.testEmail = testEmail;
      }

      const res = await apiFetch('/api/admin/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setTestResult({
          success: true,
          message: json.message || (sendEmail ? 'Test email sent successfully' : 'SMTP connection successful'),
        });
      } else {
        setTestResult({ success: false, error: json.error || 'SMTP test failed' });
      }
    } catch (error) {
      console.error('Failed to test SMTP:', error);
      setTestResult({
        success: false,
        error: 'Network error – could not test connection',
      });
    } finally {
      setTesting(false);
    }
  };

  const updateForm = (field: keyof SmtpForm, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">SMTP Configuration</h2>
          <p className="text-muted-foreground text-sm">
            Manage your email server settings for sending notifications. When SMTP_* environment variables are set, they take priority over saved settings.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Current Config Display (when not editing and config exists)        */}
      {/* ----------------------------------------------------------------- */}
      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : config && !editing ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-500" />
              Current Configuration
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={
                  config.active
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }
              >
                {config.active ? 'Active' : 'Inactive'}
              </Badge>
              {'source' in config && config.source === 'environment' && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  From environment
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={handleEdit} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Host</p>
                <p className="text-sm font-medium text-foreground">{config.host}</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Port</p>
                <p className="text-sm font-medium text-foreground">{config.port}</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Username</p>
                <p className="text-sm font-medium text-foreground">{config.user}</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Secure (TLS)</p>
                <div className="flex items-center gap-2">
                  <Switch checked={config.secure} disabled />
                  <span className="text-sm font-medium text-foreground">
                    {config.secure ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">From Name</p>
                <p className="text-sm font-medium text-foreground">{config.fromName}</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1">
                <p className="text-xs text-muted-foreground">From Email</p>
                <p className="text-sm font-medium text-foreground">{config.fromEmail}</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-1 sm:col-span-2">
                <p className="text-xs text-muted-foreground">Notification Inbox</p>
                <p className="text-sm font-medium text-foreground">
                  {config.notifyEmail || config.fromEmail}
                </p>
                <p className="text-xs text-muted-foreground">
                  Contact form and submission alerts are sent here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* ----------------------------------------------------------------- */}
      {/* Config Form                                                        */}
      {/* ----------------------------------------------------------------- */}
      {(editing || (!config && !loading)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-500" />
              {config ? 'Edit Configuration' : 'Setup SMTP Server'}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {config
                ? 'Update your SMTP server settings. Leave password blank to keep the current one.'
                : 'Configure your SMTP server to enable email sending.'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {/* Server Settings */}
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Server className="h-3.5 w-3.5 text-blue-500" />
                  Server Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Host</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.example.com"
                      value={form.host}
                      onChange={(e) => updateForm('host', e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      placeholder="587"
                      value={form.port}
                      onChange={(e) => updateForm('port', parseInt(e.target.value, 10) || 587)}
                      className="bg-muted/30"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <Switch
                    id="smtp-secure"
                    checked={form.secure}
                    onCheckedChange={(v) => updateForm('secure', v)}
                  />
                  <Label htmlFor="smtp-secure" className="cursor-pointer">
                    Use secure connection (TLS/SSL)
                  </Label>
                </div>
              </div>

              <Separator />

              {/* Authentication */}
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  Authentication
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">Username</Label>
                    <Input
                      id="smtp-user"
                      placeholder="user@example.com"
                      value={form.user}
                      onChange={(e) => updateForm('user', e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">
                      Password
                      {config && (
                        <span className="text-muted-foreground font-normal ml-1">
                          (leave blank to keep current)
                        </span>
                      )}
                    </Label>
                    <Input
                      id="smtp-pass"
                      type="password"
                      placeholder={config ? 'Enter new password' : 'Password'}
                      value={form.pass}
                      onChange={(e) => updateForm('pass', e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Sender Information */}
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Mail className="h-3.5 w-3.5 text-amber-500" />
                  Sender Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-from-name">From Name</Label>
                    <Input
                      id="smtp-from-name"
                      placeholder="Fast Testers"
                      value={form.fromName}
                      onChange={(e) => updateForm('fromName', e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-from-email">From Email</Label>
                    <Input
                      id="smtp-from-email"
                      type="email"
                      placeholder="support@fasttesters.com"
                      value={form.fromEmail}
                      onChange={(e) => updateForm('fromEmail', e.target.value)}
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="smtp-notify-email">Notification Inbox</Label>
                    <Input
                      id="smtp-notify-email"
                      type="email"
                      placeholder="you@yourdomain.com"
                      value={form.notifyEmail}
                      onChange={(e) => updateForm('notifyEmail', e.target.value)}
                      className="bg-muted/30"
                    />
                    <p className="text-xs text-muted-foreground">
                      Incoming contact form and app submission alerts are delivered to this address
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Send className="h-3.5 w-3.5 text-blue-500" />
                  Test Delivery
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="smtp-test-email">Send test email to</Label>
                  <Input
                    id="smtp-test-email"
                    type="email"
                    placeholder="you@yourdomain.com"
                    value={form.testEmail}
                    onChange={(e) => updateForm('testEmail', e.target.value)}
                    className="bg-muted/30"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sends a real test message to verify both sending and inbox delivery
                  </p>
                </div>
              </div>

              <Separator />

              {/* Test Result */}
              {testResult && (
                <div
                  className={`flex items-start gap-3 rounded-lg border p-4 ${
                    testResult.success
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        testResult.success ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {testResult.message || testResult.error}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => handleTest(false)}
                    disabled={testing || !form.host || !form.user}
                    variant="outline"
                    className="gap-1.5 flex-1 sm:flex-none"
                  >
                    {testing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Server className="h-4 w-4" />
                    )}
                    Test Connection
                  </Button>
                  <Button
                    onClick={() => handleTest(true)}
                    disabled={testing || !form.host || !form.user || !form.testEmail.trim()}
                    variant="outline"
                    className="gap-1.5 flex-1 sm:flex-none"
                  >
                    {testing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send Test Email
                  </Button>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  {config && (
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex-1 sm:flex-none"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleSave}
                    disabled={saving || !form.host || !form.user || (!config && !form.pass.trim())}
                    className="bg-blue-500 hover:bg-blue-600 text-white flex-1 sm:flex-none gap-1.5"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    {config ? 'Update Configuration' : 'Save Configuration'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
