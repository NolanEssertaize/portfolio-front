import './globals.css';
import type { Metadata } from 'next';
import ClientThemeProvider from '@/components/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'ESSERTAIZE - Portfolio',
  description: 'Professional portfolio with AI integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}