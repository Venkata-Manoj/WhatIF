
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WelcomeScreen } from '@/components/what-if/welcome-screen';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/components/what-if/loading-spinner';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/app');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <WelcomeScreen />;
}
