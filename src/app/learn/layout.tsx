'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const levels = [
  { name: 'Beginner', path: '/learn/beginner' },
  { name: 'Intermediate', path: '/learn/intermediate' },
  { name: 'Professional', path: '/learn/professional' },
];

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container py-10">
      <div className="space-y-2 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Learning Roadmap</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow our curated path to become a prompt engineering expert. Select your level to get started.
        </p>
      </div>

      <Tabs value={pathname} className="w-full flex justify-center mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          {levels.map((level) => (
            <TabsTrigger key={level.path} value={level.path} asChild>
              <Link href={level.path}>{level.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}
