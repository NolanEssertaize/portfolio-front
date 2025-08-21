import Link from 'next/link';

export default function KaizenIntroductionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 animate-[fade-in-up_0.6s_ease-out_forwards]">
        Kaizen Learning
      </h1>
      <p
        className="max-w-md mb-8 text-lg sm:text-xl opacity-80 animate-[fade-in-up_0.6s_ease-out_forwards] [animation-delay:0.2s]"
      >
        Continuous improvement through short lessons and quick exercises.
      </p>
      <Link
        href="/kaizen/guest"
        className="btn-glass px-6 py-3 rounded-xl animate-[fade-in-up_0.6s_ease-out_forwards] [animation-delay:0.4s]"
      >
        Try as Guest
      </Link>
    </div>
  );
}
