'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

export function MermaidChart({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
      },
    });

    async function renderChart() {
      setIsLoading(true);
      setError(null);
      if (chart) {
        try {
          const { svg: renderedSvg } = await mermaid.render(
            `mermaid-graph-${Date.now()}`,
            chart
          );
          setSvg(renderedSvg);
        } catch (e) {
          console.error('Failed to render Mermaid chart:', e);
          let message = 'Unknown error';
          if (e instanceof Error) {
            message = e.message;
          } else if (typeof e === 'string') {
            message = e;
          }
          setError(`Error rendering chart: ${message}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    renderChart();
  }, [chart, resolvedTheme]);

  if (isLoading) {
    return (
       <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-5/6" />
        <Skeleton className="h-8 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-destructive">
        {error}
      </p>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No flowchart generated.
      </div>
    );
  }

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} className="w-full h-full" />;
}
