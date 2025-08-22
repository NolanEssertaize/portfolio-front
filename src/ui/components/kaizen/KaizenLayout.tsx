'use client';

import { useScroll, useTransform } from 'framer-motion';
import React from 'react';
import SideSvg from './SideSvg';

interface KaizenLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function KaizenLayout({ children, className }: KaizenLayoutProps) {
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
      className={`relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black bg-[length:100%_150%] text-white ${className ?? ''}`}
      style={{ backgroundPositionY: bgY }}
    >
      <SideSvg style={{ x: leftX, color, filter: glow }} />
      <SideSvg mirrored style={{ x: rightX, color, filter: glow }} />
      {children}
    </section>
  );
}

