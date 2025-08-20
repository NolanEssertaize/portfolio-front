import Link from "next/link";
import Container from "@/components/atomic/atoms/Container";
import Heading from "@/components/atomic/atoms/Heading";
import Subheading from "@/components/atomic/atoms/Subheading";
import CodeBlock from "@/components/atomic/atoms/CodeBlock";
import { Button } from '@/components/atomic/atoms';

export default function Hero() {
  return (
    <section className="py-20">
      <Container className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <Heading>Learn smarter, every day.</Heading>
            <Subheading className="mt-4">
              Micro-lessons generated on demand. One concept, one example, one exercise.
            </Subheading>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/kaizen">
              <Button variant="primary" animation="roll-replace">
                Start now
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="secondary" animation="roll-replace">
                Docs
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full md:w-1/2">
          <CodeBlock language="json">
{`{
  "title": "Derivative basics",
  "duration_min": 5,
  "topic": "Math",
  "level": "Easy",
  "lesson": [{ "type": "text", "content": "d/dx x^n = n*x^(n-1)" }],
  "example": [{ "type": "code", "content": "d/dx x^3 = 3x^2" }],
  "exercise": {
    "question": "d/dx x^5?",
    "type": "single_choice",
    "choices": ["5x^4", "x^5", "4x^3"],
    "answer_index": 0,
    "explain_correct": "Power rule.",
    "explain_incorrect": "Use power rule."
  }
}`}
          </CodeBlock>
        </div>
      </Container>
    </section>
  );
}

