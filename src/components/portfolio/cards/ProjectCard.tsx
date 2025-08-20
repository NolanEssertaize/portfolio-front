import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/dna/card";
import { Heading, Text } from "@/components/dna/typography";
import { Button } from "@/components/dna/button";

export interface ProjectCardProps {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  href: string;
}

export default function ProjectCard({
  title,
  problem,
  solution,
  impact,
  image,
  href,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 overflow-hidden rounded-lg shadow">
        <Image
          src={image}
          alt={title}
          width={800}
          height={450}
          className="h-auto w-full object-cover"
        />
      </div>
      <Heading as="h3" size="h4" className="mb-2">
        {title}
      </Heading>
      <div className="mb-4 flex-1 space-y-1">
        <Text size="sm">
          <span className="font-semibold">Problem:</span> {problem}
        </Text>
        <Text size="sm">
          <span className="font-semibold">Solution:</span> {solution}
        </Text>
        <Text size="sm">
          <span className="font-semibold">Impact:</span> {impact}
        </Text>
      </div>
      <Link href={href} target="_blank" className="mt-auto self-start">
        <Button variant="secondary" size="sm">
          Read more
        </Button>
      </Link>
    </Card>
  );
}

