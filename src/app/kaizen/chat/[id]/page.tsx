import ChatHomeShell from '../../../../components/kaizen/ChatHomeShell';
import { KaizenProvider } from '../../../../components/kaizen/KaizenContext';
import Link from 'next/link';

export default function ChatThreadPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <nav className="mx-auto max-w-7xl flex justify-between p-4 text-sm">
          <Link href="/kaizen/home" className="font-bold text-green-400">Kaizen</Link>
          <div className="space-x-4">
            <Link href="/kaizen/introduction" className="hover:underline">Intro</Link>
            <Link href="/kaizen/home" className="hover:underline">Home</Link>
          </div>
        </nav>
      </header>
      <KaizenProvider>
        <main className="flex flex-1 min-h-0"><ChatHomeShell initialThreadId={params.id} /></main>
      </KaizenProvider>
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur p-4 text-center text-xs">© Kaizen</footer>
    </div>
  );
}
