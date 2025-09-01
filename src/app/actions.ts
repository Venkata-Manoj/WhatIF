'use server';

import { z } from 'zod';
import { analyzeComponent } from '@/ai/flows/analyze-component';
import { identifyComponentRisks } from '@/ai/flows/identify-component-risks';
import { generatePreventativeSuggestions } from '@/ai/flows/generate-preventative-suggestions';
import { generateDeveloperChecklist } from '@/ai/flows/generate-developer-checklist';
import type { AnalysisResult } from '@/lib/types';
import { saveAnalysisHistory } from '@/lib/firestore';
import { auth } from '@/lib/firebase-admin';

const formSchema = z.object({
  componentName: z
    .string()
    .min(3, { message: 'Component name must be at least 3 characters long.' })
    .max(100, { message: 'Component name must be 100 characters or less.' }),
  idToken: z.string().optional(),
});

interface FormState {
  status: 'idle' | 'success' | 'error';
  data?: AnalysisResult | null;
  message?: string | null;
  errors?: {
    componentName?: string[];
  } | null;
}

export async function analyzeComponentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    componentName: formData.get('componentName'),
    idToken: formData.get('idToken'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { componentName, idToken } = validatedFields.data;
  let user = null;

  if (idToken) {
    try {
      user = await auth.verifyIdToken(idToken);
    } catch (error) {
      console.error('Error verifying ID token:', error);
      // Decide if you want to fail the whole action or just proceed without a user
    }
  }

  try {
    const analysis = await analyzeComponent({ componentName });
    const componentDescription = `Purpose: ${analysis.purpose}\nUser Flows: ${analysis.userFlows}\nCore UI/UX Elements: ${analysis.coreUIUXElements}`;

    const risksResult = await identifyComponentRisks({
      componentName,
      componentDescription,
    });

    const suggestionsResult = await generatePreventativeSuggestions({
      componentName,
      risks: risksResult.risks,
    });

    const checklistResult = await generateDeveloperChecklist({
      componentName,
      componentPurpose: analysis.purpose,
      componentUserFlows: analysis.userFlows,
      componentUIUXElements: analysis.coreUIUXElements,
      identifiedRisks: JSON.stringify(risksResult.risks, null, 2),
      suggestedFixes: JSON.stringify(suggestionsResult.suggestions, null, 2),
    });

    const resultData: AnalysisResult = {
      analysis,
      risks: risksResult.risks,
      suggestions: suggestionsResult.suggestions,
      checklist: checklistResult.checklist,
      componentName,
    };
    
    if (user) {
      await saveAnalysisHistory(user.uid, resultData);
    }

    return {
      status: 'success',
      data: resultData,
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    return {
      status: 'error',
      message: 'An AI-powered analysis step failed. Please try again.',
    };
  }
}
