// ============================================
// STORAGE & MEDIA MANAGEMENT - PHASE 4
// ============================================
// File upload, image optimization, media library
// ============================================

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// TYPES
// ============================================

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
  metadata?: {
    size: number;
    type: string;
    width?: number;
    height?: number;
  };
}

export interface MediaFile {
  id: string;
  filename: string;
  originalFilename: string;
  filePath: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'document' | 'audio';
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  altText?: string;
  createdAt: string;
}

// ============================================
// CONSTANTS
// ============================================

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const STORAGE_BUCKETS = {
  images: 'images',
  documents: 'documents',
  videos: 'videos',
  avatars: 'avatars',
};

// ============================================
// FILE VALIDATION
// ============================================

/**
 * Validate file type
 */
export function validateFileType(mimeType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimeType);
}

/**
 * Validate file size
 */
export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}

/**
 * Get file type category
 */
export function getFileTypeCategory(mimeType: string): 'image' | 'video' | 'document' | 'audio' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'document';
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!validateFileType(file.type, ALLOWED_IMAGE_TYPES)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
    };
  }

  if (!validateFileSize(file.size, MAX_IMAGE_SIZE)) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

// ============================================
// FILE UPLOAD
// ============================================

/**
 * Generate unique filename
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalFilename.split('.').pop();
  const nameWithoutExt = originalFilename.replace(`.${extension}`, '').replace(/[^a-zA-Z0-9]/g, '-');
  
  return `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  bucket: string = STORAGE_BUCKETS.images,
  folder: string = ''
): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name);
    const filePath = folder ? `${folder}/${filename}` : filename;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath,
      metadata: {
        size: file.size,
        type: file.type,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Upload failed',
    };
  }
}

/**
 * Upload image with automatic optimization
 */
export async function uploadImage(
  file: File,
  folder: string = 'uploads'
): Promise<UploadResult> {
  return uploadFile(file, STORAGE_BUCKETS.images, folder);
}

/**
 * Upload avatar image
 */
export async function uploadAvatar(
  file: File,
  userId: string
): Promise<UploadResult> {
  return uploadFile(file, STORAGE_BUCKETS.avatars, userId);
}

/**
 * Upload document
 */
export async function uploadDocument(
  file: File,
  folder: string = 'documents'
): Promise<UploadResult> {
  // Validate document type
  if (!validateFileType(file.type, ALLOWED_DOCUMENT_TYPES)) {
    return {
      success: false,
      error: `Invalid document type. Allowed: ${ALLOWED_DOCUMENT_TYPES.join(', ')}`,
    };
  }

  return uploadFile(file, STORAGE_BUCKETS.documents, folder);
}

// ============================================
// FILE DELETION
// ============================================

/**
 * Delete file from storage
 */
export async function deleteFile(
  filePath: string,
  bucket: string = STORAGE_BUCKETS.images
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Delete failed',
    };
  }
}

/**
 * Delete multiple files
 */
export async function deleteFiles(
  filePaths: string[],
  bucket: string = STORAGE_BUCKETS.images
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove(filePaths);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Delete failed',
    };
  }
}

// ============================================
// MEDIA LIBRARY
// ============================================

/**
 * Save file metadata to media_library table
 */
export async function saveMediaMetadata(
  filename: string,
  originalFilename: string,
  filePath: string,
  fileUrl: string,
  fileType: string,
  fileSize: number,
  additionalData?: Partial<MediaFile>
): Promise<{ success: boolean; data?: MediaFile; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('media_library')
      .insert({
        filename,
        original_filename: originalFilename,
        file_path: filePath,
        file_url: fileUrl,
        file_type: getFileTypeCategory(fileType),
        mime_type: fileType,
        file_size: fileSize,
        ...additionalData,
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data as MediaFile,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to save metadata',
    };
  }
}

/**
 * Get media files from library
 */
export async function getMediaFiles(
  filters?: {
    fileType?: 'image' | 'video' | 'document' | 'audio';
    limit?: number;
    offset?: number;
  }
): Promise<{ success: boolean; data?: MediaFile[]; total?: number; error?: string }> {
  try {
    let query = supabase
      .from('media_library')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.fileType) {
      query = query.eq('file_type', filters.fileType);
    }

    // Apply pagination
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    query = query.range(offset, offset + limit - 1);

    // Order by most recent
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data as MediaFile[],
      total: count || 0,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch media',
    };
  }
}

/**
 * Delete media file (both storage and database)
 */
export async function deleteMediaFile(
  mediaId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get file info from database
    const { data: mediaFile, error: fetchError } = await supabase
      .from('media_library')
      .select('file_path, file_type')
      .eq('id', mediaId)
      .single();

    if (fetchError || !mediaFile) {
      return {
        success: false,
        error: 'Media file not found',
      };
    }

    // Determine bucket based on file type
    const bucket = mediaFile.file_type === 'image' 
      ? STORAGE_BUCKETS.images 
      : mediaFile.file_type === 'video'
      ? STORAGE_BUCKETS.videos
      : STORAGE_BUCKETS.documents;

    // Delete from storage
    await deleteFile(mediaFile.file_path, bucket);

    // Delete from database
    const { error: deleteError } = await supabase
      .from('media_library')
      .delete()
      .eq('id', mediaId);

    if (deleteError) {
      return {
        success: false,
        error: deleteError.message,
      };
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete media',
    };
  }
}

// ============================================
// UPLOAD FROM URL
// ============================================

/**
 * Upload image from URL
 */
export async function uploadFromURL(
  imageUrl: string,
  filename?: string
): Promise<UploadResult> {
  try {
    // Fetch image from URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to fetch image from URL',
      };
    }

    const blob = await response.blob();
    const file = new File(
      [blob],
      filename || `image-${Date.now()}.${blob.type.split('/')[1]}`,
      { type: blob.type }
    );

    // Upload the file
    return uploadImage(file);
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Upload from URL failed',
    };
  }
}

// ============================================
// BUCKET MANAGEMENT
// ============================================

/**
 * Ensure storage buckets exist
 */
export async function ensureBucketsExist(): Promise<void> {
  const buckets = Object.values(STORAGE_BUCKETS);

  for (const bucket of buckets) {
    const { data: existingBucket } = await supabase.storage.getBucket(bucket);
    
    if (!existingBucket) {
      await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
      });
    }
  }
}

// ============================================
// EXPORT
// ============================================

export default {
  // Upload
  uploadFile,
  uploadImage,
  uploadAvatar,
  uploadDocument,
  uploadFromURL,
  
  // Delete
  deleteFile,
  deleteFiles,
  deleteMediaFile,
  
  // Media Library
  saveMediaMetadata,
  getMediaFiles,
  
  // Validation
  validateFileType,
  validateFileSize,
  validateImageFile,
  
  // Utils
  generateUniqueFilename,
  getFileTypeCategory,
  
  // Buckets
  ensureBucketsExist,
  
  // Constants
  STORAGE_BUCKETS,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
};
