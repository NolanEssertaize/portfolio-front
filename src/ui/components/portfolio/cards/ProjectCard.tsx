import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Card } from "@ui/components/dna/card";
import { Heading, Text } from "@ui/components/dna/typography";
import { Button } from "@ui/components/dna/button";

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
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
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <Card ref={cardRef} className="flex h-full flex-col">
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

