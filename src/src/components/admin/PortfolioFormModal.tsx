'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button'
import { PortfolioItem } from '../../hooks/usePortfolio';
import { Loader2, X, Plus, Image as ImageIcon } from 'lucide-react';

interface PortfolioFormModalProps {
    item: PortfolioItem | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

import { supabase } from '../../lib/supabase';

export function PortfolioFormModal({ item, isOpen, onClose, onSuccess }: PortfolioFormModalProps) {
    const isEdit = !!item;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        featured_image_url: '',
        gallery_images: [] as string[],
        category: '',
        tags: [] as string[],
        client_name: '',
        project_url: '',
        repository_url: '',
        technologies: [] as string[],
        completion_date: '',
        is_featured: false,
        is_active: true,
        display_order: 0,
    });

    const [newTag, setNewTag] = useState('');
    const [newTech, setNewTech] = useState('');
    const [newGalleryImage, setNewGalleryImage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    // Load item data if editing
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title || '',
                slug: item.slug || '',
                description: item.description || '',
                featured_image_url: item.featured_image_url || '',
                gallery_images: item.gallery_images || [],
                category: item.category || '',
                tags: item.tags || [],
                client_name: item.client_name || '',
                project_url: item.project_url || '',
                repository_url: item.repository_url || '',
                technologies: item.technologies || [],
                completion_date: item.completion_date || '',
                is_featured: item.is_featured || false,
                is_active: item.is_active !== undefined ? item.is_active : true,
                display_order: item.display_order || 0,
            });
        } else {
            // Reset form for new item
            setFormData({
                title: '',
                slug: '',
                description: '',
                featured_image_url: '',
                gallery_images: [],
                category: '',
                tags: [],
                client_name: '',
                project_url: '',
                repository_url: '',
                technologies: [],
                completion_date: '',
                is_featured: false,
                is_active: true,
                display_order: 0,
            });
        }
        setErrors({});
    }, [item, isOpen]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEdit && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, isEdit]);

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
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSaving(true);

        try {
            const dataToSave = {
                title: formData.title,
                slug: formData.slug,
                summary: formData.description,
                featured_image: formData.featured_image_url,
                gallery_images: formData.gallery_images,
                project_type: formData.category,
                client_name: formData.client_name,
                project_url: formData.project_url,
                github_url: formData.repository_url,
                technologies: formData.technologies,
                services: formData.tags,
                completion_date: formData.completion_date || null,
                is_featured: formData.is_featured,
                status: formData.is_active ? 'published' : 'draft',
                display_order: formData.display_order,
                updated_at: new Date().toISOString(),
            };

            let error;
            if (isEdit) {
                const { error: updateError } = await supabase
                    .from('case_studies')
                    .update(dataToSave)
                    .eq('id', item!.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('case_studies')
                    .insert([{ ...dataToSave, created_at: new Date().toISOString() }]);
                error = insertError;
            }

            if (error) throw error;

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Error saving portfolio item:', error);
            setErrors({ submit: error.message || 'An error occurred' });
        } finally {
            setSaving(false);
        }
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            });
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag),
        });
    };

    const addTech = () => {
        if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
            setFormData({
                ...formData,
                technologies: [...formData.technologies, newTech.trim()],
            });
            setNewTech('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter(t => t !== tech),
        });
    };

    const addGalleryImage = () => {
        if (newGalleryImage.trim() && !formData.gallery_images.includes(newGalleryImage.trim())) {
            setFormData({
                ...formData,
                gallery_images: [...formData.gallery_images, newGalleryImage.trim()],
            });
            setNewGalleryImage('');
        }
    };

    const removeGalleryImage = (image: string) => {
        setFormData({
            ...formData,
            gallery_images: formData.gallery_images.filter(i => i !== image),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? 'Edit Portfolio Item' : 'Create Portfolio Item'}
            size="2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {errors.submit && (
                    <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
                        {errors.submit}
                    </div>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-black text-white">Basic Information</h3>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Project Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., E-Commerce Platform Redesign"
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                                }`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            URL Slug *
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 text-sm">/portfolio/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="url-friendly-slug"
                                className={`flex-1 px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                                    }`}
                            />
                        </div>
                        {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white focus:outline-none transition-colors ${errors.category ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                                }`}
                        >
                            <option value="">Select category...</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Cloud/DevOps">Cloud/DevOps</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Enterprise Software">Enterprise Software</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the project..."
                            rows={4}
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                                }`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                    </div>
                </div>

                {/* Media */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <h3 className="text-lg font-black text-white">Media</h3>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.featured_image_url}
                            onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                            placeholder="Paste image URL from Media Library"
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                        />
                        {formData.featured_image_url && (
                            <div className="mt-2 rounded-xl overflow-hidden border-2 border-white/10">
                                <img
                                    src={formData.featured_image_url}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Gallery Images
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="url"
                                value={newGalleryImage}
                                onChange={(e) => setNewGalleryImage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                                placeholder="Paste image URL"
                                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                            />
                            <Button type="button" variant="secondary" onClick={addGalleryImage}>
                                <Plus className="w-4 h-4" />
                                Add
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {formData.gallery_images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border-2 border-white/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(image)}
                                        className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <h3 className="text-lg font-black text-white">Project Details</h3>

                    {/* Client Name */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Client Name (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.client_name}
                            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                            placeholder="e.g., Acme Corporation"
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                        />
                    </div>

                    {/* Project URL */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Live Project URL (Optional)
                        </label>
                        <input
                            type="url"
                            value={formData.project_url}
                            onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                        />
                    </div>

                    {/* Repository URL */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Repository URL (Optional)
                        </label>
                        <input
                            type="url"
                            value={formData.repository_url}
                            onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                        />
                    </div>

                    {/* Completion Date */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Completion Date (Optional)
                        </label>
                        <input
                            type="date"
                            value={formData.completion_date}
                            onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Technologies & Tags */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <h3 className="text-lg font-black text-white">Technologies & Tags</h3>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Technologies
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                placeholder="e.g., React, Node.js"
                                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                            />
                            <Button type="button" variant="secondary" onClick={addTech}>
                                <Plus className="w-4 h-4" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-lg text-sm text-[var(--neon-cyan)] font-bold flex items-center gap-2"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTech(tech)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="e.g., responsive, modern"
                                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                            />
                            <Button type="button" variant="secondary" onClick={addTag}>
                                <Plus className="w-4 h-4" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white/5 border-2 border-white/20 rounded-lg text-sm text-white/70 font-bold flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <h3 className="text-lg font-black text-white">Settings</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Featured */}
                        <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-purple)]/30 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                className="w-5 h-5"
                            />
                            <div>
                                <span className="font-black text-white block">Featured</span>
                                <span className="text-xs text-white/60">Show on homepage</span>
                            </div>
                        </label>

                        {/* Active */}
                        <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-purple)]/30 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5"
                            />
                            <div>
                                <span className="font-black text-white block">Active</span>
                                <span className="text-xs text-white/60">Visible to public</span>
                            </div>
                        </label>

                        {/* Display Order */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                                Display Order
                            </label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                min="0"
                                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t-2 border-white/10">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>{isEdit ? 'Update Item' : 'Create Item'}</>
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
