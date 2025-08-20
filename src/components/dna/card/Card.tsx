import { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-6 ${className}`}
      {...props}
    />
  );
}

