'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  Briefcase,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  cover_letter?: string;
  years_of_experience?: number;
  current_location?: string;
  status: string;
  created_at: string;
  jobs?: {
    title: string;
    department: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
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

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === 'all'
        ? '/api/job-applications'
        : `/api/job-applications?status=${selectedStatus}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setApplications(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    toast.promise(
      (async () => {
        const response = await fetch('/api/job-applications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to update status');

        fetchApplications();
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status });
        }
      })(),
      {
        loading: `Updating status to ${status}...`,
        success: `Status updated to ${status}!`,
        error: (err: any) => err.message || 'Failed to update status',
      }
    );
  };

  const deleteApplication = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Application',
      message: 'Are you sure you want to delete this application? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/job-applications?id=${id}`, {
              method: 'DELETE',
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete application');

            fetchApplications();
            if (selectedApp?.id === id) {
              setSelectedApp(null);
            }
          })(),
          {
            loading: 'Deleting application...',
            success: 'Application deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete application',
          }
        );
      },
    });
  };

  const statuses = ['all', 'new', 'reviewed', 'interview', 'rejected', 'hired'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'reviewed': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'interview': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'hired': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-white/60 bg-white/10 border-white/30';
    }
  };

  return (
    <AdminLayout title="Job Applications">
      {/* Filters */}
      <div className="flex items-center gap-3 mb-8">
        <Filter className="w-5 h-5 text-white/60" />
        <div className="flex gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize ${selectedStatus === status
                ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white'
                : 'bg-black/40 border-2 border-white/10 text-white/60 hover:bg-black/60'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State - Only on initial load or when no data */}
      {loading && applications.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-20">
          <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No applications found</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedApp?.id === app.id
                  ? 'bg-[var(--neon-purple)]/10 border-[var(--neon-purple)]/30'
                  : 'bg-black/20 border-white/10 hover:bg-black/40'
                  }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-black text-white mb-1">{app.full_name}</h3>
                    <p className="text-sm text-white/60">{app.jobs?.title}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border capitalize ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {app.email}
                  </span>
                  {app.years_of_experience && (
                    <span>{app.years_of_experience}y exp</span>
                  )}
                  <span>{new Date(app.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Application Details */}
          {selectedApp ? (
            <div className="sticky top-24">
              <div className="p-8 bg-black/40 border-2 border-[var(--neon-purple)]/30 rounded-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">{selectedApp.full_name}</h2>
                    <p className="text-white/70">{selectedApp.jobs?.title}</p>
                    <p className="text-sm text-white/50">{selectedApp.jobs?.department}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm font-bold border capitalize ${getStatusColor(selectedApp.status)}`}>
                    {selectedApp.status}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Email</p>
                    <a href={`mailto:${selectedApp.email}`} className="text-white hover:text-[var(--neon-cyan)] transition-colors">
                      {selectedApp.email}
                    </a>
                  </div>
                  {selectedApp.phone && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">Phone</p>
                      <a href={`tel:${selectedApp.phone}`} className="text-white hover:text-[var(--neon-cyan)] transition-colors">
                        {selectedApp.phone}
                      </a>
                    </div>
                  )}
                  {selectedApp.linkedin_url && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">LinkedIn</p>
                      <a href={selectedApp.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[var(--neon-cyan)] hover:underline flex items-center gap-1">
                        View Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {selectedApp.portfolio_url && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">Portfolio</p>
                      <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[var(--neon-cyan)] hover:underline flex items-center gap-1">
                        View Portfolio <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {selectedApp.resume_url && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">Resume</p>
                      <a href={selectedApp.resume_url} target="_blank" rel="noopener noreferrer" className="text-[var(--neon-purple)] hover:underline flex items-center gap-1">
                        View Resume <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {selectedApp.years_of_experience && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">Experience</p>
                      <p className="text-white">{selectedApp.years_of_experience} years</p>
                    </div>
                  )}
                  {selectedApp.current_location && (
                    <div>
                      <p className="text-xs text-white/50 mb-1">Location</p>
                      <p className="text-white">{selectedApp.current_location}</p>
                    </div>
                  )}
                </div>

                {selectedApp.cover_letter && (
                  <div className="mb-6 p-4 bg-black/40 border border-white/10 rounded-xl">
                    <p className="text-xs text-white/50 mb-2">Cover Letter</p>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{selectedApp.cover_letter}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <p className="text-sm text-white/60 font-bold mb-2">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'reviewed', 'interview', 'hired', 'rejected'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedApp.id, status)}
                        disabled={selectedApp.status === status}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${selectedApp.status === status
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:scale-105'
                          } ${getStatusColor(status)}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => deleteApplication(selectedApp.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-red-400 font-bold hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-white/40">
              <div className="text-center">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select an application to view details</p>
              </div>
            </div>
          )}
        </div>
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
