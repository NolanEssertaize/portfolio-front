import { useEffect, useMemo, useRef } from "react";

type Step = {
  id: number;
  side?: "left" | "right";
  title: string;
  subtitle: string;
  period: string;
  bullets: string[];
};

const stepsData: Step[] = [
  {
    id: 1,
    side: "right",
    title: "Technological Baccalaureate (STI2D)",
    subtitle: "SIN Option",
    period: "2021–2021",
    bullets: ["Honors: Fairly Good"],
  },
  {
    id: 2,
    side: "left",
    title: "BTS SN",
    subtitle: "SIN Option",
    period: "2021–2023",
    bullets: ["Connected home automation project"],
  },
  {
    id: 3,
    side: "right",
    title: "Bachelor’s Year 3 in CDA (Work-Study)",
    subtitle: "XEFI",
    period: "2024–2025",
    bullets: ["Python backend developer", "New architecture"],
  },
  {
    id: 4,
    side: "left",
    title: "Today",
    subtitle: "Full-stack while starting a Master’s",
    period: "2025–present",
    bullets: ["Back/Front/Mobile", "Performance & UX"],
  },
];

export default function ParcoursTimeline({ steps = stepsData }: { steps?: Step[] }) {
  const segmentsRef = useRef<HTMLSpanElement[]>([]);
  segmentsRef.current = [];
  const cardsRef = useRef<HTMLDivElement[]>([]);
  cardsRef.current = [];

  const segmentsCount = 28;
  const segments = useMemo(() => Array.from({ length: segmentsCount }), [segmentsCount]);

  const addSegmentRef = (el: HTMLSpanElement | null) => {
    if (el && !segmentsRef.current.includes(el)) segmentsRef.current.push(el);
  };
  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    const handler = () => {
      const centerY = window.innerHeight / 2;
      segmentsRef.current.forEach((seg) => {
        const rect = seg.getBoundingClientRect();
        const segCenter = rect.top + rect.height / 2;
        const dist = Math.abs(segCenter - centerY);
        const intensity = Math.max(0, 1 - dist / (window.innerHeight * 0.6));
        seg.style.setProperty("--glow", intensity.toFixed(3));
      });
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        const t = Math.max(0, 1 - dist / (window.innerHeight * 0.7));
        card.parentElement?.style.setProperty("--charge", t.toFixed(3));
      });
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section id="about" className="wrapper" aria-label="Parcours">
      <div className="rail">
        {segments.map((_, i) => (
          <span key={i} ref={addSegmentRef} className="segment" aria-hidden="true" />
        ))}
      </div>

      <ol className="zigzag">
        {steps
          .map((s, i) => ({ ...s, side: s.side ?? (i % 2 ? "left" : "right") }))
          .map((s) => (
            <li key={s.id} className={`item ${s.side === "left" ? "left" : "right"}`}>
              <article ref={addCardRef} className="card" tabIndex={0}>
                <header className="cardHeader">
                  <h3 className="title">{s.title}</h3>
                  <p className="subtitle">{s.subtitle}</p>
                  <time className="period">{s.period}</time>
                </header>
                <ul className="bullets">
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="cornerTag" aria-hidden="true">
                  #{String(s.id).padStart(2, "0")}
                </div>
              </article>
              <div className="connector" aria-hidden="true">
                <span className="dot" />
                <span className="line" />
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
}
