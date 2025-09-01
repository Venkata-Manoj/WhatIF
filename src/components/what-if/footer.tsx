import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50 p-4 mt-auto no-print">
      <div className="container mx-auto flex justify-center items-center text-sm text-muted-foreground">
        <p>Developed by Manoj</p>
        <span className="mx-2">|</span>
        <Link
          href="https://www.linkedin.com/in/venkata-manoj/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
