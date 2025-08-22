'use client';

import Container from './Container';

interface FinalContent {
  primary: string;
  secondary: string;
  note: string;
}

interface Props {
  content: FinalContent;
  onPrimary: () => void;
}

export default function FinalCTA({ content, onPrimary }: Props) {
  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-semibold">Ready to learn?</h2>
          <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onPrimary}
              className="rounded-xl border border-green-400/50 bg-green-500/20 px-8 py-3 font-medium text-green-300 shadow hover:bg-green-500/30"
            >
              {content.primary}
            </button>
            <a
              href="mailto:contact@example.com"
              className="text-sm text-white/80 hover:text-white"
            >
              {content.secondary}
            </a>
          </div>
          <p className="text-xs text-white/60">{content.note}</p>
        </div>
      </Container>
    </section>
  );
}
