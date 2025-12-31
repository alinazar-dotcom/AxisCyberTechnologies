import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { CareersApplyPage } from './pages/CareersApplyPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { StoryPage } from './pages/StoryPage';
import { PressKitPage } from './pages/PressKitPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BlockchainPage } from './pages/BlockchainPage';
import { EnterpriseSoftwarePage } from './pages/EnterpriseSoftwarePage';
import { CloudDevOpsPage } from './pages/CloudDevOpsPage';
import { MobileAppPage } from './pages/MobileAppPage';
import { GamingWebGLPage } from './pages/GamingWebGLPage';
import { CybersecurityPage } from './pages/CybersecurityPage';
import { DataEngineeringPage } from './pages/DataEngineeringPage';
import { APIIntegrationPage } from './pages/APIIntegrationPage';
import { PerformanceOptimizationPage } from './pages/PerformanceOptimizationPage';
import { IoTEdgePage } from './pages/IoTEdgePage';
import { ProductUXPage } from './pages/ProductUXPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { FinancialServicesPage } from './pages/industries/FinancialServicesPage';
import { BlockchainPage as IndustryBlockchainPage } from './pages/industries/BlockchainPage';
import { HealthcarePage } from './pages/industries/HealthcarePage';
import { DefenseAerospacePage } from './pages/industries/DefenseAerospacePage';
import { EnergyUtilitiesPage } from './pages/industries/EnergyUtilitiesPage';
import { TelecommunicationsPage } from './pages/industries/TelecommunicationsPage';
import { SupplyChainPage } from './pages/industries/SupplyChainPage';
import { ManufacturingPage } from './pages/industries/ManufacturingPage';
import { InsurancePage } from './pages/industries/InsurancePage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AdminBlogPage from './pages/AdminBlogPage';
import AdminPortfolioPage from './pages/AdminPortfolioPage';
import AdminPortfolioDetailPage from './pages/AdminPortfolioDetailPage';
import AdminCaseStudyPage from './pages/AdminCaseStudyPage';
import AdminTeamPage from './pages/AdminTeamPage';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminTestinomials from './pages/AdminTestinomials';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminJobsPage from './pages/AdminJobsPage';
import AdminCommentPage from './pages/AdminCommentPage';
import AdminMediaLibraryPage from './pages/AdminMediaLibraryPage';
import AdminSeoSettingPage from './pages/AdminSeoSettingPage';
import AdminSiteSettingPage from './pages/AdminSiteSettingPage';
import AdminEmailMarketingPage from './pages/AdminEmailMarketingPage';
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/financial-services" element={<FinancialServicesPage />} />
        <Route path="/industries/blockchain" element={<IndustryBlockchainPage />} />
        <Route path="/industries/healthcare" element={<HealthcarePage />} />
        <Route path="/industries/defense-aerospace" element={<DefenseAerospacePage />} />
        <Route path="/industries/energy-utilities" element={<EnergyUtilitiesPage />} />
        <Route path="/industries/telecommunications" element={<TelecommunicationsPage />} />
        <Route path="/industries/supply-chain" element={<SupplyChainPage />} />
        <Route path="/industries/manufacturing" element={<ManufacturingPage />} />
        <Route path="/industries/insurance" element={<InsurancePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareersApplyPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/press-kit" element={<PressKitPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/overview" element={<AdminOverviewPage />} />
        <Route path="/admin/blog" element={<AdminBlogPage />} />
        <Route path="/admin/portfolio" element={<AdminPortfolioPage />} />
        <Route path="/admin/portfolio/new" element={<AdminPortfolioDetailPage />} />
        <Route path="/admin/portfolio/:id" element={<AdminPortfolioDetailPage />} />
        <Route path="/admin/case-studies" element={<AdminCaseStudyPage />} />
        <Route path="/admin/team" element={<AdminTeamPage />} />
        <Route path="/admin/services" element={<AdminServicesPage />} />
        <Route path="/admin/testimonials" element={<AdminTestinomials />} />
        <Route path="/admin/jobs" element={<AdminApplicationsPage />} />
        <Route path="/admin/jobs-manager" element={<AdminJobsPage />} />
        <Route path="/admin/comments" element={<AdminCommentPage />} />
        <Route path="/admin/media" element={<AdminMediaLibraryPage />} />
        <Route path="/admin/seo" element={<AdminSeoSettingPage />} />
        <Route path="/admin/site-settings" element={<AdminSiteSettingPage />} />
        <Route path="/admin/email-marketing" element={<AdminEmailMarketingPage />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}
