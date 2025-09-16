
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "What is WhatIF?",
    answer:
      "WhatIF is an AI-powered tool designed to analyze UI components. It helps developers understand the component's purpose, identify potential risks (like usability or accessibility issues), and receive actionable suggestions and a developer checklist to improve their code.",
  },
  {
    question: "How do I use it?",
    answer:
      "Simply paste your component's code (e.g., from a React, Vue, or other framework file) into the text area, provide a name, and click 'Analyze Component'. You can also drag and drop a file directly. The AI will then provide a detailed report.",
  },
  {
    question: "Is my code stored on your servers?",
    answer:
      "If you are logged in, the component code and its analysis results are saved to your personal history to allow you to review them later. We prioritize your privacy and security. The code is not used for any purpose other than providing the analysis for you.",
  },
    {
    question: "Is it free to use?",
    answer:
      "Yes, WhatIF is currently free to use. We want to provide a powerful tool to the developer community to build better and more reliable UI components.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. If you are logged in, your analysis history is stored securely and is accessible only by you. We do not share your code or analysis results with third parties. Your privacy is a top priority.",
  },
  {
    question: "What kind of risks does it identify?",
    answer:
      "The analysis covers a range of potential issues, including functional bugs, usability problems, accessibility gaps (A11Y), and performance bottlenecks. The goal is to catch common pitfalls before they affect users.",
  },
  {
    question: "Can I use this for any JavaScript framework?",
    answer:
      "Yes. While it's optimized for modern component-based frameworks like React, Next.js, and Vue, the underlying language model can analyze and provide valuable feedback on code from virtually any JavaScript framework, or even plain HTML and CSS.",
  },
  {
    question: "Can I upload non-code files for analysis?",
    answer:
      "Yes! Our analyzer is not limited to just code. You can upload text files (like .txt, .md, or similar) containing any type of written content, and the system will still analyze it and provide meaningful output with suggestions for improvement. For example, if you upload a text file with notes or descriptive content, it will process that too and give you useful insights.",
  }
];

export function Faq() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg text-left">
              <div className="flex items-center gap-4">
                {faq.question}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
