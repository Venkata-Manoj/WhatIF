'use client';

import { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateQuizQuestion } from '@/ai/flows/quiz-generator';
import { learningContent } from '@/data/prompts';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function QuizPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { toast } = useToast();

  const allTopics = Object.values(learningContent).flatMap((level) => level.topics);

  const fetchQuestion = async () => {
    setIsLoading(true);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuestion(null);

    try {
      const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
      const result = await generateQuizQuestion({
        topicTitle: randomTopic.title,
        topicContent: randomTopic.content,
      });
      // Shuffle options
      const shuffledOptions = [...result.options].sort(() => Math.random() - 0.5);
      setQuestion({ ...result, options: shuffledOptions });
    } catch (error) {
      console.error('Error generating quiz question:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to load question.',
        description: 'There was a problem generating a new quiz question. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
    }
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) return '';
    if (option === question?.correctAnswer) return 'bg-green-200 border-green-400';
    if (option === selectedAnswer) return 'bg-red-200 border-red-400';
    return '';
  };

  return (
    <div className="container flex items-center justify-center py-12 md:py-20">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Prompt Engineering Quiz</CardTitle>
          <CardDescription className="text-center">Test your knowledge with a random question.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col justify-center">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin" />
              <p>Generating a fresh question for you...</p>
            </div>
          )}
          {!isLoading && question && (
            <div className="space-y-6">
              <p className="text-lg font-semibold text-center">{question.question}</p>
              <RadioGroup
                value={selectedAnswer ?? ''}
                onValueChange={setSelectedAnswer}
                className="space-y-3"
                disabled={isAnswered}
              >
                {question.options.map((option, index) => (
                  <Label
                    key={index}
                    htmlFor={`option-${index}`}
                    className={cn(
                      'flex items-center space-x-3 border rounded-md p-4 transition-all',
                      'cursor-pointer hover:bg-muted/50',
                       getOptionClass(option)
                    )}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
              {isAnswered && selectedAnswer && (
                 <div className={cn("mt-4 text-center font-medium p-3 rounded-md", 
                  selectedAnswer === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                 )}>
                    {selectedAnswer === question.correctAnswer
                      ? "Correct! Well done."
                      : `Not quite. The correct answer is: ${question.correctAnswer}`}
                  </div>
              )}
            </div>
          )}
        </CardContent>
        <CardContent className="flex justify-center">
          {isAnswered ? (
            <Button onClick={fetchQuestion} size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Next Question
            </Button>
          ) : (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer || isLoading} size="lg">
              Submit Answer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
