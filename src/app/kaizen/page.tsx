'use client';

import { useState } from 'react';
import BreathingLoader from '@/components/kaizen/BreathingLoader';
import { lessonSchema, Lesson } from '@/lib/lessonSchema';

const topics = ['Math', 'Physics', 'English', 'IT', 'Mechanics'] as const;
const levels = ['Easy', 'Medium', 'Hard'] as const;

type Topic = (typeof topics)[number];
type Level = (typeof levels)[number];

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export default function KaizenPage() {
  const [topic, setTopic] = useState<Topic>('Math');
  const [level, setLevel] = useState<Level>('Easy');
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [grade, setGrade] = useState<'correct' | 'incorrect' | null>(null);

  const handleGenerate = async () => {
    setStatus(Status.Loading);
    setLesson(null);
    setSelected(null);
    setGrade(null);
    try {
      const res = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level }),
      });
      const data = await res.json();
      const parsed = lessonSchema.safeParse(data);
      if (parsed.success) {
        setLesson(parsed.data);
        setStatus(Status.Success);
      } else {
        setStatus(Status.Error);
      }
    } catch {
      setStatus(Status.Error);
    }
  };

  const handleCheck = () => {
    if (!lesson || selected === null) return;
    if (selected === lesson.exercise.answer_index) {
      setGrade('correct');
    } else {
      setGrade('incorrect');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Kaizen Demo</h1>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">Topic</label>
            <select
              className="w-full glass px-4 py-2 rounded-xl bg-[var(--surface)] text-[var(--foreground)] disabled:opacity-50"
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              disabled={status === Status.Loading}
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">Level</label>
            <select
              className="w-full glass px-4 py-2 rounded-xl bg-[var(--surface)] text-[var(--foreground)] disabled:opacity-50"
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              disabled={status === Status.Loading}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="btn-glass px-6 py-3 rounded-xl font-medium text-[var(--primary)] disabled:opacity-50"
          disabled={status === Status.Loading}
        >
          Generate Lesson
        </button>
      </div>

      {status === Status.Error && (
        <div className="card-glass rounded-xl p-4 text-[var(--primary)] space-y-4">
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={handleGenerate}
            className="btn-glass px-4 py-2 rounded-lg text-[var(--primary)]"
          >
            Retry
          </button>
        </div>
      )}

      {status === Status.Success && lesson && (
        <div className="space-y-8">
          <header className="card-glass p-6 rounded-xl space-y-2">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{lesson.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              {lesson.topic} • {lesson.level} • {lesson.duration_min} min
            </p>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">Lesson</h3>
            {lesson.lesson.map((block, i) =>
              block.type === 'text' ? (
                <p key={i} className="text-[var(--foreground)]">
                  {block.content}
                </p>
              ) : (
                <pre
                  key={i}
                  className="card-glass p-4 rounded-xl overflow-auto text-sm font-mono text-[var(--foreground)]"
                >
                  <code>{block.content}</code>
                </pre>
              ),
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">Example</h3>
            {lesson.example.map((block, i) =>
              block.type === 'text' ? (
                <p key={i} className="text-[var(--foreground)]">
                  {block.content}
                </p>
              ) : (
                <pre
                  key={i}
                  className="card-glass p-4 rounded-xl overflow-auto text-sm font-mono text-[var(--foreground)]"
                >
                  <code>{block.content}</code>
                </pre>
              ),
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">Exercise</h3>
            <p className="text-[var(--foreground)]">{lesson.exercise.question}</p>
            <div className="space-y-2">
              {lesson.exercise.choices.map((choice, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="accent-[var(--primary)]"
                    name="exercise"
                    value={i}
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  <span className="text-[var(--foreground)]">{choice}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleCheck}
              className="btn-glass px-4 py-2 rounded-xl text-[var(--primary)] disabled:opacity-50"
              disabled={selected === null}
            >
              Check Answer
            </button>
            <div aria-live="polite">
              {grade === 'correct' && (
                <div className="card-glass mt-4 p-4 rounded-xl text-[var(--foreground)]">
                  <p className="font-semibold text-[var(--secondary-foreground)]">Correct!</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {lesson.exercise.explain_correct}
                  </p>
                </div>
              )}
              {grade === 'incorrect' && (
                <div className="card-glass mt-4 p-4 rounded-xl text-[var(--foreground)]">
                  <p className="font-semibold text-[var(--primary-foreground)]">Incorrect.</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {lesson.exercise.explain_incorrect}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {status === Status.Loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--surface-glass)] backdrop-blur-md">
          <BreathingLoader />
        </div>
      )}
    </div>
  );
}
