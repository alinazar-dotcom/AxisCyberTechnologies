'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  Mail,
  Send,
  Plus,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  campaign_type: string;
  scheduled_at?: string;
  total_recipients: number;
  total_sent: number;
  total_opens: number;
  total_clicks: number;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  template_type: string;
  is_active: boolean;
  created_at: string;
}

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates'>('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    preview_text: '',
    html_content: '',
    campaign_type: 'newsletter',
  });
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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [campaignsRes, templatesRes] = await Promise.all([
        fetch('/api/email-campaigns'),
        fetch('/api/email-templates'),
      ]);

      const campaignsData = await campaignsRes.json();
      const templatesData = await templatesRes.json();

      if (campaignsData.success) setCampaigns(campaignsData.data || []);
      if (templatesData.success) setTemplates(templatesData.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    toast.promise(
      (async () => {
        const response = await fetch('/api/email-campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCampaign),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to create campaign');

        setShowNewCampaign(false);
        setNewCampaign({
          name: '',
          subject: '',
          preview_text: '',
          html_content: '',
          campaign_type: 'newsletter',
        });
        fetchData();
        return result;
      })(),
      {
        loading: 'Creating campaign...',
        success: 'Campaign created successfully!',
        error: (err: any) => err.message || 'Failed to create campaign',
      }
    );
  };

  const deleteCampaign = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Campaign',
      message: 'Are you sure you want to delete this campaign? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/email-campaigns?id=${id}`, { method: 'DELETE' });
            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete campaign');
            fetchData();
          })(),
          {
            loading: 'Deleting campaign...',
            success: 'Campaign deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete campaign',
          }
        );
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
      case 'scheduled': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'sending': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'sent': return 'bg-green-500/10 border-green-500/30 text-green-400';
      default: return 'bg-white/10 border-white/30 text-white/60';
    }
  };

  const stats = {
    total_campaigns: campaigns.length,
    total_sent: campaigns.reduce((sum, c) => sum + c.total_sent, 0),
    avg_open_rate: campaigns.length > 0
      ? (campaigns.reduce((sum, c) => sum + (c.total_opens / Math.max(c.total_sent, 1) * 100), 0) / campaigns.length).toFixed(1)
      : 0,
    total_templates: templates.length,
  };

  return (
    <AdminLayout title="Email Marketing">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-purple)]/5 border-2 border-[var(--neon-purple)]/30 rounded-2xl">
          <Mail className="w-8 h-8 text-[var(--neon-purple)] mb-4" />
          <h3 className="text-3xl font-black text-white mb-1">{stats.total_campaigns}</h3>
          <p className="text-white/60 font-bold text-sm">Total Campaigns</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/30 rounded-2xl">
          <Send className="w-8 h-8 text-[var(--neon-cyan)] mb-4" />
          <h3 className="text-3xl font-black text-white mb-1">{stats.total_sent.toLocaleString()}</h3>
          <p className="text-white/60 font-bold text-sm">Emails Sent</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-pink)]/10 to-[var(--neon-pink)]/5 border-2 border-[var(--neon-pink)]/30 rounded-2xl">
          <BarChart3 className="w-8 h-8 text-[var(--neon-pink)] mb-4" />
          <h3 className="text-3xl font-black text-white mb-1">{stats.avg_open_rate}%</h3>
          <p className="text-white/60 font-bold text-sm">Avg Open Rate</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-green)]/10 to-[var(--neon-green)]/5 border-2 border-[var(--neon-green)]/30 rounded-2xl">
          <Zap className="w-8 h-8 text-[var(--neon-green)] mb-4" />
          <h3 className="text-3xl font-black text-white mb-1">{stats.total_templates}</h3>
          <p className="text-white/60 font-bold text-sm">Templates</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'campaigns'
            ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white'
            : 'bg-black/40 border-2 border-white/10 text-white/60 hover:bg-black/60'
            }`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'templates'
            ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white'
            : 'bg-black/40 border-2 border-white/10 text-white/60 hover:bg-black/60'
            }`}
        >
          Templates
        </button>
        <button
          onClick={() => setShowNewCampaign(true)}
          className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-lg font-bold text-white hover:shadow-[0_0_30px_var(--glow-purple)] transition-all"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-8 bg-[var(--bg-secondary)] border-2 border-[var(--neon-purple)]/30 rounded-2xl">
            <h2 className="text-2xl font-black text-white mb-6">Create New Campaign</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30"
                  placeholder="Monthly Newsletter - January 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Subject Line</label>
                <input
                  type="text"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30"
                  placeholder="📰 This Month at Axis Cyber Technologies"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Preview Text</label>
                <input
                  type="text"
                  value={newCampaign.preview_text}
                  onChange={(e) => setNewCampaign({ ...newCampaign, preview_text: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30"
                  placeholder="Latest insights, blog posts, and updates..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Campaign Type</label>
                <select
                  value={newCampaign.campaign_type}
                  onChange={(e) => setNewCampaign({ ...newCampaign, campaign_type: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30"
                >
                  <option value="newsletter">Newsletter</option>
                  <option value="promotional">Promotional</option>
                  <option value="announcement">Announcement</option>
                  <option value="transactional">Transactional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">HTML Content</label>
                <textarea
                  rows={6}
                  value={newCampaign.html_content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, html_content: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30 resize-none font-mono text-sm"
                  placeholder="<html><body>...</body></html>"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={createCampaign}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl font-bold text-white hover:shadow-[0_0_30px_var(--glow-purple)] transition-all"
              >
                Create Campaign
              </button>
              <button
                onClick={() => setShowNewCampaign(false)}
                className="px-6 py-3 bg-black/40 border-2 border-white/10 rounded-xl font-bold text-white/60 hover:bg-black/60 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'campaigns' ? (
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No campaigns yet. Create your first one!</p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl hover:bg-black/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-white">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border capitalize ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-white/70 mb-3">{campaign.subject}</p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {campaign.total_sent.toLocaleString()} sent
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {campaign.total_opens.toLocaleString()} opens
                      </span>
                      {campaign.total_sent > 0 && (
                        <span className="text-[var(--neon-green)]">
                          {((campaign.total_opens / campaign.total_sent) * 100).toFixed(1)}% open rate
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                      <Eye className="w-5 h-5 text-white/60" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                      <Edit2 className="w-5 h-5 text-white/60" />
                    </button>
                    <button onClick={() => deleteCampaign(campaign.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all">
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl hover:bg-black/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-black text-white">{template.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${template.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                  {template.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-white/60 mb-3">{template.subject}</p>
              <p className="text-xs text-white/40 capitalize">{template.template_type}</p>
            </div>
          ))}
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
