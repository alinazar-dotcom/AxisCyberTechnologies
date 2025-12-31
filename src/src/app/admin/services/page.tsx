'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, EyeOff, Star } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { GradientText } from '@/components/ui/GradientText';
import { useServices, Service } from '@/hooks/useServices';
import { Button } from '@/components/ui/Button';
import { ServiceFormModal } from '@/components/admin/ServiceFormModal';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export default function ServicesManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'display_order' | 'projects_completed'>('display_order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
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

  const { services, loading, error, refetch } = useServices({
    search: searchQuery,
    sortBy,
    sortOrder,
    limit: 50,
  });

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Service',
      message: 'Are you sure you want to delete this service? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/services/${id}`, {
              method: 'DELETE',
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete service');

            refetch();
          })(),
          {
            loading: 'Deleting service...',
            success: 'Service deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete service',
          }
        );
      },
    });
  };

  const handleToggleActive = async (service: Service) => {
    toast.promise(
      (async () => {
        const response = await fetch(`/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...service,
            is_active: !service.is_active,
          }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to update service');
        refetch();
      })(),
      {
        loading: 'Updating service status...',
        success: `Service ${!service.is_active ? 'activated' : 'deactivated'} successfully!`,
        error: (err: any) => err.message || 'Failed to update service',
      }
    );
  };

  const handleToggleFeatured = async (service: Service) => {
    toast.promise(
      (async () => {
        const response = await fetch(`/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...service,
            is_featured: !service.is_featured,
          }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to update service');
        refetch();
      })(),
      {
        loading: 'Updating featured status...',
        success: `Service ${!service.is_featured ? 'featured' : 'unfeatured'} successfully!`,
        error: (err: any) => err.message || 'Failed to update service',
      }
    );
  };

  const handleFormSuccess = () => {
    toast.success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
    refetch();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Services Manager
            </h1>
            <p className="text-white/60">
              Manage all 12 services and their details
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditingService(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="display_order">Sort by Order</option>
            <option value="name">Sort by Name</option>
            <option value="projects_completed">Sort by Projects</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white hover:border-[var(--neon-purple)]/50 transition-colors flex items-center gap-2"
          >
            <ArrowUpDown className="w-5 h-5" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        {/* Services Count */}
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>{services.length} services found</span>
          <span>•</span>
          <span>{services.filter(s => s.is_active).length} active</span>
          <span>•</span>
          <span>{services.filter(s => s.is_featured).length} featured</span>
        </div>

        {/* Loading State - Only on initial load or when no data */}
        {loading && services.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
            <p className="text-red-400 font-black">{error}</p>
          </div>
        )}

        {/* Services Grid */}
        {services.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Service Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-black text-white truncate">
                        {service.name}
                      </h3>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {service.is_featured && (
                          <span className="px-2 py-1 bg-[var(--neon-orange)]/10 border border-[var(--neon-orange)]/30 rounded-lg text-xs text-[var(--neon-orange)] font-black">
                            FEATURED
                          </span>
                        )}
                        {service.is_active ? (
                          <span className="px-2 py-1 bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 rounded-lg text-xs text-[var(--neon-green)] font-black">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-white/10 border border-white/30 rounded-lg text-xs text-white/50 font-black">
                            INACTIVE
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {service.short_description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Projects:</span>
                        <span className="text-[var(--neon-cyan)] font-black">
                          {service.projects_completed}+
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Success Rate:</span>
                        <span className="text-[var(--neon-green)] font-black">
                          {service.success_rate}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Order:</span>
                        <span className="text-white/70 font-black">
                          #{service.display_order}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Views:</span>
                        <span className="text-[var(--neon-purple)] font-black">
                          {service.views}
                        </span>
                      </div>
                    </div>

                    {/* Technologies */}
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.technologies.slice(0, 5).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/[0.03] border border-white/10 rounded text-xs text-white/60 font-black"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 5 && (
                          <span className="px-2 py-1 text-xs text-[var(--neon-cyan)] font-black">
                            +{service.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(service)}
                      className={`p-2 rounded-lg border-2 transition-all ${service.is_featured
                        ? 'bg-[var(--neon-orange)]/10 border-[var(--neon-orange)]/30 text-[var(--neon-orange)]'
                        : 'bg-black/40 border-white/10 text-white/40 hover:border-[var(--neon-orange)]/30'
                        }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`p-2 rounded-lg border-2 transition-all ${service.is_active
                        ? 'bg-[var(--neon-green)]/10 border-[var(--neon-green)]/30 text-[var(--neon-green)]'
                        : 'bg-black/40 border-white/10 text-white/40 hover:border-[var(--neon-green)]/30'
                        }`}
                      title="Toggle Active"
                    >
                      {service.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={() => {
                        setEditingService(service);
                        setShowModal(true);
                      }}
                      className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                      title="Edit Service"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                      title="Delete Service"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery ? `No services found for "${searchQuery}"` : 'No services yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery ? 'Try a different search term' : 'Click "Add New Service" to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Service Form Modal */}
      <ServiceFormModal
        service={editingService}
        isOpen={showModal}
        onSuccess={handleFormSuccess}
        onClose={() => setShowModal(false)}
      />
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