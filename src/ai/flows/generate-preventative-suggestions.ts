'use server';
/**
 * @fileOverview AI-powered function to generate preventative strategies and fixes based on identified risks.
 *
 * - generatePreventativeSuggestions - A function that generates preventative strategies and fixes for UI components based on identified risks.
 * - GeneratePreventativeSuggestionsInput - The input type for the generatePreventativeSuggestions function.
 * - GeneratePreventativeSuggestionsOutput - The return type for the generatePreventativeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { IdentifyComponentRisksOutputSchema } from './identify-component-risks';

const GeneratePreventativeSuggestionsInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component.'),
  risks: IdentifyComponentRisksOutputSchema.shape.risks.describe('A structured list of identified risks for the UI component.'),
});
export type GeneratePreventativeSuggestionsInput = z.infer<typeof GeneratePreventativeSuggestionsInputSchema>;

const SuggestionSchema = z.object({
  type: z.string().describe('The category of the suggestion (e.g., Functional, Usability, Accessibility).'),
  cause: z.string().describe('The specific cause or scenario this suggestion is addressing.'),
  remedy: z.string().describe('The detailed suggestion or fix, including code examples if applicable.'),
});

const GeneratePreventativeSuggestionsOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('A structured list of preventative suggestions and fixes.'),
});
export type GeneratePreventativeSuggestionsOutput = z.infer<typeof GeneratePreventativeSuggestionsOutputSchema>;

export async function generatePreventativeSuggestions(input: GeneratePreventativeSuggestionsInput): Promise<GeneratePreventativeSuggestionsOutput> {
  return generatePreventativeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePreventativeSuggestionsPrompt',
  input: {schema: GeneratePreventativeSuggestionsInputSchema},
  output: {schema: GeneratePreventativeSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping developers create preventative strategies and fixes for potential issues in UI components.

  Based on the identified risks for the component '{{componentName}}', generate a list of preventative suggestions.
  The identified risks are provided as a structured JSON object. For each risk, provide a corresponding suggestion.

  Identified Risks:
  {{json risks}}

  Generate a structured list of preventative suggestions and fixes to address these risks.
  For each suggestion, provide the following fields:
  - 'type': The category of the suggestion (e.g., Functional, Usability, Security, Accessibility). This should match the risk type.
  - 'cause': The specific cause or scenario this suggestion is addressing. This should match the risk cause.
  - 'remedy': A clear, actionable piece of advice that a developer can implement. Include code examples where helpful.

  The advice should be tailored to the specific component and its potential risks, ensuring that the developer receives the most relevant and effective guidance.
  Ensure your output is a valid JSON object adhering to the specified schema.
  `,
});

const generatePreventativeSuggestionsFlow = ai.defineFlow(
  {
    name: 'generatePreventativeSuggestionsFlow',
    inputSchema: GeneratePreventativeSuggestionsInputSchema,
    outputSchema: GeneratePreventativeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
