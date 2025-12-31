'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Job } from '../../hooks/useJobs';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface JobFormModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function JobFormModal({ job, isOpen, onClose, onSuccess }: JobFormModalProps) {
    const isEdit = !!job;

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        employment_type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
        experience_level: 'mid' as 'entry' | 'mid' | 'senior' | 'lead',
        salary_range: '',
        description: '',
        responsibilities: [''],
        requirements: [''],
        nice_to_have: [''],
        benefits: [''],
        is_active: true,
        is_remote: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    // Load job data if editing
    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title || '',
                department: job.department || '',
                location: job.location || '',
                employment_type: job.employment_type || 'full-time',
                experience_level: job.experience_level || 'mid',
                salary_range: job.salary_range || '',
                description: job.description || '',
                responsibilities: (job.responsibilities && job.responsibilities.length > 0) ? job.responsibilities : [''],
                requirements: (job.requirements && job.requirements.length > 0) ? job.requirements : [''],
                nice_to_have: (job.nice_to_have && job.nice_to_have.length > 0) ? job.nice_to_have : [''],
                benefits: (job.benefits && job.benefits.length > 0) ? job.benefits : [''],
                is_active: job.is_active ?? true,
                is_remote: job.is_remote ?? false,
            });
        } else {
            // Reset form for new job
            setFormData({
                title: '',
                department: '',
                location: '',
                employment_type: 'full-time',
                experience_level: 'mid',
                salary_range: '',
                description: '',
                responsibilities: [''],
                requirements: [''],
                nice_to_have: [''],
                benefits: [''],
                is_active: true,
                is_remote: false,
            });
        }
        setErrors({});
    }, [job, isOpen]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Job title is required';
        }
        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Job description is required';
        }
        if (formData.description.trim().length < 50) {
            newErrors.description = 'Description must be at least 50 characters';
        }

        const validResponsibilities = formData.responsibilities.filter(r => r.trim());
        if (validResponsibilities.length === 0) {
            newErrors.responsibilities = 'At least one responsibility is required';
        }

        const validRequirements = formData.requirements.filter(r => r.trim());
        if (validRequirements.length === 0) {
            newErrors.requirements = 'At least one requirement is required';
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
            const { supabase } = await import('../../lib/supabase');

            // Clean up array fields - remove empty strings
            const cleanData = {
                title: formData.title,
                department: formData.department,
                location: formData.location,
                employment_type: formData.employment_type,
                experience_level: formData.experience_level,
                salary_range: formData.salary_range,
                description: formData.description,
                responsibilities: formData.responsibilities.filter(r => r.trim()),
                requirements: formData.requirements.filter(r => r.trim()),
                nice_to_have: formData.nice_to_have.filter(r => r.trim()),
                benefits: formData.benefits.filter(r => r.trim()),
                is_active: formData.is_active,
                is_remote: formData.is_remote,
                updated_at: new Date().toISOString(),
            };

            let error;
            if (isEdit) {
                const { error: updateError } = await supabase
                    .from('jobs')
                    .update(cleanData)
                    .eq('id', job!.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('jobs')
                    .insert([{ ...cleanData, created_at: new Date().toISOString() }]);
                error = insertError;
            }

            if (error) throw error;

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Job save error:', error);
            const message = error.message || 'An error occurred';
            setErrors({ submit: message });
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    const addArrayItem = (field: 'responsibilities' | 'requirements' | 'nice_to_have' | 'benefits') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field: 'responsibilities' | 'requirements' | 'nice_to_have' | 'benefits', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const updateArrayItem = (field: 'responsibilities' | 'requirements' | 'nice_to_have' | 'benefits', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? 'Edit Job Posting' : 'Create New Job'}
            size="xl"
            footer={
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={saving} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" form="job-form" disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>{isEdit ? 'Update Job' : 'Create Job'}</>
                        )}
                    </Button>
                </div>
            }
        >
            <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {errors.submit && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-100 text-sm flex items-center gap-3 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
                        {errors.submit}
                    </div>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-black text-white">Basic Information</h3>

                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Senior Full-Stack Developer"
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                                }`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Department */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                                Department *
                            </label>
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white focus:outline-none transition-colors ${errors.department ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                                    }`}
                            >
                                <option value="" className="bg-[#0B0D14]">Select Department</option>
                                <option value="Engineering" className="bg-[#0B0D14]">Engineering</option>
                                <option value="Design" className="bg-[#0B0D14]">Design</option>
                                <option value="Product" className="bg-[#0B0D14]">Product</option>
                                <option value="Marketing" className="bg-[#0B0D14]">Marketing</option>
                                <option value="Sales" className="bg-[#0B0D14]">Sales</option>
                                <option value="Operations" className="bg-[#0B0D14]">Operations</option>
                                <option value="HR" className="bg-[#0B0D14]">HR</option>
                            </select>
                            {errors.department && <p className="mt-1 text-sm text-red-400">{errors.department}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g., Lahore, Pakistan"
                                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.location ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                                    }`}
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Employment Type */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                                Employment Type *
                            </label>
                            <select
                                value={formData.employment_type}
                                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value as any })}
                                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[#00FFFF]/50 focus:outline-none"
                            >
                                <option value="full-time" className="bg-[#0B0D14]">Full-Time</option>
                                <option value="part-time" className="bg-[#0B0D14]">Part-Time</option>
                                <option value="contract" className="bg-[#0B0D14]">Contract</option>
                                <option value="internship" className="bg-[#0B0D14]">Internship</option>
                            </select>
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-bold text-white/70 mb-2">
                                Experience Level *
                            </label>
                            <select
                                value={formData.experience_level}
                                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value as any })}
                                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[#00FFFF]/50 focus:outline-none"
                            >
                                <option value="entry" className="bg-[#0B0D14]">Entry Level</option>
                                <option value="mid" className="bg-[#0B0D14]">Mid Level</option>
                                <option value="senior" className="bg-[#0B0D14]">Senior Level</option>
                                <option value="lead" className="bg-[#0B0D14]">Lead / Principal</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary Range (Optional) */}
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Salary Range (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.salary_range}
                            onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                            placeholder="e.g., $80,000 - $120,000 / year"
                            className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5 accent-[#00FF9D]"
                            />
                            <span className="text-white font-bold">Active Position</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.is_remote}
                                onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
                                className="w-5 h-5 accent-[#00FFFF]"
                            />
                            <span className="text-white font-bold">Remote Allowed</span>
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <h3 className="text-lg font-black text-white">Job Description</h3>

                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the role, team, and what the candidate will work on..."
                            rows={6}
                            className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors resize-none ${errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-[#00FFFF]/50'
                                }`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                        <p className="mt-1 text-xs text-white/40">
                            {formData.description.length} characters
                        </p>
                    </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-white">Responsibilities *</h3>
                        <button
                            type="button"
                            onClick={() => addArrayItem('responsibilities')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] text-sm font-bold hover:bg-[#00FFFF]/20 hover:border-[#00FFFF] transition-all group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.responsibilities.map((item, index) => (
                            <div key={index} className="flex gap-2 group animate-fade-in">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('responsibilities', index, e.target.value)}
                                        placeholder="e.g., Design and develop scalable web applications"
                                        className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none transition-all"
                                    />
                                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-6 bg-[#00FFFF] rounded-full transition-all duration-300" />
                                </div>
                                {formData.responsibilities.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('responsibilities', index)}
                                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all self-start"
                                        title="Remove item"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.responsibilities && <p className="text-sm text-red-400">{errors.responsibilities}</p>}
                </div>

                {/* Requirements */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-white">Requirements *</h3>
                        <button
                            type="button"
                            onClick={() => addArrayItem('requirements')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] text-sm font-bold hover:bg-[#00FFFF]/20 hover:border-[#00FFFF] transition-all group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.requirements.map((item, index) => (
                            <div key={index} className="flex gap-2 group animate-fade-in">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                                        placeholder="e.g., 5+ years of experience with React and Node.js"
                                        className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none transition-all"
                                    />
                                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-6 bg-[#00FFFF] rounded-full transition-all duration-300" />
                                </div>
                                {formData.requirements.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('requirements', index)}
                                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all self-start"
                                        title="Remove item"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.requirements && <p className="text-sm text-red-400">{errors.requirements}</p>}
                </div>

                {/* Nice to Have */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-white">Nice to Have (Optional)</h3>
                        <button
                            type="button"
                            onClick={() => addArrayItem('nice_to_have')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 text-sm font-bold hover:bg-white/10 hover:text-white transition-all group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.nice_to_have.map((item, index) => (
                            <div key={index} className="flex gap-2 group animate-fade-in">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('nice_to_have', index, e.target.value)}
                                        placeholder="e.g., Experience with GraphQL and TypeScript"
                                        className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none transition-all"
                                    />
                                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-6 bg-white/30 rounded-full transition-all duration-300" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('nice_to_have', index)}
                                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all self-start"
                                    title="Remove item"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 pt-6 border-t-2 border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-white">Benefits (Optional)</h3>
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 text-sm font-bold hover:bg-white/10 hover:text-white transition-all group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.benefits.map((item, index) => (
                            <div key={index} className="flex gap-2 group animate-fade-in">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                                        placeholder="e.g., Health insurance, 401k matching, flexible hours"
                                        className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[#00FFFF]/50 focus:outline-none transition-all"
                                    />
                                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-6 bg-white/30 rounded-full transition-all duration-300" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('benefits', index)}
                                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all self-start"
                                    title="Remove item"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {errors.benefits && <p className="text-sm text-red-400">{errors.benefits}</p>}
            </form>
        </Modal>
    );
}
