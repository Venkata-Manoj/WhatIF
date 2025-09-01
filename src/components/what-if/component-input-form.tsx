'use client';

import { useEffect, useRef, useState, DragEvent } from 'react';
import { useActionState } from 'react'; // ✅ only useActionState comes from react
import { useFormStatus } from 'react-dom'; // ✅ useFormStatus comes from react-dom
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { analyzeComponentAction } from '@/app/actions';
import { LoadingSpinner } from './loading-spinner';
import type { AnalysisResult } from '@/lib/types';

export function ComponentInputForm({
  onAnalysisComplete,
}: {
  onAnalysisComplete: (result: AnalysisResult) => void;
}) {
  const { toast } = useToast();
  const { user } = useAuth();

  const [state, formAction, pending] = useActionState(analyzeComponentAction, {
    success: false,
    error: undefined,
    data: undefined,
  });

  const [inputValue, setInputValue] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // ✅ notify parent when analysis completes
  useEffect(() => {
    if (state.success && state.data) {
      onAnalysisComplete(state.data);
    } else if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, onAnalysisComplete, toast]);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData('text/plain');
    if (text) setInputValue(text);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please log in to analyze components.
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col space-y-4"
    >
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <textarea
          name="componentCode"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste or drag your component code here..."
          className="w-full h-40 p-2 border rounded-md font-mono text-sm"
          required
        />
      </div>

      <SubmitButton pending={pending} />
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  const { pending: formPending } = useFormStatus(); // ✅ correct usage

  return (
    <button
      type="submit"
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      disabled={pending || formPending}
    >
      {pending || formPending ? <LoadingSpinner /> : 'Analyze Component'}
    </button>
  );
}
