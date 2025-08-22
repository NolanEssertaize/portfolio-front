'use client';

import Container from './Container';

interface Item {
  title: string;
  eta: string;
  text: string;
}

export default function Roadmap({ items }: { items: Item[] }) {
  return (
    <section id="roadmap" className="py-24">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold">Roadmap</h2>
        <ul className="mx-auto max-w-2xl border-l border-black/20 pl-6">
          {items.map((item) => (
            <li key={item.title} className="relative mb-8 last:mb-0">
              <span className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-green-400" />
              <div className="mb-1 font-semibold">
                {item.title}{' '}
                <span className="text-sm font-normal text-black/60">{item.eta}</span>
              </div>
              <p className="text-sm text-black/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
