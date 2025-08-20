import { Section } from "@/components/dna/layout";
import { Card } from "@/components/dna/card";
import { Heading, Text } from "@/components/dna/typography";
import { Button } from "@/components/dna/button";

const services = [
  {
    icon: "rocket_launch",
    title: "SaaS Development",
    description: "Custom SaaS engineering tailored for growing businesses.",
  },
  {
    icon: "storage",
    title: "Data & DB",
    description: "Reliable data architectures and optimized databases.",
  },
  {
    icon: "security",
    title: "Security & Compliance",
    description: "Protect your app with industry best practices.",
  },
  {
    icon: "smart_toy",
    title: "AI Integrations",
    description: "Practical AI features that accelerate workflows.",
  },
];

export default function ServicesSection() {
  return (
    <Section id="services" title="Services">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon, title, description }) => (
          <Card key={title} className="flex h-full flex-col gap-4">
            <span className="material-icons text-3xl" aria-hidden="true">
              {icon}
            </span>
            <Heading as="h3" size="h4">
              {title}
            </Heading>
            <Text className="flex-1">{description}</Text>
            <Button variant="ghost" className="mt-4 self-start">
              Let&apos;s talk
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}

