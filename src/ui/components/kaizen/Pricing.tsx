'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface Tier {
  name: string;
  priceText: string;
  features: string[];
  cta: string;
}

interface PricingProps {
  tiers: Tier[];
  note: string;
}

export default function Pricing({ tiers, note }: PricingProps) {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-2 text-xl font-semibold">{tier.name}</h3>
              <p className="mb-4 text-white/70">{tier.priceText}</p>
              <ul className="mb-6 flex-1 space-y-2 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => console.log(tier.cta)}
                className="rounded-md bg-green-500/20 px-4 py-2 text-sm text-green-300 hover:bg-green-500/30"
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/60">{note}</p>
      </Container>
    </section>
  );
}
