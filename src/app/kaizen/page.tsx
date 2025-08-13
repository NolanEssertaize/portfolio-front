'use client';

import { useState } from 'react';
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
    } catch (e) {
      console.error(e);
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
      <pre key={idx} className="mb-2 p-2 bg-gray-100 rounded overflow-x-auto"><code>{block.content}</code></pre>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-semibold">Kaizen Learning (Demo)</h1>
        <button className="text-gray-500 cursor-not-allowed">Login</button>
      </header>
      <main className="w-full flex justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col flex-1 min-w-[150px]">
              <label htmlFor="topic" className="font-medium">Topic</label>
              <select
                id="topic"
                className="mt-1 p-2 border rounded"
                value={topic}
                onChange={(e) => setTopic(e.target.value as Topic)}
              >
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 min-w-[150px]">
              <label htmlFor="level" className="font-medium">Level</label>
              <select
                id="level"
                className="mt-1 p-2 border rounded"
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={status === 'loading'}
              className="self-end px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Generate Lesson
            </button>
          </div>

          {status === 'error' && (
            <div className="p-3 mb-4 rounded bg-red-100 text-red-800 flex items-center justify-between">
              <span>Couldn&apos;t generate a valid lesson. Try again.</span>
              <button onClick={handleGenerate} className="ml-4 px-3 py-1 border rounded">
                Retry
              </button>
            </div>
          )}

          {status === 'success' && lesson && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{lesson.topic} • {lesson.level} • {lesson.duration_min} min</p>
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
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedChoice === null}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                >
                  Check Answer
                </button>
                <div className="mt-4" aria-live="polite">
                  {grade === 'correct' && (
                    <div className="p-3 rounded bg-green-100 text-green-800">{lesson.exercise.explain_correct}</div>
                  )}
                  {grade === 'incorrect' && (
                    <div className="p-3 rounded bg-red-100 text-red-800">{lesson.exercise.explain_incorrect}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {status === 'loading' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-br from-gray-700/40 to-gray-900/40">
          <div className="w-16 h-16 bg-blue-600 rounded-full animate-breathe" />
          <p className="mt-4 text-white">Generating your lesson…</p>
        </div>
      )}
    </div>
  );
}
