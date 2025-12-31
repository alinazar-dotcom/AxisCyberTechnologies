'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Loader2, CheckCircle, AlertCircle, User, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
  parent_comment_id?: string;
  replies?: Comment[];
}

interface BlogCommentsProps {
  blogPostId: string;
  blogPostTitle: string;
}

interface CommentFormProps {
  parentId?: string;
  onCancel?: () => void;
  formData: { author_name: string; author_email: string; content: string };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent, parentId?: string) => Promise<void>;
  submitting: boolean;
}

const CommentForm = ({ parentId, onCancel, formData, setFormData, handleSubmit, submitting }: CommentFormProps) => (
  <form onSubmit={(e) => handleSubmit(e, parentId)} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-white/80 mb-2">
          Name *
        </label>
        <input
          type="text"
          required
          value={formData.author_name}
          onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
          className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/30 transition-all"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white/80 mb-2">
          Email *
        </label>
        <input
          type="email"
          required
          value={formData.author_email}
          onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
          className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/30 transition-all"
          placeholder="your@email.com"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-semibold text-white/80 mb-2">
        Comment *
      </label>
      <textarea
        required
        rows={4}
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/30 transition-all resize-none"
        placeholder={parentId ? "Write your reply..." : "Share your thoughts..."}
      />
    </div>
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(221,0,255,0.3)] transition-all disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {submitting ? 'Submitting...' : 'Submit Comment'}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl font-bold text-white/80 hover:bg-white/20 transition-all"
        >
          Cancel
        </button>
      )}
    </div>
    <p className="text-sm text-white/50">
      * Your comment will be posted immediately.
    </p>
  </form>
);

const CommentCard = ({
  comment,
  isReply = false,
  replyingTo,
  setReplyingTo,
  formData,
  setFormData,
  handleSubmit,
  submitting,
  formatDate
}: {
  comment: Comment;
  isReply?: boolean;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent, parentId?: string) => Promise<void>;
  submitting: boolean;
  formatDate: (d: string) => string;
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`relative ${isReply ? 'ml-8 md:ml-16 mt-4' : 'mt-8'}`}>
      {/* Thread Line for Replies */}
      {isReply && (
        <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-gradient-to-b from-[#DD00FF]/50 to-transparent"></div>
      )}

      <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${isReply
        ? 'bg-white/[0.03] border-white/5 hover:border-[#DD00FF]/20'
        : 'bg-white/[0.05] border-white/10 hover:border-[#00FFFF]/20'
        }`}>
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${isReply ? 'from-[#DD00FF]/20 to-[#00FFFF]/20' : 'from-[#00FFFF] to-[#DD00FF]'
              }`}>
              <User className={`w-5 h-5 ${isReply ? 'text-white/60' : 'text-white'}`} />
            </div>
            <div>
              <h4 className={`font-bold ${isReply ? 'text-white/80' : 'text-white'}`}>
                {comment.author_name}
                {isReply && <span className="ml-2 text-[10px] uppercase tracking-widest text-[#DD00FF]/60 font-black">Reply</span>}
              </h4>
              <div className="flex items-center gap-2 text-sm text-white/40 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(comment.created_at)}
              </div>
            </div>
          </div>
        </div>

        {/* Comment Content */}
        <p className={`leading-relaxed mb-4 ${isReply ? 'text-white/70 text-sm' : 'text-white/90'}`}>
          {comment.content}
        </p>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Reply Button (Now available for all levels) */}
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="group flex items-center gap-2 text-sm font-bold text-[#DD00FF] hover:text-[#00FFFF] transition-all"
          >
            <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Reply
          </button>

          {/* See Replies Toggle */}
          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 text-sm font-bold text-[#00FFFF] hover:text-white transition-all"
            >
              <div className={`w-5 h-5 rounded-lg bg-[#00FFFF]/10 flex items-center justify-center transition-transform duration-300 ${showReplies ? 'rotate-180' : ''}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showReplies ? 'Hide Replies' : `See Replies (${comment.replies?.length})`}
            </button>
          )}
        </div>

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <div className="mt-6 p-6 bg-black/40 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2 mb-4 text-[#DD00FF]">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Replying to {comment.author_name}</span>
            </div>
            <CommentForm
              parentId={comment.id}
              onCancel={() => setReplyingTo(null)}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>
        )}
      </div>

      {/* Recursive Replies (Collapsible) */}
      {hasReplies && showReplies && (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
          {comment.replies!.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              isReply
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              submitting={submitting}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function BlogComments({ blogPostId, blogPostTitle }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, [blogPostId]);

  const fetchComments = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setTotalComments(data.length);
        // Build comment tree
        const commentMap = new Map<string, Comment>();
        const rootComments: Comment[] = [];

        data.forEach((c: any) => {
          const comment: Comment = { ...c, replies: [] };
          commentMap.set(c.id, comment);
        });

        data.forEach((c: any) => {
          const comment = commentMap.get(c.id)!;
          if (c.parent_comment_id && commentMap.has(c.parent_comment_id)) {
            const parent = commentMap.get(c.parent_comment_id)!;
            parent.replies!.push(comment);
          } else {
            rootComments.push(comment);
          }
        });

        setComments(rootComments);
      }
    } catch (error: any) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          blog_post_id: blogPostId,
          author_name: formData.author_name,
          author_email: formData.author_email,
          content: formData.content,
          parent_comment_id: parentId || null,
          is_approved: true,
          status: 'approved'
        });

      if (error) throw error;

      setSubmitStatus({
        type: 'success',
        message: 'Comment submitted successfully!',
      });
      setFormData({ author_name: '', author_email: '', content: '' });
      setShowForm(false);
      setReplyingTo(null);

      // Refresh comments list immediately without showing main loader
      await fetchComments(true);
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-16 pt-16 border-t-2 border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-[#DD00FF]" />
          <h2 className="text-3xl font-black text-white">
            Comments ({totalComments})
          </h2>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(221,0,255,0.3)] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Add Comment
          </button>
        )}
      </div>

      {/* Submit Status */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-xl border-2 mb-6 flex items-center gap-3 ${submitStatus.type === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      {/* Comment Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-black/40 border-2 border-[#DD00FF]/20 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Leave a Comment</h3>
          <CommentForm
            onCancel={() => setShowForm(false)}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#DD00FF] animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-xl font-bold text-white/60 mb-2">No comments yet</p>
          <p className="text-white/40">Be the first to share your thoughts!</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(221,0,255,0.3)] transition-all"
            >
              Add First Comment
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              submitting={submitting}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
