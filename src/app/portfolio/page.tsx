'use client';
import { useEffect } from 'react';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/sections/HeroSection';
import AboutSection from '@/components/portfolio/sections/AboutSection';
import SkillsSection from '@/components/portfolio/sections/SkillsSection';
import ProjectsSection from '@/components/portfolio/sections/ProjectSection';
import ChatSection from '@/components/portfolio/sections/ChatSection';

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
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ChatSection/>
    </main>
  );
}