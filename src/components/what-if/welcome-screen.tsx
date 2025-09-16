
'use client';

import { motion } from 'framer-motion';
import { Lightbulb, ShieldAlert, Wrench, Cpu, FileSearch, ClipboardCheck, AlertTriangle, ShieldCheck, GitMerge, BotMessageSquare, Workflow, Rocket, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function WelcomeScreen() {
  const features = [
    {
      icon: Lightbulb,
      title: "Instant Analysis",
      description: "Get a complete breakdown of any UI component's purpose, user flows, and core elements in seconds."
    },
    {
      icon: ShieldAlert,
      title: "Risk Identification",
      description: "Our AI identifies potential usability, functional, and accessibility risks before they become problems."
    },
    {
      icon: Wrench,
      title: "Actionable Suggestions",
      description: "Receive a developer-ready checklist and preventative strategies to build more resilient components."
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description: "Your code is processed securely. We save your analysis history only if you are logged in, ensuring your intellectual property remains yours."
    },
    {
      icon: GitMerge,
      title: "Framework Agnostic",
      description: "Analyze components from React, Vue, Svelte, or any other JS framework with ease."
    }
  ];

  const journeySteps = [
    {
      icon: Rocket,
      title: "1. Get Started",
      description: "Sign up in seconds and access your dashboard to begin analyzing components."
    },
    {
      icon: Wrench,
      title: "2. Build Your Project",
      description: "Leverage our suite of analysis tools to bring your ideas to life with confidence."
    },
    {
      icon: Award,
      title: "3. Launch & Succeed",
      description: "Deploy your project and achieve your goals with our robust, AI-powered support."
    }
  ];

  const timelineItems = [
    {
      icon: FileSearch,
      title: "1. Submit Your Code",
      description: "Paste your component's code or simply drop the file. WhatIF accepts a wide range of formats, from JSX to plain text."
    },
    {
      icon: Cpu,
      title: "2. AI-Powered Analysis",
      description: "Our system performs a deep dive into the code to understand its structure, purpose, and underlying UI/UX logic."
    },
    {
      icon: Workflow,
      title: "3. User Flow Mapping",
      description: "The AI identifies and visualizes the primary user flows, giving you a clear picture of the component's journey."
    },
    {
      icon: AlertTriangle,
      title: "4. Risk Identification",
      description: "Potential 'what-if' scenarios are generated, highlighting risks related to usability, accessibility, and functionality."
    },
    {
      icon: BotMessageSquare,
      title: "5. Suggestion Generation",
      description: "Based on the identified risks, the AI provides targeted, actionable suggestions and code remedies to help you mitigate issues."
    },
    {
      icon: ClipboardCheck,
      title: "6. Get Your Report",
      description: "A comprehensive report is generated with a developer-ready checklist to guide implementation and ensure best practices are followed."
    }
  ];
  
  const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
    <div className="p-4 h-full">
      <Card className="flex flex-col bg-card/50 border-border/50 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="bg-background py-12 sm:py-24 no-print">
      <div className="container mx-auto px-4 space-y-24">
        
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-stretch justify-center md:justify-start [&_li]:mx-4 animate-marquee-slow motion-reduce:animate-none">
            {features.map((feature, index) => (
              <li key={index} className="w-[350px] flex-shrink-0">
                 <FeatureCard feature={feature} />
              </li>
            ))}
          </ul>
           <ul className="flex items-stretch justify-center md:justify-start [&_li]:mx-4 animate-marquee-slow motion-reduce:animate-none" aria-hidden="true">
            {features.map((feature, index) => (
              <li key={index} className="w-[350px] flex-shrink-0">
                 <FeatureCard feature={feature} />
              </li>
            ))}
          </ul>
        </div>

        <div>
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight">Your Journey With Us</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              From code submission to a comprehensive report, our AI handles the heavy lifting in just a few simple steps.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {journeySteps.map((step) => (
               <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full"
                >
                <Card className='h-full text-center bg-card border-border shadow-lg hover:shadow-primary/20 transition-shadow duration-300'>
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full border border-primary/20 mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="how-it-works">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              From code submission to a comprehensive report, our AI handles the heavy lifting in just a few simple steps.
            </p>
          </motion.div>

          <div className="relative wrap overflow-hidden p-10 h-full">
             <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const content = (
                 <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full"
                  >
                  <Card className='h-full text-left bg-card border-border shadow-lg hover:shadow-primary/20 transition-shadow duration-300'>
                    <CardHeader className="items-start">
                      <div className="p-3 bg-primary/10 rounded-full border border-primary/20 mb-4">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );

              return(
                <div key={index} className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-primary-foreground">{index + 1}</h1>
                  </div>
                  <div className={`order-1 w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                    {content}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
