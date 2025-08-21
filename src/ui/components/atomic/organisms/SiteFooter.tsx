import Link from "next/link";
import Container from "@ui/components/atomic/atoms/Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-6 text-sm text-[var(--muted-foreground)]">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>© {new Date().getFullYear()} Brand</div>
        <nav className="flex gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </Container>
    </footer>
  );
}
