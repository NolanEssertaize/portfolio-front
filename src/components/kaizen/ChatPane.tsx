'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useKaizen } from './KaizenContext';

export default function ChatPane() {
  const {
    threads,
    createThread,
    deleteThread,
    messagesByThread,
    appendMessage,
  } = useKaizen();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!activeId || !input.trim()) return;
    appendMessage(activeId, {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    });
    // TODO: handle assistant reply via API
    setInput('');
  };

  const msgs = activeId ? messagesByThread[activeId] || [] : [];

  return (
    <div className="h-full flex">
      <aside className="w-48 shrink-0 border-r border-white/10 p-2 space-y-2 bg-white/5 backdrop-blur">
        <button
          onClick={() => {
            const id = createThread('New Thread');
            setActiveId(id);
          }}
          className="w-full rounded bg-white/10 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          + New
        </button>
        <ul className="space-y-1 overflow-y-auto" aria-label="Conversation list">
          {threads.map(t => (
            <li key={t.id} className="flex items-center gap-1">
              <button
                onClick={() => setActiveId(t.id)}
                className={`flex-1 text-left px-2 py-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  activeId === t.id ? 'bg-white/10' : ''
                }`}
              >
                <span className="block truncate text-sm">{t.title}</span>
              </button>
              <button
                onClick={() => deleteThread(t.id)}
                aria-label="Delete thread"
                className="text-xs text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {msgs.map(m => (
            <motion.p
              key={m.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-prose rounded bg-white/5 p-2 text-sm ${
                m.role === 'user' ? 'self-end bg-green-500/20' : ''
              }`}
            >
              {m.content}
            </motion.p>
          ))}
        </div>
        <div className="border-t border-white/10 p-2">
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <input
            id="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="w-full rounded bg-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </section>
    </div>
  );
}
