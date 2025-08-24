'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useKaizen } from './KaizenContext';
import MyDataPanel from './MyDataPanel';
import { routes } from './routes';
import { Button, GlassCard } from './ui';
import { MdSettings } from 'react-icons/md';

type Props = { onNavigate?: () => void };

export default function Sidebar({ onNavigate }: Props) {
  const {
    profile,
    threads,
    createThread,
    activeThreadId,
    setActiveThreadId,
    sidebarOpen,
    setSidebarOpen,
  } = useKaizen();
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  const relative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const newChat = () => {
    const title =
      profile.preciseSubject ||
      (profile.topic ? `Start the topic: ${profile.topic}` : 'Untitled chat');
    const id = createThread(title);
    setActiveThreadId(id);
    router.push(routes.chat(id));
    onNavigate?.();
  };

  const openThread = (id: string) => {
    setActiveThreadId(id);
    router.push(routes.chat(id));
    onNavigate?.();
  };

  useEffect(() => {}, [sidebarOpen]); // trigger re-render on mount for persisted state

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="flex items-center justify-between p-2">
        <Button className="flex-1" onClick={newChat}>
          New Chat
        </Button>
        <button
          aria-label="Settings"
          className="ml-2 text-black/60 hover:text-black"
        >
          <MdSettings size={20} />
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto px-2">
        {threads.map(t => (
          <li key={t.id} className="my-1">
            <button
              onClick={() => openThread(t.id)}
              className={`w-full rounded px-2 py-1 text-left text-sm ${
                activeThreadId === t.id ? 'bg-green-500/10 text-green-600' : 'hover:bg-black/5'
              }`}
            >
              <div className="truncate">{t.title || 'Untitled'}</div>
              <div className="text-xs text-black/50">{relative(t.createdAt)}</div>
            </button>
          </li>
        ))}
      </ul>
      <div className="p-2">
        <GlassCard className="p-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-left text-sm font-medium"
          >
            My Data
          </button>
          <AnimatePresence initial={false}>
            {sidebarOpen ? (
              <motion.div
                key="open"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.2 }}
                className="mt-2"
              >
                <MyDataPanel />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.2 }}
                className="mt-2 text-xs text-black/70 space-y-1"
              >
                <div>{profile.topic || 'No topic'}</div>
                <div>Level {profile.targetProficiency}</div>
                <div>{profile.weeklyHours}h/week</div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
}
