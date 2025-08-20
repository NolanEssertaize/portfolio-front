import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nolan Essertaize – SaaS engineering for SMEs",
  description:
    "Secure, data-driven, and fast to ship. From idea to production.",
  openGraph: {
    title: "Nolan Essertaize – SaaS engineering for SMEs",
    description:
      "Secure, data-driven, and fast to ship. From idea to production.",
    url: "https://nolanessertaize.com",
    siteName: "Nolan Essertaize",
  },
  alternates: {
    canonical: "https://nolanessertaize.com",
  },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Prevent scroll restoration */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              // Ensure we start at the top
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
            `,
                    }}
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
