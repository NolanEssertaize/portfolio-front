'use client';

import { motion, MotionStyle } from 'framer-motion';
import React from 'react';

interface SideSvgProps {
  mirrored?: boolean;
  style?: MotionStyle;
}

export default function SideSvg({ mirrored = false, style }: SideSvgProps) {
  return (
    <motion.svg
      viewBox="0 0 100 400"
      className={`pointer-events-none absolute top-0 h-full w-24 text-gray-600 ${
        mirrored ? 'right-0' : 'left-0'
      }`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 0 V400 M50 0 V400 M80 0 V400"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="20" cy="80" r="6" fill="currentColor" />
      <circle cx="50" cy="200" r="6" fill="currentColor" />
      <circle cx="80" cy="320" r="6" fill="currentColor" />
    </motion.svg>
  );
}

