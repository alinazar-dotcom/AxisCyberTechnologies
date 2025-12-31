'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Search, Trash2, Link as LinkIcon, Image as ImageIcon, File, X, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  width?: number;
  height?: number;
  uploaded_at: string;
  uploaded_by?: string;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'document'>('all');
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: async () => { },
  });


  const fetchFiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (typeFilter !== 'all') params.append('type', typeFilter);

      const response = await fetch(`/api/media?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setFiles(result.data || []);
      } else {
        toast.error(result.error || 'Failed to fetch files');
      }
    } catch (err) {
      toast.error('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [searchQuery, typeFilter]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    setUploading(true);
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      const formData = new FormData();
      formData.append('file', file);

      const fileId = Math.random().toString(36).substring(7);

      toast.promise(
        (async () => {
          setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

          // Simulate progress updates
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
              const current = prev[fileId] || 0;
              if (current >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return { ...prev, [fileId]: current + 10 };
            });
          }, 100);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          clearInterval(progressInterval);
          setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

          const result = await response.json();
          if (!result.success) throw new Error(result.error || 'Upload failed');

          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 1000);

          fetchFiles();
          return result;
        })(),
        {
          loading: `Uploading ${file.name}...`,
          success: `${file.name} uploaded successfully!`,
          error: (err: any) => `Failed to upload ${file.name}: ${err.message}`,
        }
      );
    }

    setUploading(false);
  };

  const handleDelete = (file: MediaFile) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete File',
      message: `Are you sure you want to delete "${file.original_name}"? This action cannot be undone.`,
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/media/${file.id}`, {
              method: 'DELETE',
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete file');

            fetchFiles();
          })(),
          {
            loading: 'Deleting file...',
            success: 'File deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete file',
          }
        );
      },
    });
  };

  const copyToClipboard = (url: string, filename: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success(`URL copied: ${filename}`);
    }).catch(() => {
      toast.error('Failed to copy URL');
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = (fileType: string) => {
    return fileType.startsWith('image/');
  };

  const filteredFiles = files.filter(file => {
    if (typeFilter === 'image' && !isImage(file.file_type)) return false;
    if (typeFilter === 'document' && isImage(file.file_type)) return false;
    return true;
  });

  const stats = {
    total: files.length,
    images: files.filter(f => isImage(f.file_type)).length,
    documents: files.filter(f => !isImage(f.file_type)).length,
    totalSize: files.reduce((sum, f) => sum + f.file_size, 0),
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Media Library
            </h1>
            <p className="text-white/60">
              Upload and manage images and files
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/[0.02] border-2 border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Files</p>
            <p className="text-2xl font-black text-white">{stats.total}</p>
          </div>
          <div className="p-4 bg-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Images</p>
            <p className="text-2xl font-black text-[var(--neon-cyan)]">{stats.images}</p>
          </div>
          <div className="p-4 bg-[var(--neon-purple)]/5 border-2 border-[var(--neon-purple)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Documents</p>
            <p className="text-2xl font-black text-[var(--neon-purple)]">{stats.documents}</p>
          </div>
          <div className="p-4 bg-[var(--neon-orange)]/5 border-2 border-[var(--neon-orange)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Size</p>
            <p className="text-2xl font-black text-[var(--neon-orange)]">{formatFileSize(stats.totalSize)}</p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${dragActive
            ? 'border-[var(--neon-purple)] bg-[var(--neon-purple)]/10'
            : 'border-white/20 bg-white/[0.02] hover:border-white/40'
            }`}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx"
          />

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              {dragActive ? 'Drop files here!' : 'Upload Files'}
            </h3>

            <p className="text-white/60 mb-4">
              Drag and drop files here, or click to browse
            </p>

            <label htmlFor="file-upload">
              <Button variant="primary" as="span" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Choose Files'}
              </Button>
            </label>

            <p className="text-xs text-white/40 mt-4">
              Supported: Images (JPG, PNG, GIF, WebP), Documents (PDF, DOC, DOCX)
            </p>
          </div>

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="mt-6 space-y-2">
              {Object.entries(uploadProgress).map(([id, progress]) => (
                <div key={id} className="bg-black/40 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">Uploading...</span>
                    <span className="text-sm font-black text-[var(--neon-cyan)]">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Files</option>
            <option value="image">Images Only</option>
            <option value="document">Documents Only</option>
          </select>
        </div>

        {/* Files Count */}
        <div className="text-sm text-white/60">
          {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'} found
        </div>

        {/* Loading State - Only on initial load or when no data */}
        {loading && files.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading files...</p>
          </div>
        )}

        {/* Files Grid */}
        {filteredFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="group relative bg-white/[0.02] border-2 border-white/10 rounded-xl overflow-hidden hover:border-[var(--neon-purple)]/30 transition-all"
              >
                {/* Preview */}
                <div className="aspect-square bg-black/40 flex items-center justify-center overflow-hidden">
                  {isImage(file.file_type) ? (
                    <img
                      src={file.file_url}
                      alt={file.original_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <File className="w-16 h-16 text-white/20" />
                  )}
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-2 bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]/50 rounded-lg text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/30 transition-all"
                    title="Preview"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(file.file_url, file.original_name)}
                    className="p-2 bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/50 rounded-lg text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/30 transition-all"
                    title="Copy URL"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(file)}
                    className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* File Info */}
                <div className="p-3">
                  <p className="text-sm font-bold text-white truncate" title={file.original_name}>
                    {file.original_name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-white/40">
                      {formatFileSize(file.file_size)}
                    </p>
                    {file.width && file.height && (
                      <p className="text-xs text-white/40">
                        {file.width}×{file.height}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredFiles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery || typeFilter !== 'all' ? 'No files found' : 'No files uploaded yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Upload your first file using the upload area above'}
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <Modal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          title="File Preview"
          size="xl"
        >
          <div className="space-y-6">
            {/* Preview */}
            {isImage(previewFile.file_type) ? (
              <div className="bg-black/40 rounded-xl overflow-hidden">
                <img
                  src={previewFile.file_url}
                  alt={previewFile.original_name}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
            ) : (
              <div className="bg-black/40 rounded-xl p-12 flex flex-col items-center justify-center">
                <File className="w-24 h-24 text-white/20 mb-4" />
                <p className="text-white/60">Preview not available for this file type</p>
              </div>
            )}

            {/* File Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-white/60">Filename:</span>
                <span className="text-sm font-bold text-white">{previewFile.original_name}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-white/60">File Size:</span>
                <span className="text-sm font-bold text-white">{formatFileSize(previewFile.file_size)}</span>
              </div>
              {previewFile.width && previewFile.height && (
                <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                  <span className="text-sm text-white/60">Dimensions:</span>
                  <span className="text-sm font-bold text-white">
                    {previewFile.width} × {previewFile.height} px
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-white/60">Type:</span>
                <span className="text-sm font-bold text-white">{previewFile.file_type}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-sm text-white/60">Uploaded:</span>
                <span className="text-sm font-bold text-white">
                  {new Date(previewFile.uploaded_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* URL Display */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70">File URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={previewFile.file_url}
                  readOnly
                  className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white text-sm focus:outline-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(previewFile.file_url, previewFile.original_name)}
                >
                  <LinkIcon className="w-4 h-4" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => window.open(previewFile.file_url, '_blank')}
                className="flex-1"
              >
                <Download className="w-5 h-5" />
                Download
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  handleDelete(previewFile);
                  setPreviewFile(null);
                }}
                className="flex-1 !border-red-500/30 !text-red-400 hover:!border-red-500/50"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="danger"
      />
    </AdminLayout>
  );
}
