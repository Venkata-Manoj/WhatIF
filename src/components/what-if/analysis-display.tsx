import { Lightbulb, ShieldAlert, Wrench, ListChecks, Waypoints, Printer } from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import { AnalysisCard } from './analysis-card';
import { Separator } from '@/components/ui/separator';
import { MermaidChart } from './mermaid-chart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AnalysisDisplay({ result }: { result: AnalysisResult }) {
  const { analysis, risks, suggestions, checklist } = result;

  const getSeverityVariant = (severity: 'Low' | 'Medium' | 'High') => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const handlePrint = () => {
    window.print();
  };

  const checklistItems = checklist.split('\n').filter(item => item.trim().length > 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center no-print">
        <h2 className="text-3xl font-bold">Analysis Results for <span className='text-primary'>{result.componentName}</span></h2>
        <Button onClick={handlePrint} variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print / Save as PDF
        </Button>
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
             <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-1">User Flows</h3>
              <p className="whitespace-pre-wrap">{analysis.userFlows}</p>
            </div>
          </div>
        </AnalysisCard>

        <AnalysisCard title="User Flow Diagram" icon={Waypoints}>
           <MermaidChart chart={analysis.userFlowsChart} />
        </AnalysisCard>
      </div>

       <div className="grid gap-8">
        <AnalysisCard title="What-If Scenarios & Suggestions" icon={ShieldAlert}>
            <Accordion type="single" collapsible className="w-full" defaultValue='item-0'>
                {risks.map((risk, index) => {
                    const suggestion = suggestions.find(s => s.cause === risk.cause);
                    return (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>
                                <div className='flex items-center gap-4 text-left'>
                                    <Badge variant={getSeverityVariant(risk.severity)}>{risk.severity}</Badge>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{risk.type}</span>
                                        <span className='text-sm text-muted-foreground'>{risk.cause}</span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {suggestion ? (
                                    <div className='prose prose-sm dark:prose-invert max-w-none'>
                                      <h4 className='font-semibold flex items-center gap-2'><Wrench className='w-4 h-4 text-primary' />Remedy</h4>
                                      <p className='whitespace-pre-wrap'>{suggestion.remedy}</p>
                                    </div>
                                ) : (
                                    <p>No specific remedy provided for this risk.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </AnalysisCard>
      </div>

      <div className="grid gap-8">
        <AnalysisCard title="Developer Checklist" icon={ListChecks}>
           <div className="space-y-3">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`checklist-${index}`}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`checklist-${index}`} className="text-base">
                    {item.replace(/^\d+\.\s*/, '')}
                  </label>
                </div>
              ))}
            </div>
        </AnalysisCard>
      </div>
    </div>
  );
}
