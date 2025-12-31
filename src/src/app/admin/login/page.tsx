'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
        router.push('/admin');
      }
    };
    checkSession();
  }, [supabase, router]);

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
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-12">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[140px] opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[140px] opacity-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] p-[2px] mb-6">
            <div className="w-full h-full rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Shield className="w-10 h-10 text-[var(--neon-cyan)]" />
            </div>
          </div>

          <h1 className="text-3xl font-black mb-2">
            <GradientText gradient="purple-cyan">
              Admin Portal
            </GradientText>
          </h1>
          <p className="text-[var(--text-muted)]">
            Axis Cyber Technologies
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="card-neon p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-[var(--neon-red)]/10 border-2 border-[var(--neon-red)]/30 text-[var(--neon-red)] text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-white/40" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                placeholder="admin@axiscyber.tech"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-white/40" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/70 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading || !email || !password}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Sign In
              </>
            )}
          </Button>

          {/* Info */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-center text-white/50">
              Protected admin access only
            </p>
          </div>
        </form>

        {/* Development Note */}
        <div className="mt-6 p-4 rounded-xl bg-[var(--neon-purple)]/5 border border-[var(--neon-purple)]/20">
          <p className="text-xs text-center text-white/60">
            <strong className="text-[var(--neon-purple)]">Development Mode:</strong> Use Supabase Auth credentials
          </p>
        </div>
      </div>
    </div>
  );
}
