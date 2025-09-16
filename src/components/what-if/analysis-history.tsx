
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { getAnalysisHistory } from '@/lib/firestore';
import type { AnalysisResult } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { useToast } from '@/hooks/use-toast';

interface AnalysisHistoryProps {
  onSelect: (analysis: AnalysisResult) => void;
  newResult?: AnalysisResult | null;
}

export function AnalysisHistory({ onSelect, newResult }: AnalysisHistoryProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getAnalysisHistory(user.uid)
        .then((data) => {
          setHistory(data);
        })
        .catch((error) => {
          console.error('Error fetching history:', error);
          toast({
            title: 'Error',
            description: 'Could not fetch analysis history.',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setHistory([]);
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (newResult && newResult.componentName) {
      const resultWithTimestamp: AnalysisResult = {
        ...newResult,
        id: newResult.id || `temp-${Date.now()}`,
        createdAt: newResult.createdAt || { seconds: Date.now() / 1000, nanoseconds: 0 },
      };
      
       setHistory(prev => [
        resultWithTimestamp,
        ...prev.filter(item => item.id !== resultWithTimestamp.id)
      ]);
    }
  }, [newResult]);


  return (
    <>
      <SheetHeader>
        <SheetTitle>Analysis History</SheetTitle>
        <SheetDescription>
          Here are the recent components you have analyzed. Select one to view the report.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          {loading ? (
            <div className="space-y-4 pr-6">
              {[...Array(5)].map((_, i) => (
                 <div key={i} className="p-4 rounded-md border">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                 </div>
              ))}
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-2 pr-6">
              {history.map((item) => (
                <div
                  key={item.id || item.componentName}
                  onClick={() => onSelect(item)}
                  className="p-4 rounded-md hover:bg-secondary cursor-pointer border transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-primary">{item.componentName}</p>
                    {item.createdAt && (
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(item.createdAt.seconds * 1000), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
             user && !loading && <div className="flex items-center justify-center h-full p-4">
                <p className="text-muted-foreground">You have no analysis history yet.</p>
            </div>
          )}
        </ScrollArea>
    </>
  );
}
