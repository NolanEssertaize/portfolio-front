'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface Step {
  title: string;
  text: string;
}

export default function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <section id="how" className="py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="rounded-2xl border border-black/10 bg-black/5 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-2 text-lg font-semibold text-black">{step.title}</h3>
              <p className="text-sm text-black/80">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
