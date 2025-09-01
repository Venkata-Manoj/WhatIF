import type { AnalyzeComponentOutput } from '@/ai/flows/analyze-component';
import type { IdentifyComponentRisksOutput } from '@/ai/flows/identify-component-risks';
import type { GeneratePreventativeSuggestionsOutput } from '@/ai/flows/generate-preventative-suggestions';
import type { Timestamp } from 'firebase/firestore';

export type Risk = IdentifyComponentRisksOutput['risks'][0];
export type Suggestion = GeneratePreventativeSuggestionsOutput['suggestions'][0];


export type AnalysisResult = {
  id?: string;
  componentName: string;
  analysis: AnalyzeComponentOutput;
  risks: Risk[];
  suggestions: Suggestion[];
  checklist: string;
  createdAt?: Timestamp | { seconds: number; nanoseconds: number; };
};
