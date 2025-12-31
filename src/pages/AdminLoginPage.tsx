import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Loader2, Shield, Zap, Terminal, AlertCircle, Server, Database, Key } from 'lucide-react';
import { GradientText } from '@/src/components/ui/GradientText';
import { supabase } from '../lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
    };
    checkSession();
  }, [supabase, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Simplified background effects */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Large gradient orbs */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #DD00FF 0%, transparent 70%)',
            transform: 'translate(-40%, -40%)'
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
            transform: 'translate(40%, 40%)'
          }}
        ></div>

        {/* Geometric shapes in background */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-white/5 -rotate-12 rounded-2xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase mb-6">
            Axis Cyber Technologies
          </h2>

          {/* Badges */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-bold text-white/70 tracking-wider uppercase">Secure</span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-bold text-white/70 tracking-wider uppercase">Encrypted</span>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 via-[#00FFFF]/10 to-[#DD00FF]/20 rounded-3xl blur-xl"></div>

          {/* Card */}
          <div className="relative bg-[#0B0D14]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-4 left-4 w-8 h-[2px] bg-white/40"></div>
              <div className="absolute top-4 left-4 w-[2px] h-8 bg-white/40"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-4 right-4 w-8 h-[2px] bg-white/40"></div>
              <div className="absolute top-4 right-4 w-[2px] h-8 bg-white/40"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
              <div className="absolute bottom-4 left-4 w-8 h-[2px] bg-white/40"></div>
              <div className="absolute bottom-4 left-4 w-[2px] h-8 bg-white/40"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-white/40"></div>
              <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-white/40"></div>
            </div>

            {/* Card content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center pb-6 border-b border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Key className="w-4 h-4 text-white/50" />
                  <h3 className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase">
                    Authentication Required
                  </h3>
                  <Shield className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Enter your credentials to access the admin dashboard
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-400 mb-1">Authentication Failed</p>
                    <p className="text-xs text-red-400/80">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-white/80 tracking-wider uppercase mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-white/30" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white text-black placeholder-black/40 border-2 border-white/20 focus:border-[#00FFFF] focus:outline-none transition-all duration-300 font-medium text-sm"
                      placeholder="admin@axiscyber.com"
                      required
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-xs font-bold text-white/80 tracking-wider uppercase mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-white/30 hover:text-white/60 transition-colors z-10"
                        disabled={isLoading}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Lock className="w-4 h-4 text-white/30 pointer-events-none" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white text-black placeholder-black/40 border-2 border-white/20 focus:border-[#00FFFF] focus:outline-none transition-all duration-300 font-medium text-sm"
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="relative w-full mt-8 group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DD00FF] via-[#FF0099] to-[#00FFFF] opacity-90 group-hover:opacity-100 transition-opacity"></div>

                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] opacity-0 group-hover:opacity-30 blur-xl transition-opacity"></div>

                  {/* Content */}
                  <div className="relative px-6 py-4 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span className="font-black text-white text-sm tracking-wide uppercase">Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 text-white" />
                        <span className="font-black text-white text-sm tracking-wide uppercase">Access Admin Portal</span>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Footer info */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20"></div>
                  <Shield className="w-3.5 h-3.5 text-white/40" />
                  <p className="text-xs font-bold text-white/40 tracking-wider uppercase">
                    Protected Access
                  </p>
                  <Shield className="w-3.5 h-3.5 text-white/40" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>

                {/* Status indicators */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <Server className="w-4 h-4 text-[#00FFFF] mx-auto mb-1.5" />
                    <p className="text-[10px] font-black text-white/50 tracking-wider uppercase">24/7 Active</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <Database className="w-4 h-4 text-[#DD00FF] mx-auto mb-1.5" />
                    <p className="text-[10px] font-black text-white/50 tracking-wider uppercase">Synced</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <Shield className="w-4 h-4 text-[#00FF9D] mx-auto mb-1.5" />
                    <p className="text-[10px] font-black text-white/50 tracking-wider uppercase">Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Note */}
        <div className="mt-8 relative">
          <div className="absolute -inset-px bg-gradient-to-r from-[#DD00FF]/10 to-[#00FFFF]/10 rounded-2xl blur-lg"></div>
          <div className="relative p-5 rounded-2xl bg-[#0B0D14]/80 backdrop-blur-xl border border-white/10">
            {/* Corner bracket */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#DD00FF]/10 border border-[#DD00FF]/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#DD00FF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60 leading-relaxed">
                  <strong className="text-[#DD00FF] font-black">DEVELOPMENT MODE:</strong> Authenticate using your Supabase credentials. Ensure proper authorization before accessing protected resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
