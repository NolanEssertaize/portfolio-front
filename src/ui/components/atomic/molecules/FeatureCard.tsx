import { ReactNode } from "react";
import Subheading from "@ui/components/atomic/atoms/Subheading";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]">
      {icon && <div className="text-3xl">{icon}</div>}
      <Subheading className="mt-2">{title}</Subheading>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  );
}

