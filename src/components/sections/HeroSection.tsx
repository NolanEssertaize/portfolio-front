'use client';
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return <div className="h-screen bg-slate-900"></div>;
  }

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
        
        {/* Mountain SVG - Using CSS custom properties for theme support */}
        <svg 
          className="absolute bottom-0 w-full h-64 text-slate-800 dark:text-slate-700"
          viewBox="0 0 1200 300" 
          fill="currentColor"
        >
          <path d="M0,300 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,300 Z"/>
          <path d="M0,300 L0,220 L150,140 L350,180 L550,120 L750,160 L950,100 L1200,140 L1200,300 Z" 
                className="text-slate-700 dark:text-slate-600"/>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            ESSERTAIZE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-300">
            Full Stack Developer & AI Enthusiast
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            Creating innovative solutions with modern technologies and artificial intelligence
          </p>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 animate-fade-in-up animation-delay-900"
          >
            Discover My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;