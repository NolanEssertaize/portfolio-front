'use client';
import { useState, useRef, useEffect } from 'react';
import { useKaizen } from './KaizenContext';
import { Button } from './ui';

type Props = { onOpenSidebar?: () => void };

export default function ChatPane({ onOpenSidebar }: Props) {
  const { threads, activeThreadId, renameThread, messagesByThread, appendMessage, profile } = useKaizen();
  const thread = threads.find(t => t.id === activeThreadId);
  const msgs = activeThreadId ? messagesByThread[activeThreadId] || [] : [];
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(thread?.title || '');
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => setTitle(thread?.title || ''), [thread?.title]);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [msgs.length]);

  const send = () => {
    if (!activeThreadId || !input.trim()) return;
    const now = new Date().toISOString();
    appendMessage(activeThreadId, { id: crypto.randomUUID(), role: 'user', content: input.trim(), createdAt: now });
    if (msgs.length === 0 && !profile.topic && !profile.preciseSubject) {
      /* nudge shown below */
    }
    appendMessage(activeThreadId, { id: crypto.randomUUID(), role: 'assistant', content: '(Preview) Your AI lesson will appear here.', createdAt: now });
    setInput('');
  };

  const exportChat = () => {
    if (!activeThreadId) return;
    const blob = new Blob([JSON.stringify(msgs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thread-${activeThreadId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showNudge = msgs.length === 1 && msgs[0].role === 'user' && !profile.topic && !profile.preciseSubject;

  return (
    <div className="flex h-full flex-col min-h-0">
      <div className="flex items-center gap-2 border-b border-white/10 p-2">
        <button className="md:hidden" aria-label="Open sidebar" onClick={onOpenSidebar}>☰</button>
        {editing ? (
          <input value={title} onChange={e => setTitle(e.target.value)} onBlur={() => { setEditing(false); if (thread) renameThread(thread.id, title || 'Untitled'); }} className="flex-1 rounded bg-white/10 p-1" autoFocus />
        ) : (
          <h2 className="flex-1 truncate" onClick={() => setEditing(true)}>{thread?.title || 'Untitled'}</h2>
        )}
        <Button onClick={exportChat} className="px-2 py-1 text-xs">Export chat</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {msgs.map(m => (
          <div key={m.id} className={`max-w-prose rounded px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-green-500/20' : 'bg-white/10'}`}>
            <div>{m.content}</div>
            <div className="mt-1 text-[10px] opacity-50">{new Date(m.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        {showNudge && <div className="text-xs text-yellow-200">Select a topic or continue with “Start the topic”.</div>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={e => { e.preventDefault(); send(); }} className="border-t border-white/10 p-2 flex items-end gap-2">
        <textarea value={input} onChange={e => setInput(e.target.value)} aria-label="Message" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !(e.nativeEvent as KeyboardEvent).isComposing) { e.preventDefault(); send(); } }} className="flex-1 rounded bg-white/10 p-2 text-sm" rows={2} />
        <Button type="submit" className="px-3 py-2">Send</Button>
      </form>
    </div>
  );
}
