import { HTMLAttributes, ReactNode } from "react";
import Container from "./Container";
import { Heading } from "../typography";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Optional section id for anchor links.
   */
  id?: string;
  /**
   * Optional section title rendered with DNA Heading.
   */
  title?: string;
  children: ReactNode;
}

export default function Section({ id, title, children, className = "", ...props }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} {...props}>
      <Container>
        <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 shadow-md p-6 md:p-8">
          {title && <Heading as="h2" className="mb-8">{title}</Heading>}
          {children}
        </div>
      </Container>
    </section>
  );
}

