import { notFound } from 'next/navigation';
import { learningContent, Topic } from '@/data/prompts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type LevelPageProps = {
  params: {
    level: string;
  };
};

export async function generateStaticParams() {
  return Object.keys(learningContent).map((level) => ({
    level,
  }));
}

export async function generateMetadata({ params }: LevelPageProps) {
  const levelData = learningContent[params.level];
  if (!levelData) {
    return { title: 'Not Found' };
  }
  return {
    title: `${levelData.title} Level | PromptVibes`,
    description: levelData.description,
  };
}

export default function LevelPage({ params }: LevelPageProps) {
  const { level } = params;
  const levelData = learningContent[level];

  if (!levelData) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex flex-wrap items-center gap-4">
          <span>{levelData.title} Topics</span>
          <Badge variant="secondary" className="text-base">{levelData.topics.length} topics</Badge>
        </CardTitle>
        <CardDescription>{levelData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {levelData.topics.map((topic: Topic, index: number) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-medium">{topic.title}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <p className="text-base text-muted-foreground">{topic.description}</p>
                <div className="text-base text-foreground leading-relaxed">
                  {topic.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
