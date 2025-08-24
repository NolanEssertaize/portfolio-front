import ChatHomeShell from '../../../components/kaizen/ChatHomeShell';
import { KaizenProvider } from '../../../components/kaizen/KaizenContext';
import Link from 'next/link';

export default function KaizenHomePage() {
  return (
    <div className="h-screen flex flex-col bg-white text-black font-sans">
      <header className="border-b border-black/10 bg-white">
        <nav className="mx-auto max-w-7xl flex justify-between p-4 text-sm">
          <Link href="/kaizen/home" className="font-bold text-green-400">Kaizen</Link>
          <div className="space-x-4">
            <Link href="/kaizen/introduction" className="hover:underline">Intro</Link>
            <Link href="/kaizen/home" className="hover:underline">Home</Link>
          </div>
        </nav>
      </header>
      <KaizenProvider>
        <main className="flex flex-1 min-h-0"><ChatHomeShell /></main>
      </KaizenProvider>
      <footer className="border-t border-black/10 bg-white p-4 text-center text-xs">© Kaizen</footer>
    </div>
  );
}
