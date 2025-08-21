import Link from 'next/link';
import { Button } from '@ui/components/dna/button';
import { Section } from '@ui/components/dna/layout';
import { Text } from '@ui/components/dna/typography';

export default function NotFound() {
  return (
    <Section className="min-h-screen flex flex-col items-center justify-center text-center" title="Page not found">
      <Text size="lg" className="mb-6">
        Sorry, we could not find the page you are looking for.
      </Text>
      <Link href="/">
        <Button animation="roll-replace">Go home</Button>
      </Link>
    </Section>
  );
}
