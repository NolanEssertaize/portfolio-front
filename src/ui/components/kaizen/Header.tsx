'use client';

import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  items: NavItem[];
  onStart: () => void;
}

export default function Header({ items = [], onStart }: HeaderProps) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(item.id);
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="text-lg font-semibold text-black">Kaizen 改善</a>
        <button
          className="sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul
          className={`${open ? 'block' : 'hidden'} absolute left-0 top-full w-full bg-white p-4 sm:static sm:flex sm:w-auto sm:space-x-6 sm:bg-transparent sm:p-0`}
        >
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-sm font-medium hover:text-green-400 ${
                  active === item.id ? 'text-green-400' : 'text-black'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          <button
            onClick={onStart}
            className="rounded-md bg-green-500/20 px-4 py-2 text-sm text-black text-center shadow hover:bg-green-500/30"
          >
            Start
          </button>
        </div>
      </nav>
    </header>
  );
}
