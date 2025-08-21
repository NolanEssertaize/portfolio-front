import { NextResponse } from 'next/server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { lessonSchema, type LessonSchema } from '@domain/lesson'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are a precise curriculum generator. Return ONLY JSON matching LessonSchema. No prose. No markdown.`

function buildPrompt(topic: LessonSchema['topic'], level: LessonSchema['level'], error?: string) {
  const base = `Generate a beginner-friendly lesson for:\nTOPIC = "${topic}"\nLEVEL = "${level}"\n\nConstraints:\n- 8–12 minutes total.\n- 2–6 lesson blocks (text/code).\n- 1–3 example blocks.\n- Exercise: single_choice with 3–6 choices; include answer_index, explain_correct, explain_incorrect.\n- Avoid hallucinated facts; pick a narrowly defined subtopic if needed.`
  return error ? `${base}\n\nThe previous output failed validation: ${error}` : base
}

export async function POST(req: Request) {
  try {
    const { topic, level } = (await req.json()) as {
      topic: LessonSchema['topic']
      level: LessonSchema['level']
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'missing_api_key' }, { status: 500 })
    }

    const google = createGoogleGenerativeAI({ apiKey })

    let errorMessage = ''
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { object } = await generateObject({
          model: google('models/gemini-2.5-pro'),
          temperature: 0.2,
          system: SYSTEM_PROMPT,
          prompt: buildPrompt(topic, level, errorMessage),
          schema: lessonSchema,
        })

        await new Promise((res) => setTimeout(res, 1700))
        return NextResponse.json(object)
      } catch (err) {
        errorMessage = err instanceof Error ? err.message : String(err)
      }
    }

    return NextResponse.json({ error: 'validation_failed' }, { status: 502 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }
}

