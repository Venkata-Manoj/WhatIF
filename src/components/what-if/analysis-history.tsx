
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { getAnalysisHistory } from '@/lib/firestore';
import type { AnalysisResult } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface AnalysisHistoryProps {
  onSelect: (analysis: AnalysisResult) => void;
  newResult: AnalysisResult | null | undefined;
}

export function AnalysisHistory({ onSelect, newResult }: AnalysisHistoryProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getAnalysisHistory(user.uid)
        .then((data) => {
          setHistory(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching history:', error);
          setLoading(false);
        });
    } else {
      setHistory([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (newResult && newResult.componentName) {
      // Add a temporary timestamp for immediate display
      const resultWithTimestamp: AnalysisResult = {
        ...newResult,
        id: newResult.id || `temp-${Date.now()}`,
        createdAt: newResult.createdAt || { seconds: Date.now() / 1000, nanoseconds: 0 },
      };
      
      // Prepend the new result and remove any potential duplicates.
       setHistory(prev => [
        resultWithTimestamp,
        ...prev.filter(item => item.id !== resultWithTimestamp.id)
      ]);
    }
  }, [newResult]);


  return (
    <Card className="mt-8 no-print">
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
        <CardDescription>
          Here are the recent components you have analyzed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id || item.componentName}
                  onClick={() => onSelect(item)}
                  className="p-4 rounded-md hover:bg-secondary cursor-pointer border"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{item.componentName}</p>
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
             user && !loading && <p className="text-muted-foreground">
              You have no analysis history yet.
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
