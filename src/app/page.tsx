import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <>
      <header className="absolute top-0 z-50 w-full h-14 flex items-center px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">PromptVibes</span>
        </Link>
      </header>

      <section className="w-full pt-20 md:pt-32 lg:pt-40 xl:pt-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master the Art of AI Communication
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Welcome to PromptVibes. Your journey to mastering prompt engineering starts here. Learn, practice, and perfect your skills with our interactive tools.
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

      <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
             <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Why PromptVibes?</div>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Everything You Need to Succeed</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-lg">
                        Our platform is packed with features designed to take you from prompt novice to expert, providing structured learning paths, hands-on practice, and AI-powered feedback.
                    </p>
                     <ul className="grid gap-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-primary" />
                           Structured, step-by-step learning roadmap.
                        </li>
                         <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-primary" />
                           Instant AI analysis on your own prompts.
                        </li>
                         <li className="flex items-center gap-2">
                           <CheckCircle className="h-4 w-4 text-primary" />
                           Interactive quizzes to test your knowledge.
                        </li>
                    </ul>
                </div>
                 <div className="flex items-center justify-center">
                    <Image
                        src="https://placehold.co/600x400.png"
                        width={600}
                        height={400}
                        alt="Abstract AI visualization"
                        data-ai-hint="abstract network"
                        className="overflow-hidden rounded-xl object-cover shadow-lg"
                    />
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
    </>
  );
}


function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
