'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { analyzePrompt } from '@/ai/flows/prompt-analyzer';
import { Navbar } from '@/components/Navbar';

const playgroundFormSchema = z.object({
  promptText: z.string().min(10, {
    message: 'Prompt must be at least 10 characters.',
  }).max(500, {
    message: 'Prompt must not be longer than 500 characters.',
  }),
});

type PlaygroundFormValues = z.infer<typeof playgroundFormSchema>;

export default function PlaygroundPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PlaygroundFormValues>({
    resolver: zodResolver(playgroundFormSchema),
    defaultValues: {
      promptText: '',
    },
  });

  async function onSubmit(data: PlaygroundFormValues) {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzePrompt({ promptText: data.promptText });
      setAnalysis(result.suggestions);
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with our AI analyzer. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="space-y-2 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Prompt Playground</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your prompts and get instant, AI-powered feedback to improve them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Your Prompt</CardTitle>
                  <CardDescription>Enter the prompt you want to analyze.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="promptText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Explain the theory of relativity to a 5-year-old."
                            className="min-h-[200px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze Prompt
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <Card className="flex flex-col min-h-[440px]">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>Here are the suggestions to improve your prompt.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center text-sm">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground">AI is thinking...</span>
                </div>
              )}
              {analysis && !isLoading && (
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap font-sans self-start w-full">
                  {analysis}
                </div>
              )}
              {!analysis && !isLoading && (
                <div className="text-center text-muted-foreground">
                  <p>Your analysis will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
