'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface Feature {
  title: string;
  text: string;
}

export default function Features({ features }: { features: Feature[] }) {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <svg
                className="mb-4 h-6 w-6 text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-white/80">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
