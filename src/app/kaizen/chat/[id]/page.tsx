import ChatHomeShell from '../../../../components/kaizen/ChatHomeShell';
import { KaizenProvider } from '../../../../components/kaizen/KaizenContext';
import { KAIZEN_PAGE_CLASS } from '../../../../components/kaizen/constants';
import Header from '@/ui/components/kaizen/Header';

export default function ChatThreadPage({ params }: { params: { id: string } }) {
  return (
    <div className={KAIZEN_PAGE_CLASS}>
      <Header
        items={[]}
        links={[
          { href: '/kaizen/introduction', label: 'Intro' },
          { href: '/kaizen/home', label: 'Home' },
        ]}
        showStart={false}
        homeHref="/kaizen/home"
      />
      <KaizenProvider>
        <main className="flex flex-1 min-h-0 pt-16"><ChatHomeShell initialThreadId={params.id} /></main>
      </KaizenProvider>
      <footer className="border-t border-black/10 bg-white p-4 text-center text-xs">© Kaizen</footer>
    </div>
  );
}
