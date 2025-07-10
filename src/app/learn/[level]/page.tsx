import { notFound } from 'next/navigation';
import { learningContent, Topic } from '@/data/prompts';
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
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-8">
         <h2 className="font-headline text-2xl">{levelData.title} Topics</h2>
         <Badge variant="secondary" className="text-base">{levelData.topics.length} topics</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {levelData.topics.map((topic: Topic, index: number) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-medium">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {topic.content}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
