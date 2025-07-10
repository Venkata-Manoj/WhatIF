import { Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage() {
  return (
    <div className="container flex items-center justify-center py-20 md:py-32">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
            <Wrench className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">Quiz Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We're working hard to build an interactive quiz to test your prompt engineering knowledge. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
