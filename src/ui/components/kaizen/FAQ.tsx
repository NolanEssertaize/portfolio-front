'use client';

import Container from './Container';

interface QA {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: QA[] }) {
  return (
    <section id="faq" className="py-24">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold">FAQ</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {items.map((qa) => (
            <details key={qa.q} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <summary className="cursor-pointer font-medium">{qa.q}</summary>
              <p className="mt-2 text-sm text-white/80">{qa.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
