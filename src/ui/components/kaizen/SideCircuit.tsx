'use client';

import { motion, MotionProps } from 'framer-motion';

interface SideCircuitProps extends MotionProps {
  mirrored?: boolean;
}

export default function SideCircuit({ mirrored, ...props }: SideCircuitProps) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 400"
      className={`pointer-events-none absolute top-0 h-full w-20 opacity-50 ${
        mirrored ? 'right-0 rotate-180' : 'left-0'
      }`}
      {...props}
    >
      <defs>
        <linearGradient id="circuit" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M50 0 v100 q0 10 -10 10 h-20 q-10 0 -10 10 v40 q0 10 10 10 h20 q10 0 10 10 v210"
        stroke="url(#circuit)"
        strokeWidth="2"
        fill="none"
      />
    </motion.svg>
  );
}
