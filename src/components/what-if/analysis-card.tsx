import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function AnalysisCard({
  title,
  icon: Icon,
  children,
  className,
}: AnalysisCardProps) {
  return (
    <Card className={cn('h-full shadow-lg bg-card/50', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className="h-7 w-7 text-primary" />
          <span className="text-2xl">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-base leading-relaxed prose prose-sm dark:prose-invert max-w-none">
        {children}
      </CardContent>
    </Card>
  );
}
