import { useEffect, useMemo, useRef } from "react";
import { Card } from "@ui/components/dna/card";

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
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  dotsRef.current = [];

  const segmentsCount = 28;
  const segments = useMemo(() => Array.from({ length: segmentsCount }), [segmentsCount]);

  const addSegmentRef = (el: HTMLSpanElement | null) => {
    if (el && !segmentsRef.current.includes(el)) segmentsRef.current.push(el);
  };
  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };
  const addDotRef = (el: HTMLSpanElement | null) => {
    if (el && !dotsRef.current.includes(el)) dotsRef.current.push(el);
  };

  useEffect(() => {
    const handler = () => {
      const centerY = window.innerHeight / 2;
      segmentsRef.current.forEach((seg) => {
        const rect = seg.getBoundingClientRect();
        const segCenter = rect.top + rect.height / 2;
        const dist = Math.abs(segCenter - centerY);
        const intensity = Math.max(0, 1 - dist / (window.innerHeight * 0.6));
        const scale = 1 + intensity * 0.5;
        seg.style.setProperty("--glow", intensity.toFixed(3));
        seg.style.setProperty("--scale", scale.toFixed(3));
      });
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        const t = Math.max(0, 1 - dist / (window.innerHeight * 0.7));
        card.parentElement?.style.setProperty("--charge", t.toFixed(3));
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - e.clientX;
        const dy = centerY - e.clientY;
        const distance = Math.hypot(dx, dy);
        const hoverRadius = 160;
        if (distance < hoverRadius) {
          const strength = ((hoverRadius - distance) / hoverRadius) * 30;
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * strength;
          const ty = Math.sin(angle) * strength;
          card.style.transform = `translate(${tx}px, ${ty}px)`;
        } else {
          card.style.transform = "";
        }
      });
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    dotsRef.current.forEach((dot) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 20;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const duration = 4 + Math.random() * 4;
      const delay = -Math.random() * duration;
      dot.style.setProperty("--dx", `${dx.toFixed(2)}px`);
      dot.style.setProperty("--dy", `${dy.toFixed(2)}px`);
      dot.style.setProperty("--duration", `${duration.toFixed(2)}s`);
      dot.style.setProperty("--delay", `${delay.toFixed(2)}s`);
    });

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      window.removeEventListener("pointermove", handlePointerMove);
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
              <Card ref={addCardRef} className="card" tabIndex={0}>
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
              </Card>
              <div className="connector" aria-hidden="true">
                <span ref={addDotRef} className="dot" />
                <span className="line" />
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
}
