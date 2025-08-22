import { LearnerProfile, ChatMessage } from './types';

export type LessonRequest = {
  topic: string;
  preciseSubject?: string;
  learnerProfile: LearnerProfile;
  chatHistory: ChatMessage[];
  requestMeta: { sessionId: string; locale: 'en'|'fr'; maxTokens: number };
};

export function buildLessonRequest(args: {
  profile: LearnerProfile;
  chatHistory: ChatMessage[];
  sessionId: string;
}): LessonRequest {
  const { profile, chatHistory, sessionId } = args;
  return {
    topic: profile.topic,
    preciseSubject: profile.preciseSubject,
    learnerProfile: profile,
    chatHistory,
    requestMeta: { sessionId, locale: profile.language, maxTokens: 2000 }
  };
}
