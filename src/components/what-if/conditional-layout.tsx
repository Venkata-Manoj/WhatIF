
'use client';

import { usePathname } from 'next/navigation';
import { AppHeader } from './app-header';
import { Footer } from './footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!isAuthPage && <AppHeader />}
      <div className="flex-grow flex flex-col">{children}</div>
      {!isAuthPage && <Footer />}
    </>
  );
}
