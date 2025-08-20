import { Section } from "@/components/dna/layout";
import { Text } from "@/components/dna/typography";

export default function InfraSection() {
  return (
    <Section id="behind-the-scenes" title="Behind the scenes">
      <div className="flex flex-col items-start">
        <ul className="list-disc space-y-2 pl-6 text-left">
          <li>
            <Text as="span">Cloudflare Tunnel</Text>
          </li>
          <li>
            <Text as="span">Nginx reverse proxy</Text>
          </li>
          <li>
            <Text as="span">Docker Compose: portfolio, services, db</Text>
          </li>
          <li>
            <Text as="span">Grafana observability</Text>
          </li>
          <li>
            <Text as="span">PostgreSQL database</Text>
          </li>
        </ul>
        <ul className="mt-8 list-disc space-y-2 pl-6 text-left">
          <li>
            <Text as="span">Zero router config via tunnel</Text>
          </li>
          <li>
            <Text as="span">Atomic deploys with Docker</Text>
          </li>
          <li>
            <Text as="span">Logs centralized</Text>
          </li>
        </ul>
      </div>
    </Section>
  );
}

