'use client';

import ChatPane from './ChatPane';
import ProfilePanel from './ProfilePanel';

export default function ChatHomeShell() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white font-sans">
      <header className="sticky top-0 z-10 bg-white/10 backdrop-blur border-b border-white/20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 text-sm">
          <a href="/kaizen/home" className="font-bold text-green-400">
            Kaizen
          </a>
          <div className="space-x-4">
            <a href="/kaizen/home" className="hover:underline">
              Home
            </a>
            <a href="/kaizen/introduction" className="hover:underline">
              Intro
            </a>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col md:flex-row">
        <section className="flex-1 border-b md:border-b-0 md:border-r border-white/10">
          <ChatPane />
        </section>
        <aside className="w-full md:w-80 lg:w-96">
          <ProfilePanel />
        </aside>
      </main>
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur p-4 text-center text-xs">
        <a href="#" className="mx-2 underline hover:no-underline">
          Privacy
        </a>
        <a href="#" className="mx-2 underline hover:no-underline">
          Terms
        </a>
      </footer>
    </div>
  );
}
