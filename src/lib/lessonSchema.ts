import { z } from 'zod';

export const lessonBlockSchema = z.union([
  z.object({ type: z.literal('text'), content: z.string() }),
  z.object({ type: z.literal('code'), content: z.string(), lang: z.string().optional() }),
]);

export const lessonSchema = z.object({
  title: z.string(),
  duration_min: z.number().min(5).max(15),
  topic: z.enum(['Math', 'Physics', 'English', 'IT', 'Mechanics']),
  level: z.enum(['Easy', 'Medium', 'Hard']),
  lesson: z.array(lessonBlockSchema).min(2).max(6),
  example: z.array(lessonBlockSchema).min(1).max(3),
  exercise: z.object({
    question: z.string(),
    type: z.literal('single_choice'),
    choices: z.array(z.string()).min(3).max(6),
    answer_index: z.number(),
    explain_correct: z.string(),
    explain_incorrect: z.string(),
  }),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;
