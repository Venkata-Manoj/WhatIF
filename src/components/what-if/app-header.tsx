
'use client';

import { ThemeToggle } from './theme-toggle';
import { Logo } from './logo';
import { AuthButton } from './auth-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { History, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnalysisHistory } from './analysis-history';
import { useState } from 'react';
import { AnalysisResult } from '@/lib/types';
import { AnalysisDisplay } from './analysis-display';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function AppHeader() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSelectHistory = (analysis: AnalysisResult) => {
    setSelectedAnalysis(analysis);
  };
  
  const handleHistoryClick = () => {
    if (loading) return;
    if (!user) {
      toast({
        title: 'Please Log In',
        description: 'You need to be logged in to view your analysis history.',
        variant: 'destructive',
      });
      router.push('/login');
    } else {
      setIsHistoryOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">WhatIF</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" onClick={handleHistoryClick}>
             <History className="h-4 w-4 mr-2" />
             History
          </Button>
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
      <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <SheetContent className="w-full sm:w-[540px] sm:max-w-lg">
          {selectedAnalysis ? (
             <div className="h-full">
              <Button variant="ghost" onClick={() => setSelectedAnalysis(null)} className="mb-4">
                &larr; Back to History
              </Button>
              <div className="h-[calc(100vh-80px)] overflow-y-auto">
                <AnalysisDisplay result={selectedAnalysis} />
              </div>
            </div>
          ) : (
            <AnalysisHistory onSelect={handleSelectHistory} />
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
