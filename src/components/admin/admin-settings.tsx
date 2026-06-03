'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  User,
  Lock,
  AlertTriangle,
  Loader2,
  Save,
  Shield,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminSettings() {
  // Profile state
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [profileMessage, setProfileMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Password state
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setProfileLoading(true);
      const res = await apiFetch('/api/admin/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setProfileForm({ name: data.name || '', email: data.email || '' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileMessage(null);
    try {
      const res = await apiFetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setProfileMessage({
          type: 'success',
          text: 'Profile updated successfully!',
        });
      } else {
        setProfileMessage({
          type: 'error',
          text: data.error || 'Failed to update profile',
        });
      }
    } catch (error) {
      setProfileMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const validatePassword = (): boolean => {
    const errors: Record<string, string> = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (
      passwordForm.newPassword &&
      passwordForm.currentPassword &&
      passwordForm.newPassword === passwordForm.currentPassword
    ) {
      errors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    setPasswordSaving(true);
    setPasswordMessage(null);
    try {
      const res = await apiFetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setPasswordErrors({});
        setPasswordMessage({
          type: 'success',
          text: 'Password changed successfully!',
        });
      } else {
        setPasswordMessage({
          type: 'error',
          text: data.error || 'Failed to change password',
        });
      }
    } catch (error) {
      setPasswordMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
          <Settings className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your admin profile and security
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <User className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile</h3>
              <p className="text-xs text-muted-foreground">
                Update your personal information
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="profile-name"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Your name"
                className="bg-muted/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="profile-email"
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="bg-muted/30"
              />
            </div>
          </div>

          {/* Profile Message */}
          {profileMessage && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                profileMessage.type === 'success'
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {profileMessage.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {profileMessage.text}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleSaveProfile}
              disabled={profileSaving}
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
            >
              {profileSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
              <Lock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Change Password</h3>
              <p className="text-xs text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="current-password"
                className="text-sm font-medium"
              >
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    currentPassword: e.target.value,
                  }))
                }
                placeholder="Enter current password"
                className={`bg-muted/30 ${
                  passwordErrors.currentPassword
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
              />
              {passwordErrors.currentPassword && (
                <p className="text-xs text-destructive">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Enter new password"
                className={`bg-muted/30 ${
                  passwordErrors.newPassword
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
              />
              {passwordErrors.newPassword ? (
                <p className="text-xs text-destructive">
                  {passwordErrors.newPassword}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((f) => ({
                    ...f,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm new password"
                className={`bg-muted/30 ${
                  passwordErrors.confirmPassword
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Password Message */}
          {passwordMessage && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                passwordMessage.type === 'success'
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {passwordMessage.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {passwordMessage.text}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleChangePassword}
              disabled={passwordSaving}
              className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
            >
              {passwordSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Danger Zone</h3>
              <p className="text-xs text-muted-foreground">
                Critical account information
              </p>
            </div>
          </div>

          <Separator />

          {profile && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Role</span>
                </div>
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {profile.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Name</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {profile.name || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-muted/20">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {profile.email || 'N/A'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
