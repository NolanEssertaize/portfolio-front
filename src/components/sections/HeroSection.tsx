'use client';
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) {
    return <div className="h-screen" style={{ backgroundColor: 'var(--background)' }}></div>;
  }

  return (
    <section 
      id="hero" 
      className="relative h-screen overflow-hidden transition-all duration-500"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Parallax Background with Glass Effect */}
      <div 
        className="absolute inset-0 transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, var(--surface-glass) 70%, var(--surface) 100%)`
          }}
        ></div>
        
        {/* Theme-Aware Mountain SVG */}
        <svg 
          className="absolute bottom-0 w-full h-80 transition-all duration-500 animate-mountain-glow"
          viewBox="0 0 1200 320" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Mountains (furthest) */}
          <path 
            d="M0,320 L0,220 L150,120 L300,160 L450,100 L600,140 L750,80 L900,110 L1050,70 L1200,100 L1200,320 Z"
            fill="var(--mountain-tertiary)"
            opacity="0.6"
            className="transition-all duration-500"
          />
          
          {/* Middle Mountains */}
          <path 
            d="M0,320 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,320 Z"
            fill="var(--mountain-secondary)"
            opacity="0.8"
            className="transition-all duration-500"
          />
          
          {/* Foreground Mountains (closest) */}
          <path 
            d="M0,320 L0,240 L180,140 L360,180 L540,120 L720,160 L900,100 L1080,130 L1200,110 L1200,320 Z"
            fill="var(--mountain-primary)"
            className="transition-all duration-500"
          />
          
          {/* Glass reflection effect - only visible in light theme */}
          <defs>
            <linearGradient id="mountainGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--glass-bg)" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="var(--glass-bg)" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,320 L0,240 L180,140 L360,180 L540,120 L720,160 L900,100 L1080,130 L1200,110 L1200,320 Z"
            fill="url(#mountainGlass)"
            className="transition-all duration-500 dark:opacity-0"
          />
        </svg>

        {/* Moon/Sun indicator in the sky */}
        <div className="absolute top-20 right-20 transition-all duration-500">
          <div 
            className="w-16 h-16 rounded-full transition-all duration-500 glass"
            style={{
              background: 'var(--glass-bg)',
              boxShadow: '0 0 30px var(--predominant), inset 0 0 15px var(--glass-border)'
            }}
          >
            {/* Sun rays for light theme */}
            <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-500">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-6 rounded-full"
                  style={{
                    backgroundColor: 'var(--predominant)',
                    transformOrigin: '2px 32px',
                    transform: `rotate(${i * 45}deg)`,
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
            
            {/* Moon craters for dark theme */}
            <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
              <div 
                className="absolute w-2 h-2 rounded-full top-3 right-4"
                style={{ backgroundColor: 'var(--mountain-secondary)' }}
              />
              <div 
                className="absolute w-1.5 h-1.5 rounded-full top-6 right-6"
                style={{ backgroundColor: 'var(--mountain-secondary)' }}
              />
              <div 
                className="absolute w-1 h-1 rounded-full top-8 right-3"
                style={{ backgroundColor: 'var(--mountain-secondary)' }}
              />
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float glass"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: 'var(--glass-border)',
                opacity: 0.4
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content with Glass Effect */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 mb-8">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up"
              style={{ color: 'var(--foreground)' }}
            >
              ESSERTAIZE
            </h1>
            <p 
              className="text-xl md:text-2xl mb-6 animate-fade-in-up animation-delay-300"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Full Stack Developer & AI Enthusiast
            </p>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-600"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Creating innovative solutions with modern technologies and artificial intelligence
            </p>
          </div>
          
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass px-8 py-4 rounded-full font-medium animate-fade-in-up animation-delay-900"
            style={{ color: 'var(--foreground)' }}
          >
            Discover My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator with Glass Effect */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 glass rounded-full flex justify-center"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <div 
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: 'var(--predominant)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;