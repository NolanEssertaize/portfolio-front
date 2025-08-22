'use client';

import { useKaizen } from './KaizenContext';
import type { ProficiencyScale } from './types';

export default function ProfilePanel() {
  const { profile, setProfile } = useKaizen();
  return (
    <form className="h-full overflow-y-auto space-y-4 bg-white/5 backdrop-blur p-4 text-sm">
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
          Target proficiency
        </label>
        <select
          id="target"
          value={profile.targetProficiency}
          onChange={e =>
            setProfile({
              targetProficiency: Number(e.target.value) as ProficiencyScale,
            })
          }
          className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {[0,1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="weekly" className="block mb-1">
            Weekly hours
          </label>
          <input
            id="weekly"
            type="number"
            min={0}
            value={profile.weeklyHours}
            onChange={e => setProfile({ weeklyHours: Number(e.target.value) })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label htmlFor="session" className="block mb-1">
            Session length (min)
          </label>
          <input
            id="session"
            type="number"
            min={15}
            max={120}
            value={profile.sessionLengthMin}
            onChange={e => setProfile({ sessionLengthMin: Number(e.target.value) })}
            className="w-full rounded bg-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
      <fieldset className="space-y-2">
        <legend className="font-medium">Strategies</legend>
        {(
          [
            ['spacedRepetition', 'Spaced repetition'],
            ['retrievalPractice', 'Retrieval practice'],
            ['interleaving', 'Interleaving'],
            ['workedExamples', 'Worked examples'],
            ['reflectionPrompts', 'Reflection prompts'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.strategies[key]}
              onChange={e =>
                setProfile({
                  strategies: { ...profile.strategies, [key]: e.target.checked },
                })
              }
              className="h-4 w-4 rounded focus:ring-2 focus:ring-green-400"
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
    </form>
  );
}
