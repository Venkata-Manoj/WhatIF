'use client';

import { useEffect } from 'react';
import { AppHeader } from '@/components/what-if/app-header';
import { ComponentInputForm } from '@/components/what-if/component-input-form';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/what-if/loading-spinner';
import type { AnalysisResult } from '@/lib/types';

export default function AppPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // ✅ Callback for handling completed analysis
  const handleAnalysisComplete = (result: AnalysisResult) => {
    console.log("Analysis completed:", result);
    // You can extend this: save to state, DB, navigate, etc.
  };

  return (
    <div className="flex flex-col flex-grow">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppHeader />
        <ComponentInputForm onAnalysisComplete={handleAnalysisComplete} />
      </main>
    </div>
  );
}
