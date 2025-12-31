import { Scale, FileText, AlertCircle, CheckCircle2, Shield, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using Axis Cyber Technologies' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Axis Cyber Technologies' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:`,
      list: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)',
        'Attempt to decompile or reverse engineer any software contained on Axis Cyber Technologies\' website',
        'Remove any copyright or other proprietary notations from the materials',
        'Transfer the materials to another person or "mirror" the materials on any other server'
      ]
    },
    {
      title: '3. Services Description',
      content: `Axis Cyber Technologies provides software development, consulting, and technology services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.`
    },
    {
      title: '4. User Obligations',
      content: `When using our services, you agree to:`,
      list: [
        'Provide accurate, current, and complete information',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized use of your account',
        'Accept responsibility for all activities that occur under your account',
        'Not use our services for any illegal or unauthorized purpose',
        'Not interfere with or disrupt the integrity or performance of our services'
      ]
    },
    {
      title: '5. Intellectual Property Rights',
      content: `All content, features, and functionality on our website, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of Axis Cyber Technologies and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`
    },
    {
      title: '6. Client Projects and Deliverables',
      content: `For custom development projects:`,
      list: [
        'All project deliverables will be defined in the Statement of Work (SOW)',
        'Upon full payment, clients receive ownership of custom-developed code as specified in the SOW',
        'Axis Cyber Technologies retains rights to any pre-existing code, frameworks, or tools',
        'Source code and documentation will be delivered as outlined in the project agreement',
        'All intellectual property rights transfer only after complete payment is received'
      ]
    },
    {
      title: '7. Payment Terms',
      content: `Payment terms will be specified in individual contracts. Generally:`,
      list: [
        'Payment schedules will be outlined in the Statement of Work',
        'Invoices are due within 15 days of issuance unless otherwise specified',
        'Late payments may incur interest charges at the rate of 1.5% per month',
        'Services may be suspended for accounts with outstanding balances beyond 30 days',
        'All fees are non-refundable unless otherwise stated in the project agreement'
      ]
    },
    {
      title: '8. Confidentiality',
      content: `Both parties agree to maintain confidentiality of proprietary information. Axis Cyber Technologies will:`,
      list: [
        'Protect client confidential information with the same care as our own',
        'Sign Non-Disclosure Agreements (NDAs) when requested',
        'Not disclose project details without explicit client permission',
        'Implement appropriate security measures to protect sensitive data',
        'Ensure all team members adhere to confidentiality obligations'
      ]
    },
    {
      title: '9. Warranties and Disclaimers',
      content: `The materials on Axis Cyber Technologies' website are provided on an 'as is' basis. Axis Cyber Technologies makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
    },
    {
      title: '10. Limitation of Liability',
      content: `In no event shall Axis Cyber Technologies or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Axis Cyber Technologies' website, even if Axis Cyber Technologies or an authorized representative has been notified orally or in writing of the possibility of such damage.`
    },
    {
      title: '11. Service Level Agreements',
      content: `For enterprise clients with active support contracts:`,
      list: [
        'Response times will be as specified in the SLA',
        'Critical issues will be prioritized and addressed within defined timeframes',
        'Planned maintenance will be communicated in advance',
        'Uptime guarantees apply as outlined in individual agreements',
        'SLA credits may be issued for service level breaches as per contract terms'
      ]
    },
    {
      title: '12. Termination',
      content: `Either party may terminate services under the following conditions:`,
      list: [
        'With 30 days written notice for ongoing services',
        'Immediately for breach of contract terms',
        'Upon completion of project deliverables',
        'By mutual agreement of both parties',
        'For non-payment beyond agreed terms'
      ]
    },
    {
      title: '13. Indemnification',
      content: `You agree to indemnify, defend, and hold harmless Axis Cyber Technologies, its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities and expenses relating to or arising out of your use of or inability to use the services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party.`
    },
    {
      title: '14. Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of Pakistan (Lahore jurisdiction) and you irrevocably submit to the exclusive jurisdiction of the courts in that location. For international clients, disputes will be resolved through arbitration as specified in individual contracts.`
    },
    {
      title: '15. Force Majeure',
      content: `Axis Cyber Technologies shall not be liable for any failure to perform its obligations where such failure results from any cause beyond our reasonable control, including but not limited to mechanical, electronic, or communications failure or degradation, natural disasters, war, terrorism, pandemic, or government restrictions.`
    },
    {
      title: '16. Modifications to Terms',
      content: `Axis Cyber Technologies reserves the right to revise these terms of service at any time without notice. By using this website and our services, you are agreeing to be bound by the then current version of these terms of service. Material changes will be communicated to active clients via email.`
    },
    {
      title: '17. Contact Information',
      content: `For questions about these Terms of Service, please contact us at:`,
      contact: {
        email: 'legal@axiscyber.tech',
        phone: '+92 42 1234 5678',
        address: 'DHA Phase 5, Main Boulevard, Lahore, Pakistan 54000'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#FF0099] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#DD00FF] rounded-full blur-[140px] opacity-15"></div>
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0099] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
            <Scale className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">Legal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Terms of <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Service</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            Please read these terms and conditions carefully before using our services.
          </p>

          <div className="flex items-center gap-3 text-base text-white/70 font-black">
            <Calendar className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
            <span>Last Updated: November 28, 2025</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 md:p-10 bg-gradient-to-br from-[#FF7A00]/10 to-[#FF0099]/5 border-2 border-[#FF7A00]/30 rounded-3xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-[#FF7A00] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 15px #FF7A0080)' }} />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">Important Notice</h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and Axis Cyber Technologies. 
                  By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500"
            >
              <h2 className="text-xl md:text-2xl font-black text-white mb-5 flex items-start gap-3">
                <FileText className="w-6 h-6 text-[#00FFFF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                {section.title}
              </h2>
              
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
                {section.content}
              </p>

              {section.list && (
                <ul className="space-y-3 ml-4">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <div className="mt-6 p-6 md:p-8 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#FF0099]" style={{ filter: 'drop-shadow(0 0 10px #FF009980)' }} />
                    <span className="font-black text-white">Email:</span>
                    <a href={`mailto:${section.contact.email}`} className="text-[#FF0099] hover:text-[#FF0099]/80 transition-colors font-black">
                      {section.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                    <span className="font-black text-white">Phone:</span>
                    <a href={`tel:${section.contact.phone}`} className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors font-black">
                      {section.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#DD00FF] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                    <span className="font-black text-white">Address:</span>
                    <span className="text-white/80 font-black">{section.contact.address}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto mt-16 relative p-12 md:p-16 text-center bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <Shield className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-5">
              Questions About Our Terms?
            </h3>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our legal team is here to help. Contact us for clarification on any terms or to discuss custom agreements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black tracking-wide">Contact Legal Team</span>
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
