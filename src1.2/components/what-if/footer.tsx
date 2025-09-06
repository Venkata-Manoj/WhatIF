import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50 p-4 mt-auto no-print">
      <div className="container mx-auto flex justify-center items-center text-sm text-muted-foreground gap-2">
        <span>Developed by Manoj</span>
        <Link
          href="https://www.linkedin.com/in/venkata-manoj/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors"
          aria-label="Connect to LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
