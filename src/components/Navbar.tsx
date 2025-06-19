'use client';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems: NavItem[] = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI Chat', href: '#chat' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'chat'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navbar avec structure à deux couches */}
      <nav className="fixed top-0 w-full z-50">
        {/* Couche de background avec blur - ne contient que l'arrière-plan */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(246, 237, 205, 0.15)',
            borderBottom: '1px solid rgba(11, 36, 60, 0.1)'
          }}
        />
        
        {/* Style pour le dark mode */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(11, 36, 60, 0.2)',
            borderBottom: '1px solid rgba(246, 237, 205, 0.1)'
          }}
        />
        
        {/* Couche de contenu - texte net et clair */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('#hero')}
                className="text-2xl font-bold tracking-wider transition-all duration-300 hover:scale-105 relative"
                style={{ color: 'var(--foreground)' }}
              >
                ESSERTAIZE
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.href.replace('#', '')
                      ? 'bg-white/20 dark:bg-white/10 text-primary shadow-lg' 
                      : 'hover:bg-white/10 dark:hover:bg-white/5'
                  }`}
                  style={{ 
                    color: activeSection === item.href.replace('#', '') 
                      ? 'var(--primary)' 
                      : 'var(--muted-foreground)' 
                  }}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <span 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--primary)' }}
                    ></span>
                  )}
                </button>
              ))}
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button & theme toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/10 dark:bg-white/5 transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
                style={{ color: 'var(--foreground)' }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Séparé pour éviter les conflits de blur */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden animate-fade-in-up">
          <div className="mx-4 mt-2 rounded-xl shadow-xl overflow-hidden">
            {/* Background blur pour le menu mobile */}
            <div 
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(246, 237, 205, 0.25)',
                border: '1px solid rgba(11, 36, 60, 0.15)'
              }}
            />
            
            {/* Dark mode background */}
            <div 
              className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(11, 36, 60, 0.4)',
                border: '1px solid rgba(246, 237, 205, 0.1)'
              }}
            />
            
            {/* Menu content */}
            <div className="relative z-10 py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-6 py-3 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;