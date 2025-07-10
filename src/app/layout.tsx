import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vibe Learn - Master Prompt Engineering',
  description: 'An interactive platform to learn and master the art of prompt engineering.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="relative flex min-h-dvh flex-col">
          <main className="flex-1">{children}</main>
          <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
              <p className="text-balance text-center text-sm text-muted-foreground">
                © 2024 Vibe Learn. All Rights Reserved. Built by{' '}
                <Link
                  href="https://www.linkedin.com/in/venkata-manoj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-primary"
                >
                  Manoj
                </Link>
                .
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
