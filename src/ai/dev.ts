import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-component.ts';
import '@/ai/flows/generate-preventative-suggestions.ts';
import '@/ai/flows/generate-developer-checklist.ts';
import '@/ai/flows/identify-component-risks.ts';