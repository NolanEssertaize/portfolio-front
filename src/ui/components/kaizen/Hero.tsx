'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SideCircuit from './SideCircuit';
import Container from './Container';

interface HeroProps {
  content: {
    title: string;
    subtitle: string;
    bullets: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  onPrimary: () => void;
  onSecondary: () => void;
}

export default function Hero({ content, onPrimary, onSecondary }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const leftMove = useTransform(scrollYProgress, [0, 1], ['-5%', '0%']);
  const rightMove = useTransform(scrollYProgress, [0, 1], ['5%', '0%']);

  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      <SideCircuit style={{ x: prefersReducedMotion ? 0 : leftMove }} />
      <SideCircuit mirrored style={{ x: prefersReducedMotion ? 0 : rightMove }} />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <motion.h1
            className="mb-6 text-4xl font-bold sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="mb-8 text-lg text-white/80 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            {content.subtitle}
          </motion.p>
          <ul className="mb-8 space-y-2 text-left text-white/80">
            {content.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={onPrimary}
              className="rounded-xl border border-green-400/50 bg-green-500/20 px-8 py-3 font-medium text-green-300 shadow hover:bg-green-500/30"
            >
              {content.primaryCta}
            </button>
            <button
              onClick={onSecondary}
              className="text-sm text-white/80 hover:text-white"
            >
              {content.secondaryCta}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
