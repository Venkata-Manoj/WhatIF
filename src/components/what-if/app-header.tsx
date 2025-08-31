
import { ThemeToggle } from './theme-toggle';
import { Logo } from './logo';
import Image from 'next/image';
import { AuthButton } from './auth-button';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="py-12 sm:py-16 px-4 flex flex-col items-center text-center no-print relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10 no-print flex items-center gap-2">
        <AuthButton />
        <ThemeToggle />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50 -z-10"></div>
       <Link href="/" className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
         <Logo className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
          WhatIF
        </h1>
      </Link>
      <p className="max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
        WhatIF provides instant, AI-driven insights for your UI components. Understand user flows, identify potential risks, and receive actionable suggestions to build more robust and user-friendly interfaces.
      </p>
    </header>
  );
}
