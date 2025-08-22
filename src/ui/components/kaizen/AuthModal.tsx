'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'guest';
}

export default function AuthModal({ open, onClose, initialTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState(initialTab);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur-xl"
          >
            <div className="mb-4 flex justify-between">
              <button
                className={`flex-1 border-b pb-2 ${tab === 'login' ? 'border-green-400 text-green-400' : 'border-transparent'}`}
                onClick={() => setTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 border-b pb-2 ${tab === 'guest' ? 'border-green-400 text-green-400' : 'border-transparent'}`}
                onClick={() => setTab('guest')}
              >
                Guest
              </button>
            </div>
            {tab === 'login' ? (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md bg-black/40 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-400/40"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-black/40 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-400/40"
                />
                <button
                  onClick={() => console.log('login')}
                  className="w-full rounded-md bg-green-500/20 py-2 text-black text-center hover:bg-green-500/30"
                >
                  Continue
                </button>
                <a href="#" className="block text-center text-xs text-white/60">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <p>Continue as guest with limited quota.</p>
                <button
                  onClick={() => console.log('startGuestTrial')}
                  className="w-full rounded-md bg-green-500/20 py-2 text-black text-center hover:bg-green-500/30"
                >
                  Continue as Guest
                </button>
                <p className="text-xs text-white/60">Quota applies to guest sessions.</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="mt-6 block w-full rounded-md bg-white/10 py-2 text-sm hover:bg-white/20"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
