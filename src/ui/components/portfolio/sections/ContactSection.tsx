import { Section } from "@ui/components/dna/layout";
import { Text } from "@ui/components/dna/typography";
import { Button } from "@ui/components/dna/button";

export default function ContactSection() {
  return (
    <Section id="contact" title="Start a project">
      <div className="mx-auto max-w-xl space-y-6">
        <Text className="text-center">
          Prefer email?{" "}
          <a
            href="mailto:nolan.essertaize26@gmail.com"
            className="underline"
          >
            nolan.essertaize26@gmail.com
          </a>
        </Text>
        <form
          className="mt-6 flex flex-col gap-4"
          method="post"
          action="#"
        >
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="message" className="mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            animation="roll-replace"
            className="self-start"
          >
            Start a project
          </Button>
        </form>
      </div>
    </Section>
  );
}

