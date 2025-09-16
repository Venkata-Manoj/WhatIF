import type { AnalyzeComponentOutput } from '@/ai/flows/analyze-component';
import type { GeneratePreventativeSuggestionsOutput } from '@/ai/flows/generate-preventative-suggestions';
import type { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const RiskSchema = z.object({
    type: z.string().describe("The category of the risk (e.g., Functional, Usability, Security, Accessibility)."),
    cause: z.string().describe("A brief description of what could cause this risk."),
    severity: z.enum(["High", "Medium", "Low"]).describe("The severity level of the risk."),
});

export const IdentifyComponentRisksOutputSchema = z.object({
  risks: z.array(RiskSchema).describe('A structured list of potential risks associated with the UI component.'),
});

export type Risk = z.infer<typeof RiskSchema>;
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
