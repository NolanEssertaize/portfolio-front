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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="glass-strong rounded-3xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-current opacity-20 rounded mb-4"></div>
            <div className="h-4 bg-current opacity-20 rounded mb-2"></div>
            <div className="h-4 bg-current opacity-20 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const mountainLayers = [
    {
      src: '/background2left.png',
      zIndex: 8,
      parallaxSpeed: 0.8,
      direction: 'left',
      position: { left: '0%', bottom: '-20%' },
      size: { width: '60vw', height: '80vh' },
    },
    {
      src: '/background2right.png',
      zIndex: 8,
      parallaxSpeed: 0.8,
      direction: 'right',
      position: { right: '-30%', bottom: '0%' },
      size: { width: '60vw', height: '80vh' },
    },
    {
      src: '/background4left.png',
      zIndex: 4,
      parallaxSpeed: 0.4,
      direction: 'left',
      position: { left: '-20%', bottom: '0%' },
      size: { width: '80vw', height: '100vh' },
    },
    {
      src: '/background4right.png',
      zIndex: 4,
      parallaxSpeed: 0.4,
      direction: 'right',
      position: { right: '-20%', bottom: '0%' },
      size: { width: '70vw', height: '90vh' },
    },
  ];

  const calculateTransform = (layer: typeof mountainLayers[0]) => {
    let parallaxTransform = '';

    switch (layer.direction) {
      case 'left':
        parallaxTransform = `translateX(-${scrollY * layer.parallaxSpeed}px)`;
        break;
      case 'right':
        parallaxTransform = `translateX(${scrollY * layer.parallaxSpeed}px)`;
        break;
      case 'center':
        parallaxTransform = `translateY(${scrollY * layer.parallaxSpeed}px)`;
        break;
      default:
        parallaxTransform = `translateY(${scrollY * layer.parallaxSpeed}px)`;
    }

    return parallaxTransform;
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen overflow-hidden transition-all duration-500"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Sky Background with Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom, var(--background) 0%, var(--surface-glass) 60%, var(--surface) 100%)`
        }}
      />

      {/* Mountain Layers */}
      <div className="absolute inset-0">
        {mountainLayers.map((layer, index) => (
          <div
            key={`mountain-${index}`}
            className="absolute will-change-transform"
            style={{
              zIndex: layer.zIndex,
              ...layer.position,
              ...layer.size,
              transform: calculateTransform(layer),
              backgroundImage: `url(${layer.src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: layer.direction === 'left' ? 'left bottom' : 'right bottom',
              opacity: layer.zIndex === 10 ? 1 : 0.8 - (10 - layer.zIndex) * 0.1,
              filter: `
                brightness(${layer.zIndex === 10 ? 1 : 0.7 + (layer.zIndex * 0.05)}) 
                hue-rotate(${(10 - layer.zIndex) * 15}deg)
                saturate(${layer.zIndex === 10 ? 1 : 0.6 + (layer.zIndex * 0.06)})
              `,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fog/Mist layers */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30 transition-all duration-500"
          style={{
            background: `linear-gradient(to top, var(--surface-glass), transparent)`,
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full animate-float glass opacity-20"
              style={{
                left: `${20 + (i * 5) % 60}%`,
                top: `${10 + (i * 7) % 70}%`,
                animationDelay: `${(i * 0.5) % 5}s`,
                animationDuration: `${4 + (i % 3)}s`,
                backgroundColor: 'var(--primary)',
                transform: `translateY(${scrollY * (0.05 + (i * 0.01) % 0.1)}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative flex items-center justify-center h-full text-center px-4" style={{ zIndex: 15 }}>
        <div className="max-w-4xl mx-auto">
          <div 
            className="glass-strong rounded-3xl p-8 mb-8"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
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
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-glass px-8 py-4 rounded-full font-medium animate-fade-in-up animation-delay-900"
            style={{ 
              color: 'var(--foreground)',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            Discover My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ 
          zIndex: 15,
          opacity: Math.max(0, 1 - scrollY / 200)
        }}
      >
        <div 
          className="w-6 h-10 glass rounded-full flex justify-center"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <div 
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;