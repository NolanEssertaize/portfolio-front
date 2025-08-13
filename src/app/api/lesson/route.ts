import { NextResponse } from 'next/server';
import type { LessonSchema } from '@/lib/lessonSchema';

function shouldReturnInvalid(topic: LessonSchema['topic'], level: LessonSchema['level']) {
  const key = (topic + level).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return key % 20 === 0;
}

export async function POST(req: Request) {
  const { topic, level } = (await req.json()) as {
    topic: LessonSchema['topic'];
    level: LessonSchema['level'];
  };

  await new Promise((res) => setTimeout(res, 1700));

  if (shouldReturnInvalid(topic, level)) {
    const invalid: Omit<LessonSchema, 'exercise'> & {
      exercise: Omit<LessonSchema['exercise'], 'answer_index'>;
    } = {
      title: `${level} ${topic} Lesson`,
      duration_min: 10,
      topic,
      level,
      lesson: [{ type: 'text', content: `Intro to ${topic}.` }],
      example: [{ type: 'text', content: `Example about ${topic}.` }],
      exercise: {
        question: `Sample question on ${topic}?`,
        type: 'single_choice',
        choices: ['Option A', 'Option B', 'Option C'],
        explain_correct: 'Good job!',
        explain_incorrect: 'Not quite.',
      },
    };
    return NextResponse.json(invalid);
  }

  const lesson: LessonSchema = {
    title: `${level} ${topic} Basics`,
    duration_min: 10,
    topic,
    level,
    lesson: [
      {
        type: 'text',
        content: `Welcome to ${topic}. This is a ${level.toLowerCase()} introduction.`,
      },
      { type: 'code', lang: 'text', content: `Code or formula snippet for ${topic}.` },
    ],
    example: [{ type: 'text', content: `Here's an example related to ${topic}.` }],
    exercise: {
      question: `What is 2 + 2?`,
      type: 'single_choice',
      choices: ['3', '4', '5'],
      answer_index: 1,
      explain_correct: '4 is the correct answer.',
      explain_incorrect: 'Incorrect. The right answer is 4.',
    },
  };

  return NextResponse.json(lesson);
}
