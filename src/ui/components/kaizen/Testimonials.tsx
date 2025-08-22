'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="mb-4 text-sm text-white/80">“{t.quote}”</p>
              <footer className="text-xs text-white/60">
                {t.name}, {t.role}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
