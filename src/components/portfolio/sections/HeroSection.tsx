"use client";

import Link from "next/link";
import GlassPanel from "@/components/dna/glass/GlassPanel";
import HeroBackdrop from "@/components/dna/background/HeroBackdrop";
import KaizenAssembleBackdrop from "@/components/dna/background/KaizenAssembleBackdrop";
import { Button } from "@/components/dna/button";
import { Heading, Text } from "@/components/dna/typography";

export default function HeroSection(){
  return (
    <section id="hero" className="relative py-24 md:py-32 overflow-hidden">
      <HeroBackdrop />
      <KaizenAssembleBackdrop />
      <div className="container mx-auto px-4 hero-fade-in">
        <div className="mx-auto max-w-3xl text-center">
          <GlassPanel className="mx-auto">
            <Heading as="h1" className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
              KAIZEN learning & SaaS delivery
            </Heading>
            <Text className="mt-4 text-lg md:text-xl text-gray-600">
              Secure, data‑driven, and fast to ship — from idea to production.
            </Text>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/contact" aria-label="Start a project">
                <Button variant="primary" size="lg" animation="roll-replace">
                  Start a project
                </Button>
              </Link>
              <Link href="#projects" aria-label="See case studies">
                <Button variant="ghost" size="lg" animation="roll-replace">
                  See case studies
                </Button>
              </Link>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
