'use client';

import { useState } from 'react';
import BreathingLoader from '@/components/kaizen/BreathingLoader';
import { lessonSchema, type LessonSchema, type LessonBlock } from '@/lib/lessonSchema';

export default function KaizenPage() {
  type Topic = LessonSchema['topic'];
  type Level = LessonSchema['level'];
  const topics: Topic[] = ['Math', 'Physics', 'English', 'IT', 'Mechanics'];
  const levels: Level[] = ['Easy', 'Medium', 'Hard'];

  const [topic, setTopic] = useState<Topic>('Math');
  const [level, setLevel] = useState<Level>('Easy');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lesson, setLesson] = useState<LessonSchema | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [grade, setGrade] = useState<'correct' | 'incorrect' | null>(null);

  const handleGenerate = async () => {
    setStatus('loading');
    setLesson(null);
    setSelectedChoice(null);
    setGrade(null);
    try {
      const res = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level }),
      });
      const data = await res.json();
      const parsed = lessonSchema.safeParse(data);
      if (!parsed.success) throw new Error('Invalid');
      setLesson(parsed.data);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleCheckAnswer = () => {
    if (lesson && selectedChoice !== null) {
      setGrade(selectedChoice === lesson.exercise.answer_index ? 'correct' : 'incorrect');
    }
  };

  const renderBlock = (block: LessonBlock, idx: number) => {
    if (block.type === 'text') {
      return <p key={idx} className="mb-2">{block.content}</p>;
    }
    return (
      <pre
        key={idx}
        className="card-glass rounded-xl p-4 mb-2 overflow-x-auto font-mono text-sm"
      >
        <code>{block.content}</code>
      </pre>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-effect">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-lg font-semibold">Kaizen Learning (Demo)</h1>
          <button className="btn-glass px-4 py-2 rounded-xl cursor-not-allowed" disabled>Login</button>
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="card-glass rounded-3xl p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label htmlFor="topic" className="mb-1">Topic</label>
                <select
                  id="topic"
                  className="glass-effect rounded-xl p-2"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as Topic)}
                  disabled={status === 'loading'}
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col flex-1 min-w-[150px]">
                <label htmlFor="level" className="mb-1">Level</label>
                <select
                  id="level"
                  className="glass-effect rounded-xl p-2"
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  disabled={status === 'loading'}
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleGenerate}
                disabled={status === 'loading'}
                className="btn-glass px-4 py-2 rounded-xl self-end disabled:opacity-50"
              >
                Generate Lesson
              </button>
            </div>

            {status === 'error' && (
              <div className="card-glass p-3 mb-4 rounded-xl border-l-4 border-[var(--accent)] text-sm flex items-center justify-between">
                <span>Couldn&apos;t generate a valid lesson. Try again.</span>
                <button onClick={handleGenerate} className="btn-glass px-3 py-1 rounded-xl ml-4">
                  Retry
                </button>
              </div>
            )}

            {status === 'success' && lesson && (
              <div>
                <h2 className="text-xl font-semibold mb-1">{lesson.title}</h2>
                <p className="text-sm opacity-80 mb-4">{lesson.topic} • {lesson.level} • {lesson.duration_min} min</p>
                <div className="mb-4">
                  {lesson.lesson.map(renderBlock)}
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Example</h3>
                  {lesson.example.map(renderBlock)}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Exercise</h3>
                  <p className="mb-2">{lesson.exercise.question}</p>
                  <div className="space-y-2">
                    {lesson.exercise.choices.map((choice, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="exercise"
                          value={idx}
                          checked={selectedChoice === idx}
                          onChange={() => setSelectedChoice(idx)}
                          disabled={status === 'loading'}
                        />
                        <span>{choice}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedChoice === null || status === 'loading'}
                    className="btn-glass px-4 py-2 mt-4 rounded-xl disabled:opacity-50"
                  >
                    Check Answer
                  </button>
                  <div className="mt-4" aria-live="polite">
                    {grade === 'correct' && (
                      <div className="card-glass p-3 rounded-xl border-l-4 border-[var(--secondary)]">
                        {lesson.exercise.explain_correct}
                      </div>
                    )}
                    {grade === 'incorrect' && (
                      <div className="card-glass p-3 rounded-xl border-l-4 border-[var(--accent)]">
                        {lesson.exercise.explain_incorrect}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {status === 'loading' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center glass-effect-strong bg-[var(--background)]/60">
          <BreathingLoader />
          <p className="mt-4">Generating your lesson…</p>
        </div>
      )}
    </div>
  );
}
