'use client';

import Link from 'next/link';
import { Button } from '@/components/dna/button';
import { Container } from '@/components/dna/layout';
import { Heading, Text } from '@/components/dna/typography';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center py-16 md:py-24"
    >
      <Container className="text-center space-y-6">
        <Heading
          as="h1"
          className="text-4xl md:text-6xl tracking-tight"
        >
          SaaS engineering for SMEs.
        </Heading>
        <Text size="lg" className="text-[var(--muted-foreground)]">
          Secure, data-driven, and fast to ship. From idea to production.
        </Text>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" animation="roll-replace">
              Start a project
            </Button>
          </Link>
          <Link href="#projects">
            <Button variant="secondary" size="lg" animation="roll-replace">
              See case studies
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
