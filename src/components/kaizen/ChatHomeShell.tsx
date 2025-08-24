'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useKaizen } from './KaizenContext';
import Link from 'next/link';
import { routes } from './routes';

type Props = { initialThreadId?: string };

export default function ChatHomeShell({ initialThreadId }: Props) {
  const { activeThreadId, setActiveThreadId, threads } = useKaizen();
  const [drawer, setDrawer] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (initialThreadId) setActiveThreadId(initialThreadId); }, [initialThreadId, setActiveThreadId]);


  const threadExists = activeThreadId ? threads.some(t => t.id === activeThreadId) : true;
  if (initialThreadId && !threadExists)
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Thread not found — create a new chat</p>
        <Link href={routes.home} className="underline text-green-400">Go home</Link>
      </div>
    );

  return (
    <div className="flex flex-1 h-full min-h-0">
      <aside className="hidden md:block w-72 shrink-0 border-r border-black/10 h-full"><Sidebar /></aside>
      <AnimatePresence>
        {drawer && (
          <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ duration: prefersReduced ? 0 : 0.2 }} className="fixed inset-y-0 left-0 z-20 w-72 bg-white/80 backdrop-blur-md border-r border-black/10 md:hidden">
            <Sidebar onNavigate={() => setDrawer(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
