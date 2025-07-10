'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { learningContent } from '@/data/prompts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type LevelPageProps = {
  params: {
    level: string;
  };
};

export default function LevelPage({ params }: LevelPageProps) {
  const { level } = params;
  const levelData = learningContent[level];
  const [openItem, setOpenItem] = useState<string | undefined>('item-0');

  if (!levelData) {
    notFound();
  }

  const handleNextTopic = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < levelData.topics.length) {
      setOpenItem(`item-${nextIndex}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-2 mb-8">
        <h2 className="font-headline text-2xl font-bold">{levelData.level}</h2>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-muted-foreground">{levelData.title}</h3>
          <Badge variant="secondary" className="text-sm">
            {levelData.topics.length} topics
          </Badge>
        </div>
        <p className="text-md text-muted-foreground">{levelData.description}</p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {levelData.topics.map((topic, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
            <Card className="overflow-hidden">
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex-1">
                  <h4 className="font-headline text-xl font-semibold">{topic.title}</h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <p className="text-base text-foreground/90 leading-relaxed border-l-4 border-primary pl-4">
                    {topic.definition}
                  </p>
                  <div className="space-y-4">
                    <h5 className="font-semibold text-lg">Real-world Examples:</h5>
                    {topic.examples.map((example, exIndex) => (
                      <Card key={exIndex} className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">{example.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground font-mono bg-background/50 p-3 rounded-md">
                            {example.text}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {index < levelData.topics.length - 1 && (
                    <div className="flex justify-end pt-4">
                      <Button onClick={() => handleNextTopic(index)}>
                        Next Topic <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
