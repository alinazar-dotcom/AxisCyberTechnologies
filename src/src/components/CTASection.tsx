'use client';

import { ArrowRight, Calendar, Sparkles, Zap, Award, Users, TrendingUp, CheckCircle2, MessageSquare, Video, Mail, Phone, Globe, Shield, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from './ui/GradientText';

export function CTASection() {
  return (
    <section className="py-20 md:py-28 lg:py-36 relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[var(--neon-purple)] rounded-full blur-[160px] opacity-20 animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[var(--neon-cyan)] rounded-full blur-[140px] opacity-15 animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
      </div>
      
      {/* Neon grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(221,0,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(221,0,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="relative rounded-[2rem] overflow-hidden">
          {/* Ultra neon animated gradient border */}
          <div className="absolute inset-0 rounded-[2rem] p-[3px]" style={{
            background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-cyan), var(--neon-green), var(--neon-pink), var(--neon-purple))',
            backgroundSize: '400% 100%',
            animation: 'borderFlow 10s linear infinite',
          }}>
            <div className="absolute inset-[3px] bg-black/80 backdrop-blur-2xl rounded-[2rem]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 lg:p-24 text-center space-y-12 md:space-y-14">
            {/* Animated background stars */}
            <div className="absolute inset-0 opacity-[0.08]">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${Math.random() < 0.7 ? 1 : 2}px`,
                    height: `${Math.random() < 0.7 ? 1 : 2}px`,
                    backgroundColor: i % 3 === 0 ? 'var(--neon-purple)' : i % 3 === 1 ? 'var(--neon-cyan)' : 'var(--neon-green)',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    boxShadow: i % 3 === 0 ? '0 0 8px var(--neon-purple)' : i % 3 === 1 ? '0 0 8px var(--neon-cyan)' : '0 0 8px var(--neon-green)'
                  }}
                ></div>
              ))}
            </div>

            <div className="relative space-y-10 md:space-y-12 max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border-2 border-[var(--border-purple)] rounded-full backdrop-blur-md shadow-[0_0_40px_var(--glow-purple)] group cursor-pointer hover:shadow-[0_0_60px_var(--glow-purple-intense)] transition-all duration-700">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent rounded-full pointer-events-none"></div>
                
                <Sparkles className="w-5 h-5 text-[var(--neon-purple)] animate-pulse" style={{filter: 'drop-shadow(0 0 10px var(--neon-purple))'}} />
                <span className="text-white font-black tracking-[0.15em] uppercase">🚀 READY TO TRANSFORM</span>
                <Zap className="w-5 h-5 text-[var(--neon-green)] animate-pulse" style={{filter: 'drop-shadow(0 0 10px var(--neon-green))', animationDelay: '0.5s'}} />
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <GradientText 
                  variant="cyan-purple" 
                  className="drop-shadow-[0_0_40px_var(--glow-purple-intense)]"
                  style={{
                    backgroundSize: '200% auto',
                    animation: 'gradientShift 6s ease-in-out infinite'
                  }}
                >
                  Let's Build Something
                  <br />
                  Extraordinary Together
                </GradientText>
              </h2>

              {/* Description */}
              <p className="text-body-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                Transform your vision into reality with a team that combines <span className="text-[var(--neon-purple)] font-black">deep technical expertise</span>, 
                <span className="text-[var(--neon-cyan)] font-black"> creative innovation</span>, and 
                <span className="text-[var(--neon-green)] font-black"> unwavering commitment</span> to 100% excellence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                {/* Primary Button */}
                <Link href="/contact" className="group relative px-12 md:px-14 py-6 md:py-7 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white rounded-2xl font-black text-lg md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-[0_20px_60px_var(--glow-purple)] hover:shadow-[0_30px_80px_var(--glow-purple-intense)] border-2 border-[var(--border-purple)]">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                    <span>Start Your Project</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>

                {/* Secondary Button */}
                <Link href="/contact" className="group relative px-12 md:px-14 py-6 md:py-7 bg-black/50 border-2 border-[var(--border-green)] text-white rounded-2xl font-black text-lg md:text-xl backdrop-blur-xl transition-all duration-500 hover:bg-black/70 hover:border-[var(--neon-green)]/60 hover:scale-105 hover:-translate-y-1 shadow-[0_20px_60px_var(--glow-green)] hover:shadow-[0_30px_80px_var(--glow-green-intense)]">
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6 text-[var(--neon-green)] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px var(--glow-green))' }} />
                    <span>Schedule Consultation</span>
                  </div>
                </Link>
              </div>

              {/* Contact Options */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-body text-white/70">
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[var(--border-purple)] flex items-center justify-center group-hover:bg-white/10 group-hover:border-[var(--neon-purple)]/60 transition-all duration-300">
                    <Video className="w-5 h-5 text-[var(--neon-purple)]" />
                  </div>
                  <span className="font-black">Video Call</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[var(--border-cyan)] flex items-center justify-center group-hover:bg-white/10 group-hover:border-[var(--neon-cyan)]/60 transition-all duration-300">
                    <MessageSquare className="w-5 h-5 text-[var(--neon-cyan)]" />
                  </div>
                  <span className="font-black">Live Chat</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[var(--border-green)] flex items-center justify-center group-hover:bg-white/10 group-hover:border-[var(--neon-green)]/60 transition-all duration-300">
                    <Mail className="w-5 h-5 text-[var(--neon-green)]" />
                  </div>
                  <span className="font-black">Email Us</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="pt-16 md:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-t-2 border-[var(--border-purple)] pt-12 md:pt-16">
                  {/* Stat 1 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--neon-purple)]" style={{textShadow: '0 0 40px var(--glow-purple)'}}>
                        500+
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[var(--neon-purple)] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-body text-white/80 font-black group-hover:text-white transition-colors duration-300">Projects Delivered Worldwide</p>
                    <div className="flex items-center justify-center gap-2 text-body-small text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-[var(--neon-green)]" style={{ filter: 'drop-shadow(0 0 10px var(--glow-green))' }} />
                      <span className="font-black">100% Success Rate</span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--neon-cyan)]" style={{textShadow: '0 0 40px var(--glow-cyan)'}}>
                        100%
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[var(--neon-cyan)] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-body text-white/80 font-black group-hover:text-white transition-colors duration-300">Client Satisfaction Rate</p>
                    <div className="flex items-center justify-center gap-2 text-body-small text-white/70">
                      <Star className="w-4 h-4 text-[var(--neon-orange)] fill-[var(--neon-orange)]" style={{ filter: 'drop-shadow(0 0 10px var(--glow-orange))' }} />
                      <span className="font-black">4.9-Star Average Rating</span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--neon-green)]" style={{textShadow: '0 0 40px var(--glow-green)'}}>
                        24/7
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[var(--neon-green)] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-body text-white/80 font-black group-hover:text-white transition-colors duration-300">Global Support Coverage</p>
                    <div className="flex items-center justify-center gap-2 text-body-small text-white/70">
                      <Globe className="w-4 h-4 text-[var(--neon-cyan)]" style={{ filter: 'drop-shadow(0 0 10px var(--glow-cyan))' }} />
                      <span className="font-black">4 Global Offices</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-12 border-t-2 border-[var(--border-cyan)]">
                <p className="text-body-small text-white/60 mb-8 uppercase tracking-wider font-black">TRUSTED BY INDUSTRY LEADERS</p>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[var(--border-green)] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[var(--neon-green)]/60 transition-all duration-300 group cursor-pointer">
                    <Shield className="w-5 h-5 text-[var(--neon-green)] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px var(--glow-green))' }} />
                    <span className="text-body-small text-white/80 font-black group-hover:text-white transition-colors duration-300">ISO 27001</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[var(--border-purple)] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[var(--neon-purple)]/60 transition-all duration-300 group cursor-pointer">
                    <Award className="w-5 h-5 text-[var(--neon-purple)] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px var(--glow-purple))' }} />
                    <span className="text-body-small text-white/80 font-black group-hover:text-white transition-colors duration-300">SOC 2</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[var(--border-cyan)] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[var(--neon-cyan)]/60 transition-all duration-300 group cursor-pointer">
                    <Clock className="w-5 h-5 text-[var(--neon-cyan)] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px var(--glow-cyan))' }} />
                    <span className="text-body-small text-white/80 font-black group-hover:text-white transition-colors duration-300">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Final Assurance */}
              <div className="pt-10">
                <div className="inline-flex items-center gap-2 text-body-small text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-[var(--neon-green)]" style={{ filter: 'drop-shadow(0 0 10px var(--glow-green))' }} />
                  <span className="font-black">Free consultation • No commitment required • Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
      `}</style>
    </section>
  );
}
