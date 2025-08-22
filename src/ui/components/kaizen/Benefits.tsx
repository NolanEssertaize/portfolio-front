'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface BenefitsProps {
  content: {
    paragraph: string;
    items: string[];
  };
}

export default function Benefits({ content }: BenefitsProps) {
  return (
    <section id="benefits" className="py-24">
      <Container>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-white/80"
          >
            {content.paragraph}
          </motion.p>
          <ul className="space-y-3">
            {content.items.map((item) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.414l-7.071 7.072a1 1 0 01-1.414 0L3.296 8.853a1 1 0 111.414-1.414l4.095 4.096 6.364-6.364a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
