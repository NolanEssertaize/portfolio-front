'use client';

import { useKaizen } from './KaizenContext';
import type { ProficiencyScale, PrereqConcept, LessonRequest, LearnerProfile } from './types';

function buildLessonRequest(
  profile: LearnerProfile,
  chatHistory: LessonRequest['chatHistory'],
  sessionId: string
): LessonRequest {
  return {
    topic: profile.topic,
    preciseSubject: profile.preciseSubject,
    learnerProfile: profile,
    chatHistory,
    requestMeta: {
      sessionId,
      locale: profile.language,
      maxTokens: 2000,
    },
  };
}

export default function MyDataPanel() {
  const { profile, setProfile, messagesByThread, activeThreadId } = useKaizen();

  const updatePrereq = (index: number, partial: Partial<PrereqConcept>) => {
    const next = [...profile.priorKnowledge];
    next[index] = { ...next[index], ...partial };
    setProfile({ priorKnowledge: next });
  };

  const addPrereq = () =>
    setProfile({
      priorKnowledge: [
        ...profile.priorKnowledge,
        { name: '', selfRatedMastery: 0, notes: '' },
      ],
    });

  const removePrereq = (index: number) => {
    const next = profile.priorKnowledge.filter((_, i) => i !== index);
    setProfile({ priorKnowledge: next });
  };

  const lessonReq = buildLessonRequest(
    profile,
    activeThreadId ? messagesByThread[activeThreadId] || [] : [],
    activeThreadId || crypto.randomUUID()
  );
  const preview = JSON.stringify(lessonReq, null, 2);

  const formats = ['mcq', 'short-answer', 'coding', 'proof'] as const;

  return (
    <div className="h-full overflow-y-auto bg-white/5 backdrop-blur p-4 space-y-4 text-sm">
      <form className="space-y-4">
        <div>
          <label htmlFor="language" className="block mb-1">
            Language
          </label>
          <select
            id="language"
            value={profile.language}
            onChange={e => setProfile({ language: e.target.value as 'en' | 'fr' })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="block mb-1">
            Topic
          </label>
          <input
            id="topic"
            value={profile.topic}
            onChange={e => setProfile({ topic: e.target.value })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label htmlFor="preciseSubject" className="block mb-1">
            Precise subject
          </label>
          <input
            id="preciseSubject"
            value={profile.preciseSubject || ''}
            onChange={e => setProfile({ preciseSubject: e.target.value })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label htmlFor="target" className="block mb-1">
            Target proficiency: {profile.targetProficiency}
          </label>
          <input
            type="range"
            id="target"
            min={0}
            max={5}
            step={1}
            value={profile.targetProficiency}
            onChange={e =>
              setProfile({
                targetProficiency: Number(e.target.value) as ProficiencyScale,
              })
            }
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block mb-1">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={profile.deadlineISO || ''}
            onChange={e => setProfile({ deadlineISO: e.target.value })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="weekly" className="block mb-1">
              Weekly hours
            </label>
            <input
              type="number"
              id="weekly"
              min={0}
              value={profile.weeklyHours}
              onChange={e => setProfile({ weeklyHours: Number(e.target.value) })}
              className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="sessionLen" className="block mb-1">
              Session length (min)
            </label>
            <input
              type="number"
              id="sessionLen"
              min={15}
              max={120}
              step={5}
              value={profile.sessionLengthMin}
              onChange={e =>
                setProfile({ sessionLengthMin: Number(e.target.value) })
              }
              className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">Prerequisites</span>
            <button
              type="button"
              onClick={addPrereq}
              className="rounded bg-white/10 px-2 py-1 text-xs"
            >
              + Add
            </button>
          </div>
          {profile.priorKnowledge.map((p, i) => (
            <div key={i} className="mb-2 space-y-1 rounded bg-white/5 p-2">
              <div className="flex gap-2">
                <input
                  value={p.name}
                  onChange={e => updatePrereq(i, { name: e.target.value })}
                  placeholder="Concept"
                  className="flex-1 rounded bg-white/10 p-1"
                />
                <input
                  type="number"
                  min={0}
                  max={5}
                  value={p.selfRatedMastery}
                  onChange={e =>
                    updatePrereq(i, {
                      selfRatedMastery: Number(e.target.value) as ProficiencyScale,
                    })
                  }
                  className="w-16 rounded bg-white/10 p-1"
                />
              </div>
              <div className="flex gap-2">
                <input
                  value={p.notes || ''}
                  onChange={e => updatePrereq(i, { notes: e.target.value })}
                  placeholder="Notes"
                  className="flex-1 rounded bg-white/10 p-1"
                />
                <button
                  type="button"
                  onClick={() => removePrereq(i)}
                  className="rounded bg-red-500/30 px-2 py-1 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <fieldset className="space-y-2">
          <legend className="font-medium">Strategies</legend>
          {(
            [
              ['spacedRepetition', 'Spaced repetition'],
              ['retrievalPractice', 'Retrieval practice'],
              ['interleaving', 'Interleaving'],
              ['workedExamples', 'Worked examples'],
              ['reflectionPrompts', 'Reflection'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.strategies[key]}
                onChange={e =>
                  setProfile({
                    strategies: {
                      ...profile.strategies,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded focus:ring-2 focus:ring-green-400"
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="ratio" className="block mb-1">
            Explanation vs practice ratio: {profile.explanationPracticeRatio.toFixed(2)}
          </label>
          <input
            type="range"
            id="ratio"
            min={0}
            max={1}
            step={0.01}
            value={profile.explanationPracticeRatio}
            onChange={e =>
              setProfile({
                explanationPracticeRatio: Number(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <fieldset>
          <legend className="font-medium mb-1">Difficulty</legend>
          {(
            [
              ['gentle', 'Gentle'],
              ['balanced', 'Balanced'],
              ['challenging', 'Challenging'],
            ] as const
          ).map(([val, label]) => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="difficulty"
                value={val}
                checked={profile.difficultyPreference === val}
                onChange={e =>
                  setProfile({
                    difficultyPreference: e.target.value as typeof val,
                  })
                }
                className="mr-1"
              />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-medium">Assessment</legend>
          <div className="flex flex-wrap gap-2">
            {formats.map(f => (
              <label key={f} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={profile.assessmentPrefs.format.includes(f)}
                  onChange={e => {
                    const list = profile.assessmentPrefs.format;
                    const next = e.target.checked
                      ? [...list, f]
                      : list.filter(x => x !== f);
                    setProfile({
                      assessmentPrefs: {
                        ...profile.assessmentPrefs,
                        format: next,
                      },
                    });
                  }}
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
          <div>
            <label htmlFor="micro" className="block mb-1">
              Micro-quiz every (min)
            </label>
            <input
              type="number"
              id="micro"
              min={1}
              value={profile.assessmentPrefs.microQuizEveryMin}
              onChange={e =>
                setProfile({
                  assessmentPrefs: {
                    ...profile.assessmentPrefs,
                    microQuizEveryMin: Number(e.target.value),
                  },
                })
              }
              className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-medium">Accessibility</legend>
          {(
            [
              ['dyslexiaFriendly', 'Dyslexia-friendly'],
              ['highContrast', 'High contrast'],
              ['captions', 'Captions'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.accessibility?.[key] || false}
                onChange={e =>
                  setProfile({
                    accessibility: {
                      ...profile.accessibility,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded focus:ring-2 focus:ring-green-400"
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      </form>
      <div>
        <label className="block mb-1">LessonRequest Preview</label>
        <textarea
          readOnly
          value={preview}
          className="w-full h-48 rounded bg-black/50 p-2 font-mono text-xs"
        />
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(preview)}
          className="mt-2 rounded bg-white/10 px-2 py-1 text-xs"
        >
          Copy request JSON
        </button>
      </div>
    </div>
  );
}

