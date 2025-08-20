import SiteHeader from "@/components/atomic/organisms/SiteHeader";
import SiteFooter from "@/components/atomic/organisms/SiteFooter";

export default function AiLessonIntro() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Learning AI Project</h1>
        <p className="mb-8">
          Discover the AI lesson generator built with Next.js. Generate
          custom lessons across topics and difficulty levels.
        </p>
        <a href="/kaizen" className="btn-glass px-6 py-3 rounded-xl">
          Try Kaizen
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
