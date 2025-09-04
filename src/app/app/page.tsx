import { AppHeader } from '@/components/what-if/app-header';
import { ComponentInputForm } from '@/components/what-if/component-input-form';
import { useState } from 'react';
import type { AnalysisResult } from '@/lib/types';

export default function Page() {
  // Example: Save the analysis result to local state
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Handler for when analysis is complete
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // You can also display a toast, call an API, etc. here if needed
    // Example: toast({ title: "Analysis Complete!", description: JSON.stringify(result) });
  };

  return (
    <div>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppHeader />
        <ComponentInputForm onAnalysisComplete={handleAnalysisComplete} />
        {/* Optionally render the analysis result below */}
        {analysisResult && (
          <div className="mt-8 p-4 border rounded bg-gray-50">
            <h2 className="font-bold mb-2">Analysis Result</h2>
            <pre className="text-xs overflow-x-auto">{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
