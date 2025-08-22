'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatPane from './ChatPane';
import { useKaizen } from './KaizenContext';
import { buildLessonRequest } from './request';
import { Button } from './ui';
import Link from 'next/link';
import { routes } from './routes';

type Props = { initialThreadId?: string };

export default function ChatHomeShell({ initialThreadId }: Props) {
  const { profile, messagesByThread, activeThreadId, setActiveThreadId, threads } = useKaizen();
  const [drawer, setDrawer] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (initialThreadId) setActiveThreadId(initialThreadId); }, [initialThreadId, setActiveThreadId]);

  const handleGenerate = () => {
    const req = buildLessonRequest({
      profile,
      chatHistory: activeThreadId ? messagesByThread[activeThreadId] || [] : [],
      sessionId: activeThreadId || crypto.randomUUID(),
    });
    console.log('LessonRequest', req);
    // TODO: fetch('/api/lessons/generate', { method: 'POST', body: JSON.stringify(req) })
  };

  const threadExists = activeThreadId ? threads.some(t => t.id === activeThreadId) : true;
  if (initialThreadId && !threadExists)
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Thread not found — create a new chat</p>
        <Link href={routes.home} className="underline text-green-400">Go home</Link>
      </div>
    );

  return (
    <div className="flex h-full">
      <aside className="hidden md:block w-72 shrink-0 border-r border-white/10"><Sidebar /></aside>
      <AnimatePresence>
        {drawer && (
          <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ duration: prefersReduced ? 0 : 0.2 }} className="fixed inset-y-0 left-0 z-20 w-72 bg-black/80 backdrop-blur-md border-r border-white/10 md:hidden">
            <Sidebar onNavigate={() => setDrawer(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-2 border-b border-white/10">
          <Button onClick={handleGenerate} className="text-xs px-2 py-1">Generate Lesson (Preview)</Button>
        </div>
        <ChatPane onOpenSidebar={() => setDrawer(true)} />
      </div>
    </div>
  );
}
