'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

  const mountainLayers = [
    {
      src: '/background1.png',
      zIndex: 10,
      parallaxSpeed: 0,
      direction: 'left',
      position: { left: '-20%', right:'-80%', bottom: '0%'},
      size: { width: '60%', height: 'auto' },
      colorFilter: 'var(--primary)' 
    },
    
    {
      src: '/background2left.png',
      zIndex: 8,
      parallaxSpeed: 0.8,
      direction: 'left',
      position: { left: '-20%', bottom: '0%' },
      size: { width: '60%', height: 'auto' },
      colorFilter: 'var(--secondary)'
    },
    {
      src: '/background2right.png',
      zIndex: 8,
      parallaxSpeed: 0.8,
      direction: 'right',
      position: { right: '-50%', bottom: '0%' },
      size: { width: '70%', height: 'auto' },
      colorFilter: 'var(--secondary)'
    },
    
    {
      src: '/background4left.png',
      zIndex: 4,
      parallaxSpeed: 0.4,
      direction: 'left',
      position: { left: '-40%', bottom: '0%' },
      size: { width: '110%', height: 'auto' },
      colorFilter: 'var(--secondary)'
    },
    {
      src: '/background4right.png',
      zIndex: 4,
      parallaxSpeed: 0.4,
      direction: 'right',
      position: { right: '-40%', bottom: '0%' },
      size: { width: '110%', height: 'auto' },
      colorFilter: 'var(--secondary)'
    },
  ];

  const calculateTransform = (layer: typeof mountainLayers[0]) => {
    const baseTransform = layer.position.transform || '';
    let parallaxTransform = '';

    switch (layer.direction) {
      case 'left':
        parallaxTransform = `translateX(-${scrollY * layer.parallaxSpeed}px)`;
        break;
      case 'right':
        parallaxTransform = `translateX(${scrollY * layer.parallaxSpeed}px)`;
        break;
      case 'center':
        // Middle mountain moves farther down
        parallaxTransform = `translateY(${scrollY * layer.parallaxSpeed}px)`;
        break;
      default:
        parallaxTransform = `translateY(${scrollY * layer.parallaxSpeed}px)`;
    }

    return baseTransform ? `${baseTransform} ${parallaxTransform}` : parallaxTransform;
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
            key={index}
            className="absolute transition-transform duration-75 ease-out"
            style={{
              zIndex: layer.zIndex,
              ...layer.position,
              transform: calculateTransform(layer),
              filter: `brightness(${1 - (mountainLayers.length - layer.zIndex) * 0.1})`,
            }}
          >
            <Image
              src={layer.src}
              alt={`Mountain layer ${index + 1}`}
              width={1920} // Largeur de référence pour les images
              height={1080} // Hauteur de référence
              className="object-contain transition-all duration-500"
              style={{
                width: layer.size.width,
                height: layer.size.height,
                opacity: layer.zIndex === 10 ? 1 : 0.8 - (10 - layer.zIndex) * 0.1, // Premier plan à 100% d'opacité
                filter: `
                  brightness(${layer.zIndex === 10 ? 1 : 0.7 + (layer.zIndex * 0.05)}) 
                  hue-rotate(${(10 - layer.zIndex) * 15}deg)
                  saturate(${layer.zIndex === 10 ? 1 : 0.6 + (layer.zIndex * 0.06)})
                `
              }}
              priority={layer.zIndex >= 8} // Priorité pour les plans de premier plan
              quality={layer.zIndex >= 6 ? 90 : 75} // Qualité plus élevée pour les plans proches
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              onError={(e) => {
                // Hide layer if image fails to load
                const target = e.target as HTMLElement;
                if (target.parentElement) {
                  target.parentElement.style.display = 'none';
                }
              }}
            />
          </div>
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
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float glass opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                backgroundColor: 'var(--primary)',
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Sun/Moon in the sky */}
      <div 
        className="absolute transition-all duration-500"
        style={{
          top: '15%',
          right: '15%',
          transform: `translateY(${scrollY * 0.2}px)`,
          zIndex: 2
        }}
      >
        <div 
          className="w-20 h-20 rounded-full transition-all duration-500 glass"
          style={{
            background: 'var(--glass-bg)',
            boxShadow: '0 0 40px var(--primary), inset 0 0 20px var(--glass-border)'
          }}
        >
          {/* Sun rays for light theme */}
          <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-500">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-8 rounded-full"
                style={{
                  backgroundColor: 'var(--primary)',
                  transformOrigin: '2px 40px',
                  transform: `rotate(${i * 30}deg)`,
                  opacity: 0.6,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-1px',
                  marginTop: '-40px'
                }}
              />
            ))}
          </div>
          
          {/* Moon craters for dark theme */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
            <div 
              className="absolute w-3 h-3 rounded-full top-4 right-5"
              style={{ backgroundColor: 'var(--mountain-secondary)' }}
            />
            <div 
              className="absolute w-2 h-2 rounded-full top-8 right-7"
              style={{ backgroundColor: 'var(--mountain-secondary)' }}
            />
            <div 
              className="absolute w-1.5 h-1.5 rounded-full top-10 right-4"
              style={{ backgroundColor: 'var(--mountain-secondary)' }}
            />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative flex items-center justify-center h-full text-center px-4" style={{ zIndex: 15}}>
        <div className="max-w-4xl mx-auto">
          <div 
            className="glass-strong rounded-3xl p-8 mb-8"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`, // Réduit le parallax du contenu
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
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass px-8 py-4 rounded-full font-medium animate-fade-in-up animation-delay-900"
            style={{ 
              color: 'var(--foreground)',
              transform: `translateY(${scrollY * 0.1}px)`, // Réduit le parallax du bouton
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