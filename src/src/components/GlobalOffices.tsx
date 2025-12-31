'use client';

import { useState, useEffect } from 'react';
import { Globe, MapPin, Clock, Users, Phone, Mail, Building2, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export function GlobalOffices() {
  const [activeOffice, setActiveOffice] = useState(0);
  
  // Live time for offices
  const [times, setTimes] = useState({
    lahore: '',
    dubai: '',
    losAngeles: '',
    london: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        lahore: now.toLocaleTimeString('en-US', { 
          timeZone: 'Asia/Karachi', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }),
        dubai: now.toLocaleTimeString('en-US', { 
          timeZone: 'Asia/Dubai', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }),
        losAngeles: now.toLocaleTimeString('en-US', { 
          timeZone: 'America/Los_Angeles', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }),
        london: now.toLocaleTimeString('en-US', { 
          timeZone: 'Europe/London', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        })
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate active office
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffice((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const offices = [
    { 
      city: 'Lahore',
      country: 'Pakistan',
      flag: '🇵🇰',
      timezone: 'UTC+5',
      role: 'Global HQ',
      time: times.lahore,
      phone: '+92 300 1234567',
      email: 'lahore@axiscyber.tech',
      team: '25+',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#FF3DB5]',
      position: { top: '55%', left: '62%' }
    },
    { 
      city: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      timezone: 'UTC+4',
      role: 'Middle East',
      time: times.dubai,
      phone: '+971 50 123 4567',
      email: 'dubai@axiscyber.tech',
      team: '15+',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00D4FF]',
      position: { top: '48%', left: '57%' }
    },
    { 
      city: 'Los Angeles',
      country: 'USA',
      flag: '🇺🇸',
      timezone: 'UTC-8',
      role: 'Americas',
      time: times.losAngeles,
      phone: '+1 310 123 4567',
      email: 'la@axiscyber.tech',
      team: '12+',
      color: '#DD00FF',
      gradient: 'from-[#DD00FF] to-[#B800FF]',
      position: { top: '42%', left: '18%' }
    },
    { 
      city: 'London',
      country: 'UK',
      flag: '🇬🇧',
      timezone: 'UTC+0',
      role: 'Europe',
      time: times.london,
      phone: '+44 20 1234 5678',
      email: 'london@axiscyber.tech',
      team: '10+',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00FFB8]',
      position: { top: '38%', left: '48%' }
    }
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#05060A]" id="global-offices">
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,153,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,255,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(221,0,255,0.08),transparent_50%)]"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm mb-6">
            <div className="relative">
              <Globe className="w-5 h-5 text-[#00FFFF]" />
              <div className="absolute inset-0 blur-md">
                <Globe className="w-5 h-5 text-[#00FFFF]" />
              </div>
            </div>
            <span className="font-black text-white uppercase tracking-wider text-sm">Always Online</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent">
              24/7
            </span>
            {' '}Global Presence
          </h2>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Four strategic locations, one seamless experience
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left: World Map Visualization */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Map container */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-sm overflow-hidden">
              
              {/* Animated globe grid */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 800">
                  {/* Latitude lines */}
                  {[...Array(9)].map((_, i) => (
                    <ellipse
                      key={`lat-${i}`}
                      cx="400"
                      cy="400"
                      rx="350"
                      ry={50 + i * 40}
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="1"
                      opacity={0.3}
                    />
                  ))}
                  {/* Longitude lines */}
                  {[...Array(12)].map((_, i) => (
                    <ellipse
                      key={`lon-${i}`}
                      cx="400"
                      cy="400"
                      rx={50 + i * 30}
                      ry="350"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="1"
                      opacity={0.3}
                      transform={`rotate(${i * 15} 400 400)`}
                    />
                  ))}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00FFFF" />
                      <stop offset="50%" stopColor="#FF0099" />
                      <stop offset="100%" stopColor="#DD00FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Office markers on map */}
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className={`absolute transition-all duration-500 cursor-pointer group ${
                    activeOffice === idx ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    top: office.position.top,
                    left: office.position.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setActiveOffice(idx)}
                  onMouseEnter={() => setActiveOffice(idx)}
                >
                  {/* Ping animation */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    activeOffice === idx ? 'animate-ping' : ''
                  }`} style={{
                    backgroundColor: office.color,
                    opacity: 0.4
                  }}></div>
                  
                  {/* Glow ring */}
                  <div className={`absolute -inset-4 rounded-full blur-xl transition-all duration-500 ${
                    activeOffice === idx ? 'opacity-60 scale-150' : 'opacity-0 scale-100'
                  }`} style={{
                    backgroundColor: office.color
                  }}></div>

                  {/* Main marker */}
                  <div className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    activeOffice === idx ? 'w-6 h-6 border-4' : ''
                  }`} style={{
                    backgroundColor: office.color,
                    borderColor: 'white',
                    boxShadow: `0 0 20px ${office.color}`
                  }}></div>

                  {/* City label */}
                  <div className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                    activeOffice === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <div className="px-3 py-1.5 rounded-full bg-black/80 border backdrop-blur-xl" style={{
                      borderColor: office.color,
                      boxShadow: `0 0 20px ${office.color}40`
                    }}>
                      <p className="text-xs font-black text-white">{office.city}</p>
                    </div>
                  </div>

                  {/* Connection lines to active office */}
                  {activeOffice === idx && (
                    <svg className="absolute inset-0 w-[800px] h-[800px] pointer-events-none" style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}>
                      {offices.map((target, targetIdx) => {
                        if (targetIdx === idx) return null;
                        return (
                          <line
                            key={targetIdx}
                            x1="400"
                            y1="400"
                            x2={parseFloat(target.position.left) * 8}
                            y2={parseFloat(target.position.top) * 8}
                            stroke={office.color}
                            strokeWidth="2"
                            opacity="0.3"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>
              ))}

              {/* Center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#FF0099]/20 via-[#00FFFF]/20 to-[#DD00FF]/20 blur-3xl animate-pulse"></div>
            </div>
          </div>

          {/* Right: Office Details */}
          <div className="space-y-4">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeOffice === idx ? 'scale-100' : 'scale-95 opacity-60'
                }`}
                onClick={() => setActiveOffice(idx)}
                onMouseEnter={() => setActiveOffice(idx)}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 rounded-2xl blur-xl transition-all duration-500 ${
                  activeOffice === idx ? 'opacity-60' : 'opacity-0'
                }`} style={{
                  background: `linear-gradient(135deg, ${office.color}, transparent)`
                }}></div>

                {/* Card */}
                <div className={`relative rounded-2xl border-2 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                  activeOffice === idx 
                    ? 'bg-gradient-to-br from-white/10 to-white/[0.02] border-white/30' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}>
                  
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${office.gradient} transition-all duration-500 ${
                    activeOffice === idx ? 'opacity-100' : 'opacity-40'
                  }`}></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Flag */}
                        <div className={`text-4xl transition-all duration-500 ${
                          activeOffice === idx ? 'scale-110' : 'scale-100'
                        }`}>
                          {office.flag}
                        </div>
                        
                        {/* City info */}
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-white mb-1">
                            {office.city}
                          </h3>
                          <p className="text-sm text-white/50 flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {office.country}
                          </p>
                        </div>
                      </div>

                      {/* Role badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all duration-500 ${
                        activeOffice === idx ? 'scale-100' : 'scale-90'
                      }`} style={{
                        color: office.color,
                        borderColor: office.color,
                        backgroundColor: `${office.color}15`
                      }}>
                        {office.role}
                      </div>
                    </div>

                    {/* Time display */}
                    <div className={`mb-4 p-4 rounded-xl transition-all duration-500 ${
                      activeOffice === idx 
                        ? 'bg-black/40 border-2' 
                        : 'bg-black/20 border border-white/5'
                    }`} style={{
                      borderColor: activeOffice === idx ? office.color : undefined
                    }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5" style={{ color: office.color }} />
                          <div>
                            <p className="text-xs text-white/40 mb-0.5">Local Time</p>
                            <p className="text-2xl font-black font-mono tracking-tight" style={{ color: office.color }}>
                              {office.time || '--:--:--'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/30 font-mono">{office.timezone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">{office.team} Team</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#00FF9D]" />
                        <span className="text-white/70">Active</span>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    {activeOffice === idx && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{office.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] rounded-3xl opacity-20 blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00FFFF]/20 to-transparent border border-[#00FFFF]/30 mb-3">
                  <Globe className="w-7 h-7 text-[#00FFFF]" />
                </div>
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-br from-[#00FFFF] to-[#00D4FF] bg-clip-text text-transparent mb-1">4</p>
                <p className="text-sm text-white/50 font-bold">Global Offices</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF0099]/20 to-transparent border border-[#FF0099]/30 mb-3">
                  <Zap className="w-7 h-7 text-[#FF0099]" />
                </div>
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-br from-[#FF0099] to-[#FF3DB5] bg-clip-text text-transparent mb-1">24/7</p>
                <p className="text-sm text-white/50 font-bold">Availability</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DD00FF]/20 to-transparent border border-[#DD00FF]/30 mb-3">
                  <Users className="w-7 h-7 text-[#DD00FF]" />
                </div>
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-br from-[#DD00FF] to-[#B800FF] bg-clip-text text-transparent mb-1">60+</p>
                <p className="text-sm text-white/50 font-bold">Experts</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00FF9D]/20 to-transparent border border-[#00FF9D]/30 mb-3">
                  <Sparkles className="w-7 h-7 text-[#00FF9D]" />
                </div>
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-br from-[#00FF9D] to-[#00FFB8] bg-clip-text text-transparent mb-1">100%</p>
                <p className="text-sm text-white/50 font-bold">Success Rate</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
