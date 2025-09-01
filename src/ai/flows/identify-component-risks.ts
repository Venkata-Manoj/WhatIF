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
import { IdentifyComponentRisksOutputSchema } from '@/lib/types';


const IdentifyComponentRisksInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component to analyze.'),
  componentDescription: z.string().describe('A detailed description of the UI component, including its purpose, user flows, and core UI/UX elements.'),
});
export type IdentifyComponentRisksInput = z.infer<typeof IdentifyComponentRisksInputSchema>;
export type IdentifyComponentRisksOutput = z.infer<typeof IdentifyComponentRisksOutputSchema>;

export async function identifyComponentRisks(input: IdentifyComponentRisksInput): Promise<IdentifyComponentRisksOutput> {
  return identifyComponentRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyComponentRisksPrompt',
  input: {schema: IdentifyComponentRisksInputSchema},
  output: {schema: IdentifyComponentRisksOutputSchema},
  prompt: `You are an AI assistant specializing in identifying potential risks in UI components based on React/Next.js best practices.

  Analyze the following UI component description and identify common functional and usability issues.

  Component Name: {{{componentName}}}
  Component Description: {{{componentDescription}}}

  Identify up to 5 potential risks. For each risk, provide:
  - 'type': The category of the risk (e.g., Functional, Usability, Security, Accessibility).
  - 'cause': A brief, clear description of the scenario or what could cause this risk.
  - 'severity': A severity level (High, Medium, or Low).

  Return the risks as a structured JSON object that adheres to the defined output schema.
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
