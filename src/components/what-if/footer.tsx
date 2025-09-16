
import { Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { Faq } from './faq';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50 p-4 mt-auto no-print">
      <div className="container mx-auto">
        <Faq />
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} WhatIF. Developed by Manoj.</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/venkata-manoj/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
             <Link
              href="https://github.com/Manoj-Afs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="Connect on GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
