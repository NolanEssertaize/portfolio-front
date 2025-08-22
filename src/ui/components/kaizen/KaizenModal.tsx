'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface KaizenModalProps {
  open: boolean;
  onClose: () => void;
}

export default function KaizenModal({ open, onClose }: KaizenModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-2xl font-semibold">Welcome</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded bg-white/5 p-2 placeholder-white/50 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded bg-white/5 p-2 placeholder-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded bg-green-500/20 py-2 text-black text-center transition hover:bg-green-500/30"
              >
                Login
              </button>
            </form>
            <div className="mt-6">
              <Link
                href="/kaizen/guest"
                className="block w-full rounded bg-green-500 py-2 text-center font-medium text-black transition hover:bg-green-400"
                onClick={onClose}
              >
                Guest Test
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

