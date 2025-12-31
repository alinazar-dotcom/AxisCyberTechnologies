import { Cookie, Shield, Settings, BarChart3, Target, CheckCircle2, AlertCircle, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

export function CookiePolicyPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: true,
    advertising: false
  });

  const cookieTypes = [
    {
      icon: Shield,
      title: 'Strictly Necessary Cookies',
      status: 'Always Active',
      color: '#00FF9D',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: [
        'Session management and authentication',
        'Security and fraud prevention',
        'Load balancing and performance',
        'Cookie consent preferences',
        'Form submission and validation'
      ],
      canDisable: false,
      key: 'necessary' as keyof CookiePreferences
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      status: 'Optional',
      color: '#00FFFF',
      description: 'These cookies enable enhanced functionality and personalization, such as language preferences, region selection, and customized interface options.',
      examples: [
        'Language and region preferences',
        'User interface customization',
        'Remember login credentials',
        'Video player preferences',
        'Live chat functionality'
      ],
      canDisable: true,
      key: 'functional' as keyof CookiePreferences
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      status: 'Optional',
      color: '#DD00FF',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: [
        'Google Analytics tracking',
        'Page view statistics',
        'User journey analysis',
        'Performance monitoring',
        'Error tracking and reporting'
      ],
      canDisable: true,
      key: 'analytics' as keyof CookiePreferences
    },
    {
      icon: Target,
      title: 'Advertising Cookies',
      status: 'Optional',
      color: '#FF7A00',
      description: 'These cookies are used to deliver advertisements relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.',
      examples: [
        'Targeted advertising',
        'Social media integration',
        'Remarketing campaigns',
        'Ad performance tracking',
        'Third-party ad networks'
      ],
      canDisable: true,
      key: 'advertising' as keyof CookiePreferences
    }
  ];

  const specificCookies = [
    {
      name: '_axis_session',
      purpose: 'Session management and authentication',
      duration: 'Session',
      type: 'Necessary',
      color: '#00FF9D'
    },
    {
      name: '_axis_token',
      purpose: 'CSRF protection and security',
      duration: '1 day',
      type: 'Necessary',
      color: '#00FF9D'
    },
    {
      name: '_axis_prefs',
      purpose: 'Store user preferences and settings',
      duration: '1 year',
      type: 'Functional',
      color: '#00FFFF'
    },
    {
      name: '_ga',
      purpose: 'Google Analytics - Distinguish users',
      duration: '2 years',
      type: 'Analytics',
      color: '#DD00FF'
    },
    {
      name: '_gid',
      purpose: 'Google Analytics - Distinguish users',
      duration: '24 hours',
      type: 'Analytics',
      color: '#DD00FF'
    },
    {
      name: '_gat',
      purpose: 'Google Analytics - Throttle request rate',
      duration: '1 minute',
      type: 'Analytics',
      color: '#DD00FF'
    },
    {
      name: '_fbp',
      purpose: 'Facebook Pixel - Track conversions',
      duration: '3 months',
      type: 'Advertising',
      color: '#FF7A00'
    },
    {
      name: '__stripe_sid',
      purpose: 'Stripe payment processing',
      duration: '30 minutes',
      type: 'Necessary',
      color: '#00FF9D'
    }
  ];

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true
    });
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false
    });
  };

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#FF7A00] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#DD00FF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#00FFFF] rounded-full blur-[140px] opacity-15"></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF7A00]/30 rounded-full mb-8 backdrop-blur-sm">
            <Cookie className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-white font-black tracking-wide">Cookies</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Cookie <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,122,0,0.5)]">Policy</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            This Cookie Policy explains how Axis Cyber Technologies uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <div className="flex items-center gap-3 text-base text-white/70 font-black">
            <Calendar className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
            <span>Last Updated: November 28, 2025</span>
          </div>
        </div>

        {/* What Are Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 md:p-10 bg-gradient-to-br from-[#FF7A00]/10 to-[#FF0099]/5 border-2 border-[#FF7A00]/30 rounded-3xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-[#FF7A00] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 15px #FF7A0080)' }} />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">What Are Cookies?</h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Cookies allow us to recognize your device and remember information about your visit, such as your preferred language and other settings. This can make your next visit easier and the site more useful to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">
            Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon;
              const isEnabled = preferences[cookie.key as keyof typeof preferences];

              return (
                <div
                  key={index}
                  className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl hover:border-white/20 transition-all duration-500"
                  style={{
                    borderColor: `${cookie.color}30`,
                    boxShadow: `0 0 30px ${cookie.color}15`
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-4 flex-1">
                      <Icon className="w-10 h-10 flex-shrink-0 mt-1" style={{ color: cookie.color, filter: `drop-shadow(0 0 15px ${cookie.color}80)` }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-xl md:text-2xl font-black text-white">
                            {cookie.title}
                          </h3>
                          <span className="px-4 py-1.5 border-2 rounded-xl text-sm font-black backdrop-blur-sm"
                            style={{
                              backgroundColor: `${cookie.color}20`,
                              borderColor: `${cookie.color}40`,
                              color: cookie.color
                            }}
                          >
                            {cookie.status}
                          </span>
                        </div>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
                          {cookie.description}
                        </p>
                      </div>
                    </div>

                    {cookie.canDisable && (
                      <button
                        onClick={() => handleToggle(cookie.key)}
                        className={`ml-4 relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 border-2`}
                        style={{
                          backgroundColor: isEnabled ? cookie.color : 'rgba(255,255,255,0.1)',
                          borderColor: isEnabled ? cookie.color : 'rgba(255,255,255,0.2)'
                        }}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${isEnabled ? 'translate-x-7' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    )}
                  </div>

                  <div className="ml-14">
                    <h4 className="text-base font-black text-white mb-3">Examples:</h4>
                    <ul className="space-y-2">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base text-white/80">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: cookie.color, filter: `drop-shadow(0 0 10px ${cookie.color}80)` }} />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cookie Settings */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 md:p-10 bg-gradient-to-br from-[#DD00FF]/10 to-[#B900FF]/5 border-2 border-[#DD00FF]/30 rounded-3xl backdrop-blur-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Settings className="w-7 h-7 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              Manage Your Cookie Preferences
            </h3>
            <p className="text-base md:text-lg text-white/80 mb-8">
              You can control which cookies you allow us to use. Note that disabling certain cookies may impact your experience on our website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAcceptAll}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,157,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FF9D]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black tracking-wide">Accept All Cookies</span>
              </button>
              <button
                onClick={handleRejectAll}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">Reject Optional Cookies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Specific Cookies Table */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Specific Cookies We Use
          </h2>
          <div className="overflow-x-auto">
            <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/[0.05] border-b-2 border-white/10">
                    <th className="px-6 py-5 text-left text-base font-black text-white">Cookie Name</th>
                    <th className="px-6 py-5 text-left text-base font-black text-white">Purpose</th>
                    <th className="px-6 py-5 text-left text-base font-black text-white">Duration</th>
                    <th className="px-6 py-5 text-left text-base font-black text-white">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {specificCookies.map((cookie, index) => (
                    <tr key={index} className="border-b border-white/[0.08] hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-5 text-base font-mono font-black" style={{ color: cookie.color }}>{cookie.name}</td>
                      <td className="px-6 py-5 text-base text-white/80">{cookie.purpose}</td>
                      <td className="px-6 py-5 text-base text-white/80 font-black">{cookie.duration}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 border-2 rounded-xl text-xs font-black backdrop-blur-sm"
                          style={{
                            backgroundColor: `${cookie.color}20`,
                            borderColor: `${cookie.color}40`,
                            color: cookie.color
                          }}
                        >
                          {cookie.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-5">
              Third-Party Cookies
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide enhanced functionality.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                <div>
                  <p className="text-base font-black text-white">Google Analytics</p>
                  <p className="text-sm text-white/70">Helps us understand how visitors use our website</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                <div>
                  <p className="text-base font-black text-white">Stripe</p>
                  <p className="text-sm text-white/70">Processes secure payment transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#DD00FF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                <div>
                  <p className="text-base font-black text-white">Social Media Platforms</p>
                  <p className="text-sm text-white/70">Enable social sharing and integration features</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Control Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-5">
              How to Control Cookies
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base md:text-lg text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                <span><strong className="text-white font-black">Using our cookie preference tool</strong> above to customize your settings</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                <span><strong className="text-white font-black">Browser settings:</strong> Most web browsers allow you to control cookies through settings</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#DD00FF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                <span><strong className="text-white font-black">Third-party opt-outs:</strong> Visit third-party websites to opt-out of their cookies</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-white/80">
                <CheckCircle2 className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #FF7A0080)' }} />
                <span><strong className="text-white font-black">Delete cookies:</strong> You can delete all cookies stored on your device at any time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto relative p-12 md:p-16 text-center bg-black/60 backdrop-blur-xl border-2 border-[#FF7A00]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 via-[#FF0099]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10">
            <Cookie className="w-16 h-16 text-[#FF7A00] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF7A0080)' }} />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-5">
              Questions About Cookies?
            </h3>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF7A00] to-[#FF0099] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,122,0,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#FF7A00]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-white text-lg font-black tracking-wide">Contact Us</span>
              </Link>
              <Link
                to="/privacy"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#DD00FF]/50 hover:shadow-[0_20px_60px_rgba(221,0,255,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">View Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
