
'use client';

import { useEffect, useRef, useState, DragEvent, ChangeEvent, FormEvent } from 'react';
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
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnalysisDisplay } from './analysis-display';
import { LoadingSpinner } from './loading-spinner';
import type { AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader, UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

function SubmitButton({ code, name, pending }: { code?: string; name?: string, pending: boolean }) {
  const isCodeMissing = !code || code.trim().length < 10;
  const isNameMissing = !name || name.trim().length < 3;
  const isDisabled = pending || isCodeMissing || isNameMissing;
  
  let tooltipContent: string | null = null;
  if (isNameMissing) {
    tooltipContent = "Please provide a component name.";
  } else if (isCodeMissing) {
    tooltipContent = "Please provide at least 10 characters of code.";
  }

  const button = (
     <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isDisabled}
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

  if (tooltipContent && isDisabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{button}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}

export function ComponentInputForm() {
  const [state, setState] = useState<FormState>(initialState);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [idToken, setIdToken] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  
  const [pending, setPending] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

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
  }, [state, toast]);

  const handleDragEnter = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (nameInputRef.current && !nameInputRef.current.value) {
      const componentName = file.name.split('.').slice(0, -1).join('.');
      setNameValue(componentName);
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const content = loadEvent.target?.result;
      if (typeof content === 'string') {
        setCodeValue(content);
        setDroppedFile(file);
      }
    };
    reader.onerror = () => {
      toast({ variant: 'destructive', title: 'File Read Error', description: 'Could not read the selected file.' });
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setCodeValue('');
    setNameValue('');
    setDroppedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setState(initialState);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (authLoading) {
      return;
    }
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to analyze your components.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    if (idToken) {
        formData.set('idToken', idToken);
    }

    setPending(true);
    
    const result = await analyzeComponentAction(initialState, formData);
    
    setState(result);
    setPending(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="no-print"
      >
        <div className="animated-border-box">
          <Card
            className={cn(
              "bg-card text-card-foreground shadow-sm",
              isDragging && "drop-zone-active"
            )}
          >
            <CardHeader className='flex-row justify-between items-center'>
              <div>
                <CardTitle>Start Your Analysis</CardTitle>
                <CardDescription>
                  Provide your UI component code for AI-powered analysis.
                </CardDescription>
              </div>
              <Button type="button" variant="ghost" onClick={handleReset}>Clear</Button>
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
                    required
                    onChange={(e) => setNameValue(e.target.value)}
                    value={nameValue}
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
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn("relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary transition-colors", isDragging && "border-primary bg-primary/10")}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".tsx,.jsx,.js,.ts,.vue,.html,.css,.txt"
                    />
                    {droppedFile ? (
                      <div className='text-center flex flex-col items-center gap-2 p-4'>
                        <FileIcon className="w-8 h-8 text-primary" />
                        <p className="font-medium text-foreground">{droppedFile.name}</p>
                        <p className="text-sm text-muted-foreground">File uploaded successfully.</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDroppedFile(null);
                            setCodeValue('');
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground flex flex-col items-center gap-2">
                        <UploadCloud className="w-8 h-8" />
                        <p><span className="font-semibold text-primary">Click to upload</span> or drag and drop a file</p>
                        <p className="text-xs">Or paste your code directly into the area below.</p>
                      </div>
                    )}
                  </div>
                  <input type="hidden" name="componentCode" value={codeValue} />
                  <Textarea
                      id="componentCode"
                      name="componentCode"
                      placeholder="Or paste your code here..."
                      className={cn("text-base font-mono resize-none mt-2", droppedFile ? "hidden" : "")}
                      required
                      onChange={(e) => { setCodeValue(e.target.value); setDroppedFile(null); }}
                      value={codeValue}
                    />
                  {state.errors?.componentCode && (
                    <p className="text-sm font-medium text-destructive">
                      {state.errors.componentCode[0]}
                    </p>
                  )}
                </div>
                <SubmitButton code={codeValue} name={nameValue} pending={pending}/>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
      <div className="mt-12">
        {pending ? <LoadingSpinner /> : state.status === 'success' && state.data && (
          <div id="printable-area">
            <AnalysisDisplay result={state.data} />
          </div>
        )}
      </div>
    </div>
  );
}
