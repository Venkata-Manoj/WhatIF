'use server';
/**
 * @fileOverview Analyzes a UI component to extract its purpose, user flows, and core UI/UX elements.
 *
 * - analyzeComponent - A function that handles the component analysis process.
 * - AnalyzeComponentInput - The input type for the analyzeComponent function.
 * - AnalyzeComponentOutput - The return type for the analyzeComponent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeComponentInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component to analyze.'),
});
export type AnalyzeComponentInput = z.infer<typeof AnalyzeComponentInputSchema>;

const AnalyzeComponentOutputSchema = z.object({
  purpose: z.string().describe('The primary purpose of the UI component.'),
  userFlows: z.string().describe('A description of the typical user flows involving this component.'),
  coreUIUXElements: z.string().describe('A list of the core UI/UX elements present in the component.'),
  userFlowsChart: z.string().describe("A Mermaid.js graph definition representing the user flows. Use a `graph TD` layout. Use very brief node descriptions with only alphanumeric characters and spaces. Do not include markdown formatting in the response."),
});
export type AnalyzeComponentOutput = z.infer<typeof AnalyzeComponentOutputSchema>;

export async function analyzeComponent(input: AnalyzeComponentInput): Promise<AnalyzeComponentOutput> {
  return analyzeComponentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeComponentPrompt',
  input: {schema: AnalyzeComponentInputSchema},
  output: {schema: AnalyzeComponentOutputSchema},
  prompt: `You are an expert UI/UX analyst. Analyze the provided UI component and extract its purpose, user flows, and core UI/UX elements.\n\nComponent Name: {{{componentName}}}\n\nProvide a detailed analysis, focusing on:
- The primary purpose of the component.
- Typical user flows involving the component.
- A comprehensive list of core UI/UX elements present in the component.
- A Mermaid.js graph definition for the user flows. The node descriptions must be very short and contain only letters, numbers, and spaces.
`,
});

const analyzeComponentFlow = ai.defineFlow(
  {
    name: 'analyzeComponentFlow',
    inputSchema: AnalyzeComponentInputSchema,
    outputSchema: AnalyzeComponentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
