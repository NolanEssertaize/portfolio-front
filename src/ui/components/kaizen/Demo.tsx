'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface DemoContent {
  title: string;
  subtitle: string;
  leftMockJson: string;
  guestNote: string;
}

interface DemoProps {
  content: DemoContent;
  onGuest: () => void;
}

export default function Demo({ content, onGuest }: DemoProps) {
  return (
    <section id="demo" className="py-24">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-semibold">{content.title}</h2>
        <p className="mb-8 text-center text-white/70">{content.subtitle}</p>
        <div className="grid gap-8 md:grid-cols-2">
          <motion.pre
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="overflow-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-xl"
          >
            <code>{content.leftMockJson}</code>
          </motion.pre>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
          >
            <button
              onClick={onGuest}
              className="mb-4 rounded-md bg-green-500/20 px-6 py-3 text-green-300 hover:bg-green-500/30"
            >
              Try as Guest
            </button>
            <p className="text-xs text-white/60">{content.guestNote}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
