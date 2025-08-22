'use client';

import { useState } from 'react';
import { defaultContent } from '@/content/defaultContent';
import Header from '@/ui/components/kaizen/Header';
import Hero from '@/ui/components/kaizen/Hero';
import HowItWorks from '@/ui/components/kaizen/HowItWorks';
import Benefits from '@/ui/components/kaizen/Benefits';
import Features from '@/ui/components/kaizen/Features';
import Pricing from '@/ui/components/kaizen/Pricing';
import SecurityPrivacy from '@/ui/components/kaizen/SecurityPrivacy';
import Demo from '@/ui/components/kaizen/Demo';
import Testimonials from '@/ui/components/kaizen/Testimonials';
import FAQ from '@/ui/components/kaizen/FAQ';
import Roadmap from '@/ui/components/kaizen/Roadmap';
import FinalCTA from '@/ui/components/kaizen/FinalCTA';
import Footer from '@/ui/components/kaizen/Footer';
import AuthModal from '@/ui/components/kaizen/AuthModal';

export default function KaizenIntroductionPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="font-sans overflow-x-hidden text-black">
      <Header items={[]} onStart={() => setModalOpen(true)} />
      <main>
        <Hero
          content={defaultContent.hero}
          onPrimary={() => setModalOpen(true)}
          onSecondary={() =>
            document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <HowItWorks steps={defaultContent.howItWorks} />
        <Benefits content={defaultContent.benefits} />
        <Features features={defaultContent.features} />
        <Pricing tiers={defaultContent.pricing.tiers} note={defaultContent.pricing.note} />
        <SecurityPrivacy content={defaultContent.security} />
        <Demo content={defaultContent.demo} onGuest={() => setModalOpen(true)} />
        <Testimonials items={defaultContent.testimonials} />
        <FAQ items={defaultContent.faq} />
        <Roadmap items={defaultContent.roadmap} />
        <FinalCTA content={defaultContent.finalCta} onPrimary={() => setModalOpen(true)} />
      </main>
      <Footer />
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
