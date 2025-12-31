import { Shield, Lock, Eye, Database, UserCheck, Globe, AlertTriangle, CheckCircle2, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: `We collect information that you provide directly to us, as well as information automatically collected when you use our services.`,
      subsections: [
        {
          title: 'Personal Information',
          items: [
            'Name, email address, phone number',
            'Company name and job title',
            'Billing and payment information',
            'Communication preferences',
            'Project requirements and specifications'
          ]
        },
        {
          title: 'Automatically Collected Information',
          items: [
            'IP address and device information',
            'Browser type and version',
            'Pages visited and time spent',
            'Referring website addresses',
            'Operating system and device type'
          ]
        },
        {
          title: 'Technical Information',
          items: [
            'Log files and analytics data',
            'Cookies and similar technologies',
            'Error reports and performance data',
            'Geographic location data',
            'Usage patterns and preferences'
          ]
        }
      ]
    },
    {
      icon: Database,
      title: '2. How We Use Your Information',
      content: `We use the information we collect for various purposes to provide and improve our services.`,
      subsections: [
        {
          title: 'Service Delivery',
          items: [
            'Process and fulfill your requests',
            'Provide customer support',
            'Send project updates and communications',
            'Manage your account and subscriptions',
            'Process payments and transactions'
          ]
        },
        {
          title: 'Service Improvement',
          items: [
            'Analyze usage patterns and trends',
            'Develop new features and services',
            'Improve user experience',
            'Conduct research and development',
            'Optimize website performance'
          ]
        },
        {
          title: 'Communication',
          items: [
            'Send service announcements',
            'Provide technical updates',
            'Share marketing communications (with consent)',
            'Request feedback and reviews',
            'Notify about changes to our services'
          ]
        }
      ]
    },
    {
      icon: Lock,
      title: '3. Data Security',
      content: `We implement comprehensive security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction with 100% commitment.`,
      subsections: [
        {
          title: 'Technical Safeguards',
          items: [
            'SSL/TLS encryption for data transmission',
            'Encrypted data storage',
            'Regular security audits and assessments',
            'Intrusion detection and prevention systems',
            'Secure backup procedures'
          ]
        },
        {
          title: 'Organizational Measures',
          items: [
            'Strict access controls and authentication',
            'Employee confidentiality agreements',
            'Regular security training for staff',
            'Incident response procedures',
            'Third-party security certifications'
          ]
        }
      ]
    },
    {
      icon: Globe,
      title: '4. Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:`,
      subsections: [
        {
          title: 'Service Providers',
          items: [
            'Cloud hosting and infrastructure providers',
            'Payment processors and financial institutions',
            'Analytics and monitoring services',
            'Communication and email services',
            'All bound by confidentiality agreements'
          ]
        },
        {
          title: 'Legal Requirements',
          items: [
            'Compliance with legal obligations',
            'Responding to lawful requests',
            'Protecting our rights and property',
            'Preventing fraud and security threats',
            'Enforcing our terms and policies'
          ]
        },
        {
          title: 'Business Transfers',
          items: [
            'Mergers or acquisitions',
            'Asset sales or transfers',
            'Bankruptcy or reorganization',
            'Similar business transactions',
            'With prior notice to affected users'
          ]
        }
      ]
    },
    {
      icon: UserCheck,
      title: '5. Your Rights and Choices',
      content: `You have certain rights regarding your personal information and how we use it.`,
      subsections: [
        {
          title: 'Access and Control',
          items: [
            'Access your personal information',
            'Correct inaccurate data',
            'Request data deletion',
            'Export your data',
            'Object to certain processing activities'
          ]
        },
        {
          title: 'Communication Preferences',
          items: [
            'Opt-out of marketing emails',
            'Control notification settings',
            'Update contact preferences',
            'Manage cookie preferences',
            'Withdraw consent at any time'
          ]
        },
        {
          title: 'Data Portability',
          items: [
            'Request a copy of your data',
            'Receive data in structured format',
            'Transfer data to another service',
            'Download project files and documents',
            'Access communication history'
          ]
        }
      ]
    },
    {
      icon: Database,
      title: '6. Data Retention',
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy.`,
      list: [
        'Active account data: Duration of service relationship',
        'Project data: As specified in service agreements',
        'Financial records: Minimum 7 years for legal compliance',
        'Marketing data: Until you opt-out or request deletion',
        'Analytics data: Aggregated data may be retained indefinitely'
      ]
    },
    {
      icon: Globe,
      title: '7. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place:`,
      list: [
        'Standard contractual clauses for data transfers',
        'Compliance with GDPR and international data protection laws',
        'Privacy Shield certification where applicable',
        'Adequate security measures in all locations',
        'Regular compliance audits and assessments'
      ]
    },
    {
      icon: UserCheck,
      title: '8. Children\'s Privacy',
      content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.`
    },
    {
      icon: CheckCircle2,
      title: '9. Third-Party Links and Services',
      content: `Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.`
    },
    {
      icon: Shield,
      title: '10. GDPR Compliance',
      content: `For users in the European Economic Area (EEA), we comply 100% with the General Data Protection Regulation (GDPR):`,
      list: [
        'Lawful basis for processing personal data',
        'Right to access, rectify, and erase data',
        'Right to data portability',
        'Right to object to processing',
        'Right to lodge a complaint with supervisory authority',
        'Data Protection Officer contact available'
      ]
    },
    {
      icon: Lock,
      title: '11. California Privacy Rights (CCPA)',
      content: `California residents have specific rights under the California Consumer Privacy Act:`,
      list: [
        'Right to know what personal information is collected',
        'Right to know if personal information is sold or disclosed',
        'Right to opt-out of sale of personal information',
        'Right to deletion of personal information',
        'Right to non-discrimination for exercising CCPA rights',
        'Authorized agent requests accepted'
      ]
    },
    {
      icon: AlertTriangle,
      title: '12. Data Breach Notification',
      content: `In the event of a data breach that may affect your personal information:`,
      list: [
        'We will notify affected users promptly',
        'Notification will include nature of the breach',
        'Information on steps taken to address the breach',
        'Recommendations for protecting your information',
        'Compliance with legal notification requirements',
        'Contact information for questions and support'
      ]
    },
    {
      icon: CheckCircle2,
      title: '13. Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:`,
      list: [
        'Posting the updated policy on our website',
        'Sending email notification to registered users',
        'Displaying a prominent notice on our website',
        'Updating the "Last Updated" date',
        'Providing reasonable time before changes take effect'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00FF9D] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#DD00FF] rounded-full blur-[140px] opacity-15"></div>
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FF9D]/30 rounded-full mb-8 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-[#00FF9D]" />
            <span className="text-white font-black tracking-wide">Privacy & Security</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Privacy <span className="bg-gradient-to-r from-[#00FF9D] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,157,0.5)]">Policy</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            At Axis Cyber Technologies, we are committed to protecting your privacy and ensuring 100% security of your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>

          <div className="flex items-center gap-3 text-base text-white/70 font-black">
            <Calendar className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
            <span>Last Updated: November 28, 2025</span>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-gradient-to-br from-[#00FF9D]/10 to-[#00FFFF]/5 border-2 border-[#00FF9D]/30 rounded-3xl backdrop-blur-xl">
              <Lock className="w-12 h-12 text-[#00FF9D] mb-4" style={{ filter: 'drop-shadow(0 0 15px #00FF9D80)' }} />
              <h3 className="text-xl font-black text-white mb-3">Secure by Design</h3>
              <p className="text-base text-white/80">Enterprise-grade encryption and security measures</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#00FFFF]/10 to-[#00E5FF]/5 border-2 border-[#00FFFF]/30 rounded-3xl backdrop-blur-xl">
              <UserCheck className="w-12 h-12 text-[#00FFFF] mb-4" style={{ filter: 'drop-shadow(0 0 15px #00FFFF80)' }} />
              <h3 className="text-xl font-black text-white mb-3">Your Control</h3>
              <p className="text-base text-white/80">Full control over your personal data and preferences</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-[#DD00FF]/10 to-[#B900FF]/5 border-2 border-[#DD00FF]/30 rounded-3xl backdrop-blur-xl">
              <Shield className="w-12 h-12 text-[#DD00FF] mb-4" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              <h3 className="text-xl font-black text-white mb-3">100% Compliant</h3>
              <p className="text-base text-white/80">GDPR, CCPA, and international standards</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500"
              >
                <h2 className="text-xl md:text-2xl font-black text-white mb-5 flex items-start gap-3">
                  <Icon className="w-6 h-6 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                  {section.title}
                </h2>
                
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
                  {section.content}
                </p>

                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx}>
                        <h3 className="text-lg md:text-xl font-black text-white mb-4">
                          {subsection.title}
                        </h3>
                        <ul className="space-y-3 ml-4">
                          {subsection.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3 text-base md:text-lg text-white/80">
                              <CheckCircle2 className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="space-y-3 ml-4">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-5 flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
              Contact Us About Privacy
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="p-6 md:p-8 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                <span className="font-black text-white">Data Protection Officer:</span>
                <a href="mailto:privacy@axiscyber.tech" className="text-[#00FF9D] hover:text-[#00FF9D]/80 transition-colors font-black">
                  privacy@axiscyber.tech
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                <span className="font-black text-white">Phone:</span>
                <a href="tel:+924212345678" className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors font-black">
                  +92 42 1234 5678
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DD00FF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                <span className="font-black text-white">Address:</span>
                <span className="text-white/80 font-black">DHA Phase 5, Main Boulevard, Lahore, Pakistan 54000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto mt-16 relative p-12 md:p-16 text-center bg-black/60 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <Shield className="w-16 h-16 text-[#00FF9D] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #00FF9D80)' }} />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-5">
              Your Privacy Matters
            </h3>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're committed to 100% transparency and protecting your data. Have questions or want to exercise your rights?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black tracking-wide">Contact Privacy Team</span>
              </Link>
              <Link 
                to="/cookie-policy"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#DD00FF]/50 hover:shadow-[0_20px_60px_rgba(221,0,255,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">View Cookie Policy</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
