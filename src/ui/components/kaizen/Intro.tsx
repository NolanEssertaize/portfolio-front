'use client';

import { motion } from 'framer-motion';
import React from 'react';
import KaizenLayout from './KaizenLayout';

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  return (
    <KaizenLayout className="flex items-center justify-center">
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
    </KaizenLayout>
  );
}

