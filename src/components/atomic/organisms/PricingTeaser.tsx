import Link from "next/link";
import Container from "@/components/atomic/atoms/Container";
import Heading from "@/components/atomic/atoms/Heading";
import Subheading from "@/components/atomic/atoms/Subheading";
import Button from "@/components/atomic/molecules/Button";

export default function PricingTeaser() {
  return (
    <section id="pricing" className="py-12 scroll-mt-24">
      <Container>
        <Heading className="text-center">Pricing</Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]">
            <Subheading>Free</Subheading>
            <ul className="text-sm space-y-1">
              <li>1 lesson/day</li>
              <li>standard model</li>
            </ul>
            <Link href="/kaizen">
              <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]">
                Get started
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]">
            <Subheading>Premium</Subheading>
            <ul className="text-sm space-y-1">
              <li>up to 20/day</li>
              <li>faster models</li>
              <li>weekly summary</li>
            </ul>
            <Link href="/pricing">
              <Button className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                Premium (soon)
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

