'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Upload,
    Search,
    Trash2,
    Link as LinkIcon,
    Image as ImageIcon,
    File,
    X,
    Eye,
    Download,
    RefreshCw,
    ArrowLeft,
    Copy,
    Check,
    FolderOpen,
    Calendar,
    HardDrive
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';

interface MediaFile {
    id: string;
    filename: string;
    original_filename: string;
    file_path: string;
    file_url: string;
    file_type: string;
    mime_type?: string;
    file_size: number;
    width?: number;
    height?: number;
    created_at: string;
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
    const [copiedId, setCopiedId] = useState<string | null>(null);
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

    const navigate = useNavigate();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            }
        };
        checkSession();
    }, [supabase, navigate]);

    // Toast function removed in favor of sonner toast

    const fetchFiles = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('media_library')
                .select('*')
                .order('created_at', { ascending: false });

            if (searchQuery) {
                query = query.ilike('original_filename', `%${searchQuery}%`);
            }

            if (typeFilter === 'image') {
                query = query.eq('file_type', 'image');
            } else if (typeFilter === 'document') {
                query = query.neq('file_type', 'image');
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) {
                toast.error(supabaseError.message);
            } else {
                setFiles(data || []);
            }
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch files');
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
            try {
                const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

                // 1. Upload to Supabase Storage
                const { data: storageData, error: storageError } = await supabase.storage
                    .from('media')
                    .upload(filename, file, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: file.type // Explicitly set content type
                    });

                if (storageError) {
                    if (storageError.message?.toLowerCase().includes('bucket not found')) {
                        throw new Error("Storage bucket 'media' not found. Please ensure a public bucket named 'media' exists in your Supabase project.");
                    }
                    if ((storageError as any).status === 400 || storageError.message?.toLowerCase().includes('policy')) {
                        throw new Error("Upload failed. This is likely due to missing Storage Policies. Please ensure you have added INSERT policies for the 'media' bucket in Supabase.");
                    }
                    throw storageError;
                }

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('media')
                    .getPublicUrl(filename);

                // 3. Save to Database
                const { error: dbError } = await supabase
                    .from('media_library')
                    .insert({
                        filename: filename,
                        original_filename: file.name,
                        file_path: filename,
                        file_url: publicUrl,
                        file_type: file.type.split('/')[0], // 'image', 'document', etc.
                        mime_type: file.type,
                        file_size: file.size,
                        created_at: new Date().toISOString(),
                    });

                if (dbError) {
                    // Cleanup storage if database insert fails
                    await supabase.storage.from('media').remove([filename]);
                    throw dbError;
                }

                toast.success(`${file.name} uploaded successfully!`);
            } catch (err: any) {
                console.error('Upload error:', err);
                toast.error(`Failed to upload ${file.name}: ${err.message || 'Unknown error'}`);
            }
        }

        setUploading(false);
        fetchFiles();
    };

    const handleDelete = async (file: MediaFile) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete File',
            message: `Are you sure you want to delete "${file.original_filename}"? This action cannot be undone.`,
            action: async () => {
                try {
                    // 1. Delete from Storage
                    const { error: storageError } = await supabase.storage
                        .from('media')
                        .remove([file.filename]);

                    if (storageError) throw storageError;

                    // 2. Delete from Database
                    const { error: dbError } = await supabase
                        .from('media_library')
                        .delete()
                        .eq('id', file.id);

                    if (dbError) throw dbError;

                    toast.success('File deleted successfully!');
                    fetchFiles();
                    if (previewFile?.id === file.id) {
                        setPreviewFile(null);
                    }
                } catch (err: any) {
                    toast.error(err.message || 'Failed to delete file');
                }
            }
        });
    };

    const copyToClipboard = (url: string, fileId: string) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(fileId);
            toast.success('URL copied to clipboard!');
            setTimeout(() => setCopiedId(null), 2000);
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
        return fileType === 'image' || fileType.startsWith('image/');
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
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #DD00FF 0%, transparent 70%)',
                        transform: 'translate(-40%, -40%)'
                    }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
                        transform: 'translate(40%, 40%)'
                    }}
                ></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Link to="/admin/overview">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </Link>
                                <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase">
                                    Media Library
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                File Manager
                            </h1>
                            <p className="text-white/60">
                                Upload and manage images, documents, and files
                            </p>
                        </div>
                        <button
                            onClick={() => fetchFiles()}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden md:inline">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                            <p className="text-xs text-white/40 mb-1">Total Files</p>
                            <p className="text-2xl font-black text-white">{stats.total}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Images</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.images}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#DD00FF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#DD00FF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Documents</p>
                            <p className="text-2xl font-black text-[#DD00FF]">{stats.documents}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF7A00]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF7A00]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF7A00]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF7A00]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Total Size</p>
                            <p className="text-2xl font-black text-[#FF7A00]">{formatFileSize(stats.totalSize)}</p>
                        </div>
                    </div>
                </div>

                {/* Upload Area */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative mb-8 border-2 border-dashed rounded-2xl p-12 transition-all ${dragActive
                        ? 'border-[#DD00FF] bg-[#DD00FF]/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
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
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-black text-white mb-2">Upload Files</h3>
                        <p className="text-white/60 mb-4">
                            Drag & drop files here or click to browse
                        </p>
                        <label
                            htmlFor="file-upload"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all cursor-pointer"
                        >
                            <Upload className="w-4 h-4" />
                            Choose Files
                        </label>
                        <p className="text-xs text-white/40 mt-3">
                            Supported: Images (JPG, PNG, GIF, WebP), Documents (PDF, DOC, DOCX)
                        </p>
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <RefreshCw className="w-12 h-12 text-[#00FFFF] animate-spin mx-auto mb-3" />
                                <p className="text-white font-bold">Uploading files...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-9 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search files by name..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="md:col-span-3">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Types</option>
                            <option value="image">Images Only</option>
                            <option value="document">Documents Only</option>
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading files...</p>
                    </div>
                )}

                {/* Files Grid */}
                {!loading && filteredFiles.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredFiles.map((file) => (
                            <div
                                key={file.id}
                                onClick={() => setPreviewFile(file)}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 group-hover:border-[#00FFFF]/30 rounded-2xl p-4 transition-all">
                                    {/* Preview */}
                                    <div className="aspect-square bg-black/40 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                                        {isImage(file.file_type) ? (
                                            <img
                                                src={file.file_url}
                                                alt={file.original_filename}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <File className="w-12 h-12 text-white/20" />
                                        )}
                                    </div>

                                    {/* File Info */}
                                    <h4 className="font-bold text-white mb-1 truncate" title={file.original_filename}>
                                        {file.original_filename}
                                    </h4>
                                    <div className="flex items-center justify-between text-xs text-white/40">
                                        <span>{formatFileSize(file.file_size)}</span>
                                        {file.width && file.height && (
                                            <span>{file.width} × {file.height}</span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(file.file_url, file.id);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] text-xs font-bold hover:bg-[#00FFFF]/20 transition-all"
                                        >
                                            {copiedId === file.id ? (
                                                <>
                                                    <Check className="w-3 h-3" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(file);
                                            }}
                                            className="flex items-center justify-center px-2 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredFiles.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FolderOpen className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || typeFilter !== 'all'
                                ? 'No files found'
                                : 'No files uploaded yet'}
                        </p>
                        <p className="text-white/40 text-sm">
                            {searchQuery || typeFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Upload your first file to get started'}
                        </p>
                    </div>
                )}

                {/* Preview Modal */}
                {previewFile && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                        onClick={() => setPreviewFile(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full bg-[#0B0D14] border border-white/20 rounded-2xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setPreviewFile(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Preview */}
                            <div className="mb-6">
                                {isImage(previewFile.file_type) ? (
                                    <img
                                        src={previewFile.file_url}
                                        alt={previewFile.original_filename}
                                        className="w-full max-h-[60vh] object-contain rounded-xl"
                                    />
                                ) : (
                                    <div className="h-64 bg-black/40 rounded-xl flex items-center justify-center">
                                        <File className="w-24 h-24 text-white/20" />
                                    </div>
                                )}
                            </div>

                            {/* File Details */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-white mb-1">{previewFile.original_filename}</h3>
                                    <p className="text-white/60 text-sm">{previewFile.file_type}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                        <p className="text-xs text-white/50 mb-1">File Size</p>
                                        <p className="text-white font-bold">{formatFileSize(previewFile.file_size)}</p>
                                    </div>
                                    {previewFile.width && previewFile.height && (
                                        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                            <p className="text-xs text-white/50 mb-1">Dimensions</p>
                                            <p className="text-white font-bold">{previewFile.width} × {previewFile.height}</p>
                                        </div>
                                    )}
                                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                        <p className="text-xs text-white/50 mb-1">Uploaded</p>
                                        <p className="text-white font-bold">{new Date(previewFile.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                        <p className="text-xs text-white/50 mb-1">Format</p>
                                        <p className="text-white font-bold">{previewFile.mime_type || previewFile.file_type}</p>
                                    </div>
                                </div>

                                {/* URL */}
                                <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                                    <p className="text-xs text-white/50 mb-2">File URL</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={previewFile.file_url}
                                            readOnly
                                            className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-lg text-white text-sm"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(previewFile.file_url, previewFile.id)}
                                            className="px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] font-bold hover:bg-[#00FFFF]/20 transition-all"
                                        >
                                            {copiedId === previewFile.id ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <a
                                        href={previewFile.file_url}
                                        download
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                    <button
                                        onClick={() => {
                                            handleDelete(previewFile);
                                            setPreviewFile(null);
                                        }}
                                        className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border-2 border-red-500/50 rounded-xl text-red-400 font-bold hover:bg-red-500/30 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
            />
        </div>
    );
}
