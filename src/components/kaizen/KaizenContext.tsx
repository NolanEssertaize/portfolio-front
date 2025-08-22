'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { LearnerProfile, ChatMessage } from './types';

type ThreadMeta = { id: string; title: string; createdAt: string };

type KaizenContextType = {
  profile: LearnerProfile;
  setProfile: (partial: Partial<LearnerProfile>) => void;
  threads: ThreadMeta[];
  createThread: (title: string) => string;
  deleteThread: (id: string) => void;
  messagesByThread: Record<string, ChatMessage[]>;
  appendMessage: (threadId: string, msg: ChatMessage) => void;
  activeThreadId: string | null;
  setActiveThread: (id: string | null) => void;
};

const defaultProfile: LearnerProfile = {
  language: 'en',
  topic: '',
  targetProficiency: 3,
  weeklyHours: 5,
  sessionLengthMin: 45,
  priorKnowledge: [],
  strategies: {
    spacedRepetition: true,
    retrievalPractice: true,
    interleaving: true,
    workedExamples: true,
    reflectionPrompts: true,
  },
  explanationPracticeRatio: 0.5,
  difficultyPreference: 'balanced',
  assessmentPrefs: {
    format: ['mcq'],
    microQuizEveryMin: 8,
  },
};

const KaizenContext = createContext<KaizenContextType | undefined>(undefined);

export function KaizenProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<LearnerProfile>(defaultProfile);
  const [threads, setThreads] = useState<ThreadMeta[]>([]);
  const [messagesByThread, setMessagesByThread] = useState<Record<string, ChatMessage[]>>({});
  const [activeThreadId, setActiveThread] = useState<string | null>(null);

  useEffect(() => {
    try {
      const p = localStorage.getItem('kaizen_profile_v1');
      const t = localStorage.getItem('kaizen_threads_v1');
      const m = localStorage.getItem('kaizen_msgs_v1');
      if (p) setProfileState(JSON.parse(p));
      if (t) setThreads(JSON.parse(t));
      if (m) setMessagesByThread(JSON.parse(m));
    } catch {
      // ignore malformed JSON
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kaizen_profile_v1', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('kaizen_threads_v1', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('kaizen_msgs_v1', JSON.stringify(messagesByThread));
  }, [messagesByThread]);

  const setProfile = (partial: Partial<LearnerProfile>) =>
    setProfileState(prev => ({ ...prev, ...partial }));

  const createThread = (title: string) => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const thread = { id, title, createdAt };
    setThreads(prev => [...prev, thread]);
    return id;
  };

  const deleteThread = (id: string) => {
    setThreads(prev => prev.filter(t => t.id !== id));
    setMessagesByThread(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const appendMessage = (threadId: string, msg: ChatMessage) => {
    setMessagesByThread(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), msg],
    }));
  };

  return (
    <KaizenContext.Provider
      value={{
        profile,
        setProfile,
        threads,
        createThread,
        deleteThread,
        messagesByThread,
        appendMessage,
        activeThreadId,
        setActiveThread,
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
