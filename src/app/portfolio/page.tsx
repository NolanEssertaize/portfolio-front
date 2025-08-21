'use client';
import { useEffect } from 'react';
import { Navbar } from '@/components/dna/nav';
import HeroSection from '@/components/portfolio/sections/HeroSection';
import ServicesSection from '@/components/portfolio/sections/ServicesSection';
import ProjectsSection from '@/components/portfolio/sections/ProjectSection';
import ChatSection from '@/components/portfolio/sections/ChatSection';
import ParcoursTimeline from '@/components/portfolio/sections/ParcoursTimeline';

export default function Home() {
  useEffect(() => {
    // Force scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Prevent any automatic scrolling
    const preventAutoScroll = () => {
      window.scrollTo(0, 0);
    };
    
    // Run immediately and after a short delay
    preventAutoScroll();
    setTimeout(preventAutoScroll, 100);
    setTimeout(preventAutoScroll, 500);
    
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <ParcoursTimeline />
      <ServicesSection />
      <ProjectsSection />
      <ChatSection/>
    </main>
  );
}