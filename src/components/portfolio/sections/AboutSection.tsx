import Link from "next/link";
import { Section } from "@/components/dna/layout";
import { Text } from "@/components/dna/typography";

export default function AboutSection() {
  return (
    <Section id="about" title="About">
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Text as="span">I design and deploy SaaS for small businesses.</Text>
        </li>
        <li>
          <Text as="span">Multi-tenant auth</Text>
        </li>
        <li>
          <Text as="span">PostgreSQL</Text>
        </li>
        <li>
          <Text as="span">Observability</Text>
        </li>
        <li>
          <Text as="span">GDPR-aware data flows</Text>
        </li>
        <li>
          <Text as="span">Tooling: Next.js, Docker, Cloudflare, Grafana</Text>
        </li>
      </ul>
      <Link href="/behind-the-scenes" className="mt-6 inline-block">
        <Text as="span" size="sm" className="underline">
          Behind the scenes →
        </Text>
      </Link>
    </Section>
  );
}

