import { ArrowRight, Calendar, Sparkles, Zap, Award, Users, TrendingUp, CheckCircle2, MessageSquare, Video, Mail, Phone, Globe, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ConsultationModal } from './ConsultationModal';

export function CTASection() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 lg:py-36 relative overflow-hidden bg-[#05060A]">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#DD00FF] rounded-full blur-[160px] opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#00FFFF] rounded-full blur-[140px] opacity-15 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Neon grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(221,0,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(221,0,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="relative rounded-[2rem] overflow-hidden">
          {/* Ultra neon animated gradient border */}
          <div className="absolute inset-0 rounded-[2rem] p-[3px]" style={{
            background: 'linear-gradient(90deg, #DD00FF, #00FFFF, #00FF9D, #FF0099, #DD00FF)',
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
                    backgroundColor: i % 3 === 0 ? '#DD00FF' : i % 3 === 1 ? '#00FFFF' : '#00FF9D',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    boxShadow: i % 3 === 0 ? '0 0 8px #DD00FF' : i % 3 === 1 ? '0 0 8px #00FFFF' : '0 0 8px #00FF9D'
                  }}
                ></div>
              ))}</div>

            <div className="relative space-y-10 md:space-y-12 max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border-2 border-[#DD00FF]/40 rounded-full backdrop-blur-md shadow-[0_0_40px_rgba(221,0,255,0.3)] group cursor-pointer hover:shadow-[0_0_60px_rgba(221,0,255,0.5)] transition-all duration-700 overflow-hidden relative">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent rounded-full pointer-events-none"></div>

                <Sparkles className="w-5 h-5 text-[#DD00FF] animate-pulse relative z-10" style={{ filter: 'drop-shadow(0 0 10px #DD00FF)' }} />
                <span className="text-white font-black tracking-[0.15em] uppercase relative z-10">🚀 READY TO TRANSFORM</span>
                <Zap className="w-5 h-5 text-[#00FF9D] animate-pulse relative z-10" style={{ filter: 'drop-shadow(0 0 10px #00FF9D)', animationDelay: '0.5s' }} />
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent" style={{
                  backgroundSize: '200% auto',
                  animation: 'gradientShift 6s ease-in-out infinite'
                }}>
                  Let's Build Something
                  <br />
                  Extraordinary Together
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Transform your vision into reality with a team that combines <span className="text-[#DD00FF] font-black">deep technical expertise</span>,
                <span className="text-[#00FFFF] font-black"> creative innovation</span>, and
                <span className="text-[#00FF9D] font-black"> unwavering commitment</span> to 100% excellence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                {/* Primary Button */}
                <Link to="/contact" className="group relative rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-[0_20px_60px_rgba(255,0,153,0.4)] hover:shadow-[0_30px_80px_rgba(255,0,153,0.6)]">
                  {/* Gradient border using padding trick - Pink to Cyan */}
                  <div className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] rounded-2xl p-[2px]">
                    <div className="px-12 md:px-14 py-6 md:py-7 bg-gradient-to-r from-[#FF0099] to-[#00FFFF] text-white rounded-2xl font-black text-lg md:text-xl relative overflow-hidden">
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#00FF9D] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      {/* Shimmer effect - removed skew to prevent overflow */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                        <span>Start Your Project</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Secondary Button */}
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="group relative px-12 md:px-14 py-6 md:py-7 bg-black/50 border-2 border-[#00FF9D]/30 text-white rounded-2xl font-black text-lg md:text-xl backdrop-blur-xl transition-all duration-500 hover:bg-black/70 hover:border-[#00FF9D]/60 hover:scale-105 hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,255,157,0.2)] hover:shadow-[0_30px_80px_rgba(0,255,157,0.4)]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6 text-[#00FF9D] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                    <span>Schedule Consultation</span>
                  </div>
                </button>
              </div>

              {/* Contact Options */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-base text-white/70">
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[#DD00FF]/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#DD00FF]/60 transition-all duration-300">
                    <Video className="w-5 h-5 text-[#DD00FF]" />
                  </div>
                  <span className="font-black">Video Call</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[#00FFFF]/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#00FFFF]/60 transition-all duration-300">
                    <MessageSquare className="w-5 h-5 text-[#00FFFF]" />
                  </div>
                  <span className="font-black">Live Chat</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border-2 border-[#00FF9D]/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#00FF9D]/60 transition-all duration-300">
                    <Mail className="w-5 h-5 text-[#00FF9D]" />
                  </div>
                  <span className="font-black">Email Us</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="pt-16 md:pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-t-2 border-[#DD00FF]/20 pt-12 md:pt-16">
                  {/* Stat 1 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #DD00FF, #B900FF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        100+
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[#DD00FF] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-base md:text-lg text-white/80 font-black group-hover:text-white transition-colors duration-300">Projects Delivered Worldwide</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                      <span className="font-black">100% Success Rate</span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #00FFFF, #00E5FF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        100%
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[#00FFFF] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-base md:text-lg text-white/80 font-black group-hover:text-white transition-colors duration-300">Client Satisfaction Rate</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                      <Star className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" style={{ filter: 'drop-shadow(0 0 10px #FF7A0080)' }} />
                      <span className="font-black">5-Star Average Rating</span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="space-y-4 group cursor-pointer">
                    <div className="relative inline-block">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #00FF9D, #00E588)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        24/7
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 blur-3xl bg-[#00FF9D] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-base md:text-lg text-white/80 font-black group-hover:text-white transition-colors duration-300">Global Support Coverage</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                      <Globe className="w-4 h-4 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                      <span className="font-black">4 Global Offices</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-12 border-t-2 border-[#00FFFF]/20">
                <p className="text-sm text-white/60 mb-8 uppercase tracking-wider font-black">TRUSTED BY INDUSTRY LEADERS</p>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[#00FF9D]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#00FF9D]/60 transition-all duration-300 group cursor-pointer">
                    <Shield className="w-5 h-5 text-[#00FF9D] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                    <span className="text-sm md:text-base text-white/80 font-black group-hover:text-white transition-colors duration-300">ISO 27001</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[#DD00FF]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#DD00FF]/60 transition-all duration-300 group cursor-pointer">
                    <Award className="w-5 h-5 text-[#DD00FF] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                    <span className="text-sm md:text-base text-white/80 font-black group-hover:text-white transition-colors duration-300">SOC 2</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-2 border-[#00FFFF]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#00FFFF]/60 transition-all duration-300 group cursor-pointer">
                    <Clock className="w-5 h-5 text-[#00FFFF] group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                    <span className="text-sm md:text-base text-white/80 font-black group-hover:text-white transition-colors duration-300">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Final Assurance */}
              <div className="pt-10">
                <div className="inline-flex items-center gap-2 text-sm md:text-base text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                  <span className="font-black">Free consultation • No commitment required • Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Animations */}
      <style>{`
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