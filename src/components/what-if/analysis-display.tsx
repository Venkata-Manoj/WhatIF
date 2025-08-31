import { Lightbulb, ShieldAlert, Wrench, ListChecks, Waypoints } from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import { AnalysisCard } from './analysis-card';
import { Separator } from '@/components/ui/separator';
import { MermaidChart } from './mermaid-chart';

export function AnalysisDisplay({ result }: { result: AnalysisResult }) {
  const { analysis, risks, suggestions, checklist } = result;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-3xl font-bold">Analysis Results</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <AnalysisCard title="Key Points" icon={Lightbulb}>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Purpose</h3>
              <p>{analysis.purpose}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-1">Core UI/UX Elements</h3>
              <p className="whitespace-pre-wrap">{analysis.coreUIUXElements}</p>
            </div>
          </div>
        </AnalysisCard>

        <AnalysisCard title="User Flow Diagram" icon={Waypoints}>
           <MermaidChart chart={analysis.userFlowsChart} />
        </AnalysisCard>
      </div>

       <div className="grid gap-8">
        <AnalysisCard title="User Flows" icon={Lightbulb}>
          <p className="whitespace-pre-wrap">{analysis.userFlows}</p>
        </AnalysisCard>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <AnalysisCard title="What-If Scenarios" icon={ShieldAlert}>
          <p className="whitespace-pre-wrap">{risks}</p>
        </AnalysisCard>

        <AnalysisCard title="Preventative Suggestions" icon={Wrench}>
          <p className="whitespace-pre-wrap">{suggestions}</p>
        </AnalysisCard>
      </div>

      <div className="grid gap-8">
        <AnalysisCard title="Developer Checklist" icon={ListChecks}>
           <p className="whitespace-pre-wrap">{checklist}</p>
        </AnalysisCard>
      </div>
    </div>
  );
}
