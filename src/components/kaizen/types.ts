export type ProficiencyScale = 0|1|2|3|4|5;

export type PrereqConcept = {
  name: string;
  selfRatedMastery: ProficiencyScale;
  notes?: string;
};

export type LearnerProfile = {
  language: 'en'|'fr';
  topic: string;
  preciseSubject?: string;
  targetProficiency: ProficiencyScale;
  deadlineISO?: string;
  weeklyHours: number;
  sessionLengthMin: number;
  priorKnowledge: PrereqConcept[];
  knownMisconceptions?: string[];
  constraints?: string[];
  examplesDomain?: 'math'|'cs'|'science'|'business'|'everyday';
  explanationPracticeRatio: number;
  difficultyPreference: 'gentle'|'balanced'|'challenging';
  strategies: {
    spacedRepetition: boolean;
    retrievalPractice: boolean;
    interleaving: boolean;
    workedExamples: boolean;
    reflectionPrompts: boolean;
  };
  assessmentPrefs: {
    format: ('mcq'|'short-answer'|'coding'|'proof')[];
    microQuizEveryMin: number;
  };
  accessibility?: {
    dyslexiaFriendly?: boolean;
    highContrast?: boolean;
    captions?: boolean;
  };
};

export type ChatMessage = {
  id: string;
  role: 'user'|'assistant'|'system';
  content: string;
  createdAt: string;
};
