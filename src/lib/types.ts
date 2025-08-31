import type { AnalyzeComponentOutput } from '@/ai/flows/analyze-component';
import type { Timestamp } from 'firebase/firestore';

export type AnalysisResult = {
  id?: string;
  componentName: string;
  analysis: AnalyzeComponentOutput;
  risks: string;
  suggestions: string;
  checklist: string;
  createdAt?: Timestamp | { seconds: number; nanoseconds: number; };
};
