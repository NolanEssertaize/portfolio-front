import { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white/60 backdrop-blur-md border border-white/20 shadow-md p-6 md:p-8 ${className}`}
      {...props}
    />
  );
}

