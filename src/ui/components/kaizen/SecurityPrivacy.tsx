'use client';

import Container from './Container';
import { motion } from 'framer-motion';

interface MiniFaq {
  q: string;
  a: string;
}

interface SecurityProps {
  content: { bullets: string[]; miniFaq: MiniFaq[] };
}

export default function SecurityPrivacy({ content }: SecurityProps) {
  return (
    <section id="security" className="py-24">
      <Container>
        <h2 className="mb-8 text-2xl font-semibold">Security & Privacy</h2>
        <ul className="mb-8 space-y-3">
          {content.bullets.map((b) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-start gap-2"
            >
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-green-400" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
        <div className="space-y-4">
          {content.miniFaq.map((f) => (
            <details key={f.q} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-white/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
