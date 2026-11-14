/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ModalProvider, useModal } from './context/ModalContext.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import BookDemoModal from './components/BookDemoModal.tsx';
import GetStartedModal from './components/GetStartedModal.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import SEOHead from './components/SEOHead.tsx';
import { useT } from './i18n/index.tsx';

import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import NgoSolutionPage from './pages/solutions/NgoSolutionPage.tsx';
import CharitySolutionPage from './pages/solutions/CharitySolutionPage.tsx';
import FoundationSolutionPage from './pages/solutions/FoundationSolutionPage.tsx';
import SponsorshipSolutionPage from './pages/solutions/SponsorshipSolutionPage.tsx';
import MembershipSolutionPage from './pages/solutions/MembershipSolutionPage.tsx';
import InternationalSolutionPage from './pages/solutions/InternationalSolutionPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import SecurityPage from './pages/SecurityPage.tsx';
import BlogIndexPage from './pages/BlogIndexPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import GuidesPage from './pages/GuidesPage.tsx';
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import FAQsPage from './pages/FAQsPage.tsx';
import PartnersPage from './pages/PartnersPage.tsx';
import IntegrationsPage from './pages/IntegrationsPage.tsx';
import IntegrationDetailPage from './pages/IntegrationDetailPage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import PaymentGatewaysPage from './pages/PaymentGatewaysPage.tsx';
import RecurringManagementPage from './pages/RecurringManagementPage.tsx';
import LegalPage from './pages/LegalPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import { isHiddenProduct } from './data/productPages.ts';
import MembershipPage from './pages/products/MembershipPage.tsx';
import SponsorshipPage from './pages/products/SponsorshipPage.tsx';
import WaterWellPage from './pages/products/WaterWellPage.tsx';
import QurbaniPage from './pages/products/QurbaniPage.tsx';
import SchoolManagementPage from './pages/products/SchoolManagementPage.tsx';
import MoneyPoolPage from './pages/products/MoneyPoolPage.tsx';

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
    if (currentRoute === '/donor-management') return <ProductPage slug="donor-management" />;
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
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Interactive Modals & GDPR Banner */}
      <BookDemoModal />
      <GetStartedModal />
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
