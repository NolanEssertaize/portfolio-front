"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from '@ui/components/atomic/atoms';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          Brand
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="hidden md:block">
          <Link href="/login">
            <Button animation="roll-replace">Login</Button>
          </Link>
        </div>
        <Button
          className="md:hidden btn-glass p-2 rounded-lg" variant="ghost" animation="none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </Button>
      </div>
      {open && (
        <nav className="md:hidden px-4 pb-4 flex flex-col space-y-2">
          <a href="#features" className="py-2">Features</a>
          <a href="#how" className="py-2">How it works</a>
          <a href="#pricing" className="py-2">Pricing</a>
          <Link href="/login" className="py-2">
            <Button className="w-full" animation="roll-replace">Login</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
