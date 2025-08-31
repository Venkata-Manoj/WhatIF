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

const exampleComponents = [
  'Login Page',
  'Data Grid',
  'File Uploader',
  'Shopping Cart',
  'User Profile',
  'Dashboard',
  'Product Card',
  'Checkout Form',
  'Search Bar',
  'Image Gallery',
  'Navigation Menu',
  'Contact Form',
  'Date Picker',
  'Slider Component',
  'Accordion Menu',
  'Toast Notification',
  'Modal Dialog',
  'Pricing Table',
  'Registration Form',
  'Password Strength',
  'Settings Panel',
  'Onboarding Flow',
  'Chat Window',
  'Video Player',
  'Music Player',
  'Calendar View',
  'Kanban Board',
  'WYSIWYG Editor'
];

interface FormState {
  status: 'idle' | 'success' | 'error';
  data?: AnalysisResult | null;
  message?: string | null;
  errors?: {
    componentName?: string[];
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  const { pending } = useFormStatus();

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
  
  const handleExampleClick = (componentName: string) => {
    if (inputRef.current) {
      inputRef.current.value = componentName;
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, componentName: string) => {
    e.dataTransfer.setData('text/plain', componentName);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData('text/plain');
    if (inputRef.current) {
      inputRef.current.value = componentName;
    }
    setIsDropZoneActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDropZoneActive(false);
  };

  const handleSelectHistory = (analysis: AnalysisResult) => {
    setSelectedAnalysis(analysis);
     if (inputRef.current) {
      inputRef.current.value = analysis.componentName;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!pending && (
        <>
          <form action={formAction} ref={formRef}>
            <Card className="shadow-xl no-print overflow-hidden">
              <CardHeader>
                <CardTitle>Start Your Analysis</CardTitle>
                <CardDescription>
                  Enter the name of a UI component, or click/drag an example below to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div 
                    className={cn(
                      "space-y-2 rounded-lg p-4 border-dashed border-2 border-transparent transition-all",
                      isDropZoneActive && 'border-accent bg-accent/10'
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Label htmlFor="componentName" className="text-lg">
                      Component Name
                    </Label>
                    <Input
                      id="componentName"
                      name="componentName"
                      ref={inputRef}
                      placeholder="e.g., 'User Profile Card' or drop an example here"
                      className={cn("text-base py-6", isDropZoneActive && 'drop-zone-active')}
                      required
                    />
                    {state.errors?.componentName && (
                      <p className="text-sm font-medium text-destructive">
                        {state.errors.componentName[0]}
                      </p>
                    )}
                  </div>
                  {idToken && <input type="hidden" name="idToken" value={idToken} />}
                  <SubmitButton />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-4'>
                <div className='text-sm text-muted-foreground'>
                  <p>Or try one of these examples:</p>
                </div>
                <div className="relative w-full overflow-hidden group">
                  <div className="flex motion-safe:animate-marquee group-hover:pause gap-4 w-max">
                    {[...exampleComponents, ...exampleComponents].map((name, index) => (
                      <motion.div
                        key={`${name}-${index}`}
                        draggable="true"
                        onClick={() => handleExampleClick(name)}
                        onDragStart={(e) => handleDragStart(e, name)}
                        className="flex-shrink-0 px-4 py-2 text-sm rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground cursor-grab active:cursor-grabbing shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardFooter>
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
