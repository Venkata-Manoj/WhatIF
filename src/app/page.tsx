import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unlock the Power of AI with Prompt Engineering
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Welcome to PromptVibes. Your journey to mastering the art of communication with AI starts here. Learn, practice, and perfect your prompts.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/learn">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Abstract AI visualization"
                data-ai-hint="abstract curves"
                className="overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is packed with features designed to take you from prompt novice to expert.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-lg">Interactive Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Follow a structured learning path from beginner to professional, with hands-on exercises.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-lg">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Get instant feedback on your prompts with our AI analyzer to refine your skills.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="rounded-full bg-primary/10 p-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-lg">Prompt Playground</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Experiment with different prompts and see the results in real-time in a safe environment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
