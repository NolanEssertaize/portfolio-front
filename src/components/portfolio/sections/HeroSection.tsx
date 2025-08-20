'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/dna/button';
import { Container } from '@/components/dna/layout';
import { Heading, Text } from '@/components/dna/typography';
import GlassPanel from '@/components/dna/glass/GlassPanel';
import Typewriter from '@/components/dna/animations/Typewriter';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center bg-gradient-to-b from-white via-green-50 to-white py-16 md:py-24"
    >
      <Container>
        <GlassPanel className="flex flex-col items-center justify-between gap-12 text-center md:flex-row md:text-left">
          <div className="space-y-6 md:flex-1">
            <Heading as="h1" className="text-gray-900">
              <Typewriter text="Building SaaS for SMEs." />
            </Heading>
            <Text className="text-gray-600">
              Secure, data-driven, and fast to ship — from idea to production.
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
          </div>
          <GlassPanel className="w-full max-w-lg h-72 md:flex-1 overflow-hidden">
            <Image
              src="/ProjectAI.png"
              alt="App screenshot"
              className="h-full w-full object-cover"
              width={800}
              height={600}
              priority
            />
          </GlassPanel>
        </GlassPanel>
      </Container>
    </section>
  );
}
