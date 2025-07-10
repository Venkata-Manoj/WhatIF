'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/learn', label: 'Learn' },
  { href: '/playground', label: 'Playground' },
  { href: '/quiz', label: 'Quiz' },
];

export function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string, label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-primary',
        pathname?.startsWith(href) ? 'text-primary' : 'text-muted-foreground',
        className
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">PromptVibes</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
        
        <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">PromptVibes</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <BrainCircuit className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg font-headline">PromptVibes</span>
                    </Link>
                  </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                       <NavLink href={link.href} label={link.label} className="text-lg" />
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
