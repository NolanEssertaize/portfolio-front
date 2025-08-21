import { useEffect, useMemo, useRef } from "react";
import styles from "./ParcoursTimeline.module.css";

type Step = {
  id: number;
  side: "left" | "right";
  title: string;
  subtitle: string;
  period: string;
  bullets: string[];
};

const stepsData: Step[] = [
  {
    id: 1,
    side: "right",
    title: "Baccalauréat Technologique (STI2D)",
    subtitle: "Option SIN",
    period: "2018–2020",
    bullets: ["Mention Bien", "Projet domotique open-source"],
  },
  {
    id: 2,
    side: "left",
    title: "Développeur Alternant",
    subtitle: "ACME Corp • Next.js & Node.js",
    period: "2020–2022",
    bullets: ["-20% temps de build CI", "+15% couverture de tests"],
  },
  {
    id: 3,
    side: "right",
    title: "Projet SR13 • Automatisation IA",
    subtitle: "SaaS multi-tenant • TPE/PME",
    period: "2023–2024",
    bullets: ["Onboarding auto &lt;5 min", "Workflow doc scanning ×3"],
  },
  {
    id: 4,
    side: "left",
    title: "Aujourd’hui",
    subtitle: "Ingénierie data / Full‑stack",
    period: "2024–",
    bullets: ["Back/Front/Mobile", "Perf & UX"],
  },
];

export default function ParcoursTimeline({ steps = stepsData }: { steps?: Step[] }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const segmentsRef = useRef<HTMLSpanElement[]>([]);
  segmentsRef.current = [];

  const segmentsCount = 28;
  const segments = useMemo(() => Array.from({ length: segmentsCount }), [segmentsCount]);

  const addSegmentRef = (el: HTMLSpanElement | null) => {
    if (el && !segmentsRef.current.includes(el)) segmentsRef.current.push(el);
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
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section className={styles.wrapper} aria-label="Parcours">
      <div className={styles.rail} ref={railRef}>
        {segments.map((_, i) => (
          <span key={i} ref={addSegmentRef} className={styles.segment} aria-hidden="true" />
        ))}
      </div>

      <ol className={styles.zigzag}>
        {steps.map((s, i) => (
          <li
            key={s.id}
            className={`${styles.item} ${s.side === "left" ? styles.left : styles.right}`}
            style={{ "--i": String(i) } as React.CSSProperties}
          >
            <article className={styles.card} tabIndex={0}>
              <header className={styles.cardHeader}>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.subtitle}>{s.subtitle}</p>
                <time className={styles.period}>{s.period}</time>
              </header>
              <ul className={styles.bullets}>
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className={styles.cornerTag} aria-hidden="true">
                #{String(s.id).padStart(2, "0")}
              </div>
            </article>

            <div className={styles.connector} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.line} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

