'use client';

import { useState } from 'react';
import { Container } from '@ui/components/dna/layout';
import { Button } from '@ui/components/dna/button';
import { Heading, Text } from '@ui/components/dna/typography';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleContact = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:contact@example.com';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border border-white/20 shadow-md">
      <Container className="flex items-center justify-between py-6 md:py-8">
        <Heading as="h2" size="h4" className="font-bold">
          <a href="#">ESSERTAIZE</a>
        </Heading>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Text
              key={link.href}
              as="a"
              href={link.href}
              size="sm"
              className="transition-colors hover:text-[var(--primary)]"
            >
              {link.label}
            </Text>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            animation="roll-replace"
            className="hidden md:inline-flex"
            onClick={handleContact}
          >
            Contact
          </Button>

          <button
            className="md:hidden p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden bg-white/60 backdrop-blur-md border-t border-white/20 shadow-md">
          <Container className="flex flex-col p-6">
            {links.map((link) => (
              <Text
                key={link.href}
                as="a"
                href={link.href}
                size="md"
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Text>
            ))}
            <Button
              variant="primary"
              size="md"
              animation="roll-replace"
              className="mt-4 self-start"
              onClick={handleContact}
            >
              Contact
            </Button>
          </Container>
        </div>
      )}
    </nav>
  );
}

