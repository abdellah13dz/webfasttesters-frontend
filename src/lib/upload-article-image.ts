import { apiUrl, getAdminToken } from '@/lib/api';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

export const ALLOWED_FILE_TYPES = new Set([
  ...ALLOWED_IMAGE_TYPES,
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
  'video/mp4',
  'video/webm',
  'audio/mpeg',
  'audio/wav',
]);

export interface UploadedFileResult {
  url: string;
  key?: string;
  filename?: string;
  storage?: 'r2' | 'local';
  contentType?: string;
  size?: number;
}

function validateFile(file: File, mode: 'image' | 'file'): string | null {
  const allowed = mode === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_FILE_TYPES;
  const maxBytes = mode === 'image' ? MAX_IMAGE_BYTES : MAX_FILE_BYTES;

  if (!allowed.has(file.type)) {
    return mode === 'image'
      ? 'Only JPEG, PNG, WebP, GIF, and SVG images are allowed'
      : 'This file type is not allowed';
  }

  if (file.size > maxBytes) {
    const limitMb = Math.round(maxBytes / (1024 * 1024));
    return `File must be ${limitMb} MB or smaller`;
  }

  return null;
}

async function uploadToEndpoint(
  file: File,
  endpoint: '/api/admin/uploads/image' | '/api/admin/uploads/file'
): Promise<UploadedFileResult> {
  const formData = new FormData();
  formData.append('file', file);

  const headers = new Headers();
  const token = getAdminToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(apiUrl(endpoint), {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Failed to upload file');
  }

  if (typeof data.url !== 'string' || !data.url) {
    throw new Error('Upload succeeded but no file URL was returned');
  }

  return data as UploadedFileResult;
}

export function validateArticleImageFile(file: File): string | null {
  return validateFile(file, 'image');
}

export function validateAdminFile(file: File): string | null {
  return validateFile(file, 'file');
}

export async function uploadArticleImage(file: File): Promise<string> {
  const validationError = validateArticleImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const result = await uploadToEndpoint(file, '/api/admin/uploads/image');
  return result.url;
}

export async function uploadAdminFile(file: File): Promise<UploadedFileResult> {
  const validationError = validateAdminFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  return uploadToEndpoint(file, '/api/admin/uploads/file');
}
