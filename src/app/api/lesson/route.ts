import { NextResponse } from 'next/server';
import { Lesson } from '@/lib/lessonSchema';

type Topic = 'Math' | 'Physics' | 'English' | 'IT' | 'Mechanics';
type Level = 'Easy' | 'Medium' | 'Hard';

function generateLesson(topic: Topic, level: Level): Lesson {
  const hash = (topic.length + level.length) % 3;
  const duration = 5 + ((topic.length + level.length) % 11);
  return {
    title: `${topic} ${level} Lesson`,
    duration_min: duration,
    topic,
    level,
    lesson: [
      { type: 'text', content: `This lesson covers ${topic} at ${level} level.` },
      { type: 'code', lang: 'ts', content: `// ${topic} example\nconsole.log('${topic}');` },
    ],
    example: [
      { type: 'text', content: `Consider this example for ${topic}.` },
    ],
    exercise: {
      question: `Sample question about ${topic}?`,
      type: 'single_choice',
      choices: ['Option A', 'Option B', 'Option C'],
      answer_index: hash,
      explain_correct: 'Correct answer!',
      explain_incorrect: 'Incorrect answer.',
    },
  };
}

export async function POST(req: Request) {
  const { topic, level }: { topic: Topic; level: Level } = await req.json();
  await new Promise((res) => setTimeout(res, 1700));
  const lesson = generateLesson(topic, level);
  if (Math.random() < 0.05) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalid: any = { ...lesson };
    delete invalid.exercise.answer_index;
    return NextResponse.json(invalid);
  }
  return NextResponse.json(lesson);
}
