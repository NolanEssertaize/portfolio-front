export type ProficiencyScale = 0|1|2|3|4|5; // 0=none, 5=expert

export type PrereqConcept = {
  name: string;
  selfRatedMastery: ProficiencyScale; // user-estimated
  notes?: string;
};

export type LearnerProfile = {
  language: 'en'|'fr';
  topic: string;                 // e.g., "Linear Algebra"
  preciseSubject?: string;       // e.g., "Eigenvalues and eigenvectors"
  targetProficiency: ProficiencyScale;
  deadlineISO?: string;          // e.g., "2025-10-01"
  weeklyHours: number;           // commitment signal
  sessionLengthMin: number;      // 15–120
  priorKnowledge: PrereqConcept[];
  knownMisconceptions?: string[]; // short labels
  constraints?: string[];         // e.g., "mobile-only", "no video"
  examplesDomain?: 'math'|'cs'|'science'|'business'|'everyday';
  explanationPracticeRatio: number; // 0..1 (0=all practice, 1=all explanation)
  difficultyPreference: 'gentle'|'balanced'|'challenging'; // desirable difficulty target
  strategies: {
    spacedRepetition: boolean;
    retrievalPractice: boolean;
    interleaving: boolean;
    workedExamples: boolean;
    reflectionPrompts: boolean; // metacognitive checks
  };
  assessmentPrefs: {
    format: ('mcq'|'short-answer'|'coding'|'proof')[];
    microQuizEveryMin: number; // e.g., 6–10
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

export type LessonRequest = {
  topic: string;
  preciseSubject?: string;
  learnerProfile: LearnerProfile;
  chatHistory: ChatMessage[];
  requestMeta: {
    sessionId: string;
    locale: 'en'|'fr';
    maxTokens: number;
  };
};

export type LessonResponse = {
  overview: string;
  prerequisites: { name: string; brief: string }[];
  lessonPlan: Array<{
    step: number;
    title: string;
    explain: string;
    example?: string;
    check?: string; // quick self-check question
    practice?: string[]; // exercises/prompts
    estMinutes: number;
  }>;
  spacedSchedule?: Array<{ dayOffset: number; activity: string }>;
  microQuizzes?: Array<{ question: string; answers: string[]; correctIndex: number; explanation: string }>;
  references?: string[]; // urls or titles (to be filtered server-side)
  safetyNotes?: string[]; // domain-specific cautions
};
