import dynamic from "next/dynamic";

const ParcoursTimeline = dynamic(
  () => import("@/components/about/ParcoursTimeline"),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <main style={{ minHeight: "200vh" }}>
      <section style={{ padding: "6rem 1rem 2rem", textAlign: "center" }}>
        <h1>À propos</h1>
        <p>
          Ingénieur full‑stack orienté data & UX. J’aime les systèmes élégants,
          mesurables et scalables.
        </p>
      </section>
      <ParcoursTimeline />
    </main>
  );
}

