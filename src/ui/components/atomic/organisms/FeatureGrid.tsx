import Container from "@ui/components/atomic/atoms/Container";
import FeatureCard from "@ui/components/atomic/molecules/FeatureCard";

const features = [
  {
    icon: "📘",
    title: "Atomic lessons",
    description: "bite-sized content",
  },
  {
    icon: "🧾",
    title: "Structured JSON",
    description: "schema-first",
  },
  {
    icon: "⚡",
    title: "Local grading",
    description: "instant feedback",
  },
  {
    icon: "🔑",
    title: "Bring your key",
    description: "BYO Gemini/OpenAI",
  },
  {
    icon: "🔥",
    title: "Streaks & progress",
    description: "stay consistent",
  },
  {
    icon: "💻",
    title: "Dev-friendly",
    description: "typed schemas, Zod validation",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-12 scroll-mt-24">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

