'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}
