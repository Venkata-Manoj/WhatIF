'use server';
/**
 * @fileOverview An AI agent that identifies potential risks in a UI component.
 *
 * - identifyComponentRisks - A function that identifies potential risks in a UI component.
 * - IdentifyComponentRisksInput - The input type for the identifyComponentRisks function.
 * - IdentifyComponentRisksOutput - The return type for the identifyComponentRisks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyComponentRisksInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component to analyze.'),
  componentDescription: z.string().describe('A detailed description of the UI component, including its purpose, user flows, and core UI/UX elements.'),
});
export type IdentifyComponentRisksInput = z.infer<typeof IdentifyComponentRisksInputSchema>;

const IdentifyComponentRisksOutputSchema = z.object({
  risks: z.string().describe('A natural language description of potential risks associated with the UI component, with each risk on a new line and starting with a bullet point.'),
});
export type IdentifyComponentRisksOutput = z.infer<typeof IdentifyComponentRisksOutputSchema>;

export async function identifyComponentRisks(input: IdentifyComponentRisksInput): Promise<IdentifyComponentRisksOutput> {
  return identifyComponentRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyComponentRisksPrompt',
  input: {schema: IdentifyComponentRisksInputSchema},
  output: {schema: IdentifyComponentRisksOutputSchema},
  prompt: `You are an AI assistant specializing in identifying potential risks in UI components.

  Analyze the following UI component description and identify common functional and usability issues for similar components.

  Component Name: {{{componentName}}}
  Component Description: {{{componentDescription}}}

  Identify potential risks, and describe them in natural language.
  For each risk, mention its category (e.g., Functional, Usability, Security, Accessibility) and a severity level (High, Medium, or Low).
  Each risk identified should be on a new line and start with a bullet point (-).
  Do not use markdown tables or JSON. Format the output as a series of paragraphs.

  Return the risks as a single string.
  Ensure the output adheres to the IdentifyComponentRisksOutputSchema schema.
  `,
});

const identifyComponentRisksFlow = ai.defineFlow(
  {
    name: 'identifyComponentRisksFlow',
    inputSchema: IdentifyComponentRisksInputSchema,
    outputSchema: IdentifyComponentRisksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
