import Subheading from "@ui/components/atomic/atoms/Subheading";

interface StepItemProps {
  step: number;
  title: string;
  description: string;
}

export default function StepItem({ step, title, description }: StepItemProps) {
  return (
    <li className="flex flex-col items-center text-center gap-2 p-6 rounded-lg bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] flex-1">
      <span className="sr-only">Step {step}</span>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold" aria-hidden="true">
        {step}
      </div>
      <Subheading className="mt-2">{title}</Subheading>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </li>
  );
}

