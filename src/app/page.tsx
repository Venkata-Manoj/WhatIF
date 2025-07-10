import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VibeLearnAILogo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <>
      <header className="absolute top-0 z-50 w-full h-14 flex items-center px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
            <VibeLearnAILogo className="h-6 w-6" />
            <span className="font-bold sm:inline-block">Vibe Learn AI</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="w-full pt-20 md:pt-32 lg:pt-40 xl:pt-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master Prompt Engineering with Vibe Learn AI
                </h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                  Unlock your potential with our all-in-one platform. Learn prompt engineering from the ground up, sharpen your skills in our AI-powered playground, and test your knowledge with dynamic quizzes.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[500px]:flex-row justify-center">
                <Button asChild size="lg" variant="default">
                  <Link href="/learn">
                    <BookOpen className="mr-2" />
                    Start Learning
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/playground">
                    <Sparkles className="mr-2" />
                    Open Playground
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="secondary">
                  <Link href="/quiz">
                    <Bot className="mr-2" />
                    Take a Quiz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Explore the Platform</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dive into our core features, each designed to build and test your prompt engineering skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="text-center flex flex-col items-center">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-2">Interactive Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Follow a structured learning path from beginner to professional, with hands-on exercises.</p>
                </CardContent>
              </Card>
              <Card className="text-center flex flex-col items-center">
                <CardHeader>
                   <div className="rounded-full bg-primary/10 p-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-2">AI Playground</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get instant feedback on your prompts with our AI analyzer to refine your skills.</p>
                </CardContent>
              </Card>
               <Card className="text-center flex flex-col items-center">
                <CardHeader>
                   <div className="rounded-full bg-primary/10 p-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-2">Knowledge Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Test your understanding with AI-generated questions based on our learning content.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
