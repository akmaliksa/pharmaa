import React, { useState } from 'react';
import { AkmalikNavbar } from './components/akmalik/AkmalikNavbar';
import { AkmalikHero } from './components/akmalik/AkmalikHero';
import { AkmalikMission } from './components/akmalik/AkmalikMission';
import { AkmalikJourney } from './components/akmalik/AkmalikJourney';
import { AkmalikPushCards } from './components/akmalik/AkmalikPushCards';
import { AkmalikPharmacies } from './components/akmalik/AkmalikPharmacies';
import { AkmalikCalculator } from './components/akmalik/AkmalikCalculator';
import { AkmalikFaq } from './components/akmalik/AkmalikFaq';
import { AkmalikResources } from './components/akmalik/AkmalikResources';
import { AkmalikTeam } from './components/akmalik/AkmalikTeam';
import { AkmalikFooter } from './components/akmalik/AkmalikFooter';
import { AkmalikContactDrawer } from './components/akmalik/AkmalikContactDrawer';
import { PharmacyDossierModal } from './components/akmalik/PharmacyDossierModal';
import { AkmalikValuationModal } from './components/akmalik/AkmalikValuationModal';
import { AkmalikAlertModal } from './components/akmalik/AkmalikAlertModal';
import { ArticleModal } from './components/akmalik/ArticleModal';
import { PharmacyItem, ArticleItem, AdvisorItem } from './types/akmalik';

export default function App() {
  const [activeRole, setActiveRole] = useState<'buyer' | 'seller'>('buyer');
  
  // Modals state
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);
  const [contactMode, setContactMode] = useState<'buy' | 'sell' | 'general'>('general');
  const [valuationModalOpen, setValuationModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const handleOpenContact = (mode: 'buy' | 'sell' | 'general' = 'general') => {
    setContactMode(mode);
    setContactDrawerOpen(true);
  };

  const handleSelectAdvisor = (advisor: AdvisorItem) => {
    setContactMode('general');
    setContactDrawerOpen(true);
  };

  const handleScrollToPharmacies = () => {
    const el = document.getElementById('buy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1E1E1E] flex flex-col font-sans selection:bg-[#FFA9E9] selection:text-[#09543D] relative">
      
      {/* 1. Header Navigation */}
      <AkmalikNavbar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenContact={handleOpenContact}
        onOpenValuation={() => setValuationModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Hand Gestures & Role Switcher */}
        <AkmalikHero
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          onOpenValuation={() => setValuationModalOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* 3. Mission & 3 Pillars: Serene Acquisition, Streamlined Formalities, Proximity */}
        <AkmalikMission onOpenContact={() => handleOpenContact('general')} />

        {/* 4. A Champion's Journey, Not an Obstacle Course */}
        <AkmalikJourney
          onOpenValuation={() => setValuationModalOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* 5. Dual Push Banners for Sellers & Buyers */}
        <AkmalikPushCards
          onOpenValuation={() => setValuationModalOpen(true)}
          onScrollToPharmacies={handleScrollToPharmacies}
        />

        {/* 6. Interactive Pharmacy Directory with Multi-Filters & Listings Grid */}
        <AkmalikPharmacies
          onSelectPharmacy={setSelectedPharmacy}
          onOpenAlertModal={() => setAlertModalOpen(true)}
        />

        {/* 7. Interactive Pharmacy Acquisition Loan & Cashflow Simulator */}
        <AkmalikCalculator onOpenConsultation={() => handleOpenContact('buy')} />

        {/* 8. Pharmacy Transaction FAQ Accordion */}
        <AkmalikFaq onOpenContact={() => handleOpenContact('general')} />

        {/* 9. Knowledge Hub & Community Articles */}
        <AkmalikResources
          onSelectArticle={setSelectedArticle}
          onOpenNewsletter={() => {
            const footerEl = document.querySelector('footer');
            if (footerEl) footerEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 10. Dedicated Team & Regional Advisors */}
        <AkmalikTeam onSelectAdvisor={handleSelectAdvisor} />
      </main>

      {/* 11. Footer with Dual Push Cards & Mega Wordmark */}
      <AkmalikFooter
        onOpenContact={handleOpenContact}
        onOpenValuation={() => setValuationModalOpen(true)}
      />

      {/* 12. Pinned Floating Contact Widget / Popin Drawer */}
      <AkmalikContactDrawer
        isOpen={contactDrawerOpen}
        onClose={() => setContactDrawerOpen(false)}
        onToggle={() => setContactDrawerOpen(!contactDrawerOpen)}
        initialMode={contactMode}
      />

      {/* 13. Modals */}
      <PharmacyDossierModal
        pharmacy={selectedPharmacy}
        onClose={() => setSelectedPharmacy(null)}
      />

      <AkmalikValuationModal
        isOpen={valuationModalOpen}
        onClose={() => setValuationModalOpen(false)}
      />

      <AkmalikAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
}
