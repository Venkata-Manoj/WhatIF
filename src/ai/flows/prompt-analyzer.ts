'use server';

/**
 * @fileOverview AI-powered prompt analyzer for suggesting improvements to prompts.
 *
 * - analyzePrompt - Analyzes a given prompt and suggests improvements.
 * - AnalyzePromptInput - The input type for the analyzePrompt function.
 * - AnalyzePromptOutput - The return type for the analyzePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePromptInputSchema = z.object({
  promptText: z.string().describe('The prompt text to analyze.'),
});
export type AnalyzePromptInput = z.infer<typeof AnalyzePromptInputSchema>;

const AnalyzePromptOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-powered suggestions for improving the prompt.'),
});
export type AnalyzePromptOutput = z.infer<typeof AnalyzePromptOutputSchema>;

export async function analyzePrompt(input: AnalyzePromptInput): Promise<AnalyzePromptOutput> {
  return analyzePromptFlow(input);
}

const analyzePromptPrompt = ai.definePrompt({
  name: 'analyzePromptPrompt',
  input: {schema: AnalyzePromptInputSchema},
  output: {schema: AnalyzePromptOutputSchema},
  prompt: `You are an AI prompt analyzer that reviews user prompts and provides suggestions for improvement.

  Analyze the following prompt and provide specific, actionable suggestions to improve its clarity, specificity, and effectiveness. Focus on suggesting ways to refine the prompt to achieve better results from a language model.

  Prompt: {{{promptText}}}
  `,
});

const analyzePromptFlow = ai.defineFlow(
  {
    name: 'analyzePromptFlow',
    inputSchema: AnalyzePromptInputSchema,
    outputSchema: AnalyzePromptOutputSchema,
  },
  async input => {
    const {output} = await analyzePromptPrompt(input);
    return output!;
  }
);
