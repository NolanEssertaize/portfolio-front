'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { LearnerProfile, ChatMessage } from './types';

type ThreadMeta = { id: string; title: string; createdAt: string };

type Ctx = {
  profile: LearnerProfile;
  setProfile: (p: Partial<LearnerProfile>) => void;
  threads: ThreadMeta[];
  createThread: (title: string) => string;
  renameThread: (id: string, title: string) => void;
  deleteThread: (id: string) => void;
  messagesByThread: Record<string, ChatMessage[]>;
  appendMessage: (id: string, msg: ChatMessage) => void;
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const defaultProfile: LearnerProfile = {
  language: 'en',
  topic: '',
  targetProficiency: 3,
  weeklyHours: 5,
  sessionLengthMin: 45,
  priorKnowledge: [],
  explanationPracticeRatio: 0.5,
  difficultyPreference: 'balanced',
  strategies: {
    spacedRepetition: true,
    retrievalPractice: true,
    interleaving: true,
    workedExamples: true,
    reflectionPrompts: true,
  },
  assessmentPrefs: { format: ['mcq'], microQuizEveryMin: 8 },
};

const KaizenContext = createContext<Ctx | undefined>(undefined);

export function KaizenProvider({ children }: { children: React.ReactNode }) {
  const read = <T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : fallback;
    } catch {
      return fallback;
    }
  };

  const [profile, setProfileState] = useState<LearnerProfile>(() => read('kaizen_profile_v1', defaultProfile));
  const [threads, setThreads] = useState<ThreadMeta[]>(() => read('kaizen_threads_v1', []));
  const [messagesByThread, setMessages] = useState<Record<string, ChatMessage[]>>(() => read('kaizen_msgs_v1', {}));
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => read('kaizen_sidebar_open_v1', false));

  useEffect(() => localStorage.setItem('kaizen_profile_v1', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('kaizen_threads_v1', JSON.stringify(threads)), [threads]);
  useEffect(() => localStorage.setItem('kaizen_msgs_v1', JSON.stringify(messagesByThread)), [messagesByThread]);
  useEffect(() => localStorage.setItem('kaizen_sidebar_open_v1', JSON.stringify(sidebarOpen)), [sidebarOpen]);

  const setProfile = (p: Partial<LearnerProfile>) => setProfileState(prev => ({ ...prev, ...p }));

  const createThread = (title: string) => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    setThreads(prev => [...prev, { id, title, createdAt }]);
    return id;
  };

  const renameThread = (id: string, title: string) =>
    setThreads(prev => prev.map(t => (t.id === id ? { ...t, title } : t)));

  const deleteThread = (id: string) => {
    setThreads(prev => prev.filter(t => t.id !== id));
    setMessages(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
    if (activeThreadId === id) setActiveThreadId(null);
  };

  const appendMessage = (id: string, msg: ChatMessage) =>
    setMessages(prev => ({ ...prev, [id]: [...(prev[id] || []), msg] }));

  return (
    <KaizenContext.Provider
      value={{
        profile,
        setProfile,
        threads,
        createThread,
        renameThread,
        deleteThread,
        messagesByThread,
        appendMessage,
        activeThreadId,
        setActiveThreadId,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </KaizenContext.Provider>
  );
}

export function useKaizen() {
  const ctx = useContext(KaizenContext);
  if (!ctx) throw new Error('useKaizen must be used within KaizenProvider');
  return ctx;
}
