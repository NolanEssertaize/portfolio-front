'use client';
import React from 'react';

const neon = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/70';

export function GlassCard({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl shadow-lg ${className}`}
      {...props}
    />
  );
}

export function Button({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-3 py-1 rounded-md bg-green-500/20 hover:bg-green-500/30 text-sm ${neon} ${className}`}
      {...props}
    />
  );
}

export function Icon({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <span aria-hidden className={`inline-flex items-center ${className}`}>{children}</span>;
}
