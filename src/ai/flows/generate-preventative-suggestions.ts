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

const GeneratePreventativeSuggestionsInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component.'),
  identifiedRisks: z.string().describe('A description of the identified risks for the UI component.'),
});
export type GeneratePreventativeSuggestionsInput = z.infer<typeof GeneratePreventativeSuggestionsInputSchema>;

const GeneratePreventativeSuggestionsOutputSchema = z.object({
  preventativeSuggestions: z.string().describe('A list of preventative strategies and fixes, with each item on a new line and starting with a bullet point.'),
});
export type GeneratePreventativeSuggestionsOutput = z.infer<typeof GeneratePreventativeSuggestionsOutputSchema>;

export async function generatePreventativeSuggestions(input: GeneratePreventativeSuggestionsInput): Promise<GeneratePreventativeSuggestionsOutput> {
  return generatePreventativeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePreventativeSuggestionsPrompt',
  input: {schema: GeneratePreventativeSuggestionsInputSchema},
  output: {schema: GeneratePreventativeSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping developers identify preventative strategies and fixes for potential issues in UI components.

  Based on the identified risks for the component {{componentName}}:
  {{identifiedRisks}}

  Generate a list of preventative suggestions and fixes to address these risks.
  Each suggestion should be on a new line and start with a bullet point (-).
  Provide clear, actionable advice that a developer can implement to avoid the identified issues.
  The suggestions should be comprehensive and cover various aspects of the component's functionality and usability.
  Focus on practical solutions that can be easily integrated into the development process.
  The advice should be tailored to the specific component and its potential risks, ensuring that the developer receives the most relevant and effective guidance.
  Do not make assumptions, but rely only on information provided in the prompt.
  Do not include introductory or concluding remarks.
  Do not use any markdown formatting like bolding or headers. The response should be plain text.
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
