'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useKaizen } from './KaizenContext';

export default function ChatPane() {
  const {
    profile,
    threads,
    createThread,
    deleteThread,
    messagesByThread,
    appendMessage,
    activeThreadId,
    setActiveThread,
  } = useKaizen();
  const [input, setInput] = useState('');
  const [needsTopicPrompt, setNeedsTopicPrompt] = useState(false);

  const msgs = activeThreadId ? messagesByThread[activeThreadId] || [] : [];

  useEffect(() => {
    setNeedsTopicPrompt(false);
  }, [activeThreadId]);

  const handleNewChat = () => {
    const title =
      profile.preciseSubject ||
      `Start the topic: ${profile.topic || 'Untitled'}`;
    const id = createThread(title);
    setActiveThread(id);
  };

  const handleSend = () => {
    if (!activeThreadId || !input.trim()) return;
    const existing = messagesByThread[activeThreadId] || [];
    const now = new Date().toISOString();
    appendMessage(activeThreadId, {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      createdAt: now,
    });
    if (existing.length === 0 && !profile.topic && !profile.preciseSubject) {
      setNeedsTopicPrompt(true);
    }
    appendMessage(activeThreadId, {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '(Preview) Your AI lesson will appear here.',
      createdAt: now,
    });
    setInput('');
  };

  const handleExport = () => {
    if (!activeThreadId) return;
    const data = messagesByThread[activeThreadId] || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thread-${activeThreadId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-white/10 p-2 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={handleNewChat}
          className="rounded bg-white/10 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          + New chat
        </button>
        {threads.map(t => (
          <div key={t.id} className="flex items-center gap-1">
            <button
              onClick={() => setActiveThread(t.id)}
              className={`px-2 py-1 rounded text-xs truncate max-w-40 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                activeThreadId === t.id ? 'bg-white/10' : 'hover:bg-white/10'
              }`}
            >
              {t.title}
            </button>
            <button
              onClick={() => deleteThread(t.id)}
              aria-label="Delete thread"
              className="text-xs text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {msgs.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-prose rounded px-3 py-2 text-sm ${
                m.role === 'user' ? 'ml-auto bg-green-500/20' : 'bg-white/10'
              }`}
            >
              {m.content}
            </motion.div>
          ))}
          {needsTopicPrompt && (
            <div className="max-w-prose rounded bg-yellow-500/20 p-2 text-sm">
              <p>Please set a topic in My Data or start the topic.</p>
              <button
                onClick={() => setNeedsTopicPrompt(false)}
                className="mt-1 rounded bg-white/10 px-2 py-1 text-xs"
              >
                Start the topic
              </button>
            </div>
          )}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="border-t border-white/10 p-2 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded bg-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="rounded bg-green-500/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Send
          </button>
        </form>
        <div className="border-t border-white/10 p-2 text-right text-xs">
          <button
            onClick={handleExport}
            className="rounded bg-white/10 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Export chat (JSON)
          </button>
        </div>
      </div>
    </div>
  );
}

