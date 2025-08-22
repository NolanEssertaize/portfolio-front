'use client';

import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-8 text-sm text-white/60">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Kaizen Learning</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="mailto:contact@example.com" className="hover:text-white">
              Email
            </a>
          </div>
          <div className="flex gap-3">
            <span aria-label="Twitter" role="img">🐦</span>
            <span aria-label="LinkedIn" role="img">💼</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
