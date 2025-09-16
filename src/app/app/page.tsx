
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/what-if/loading-spinner';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
       <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user.displayName || user.email}</h1>
        <p className="text-muted-foreground">
            This is your dashboard. More features coming soon!
        </p>
         <Card>
            <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Ready to analyze a component?</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Navigate back to the{' '}
                    <a href="/" className="text-primary hover:underline">
                        Home Page
                    </a>{' '}
                    to start a new analysis.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
