'use client';

import { useEffect, useRef, useState, DragEvent } from 'react';
import { useActionState, useFormStatus } from 'react';   // ✅ fixed imports
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { analyzeComponentAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnalysisDisplay } from './analysis-display';
import { LoadingSpinner } from './loading-spinner';
import type { AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AnalysisHistory } from './analysis-history';
import { Loader } from 'lucide-react';

interface ComponentInputFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export function ComponentInputForm({ onAnalysisComplete }: ComponentInputFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const examples = [
    'Button Component',
    'Modal Dialog',
    'Authentication Form',
    'Navigation Bar',
    'Product Card',
  ];

  const handleExampleClick = (example: string) => {
    setInput(example);
    inputRef.current?.focus();
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, name: string) => {
    e.dataTransfer.setData('text/plain', name);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to analyze components',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeComponentAction(formData);
      if (result?.error) {
        toast({
          title: 'Analysis failed',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      if (result) {
        setAnalysis(result);
        onAnalysisComplete(result);
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to analyze component. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Analyze Your Component</CardTitle>
        <CardDescription>
          Enter the name or paste the code of your UI component to receive an instant analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="component">Component</Label>
            <Input
              id="component"
              name="component"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Button Component or paste code here"
              required
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((name, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 rounded-md bg-muted px-3 py-1 text-sm cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  draggable
                  onClick={() => handleExampleClick(name)}
                  onDragStart={(e) => handleDragStart(e, name)}
                >
                  {name}
                </div>
              </motion.div>
            ))}
          </div>

          <CardFooter className="px-0">
            <SubmitButton isAnalyzing={isAnalyzing} />
          </CardFooter>
        </form>
      </CardContent>

      {analysis && (
        <CardContent>
          <AnalysisDisplay result={analysis} />
        </CardContent>
      )}

      {user && (
        <CardContent>
          <AnalysisHistory />
        </CardContent>
      )}
    </Card>
  );
}

function SubmitButton({ isAnalyzing }: { isAnalyzing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || isAnalyzing}>
      {pending || isAnalyzing ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Component'
      )}
    </Button>
  );
}
