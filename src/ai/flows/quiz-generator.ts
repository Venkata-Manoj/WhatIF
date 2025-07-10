'use server';
/**
 * @fileOverview Generates a quiz question based on learning content.
 *
 * - generateQuizQuestion - A function that creates a multiple-choice question.
 * - GenerateQuizQuestionInput - The input type for the function.
 * - GenerateQuizQuestionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionInputSchema = z.object({
  topicTitle: z.string().describe('The title of the topic to generate a question for.'),
  topicContent: z.string().describe('The content of the learning topic.'),
});
export type GenerateQuizQuestionInput = z.infer<typeof GenerateQuizQuestionInputSchema>;

const GenerateQuizQuestionOutputSchema = z.object({
  question: z.string().describe('The generated multiple-choice question.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers (options).'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});
export type GenerateQuizQuestionOutput = z.infer<typeof GenerateQuizQuestionOutputSchema>;

export async function generateQuizQuestion(
  input: GenerateQuizQuestionInput
): Promise<GenerateQuizQuestionOutput> {
  return generateQuizQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionPrompt',
  input: { schema: GenerateQuizQuestionInputSchema },
  output: { schema: GenerateQuizQuestionOutputSchema },
  prompt: `You are a quiz master who creates engaging multiple-choice questions about prompt engineering.

Based on the following topic, generate one multiple-choice question.

Topic Title: {{{topicTitle}}}
Topic Content: {{{topicContent}}}

The question should have 4 options: one correct answer and three plausible but incorrect distractors.
The options should be distinct and clear. Ensure the correct answer is directly supported by the provided content.
Return the question, the array of four options, and the correct answer text.
`,
});

const generateQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionFlow',
    inputSchema: GenerateQuizQuestionInputSchema,
    outputSchema: GenerateQuizQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
