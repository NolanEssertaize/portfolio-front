import { z } from 'zod';

export const lessonBlockSchema = z.union([
  z.object({ type: z.literal('text'), content: z.string() }),
  z.object({ type: z.literal('code'), lang: z.string().optional(), content: z.string() })
]);

export const lessonSchema = z.object({
  title: z.string(),
  duration_min: z.number().int().min(5).max(15),
  topic: z.enum(['Math', 'Physics', 'English', 'IT', 'Mechanics']),
  level: z.enum(['Easy', 'Medium', 'Hard']),
  lesson: z.array(lessonBlockSchema).min(2).max(6),
  example: z.array(lessonBlockSchema).min(1).max(3),
  exercise: z.object({
    question: z.string(),
    type: z.literal('single_choice'),
    choices: z.array(z.string()).min(3).max(6),
    answer_index: z.number().int(),
    explain_correct: z.string(),
    explain_incorrect: z.string()
  })
});

export type LessonSchema = z.infer<typeof lessonSchema>;
export type LessonBlock = LessonSchema['lesson'][number];
