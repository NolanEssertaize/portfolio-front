'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import SideSvg from './SideSvg';

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  const { scrollYProgress } = useScroll();
  const leftX = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  const color = useTransform(scrollYProgress, [0.8, 1], ['#4b5563', '#4ade80']);
  const glow = useTransform(
    scrollYProgress,
    [0.8, 1],
    ['drop-shadow(0 0 0px #4ade80)', 'drop-shadow(0 0 12px #4ade80)']
  );
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black bg-[length:100%_150%] text-white"
        style={{ backgroundPositionY: bgY as unknown as string }}
      >
      <SideSvg style={{ x: leftX, color, filter: glow }} />
      <SideSvg mirrored style={{ x: rightX, color, filter: glow }} />
      <div className="px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-4xl font-bold sm:text-6xl"
        >
          Kaizen Learning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 text-lg text-white/80 sm:text-2xl"
        >
          Learn faster and better with AI guidance.
        </motion.p>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-xl border border-green-400/50 bg-green-500/20 px-8 py-3 font-medium text-green-300 shadow-[0_0_15px_#22c55e44] transition-colors hover:bg-green-500/30 hover:shadow-[0_0_25px_#22c55eaa]"
        >
          Start Learning
        </motion.button>
      </div>
    </section>
  );
}

