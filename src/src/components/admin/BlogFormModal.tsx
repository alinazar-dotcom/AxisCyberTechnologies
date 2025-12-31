'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { BlogPost } from '../../hooks/useBlogPosts';
import { Loader2, X, Plus, Image as ImageIcon, Tag as TagIcon } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

const ensureHttps = (url: string) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('http://')
    ? `https://${trimmed.slice('http://'.length)}`
    : trimmed;
};

interface BlogFormModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export function BlogFormModal({ post, isOpen, onClose, onSuccess }: BlogFormModalProps) {
  const isEdit = !!post;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_name: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category_id: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    is_featured: false,
    read_time: 0,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [detailedPost, setDetailedPost] = useState<BlogPost | null>(null);
  const [lastLoadedPostId, setLastLoadedPostId] = useState<string | 'new' | null>(null);
  console.log('[BlogFormModal] render formData snapshot', formData);

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const [catRes, tagRes] = await Promise.all([
          supabase
            .from('blog_categories')
            .select('id, name')
            .eq('is_active', true)
            .order('name'),

          supabase
            .from('blog_tags')
            .select('id, name')
            .order('name'),

        ]);

        if (catRes.data) setCategories(catRes.data);
        if (tagRes.data) setAvailableTags(tagRes.data);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [isOpen]);

  const extractTagIds = (tagsData?: any[]) => {
    if (!Array.isArray(tagsData)) return [];
    return tagsData
      .map(tagRelation => tagRelation?.tag?.id || tagRelation?.tag_id || tagRelation?.tagId)
      .filter(Boolean);
  };

  // Fetch the most recent version of the post when editing
  useEffect(() => {
    if (!isOpen) {
      setDetailedPost(null);
      setLastLoadedPostId(null);
      return;
    }

    if (!post) {
      setDetailedPost(null);
      return;
    }

    const loadPost = async () => {
      console.log('[BlogFormModal] Loading post details for edit', { postId: post.id });
      setLoadingPost(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            tags:blog_post_tags(tag:blog_tags(id, name, slug))
          `)
          .eq('id', post.id)
          .single();

        if (error) {
          console.error('Error fetching detailed post:', error);
          setDetailedPost(post);
        } else {
          setDetailedPost(data as BlogPost);
        }
      } catch (err) {
        console.error('Failed to load post details:', err);
        setDetailedPost(post);
      } finally {
        setLoadingPost(false);
        console.log('[BlogFormModal] Finished loading post details');
      }
    };

    loadPost();
  }, [isOpen, post?.id]);

  const getEmptyFormState = () => ({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_name: 'Admin',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category_id: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    is_featured: false,
    read_time: 0,
  });

  // Sync fetched post data into the form state while editing
  useEffect(() => {
    if (!isOpen) return;

    const sourcePost = detailedPost || post;
    if (sourcePost) {
      if (lastLoadedPostId === sourcePost.id) {
        return;
      }

      console.log('[BlogFormModal] Populating form data', { sourcePost });
      setFormData({
        title: sourcePost.title || '',
        slug: sourcePost.slug || '',
        content: sourcePost.content || '',
        excerpt: sourcePost.excerpt || '',
        featured_image: sourcePost.featured_image || '',
        author_name: sourcePost.author_name || '',
        status: (sourcePost.status as typeof formData.status) || 'draft',
        category_id: sourcePost.category_id || '',
        meta_title: sourcePost.meta_title || '',
        meta_description: sourcePost.meta_description || '',
        meta_keywords: sourcePost.meta_keywords || [],
        is_featured: !!sourcePost.is_featured,
        read_time: sourcePost.read_time || 0,
      });
      setSelectedTags(extractTagIds((sourcePost as any).tags));
      setErrors({});
      setLastLoadedPostId(sourcePost.id);
      console.log('[BlogFormModal] Errors reset');
      return;
    }

    // No source post, meaning we're creating a new post
    if (lastLoadedPostId === 'new') return;

    console.log('[BlogFormModal] Resetting form for new post');
    setFormData(getEmptyFormState());
    setSelectedTags([]);
    setErrors({});
    setLastLoadedPostId('new');
  }, [isOpen, detailedPost, post?.id, lastLoadedPostId]);

  // Auto-calculate read time from content
  useEffect(() => {
    if (formData.content) {
      // Strip HTML tags to get plain text
      const text = formData.content.replace(/<[^>]*>/g, '');
      // Average reading speed is ~200 words per minute
      const words = text.trim().split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(words / 200));

      // Only update if it's different to avoid infinite loops
      if (readTime !== formData.read_time) {
        setFormData(prev => ({ ...prev, read_time: readTime }));
      }
    }
  }, [formData.content]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }
    if (!formData.author_name.trim()) {
      newErrors.author_name = 'Author name is required';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting blog post form...');

    if (!validate()) {
      console.log('Validation failed:', errors);
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      // Explicitly define fields to save to avoid sending extra fields that might not exist
      const dataToSave: any = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        featured_image: ensureHttps(formData.featured_image),
        author_name: formData.author_name,
        status: formData.status,
        category_id: formData.category_id || null,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords,
        is_featured: formData.is_featured,
        read_time: formData.read_time,
        updated_at: new Date().toISOString(),
      };

      // Only set published_at if status is published and it wasn't set before
      if (formData.status === 'published') {
        dataToSave.published_at = post?.published_at || new Date().toISOString();
      } else {
        dataToSave.published_at = null;
      }

      let postId = post?.id;

      if (isEdit) {
        console.log('Updating existing post:', postId);
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(dataToSave)
          .eq('id', postId);

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }
      } else {
        console.log('Creating new post');
        const { data: insertData, error: insertError } = await supabase
          .from('blog_posts')
          .insert([{ ...dataToSave, created_at: new Date().toISOString() }])
          .select()
          .single();

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
        postId = insertData.id;
        console.log('New post created with ID:', postId);
      }

      // Handle tags via admin API (uses service role on server)
      if (postId) {
        console.log('Handling tags for post:', postId);
        try {
          const tagResponse = await fetch('/api/admin/blog-tags', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              postId,
              tagIds: selectedTags
            })
          });

          if (tagResponse.ok) {
            const contentType = tagResponse.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const tagResult = await tagResponse.json();
              if (!tagResult?.success) {
                console.warn('Tag sync API responded without success flag', tagResult);
              }
            } else {
              console.warn('Tag sync API did not return JSON, continuing without blocking save.');
            }
          } else {
            const errorText = await tagResponse.text();
            console.warn('Tag sync API unavailable:', errorText || tagResponse.statusText);
          }
        } catch (tagErr) {
          console.warn('Tag sync failed, continuing without blocking save.', tagErr);
        }
      }

      console.log('Save successful, calling callbacks');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Submit error caught:', error);
      const message = error.message || 'An error occurred while saving the post';
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.meta_keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        meta_keywords: [...prev.meta_keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      meta_keywords: prev.meta_keywords.filter(k => k !== keyword),
    }));
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
      size="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={saving} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="blog-form" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Post' : 'Create Post'}</>
            )}
          </Button>
        </div>
      }
    >
      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
            {errors.submit}
          </div>
        )}

        {loadingPost && (
          <div className="p-4 bg-white/5 border-2 border-white/10 rounded-xl text-white/70 text-sm font-bold">
            Loading post details...
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-white/70 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., 10 Ways to Boost Your Business with AI"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                  }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                  }`}
              />
              {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                placeholder="e.g., John Smith"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.author_name ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                  }`}
              />
              {errors.author_name && <p className="mt-1 text-sm text-red-400">{errors.author_name}</p>}
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Read Time (Minutes)
              </label>
              <input
                type="number"
                min="1"
                value={formData.read_time}
                onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 0 }))}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[#00FFFF]/50 focus:outline-none"
              />
              <p className="mt-1 text-[10px] text-white/40">Auto-calculated from content, but you can override it.</p>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Category *
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white focus:outline-none transition-colors [&>option]:bg-[#0B0D14] [&>option]:text-white ${errors.category_id ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                }`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-sm text-red-400">{errors.category_id}</p>}
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Featured Image URL
            </label>
            <div className="space-y-2">
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="Paste image URL"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none"
              />
              {formData.featured_image && (
                <div className="mt-2 rounded-xl overflow-hidden border-2 border-white/10">
                  <img
                    src={ensureHttps(formData.featured_image)}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Content</h3>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Post Content *
            </label>
            <div className={`bg-black/40 border-2 rounded-xl overflow-hidden ${errors.content ? 'border-red-500/50' : 'border-white/10'
              }`}>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                modules={modules}
                className="text-white quill-dark"
                placeholder="Write your blog post content here..."
              />
            </div>
            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Excerpt (Short Summary)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A brief summary of the post..."
              rows={3}
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1 ${selectedTags.includes(tag.id)
                  ? 'bg-[#00FFFF]/10 border-[#00FFFF] text-[#00FFFF]'
                  : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                  }`}
              >
                <TagIcon className="w-3 h-3" />
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">SEO Settings</h3>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.meta_title}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
              placeholder="SEO Title"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Meta Description
            </label>
            <textarea
              value={formData.meta_description}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
              placeholder="SEO Description"
              rows={2}
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Add keyword..."
                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white focus:border-[#00FFFF]/50 focus:outline-none"
              />
              <Button type="button" variant="secondary" onClick={addKeyword}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.meta_keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-white/5 border-2 border-white/20 rounded-lg text-sm text-white/70 font-bold flex items-center gap-2"
                >
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(keyword)}>
                    <X className="w-4 h-4 hover:text-red-400" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Publishing */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Publishing</h3>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="w-5 h-5 rounded border-white/10 bg-black/40 text-[#00FFFF] focus:ring-[#00FFFF]/20"
              />
              <label htmlFor="is_featured" className="text-sm font-bold text-white/70">
                Featured Post
              </label>
            </div>

            <div className="flex-1">
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[#00FFFF]/50 focus:outline-none [&>option]:bg-[#0B0D14] [&>option]:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

      </form>

      <style dangerouslySetInnerHTML={{
        __html: `
        .quill-dark .ql-toolbar {
          background: rgba(255, 255, 255, 0.02);
          border: none !important;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1) !important;
        }
        .quill-dark .ql-container {
          border: none !important;
          min-height: 300px;
        }
        .quill-dark .ql-editor {
          color: white;
          min-height: 300px;
        }
        .quill-dark .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4);
        }
        .quill-dark .ql-stroke {
          stroke: rgba(255, 255, 255, 0.6);
        }
        .quill-dark .ql-fill {
          fill: rgba(255, 255, 255, 0.6);
        }
        .quill-dark .ql-picker-label {
          color: rgba(255, 255, 255, 0.6);
        }
        .quill-dark .ql-picker-options {
          background: #0a0b0f;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
      ` }} />
    </Modal>
  );
}
