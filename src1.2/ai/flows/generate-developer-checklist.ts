'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a developer checklist
 *  summarizing key implementation steps and precautions for a given UI component.
 *
 * - generateDeveloperChecklist - A function that generates a developer checklist for a given UI component.
 * - GenerateDeveloperChecklistInput - The input type for the generateDeveloperChecklist function.
 * - GenerateDeveloperChecklistOutput - The return type for the generateDeveloperChecklist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDeveloperChecklistInputSchema = z.object({
  componentName: z.string().describe('The name of the UI component.'),
  componentPurpose: z.string().describe('The purpose of the UI component.'),
  componentUserFlows: z.string().describe('The user flows of the UI component.'),
  componentUIUXElements: z.string().describe('The core UI/UX elements of the UI component.'),
  identifiedRisks: z.string().describe('The risks identified for the UI component.'),
suggestedFixes: z.string().describe('The suggested fixes for the UI component.')
});

export type GenerateDeveloperChecklistInput = z.infer<typeof GenerateDeveloperChecklistInputSchema>;

const GenerateDeveloperChecklistOutputSchema = z.object({
  checklist: z.string().describe('A concise developer checklist summarizing key implementation steps and precautions, with each item on a new line and starting with a number.'),
});

export type GenerateDeveloperChecklistOutput = z.infer<typeof GenerateDeveloperChecklistOutputSchema>;

export async function generateDeveloperChecklist(input: GenerateDeveloperChecklistInput): Promise<GenerateDeveloperChecklistOutput> {
  return generateDeveloperChecklistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDeveloperChecklistPrompt',
  input: {schema: GenerateDeveloperChecklistInputSchema},
  output: {schema: GenerateDeveloperChecklistOutputSchema},
  prompt: `You are an AI assistant designed to generate concise developer checklists for UI components.

  Based on the following information about the UI component, create a checklist that summarizes key implementation steps and precautions for the developer.

  Component Name: {{{componentName}}}
  Component Purpose: {{{componentPurpose}}}
  Component User Flows: {{{componentUserFlows}}}
  Component UI/UX Elements: {{{componentUIUXElements}}}
  Identified Risks: {{{identifiedRisks}}}
  Suggested Fixes: {{{suggestedFixes}}}

  The response should be a plain text list.
  Each point in the checklist should be on a new line and start with a number (e.g., "1. ...", "2. ...").
  Do not use markdown formatting.

  Checklist:`,
});

const generateDeveloperChecklistFlow = ai.defineFlow(
  {
    name: 'generateDeveloperChecklistFlow',
    inputSchema: GenerateDeveloperChecklistInputSchema,
    outputSchema: GenerateDeveloperChecklistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
