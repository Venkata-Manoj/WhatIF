
'use client';

import { useEffect, useRef, useState, DragEvent } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { Textarea } from '@/components/ui/textarea';

interface FormState {
  status: 'idle' | 'success' | 'error';
  data?: AnalysisResult | null;
  message?: string | null;
  errors?: {
    componentName?: string[];
    componentCode?: string[];
  } | null;
}

const initialState: FormState = {
  status: 'idle',
  data: null,
  message: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-accent text-accent-foreground hover:bg-primary"
      size="lg"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Component'
      )}
    </Button>
  );
}

export function ComponentInputForm() {
  const [state, formAction] = useActionState(analyzeComponentAction, initialState);
  const { toast } = useToast();
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLTextAreaElement>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const { pending } = useFormStatus();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (user) {
      user.getIdToken().then(setIdToken);
    } else {
      setIdToken(null);
    }
  }, [user]);

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.message,
      });
    }
    if (state.status === 'success' && state.data) {
      setSelectedAnalysis(state.data);
    }
  }, [state, toast]);

  const handleSelectHistory = (analysis: AnalysisResult) => {
    setSelectedAnalysis(analysis);
     if (nameInputRef.current) {
      nameInputRef.current.value = analysis.componentName;
    }
  };
  
  const handleDragEnter = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (nameInputRef.current) {
          nameInputRef.current.value = file.name;
      }
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const content = loadEvent.target?.result;
        if (codeInputRef.current && typeof content === 'string') {
          codeInputRef.current.value = content;
        }
      };
      reader.readAsText(file);
      e.dataTransfer.clearData();
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      {!pending && (
        <>
          <form 
            action={formAction} 
            ref={formRef}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Card className={cn(
                "shadow-xl no-print overflow-hidden transition-all",
                isDragging && "drop-zone-active"
            )}>
              <CardHeader>
                <CardTitle>Start Your Analysis</CardTitle>
                <CardDescription>
                  Provide your UI component code for AI-powered analysis. You can paste your code or drop a file.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="componentName">
                      Component Name / Filename
                    </Label>
                    <Input
                      id="componentName"
                      name="componentName"
                      ref={nameInputRef}
                      placeholder="e.g., 'UserProfile.tsx'"
                      className="text-base"
                      required
                    />
                    {state.errors?.componentName && (
                      <p className="text-sm font-medium text-destructive">
                        {state.errors.componentName[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="componentCode">
                      Component Code
                    </Label>
                    <Textarea
                      id="componentCode"
                      name="componentCode"
                      ref={codeInputRef}
                      placeholder="Paste your component code here (e.g., React JSX, Vue SFC, HTML, CSS, JS)"
                      className="text-base font-mono min-h-[200px]"
                      required
                    />
                     {state.errors?.componentCode && (
                      <p className="text-sm font-medium text-destructive">
                        {state.errors.componentCode[0]}
                      </p>
                    )}
                  </div>
                  {idToken && <input type="hidden" name="idToken" value={idToken} />}
                  <SubmitButton />
                </div>
              </CardContent>
            </Card>
          </form>
          <AnalysisHistory onSelect={handleSelectHistory} newResult={state.data} />
        </>
      )}

      <div className="mt-12">
        {pending && <LoadingSpinner />}
        {selectedAnalysis && !pending && (
          <div id="printable-area">
            <AnalysisDisplay result={selectedAnalysis} />
          </div>
        )}
      </div>
    </div>
  );
}
