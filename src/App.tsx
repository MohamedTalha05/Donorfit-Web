/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { ModalProvider, useModal } from './context/ModalContext.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import BookDemoModal from './components/BookDemoModal.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import SEOHead from './components/SEOHead.tsx';
import { useT } from './i18n/index.tsx';

import { isHiddenProduct } from './data/productPages.ts';

import HomePage from './pages/HomePage.tsx';
const ProductPage = React.lazy(() => import('./pages/ProductPage.tsx'));
const NgoSolutionPage = React.lazy(() => import('./pages/solutions/NgoSolutionPage.tsx'));
const CharitySolutionPage = React.lazy(() => import('./pages/solutions/CharitySolutionPage.tsx'));
const FoundationSolutionPage = React.lazy(() => import('./pages/solutions/FoundationSolutionPage.tsx'));
const SponsorshipSolutionPage = React.lazy(() => import('./pages/solutions/SponsorshipSolutionPage.tsx'));
const MembershipSolutionPage = React.lazy(() => import('./pages/solutions/MembershipSolutionPage.tsx'));
const InternationalSolutionPage = React.lazy(() => import('./pages/solutions/InternationalSolutionPage.tsx'));
const AboutPage = React.lazy(() => import('./pages/AboutPage.tsx'));
const ContactPage = React.lazy(() => import('./pages/ContactPage.tsx'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage.tsx'));
const BlogIndexPage = React.lazy(() => import('./pages/BlogIndexPage.tsx'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage.tsx'));
const GuidesPage = React.lazy(() => import('./pages/GuidesPage.tsx'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage.tsx'));
const FAQsPage = React.lazy(() => import('./pages/FAQsPage.tsx'));
const PartnersPage = React.lazy(() => import('./pages/PartnersPage.tsx'));
const IntegrationsPage = React.lazy(() => import('./pages/IntegrationsPage.tsx'));
const IntegrationDetailPage = React.lazy(() => import('./pages/IntegrationDetailPage.tsx'));
const PricingPage = React.lazy(() => import('./pages/PricingPage.tsx'));
const PaymentGatewaysPage = React.lazy(() => import('./pages/PaymentGatewaysPage.tsx'));
const RecurringManagementPage = React.lazy(() => import('./pages/RecurringManagementPage.tsx'));
const LegalPage = React.lazy(() => import('./pages/LegalPage.tsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.tsx'));
const MembershipPage = React.lazy(() => import('./pages/products/MembershipPage.tsx'));
const SponsorshipPage = React.lazy(() => import('./pages/products/SponsorshipPage.tsx'));
const WaterWellPage = React.lazy(() => import('./pages/products/WaterWellPage.tsx'));
const QurbaniPage = React.lazy(() => import('./pages/products/QurbaniPage.tsx'));
const SchoolManagementPage = React.lazy(() => import('./pages/products/SchoolManagementPage.tsx'));
const MoneyPoolPage = React.lazy(() => import('./pages/products/MoneyPoolPage.tsx'));
const DonorPortalPage = React.lazy(() => import('./pages/DonorPortalPage.tsx'));

function AppContent() {
  const { currentRoute } = useModal();
  const t = useT('nav');

  const renderCurrentPage = () => {
    // 1. Homepage
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }

    // 2. Product Landing Pages
    if (currentRoute === '/sponsorship') return <SponsorshipPage />;
    if (currentRoute === '/orphan-sponsorship') return <ProductPage slug="orphan-sponsorship" />;
    if (currentRoute === '/money-pool') return <MoneyPoolPage />;
    if (currentRoute === '/membership') return <MembershipPage />;
    if (currentRoute === '/water-well') return <WaterWellPage />;
    if (currentRoute === '/qurbani') return <QurbaniPage />;
    // School Management is hidden until launch (see HIDDEN_PRODUCTS): its route shows the 404 page.
    if (currentRoute === '/school-management') return isHiddenProduct('school-management') ? <NotFoundPage /> : <SchoolManagementPage />;
    if (currentRoute === '/donations') return <ProductPage slug="donations" />;
    if (currentRoute === '/recurring-management') return <RecurringManagementPage />;
    // Donor Portal (formerly Donor Management; /donor-management redirects here, see LEGACY_ROUTE_REDIRECTS)
    if (currentRoute === '/donor-portal') return <DonorPortalPage />;
    if (currentRoute === '/campaign-management') return <ProductPage slug="campaign-management" />;
    if (currentRoute === '/reporting-and-insights') return <ProductPage slug="reporting-and-insights" />;

    // 3. Solution Pages (old /solutions/<name> URLs redirect here, see LEGACY_ROUTE_REDIRECTS)
    if (currentRoute === '/solutions/for-ngos') return <NgoSolutionPage />;
    if (currentRoute === '/solutions/for-charities') return <CharitySolutionPage />;
    if (currentRoute === '/solutions/for-foundations') return <FoundationSolutionPage />;
    if (currentRoute === '/solutions/for-sponsorship-orgs') return <SponsorshipSolutionPage />;
    if (currentRoute === '/solutions/for-membership-orgs') return <MembershipSolutionPage />;
    if (currentRoute === '/solutions/for-international-orgs') return <InternationalSolutionPage />;

    // 4. Company & General Pages
    if (currentRoute === '/about') return <AboutPage />;
    if (currentRoute === '/contact') return <ContactPage />;
    if (currentRoute === '/security') return <SecurityPage />;
    if (currentRoute === '/partners') return <PartnersPage />;
    if (currentRoute === '/integrations') return <IntegrationsPage />;
    if (currentRoute.startsWith('/integrations/')) return <IntegrationDetailPage key={currentRoute} id={currentRoute.slice('/integrations/'.length).replace(/\/$/, '')} />;
    if (currentRoute === '/pricing') return <PricingPage />;
    if (currentRoute === '/payment-gateways') return <PaymentGatewaysPage />;

    // 5. Resources & Knowledge Base
    if (currentRoute === '/blog') return <BlogIndexPage />;
    if (currentRoute.startsWith('/blog/')) {
      const slug = currentRoute.replace('/blog/', '').replace(/\/$/, '');
      return <BlogPostPage key={slug} slug={slug} />;
    }
    if (currentRoute === '/guides') return <GuidesPage />;
    if (currentRoute === '/case-studies') return <CaseStudiesPage />;
    if (currentRoute === '/faqs') return <FAQsPage />;

    // 6. Legal & Trust Pages
    if (currentRoute === '/privacy-policy') return <LegalPage type="privacy" />;
    if (currentRoute === '/cookie-policy') return <LegalPage type="cookies" />;
    if (currentRoute === '/impressum') return <LegalPage type="impressum" />;
    if (currentRoute === '/refund-policy') return <LegalPage type="refund" />;
    if (currentRoute === '/terms') return <LegalPage type="terms" />;
    if (currentRoute === '/accessibility') return <LegalPage type="accessibility" />;

    // 7. Fallback: 404
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <SEOHead />
      
      {/* Skip to Content Link for WCAG 2.2 AA Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow-lg focus:outline-hidden"
      >
        {t('skipToContent')}
      </a>

      <Navbar />

      <main id="main-content" className="relative isolate flex-1 focus:outline-hidden">
        {/* Soft logo-coloured wash behind every page header (homepage hero has its own). */}
        {currentRoute !== "/" && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-hero-glow" />
        )}
        {/* Pages are code-split; the fallback keeps the layout height while a page chunk loads. */}
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>{renderCurrentPage()}</Suspense>
      </main>

      <Footer />

      {/* Interactive Modals & GDPR Banner */}
      <BookDemoModal />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}
