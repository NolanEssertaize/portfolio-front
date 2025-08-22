'use client';

import { useState } from 'react';
import Intro from '@/ui/components/kaizen/Intro';
import KaizenModal from '@/ui/components/kaizen/KaizenModal';

export default function KaizenIntroductionPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Intro onStart={() => setOpen(true)} />
      <KaizenModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

