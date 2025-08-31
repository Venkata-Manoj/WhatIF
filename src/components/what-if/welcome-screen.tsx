
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lightbulb, ShieldAlert, Wrench } from 'lucide-react';
import { Logo } from './logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const variants = {
  hidden: {
    opacity: 0,
    clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

export function WelcomeScreen() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const handleGetStarted = () => {
        if (!loading) {
            if (user) {
                router.push('/app');
            } else {
                router.push('/login');
            }
        }
    };

  return (
    <motion.div
      className="flex flex-col items-center bg-background overflow-y-auto"
      initial="visible"
      exit="hidden"
      variants={variants}
    >
      <div className="flex flex-col items-center text-center p-4 w-full">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 mb-6 mt-12 sm:mt-24"
        >
          <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Logo className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            WhatIF
          </h1>
        </motion.div>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12"
        >
          WhatIF provides instant, AI-driven insights for your UI components. Understand user flows, identify potential risks, and receive actionable suggestions to build more robust and user-friendly interfaces.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-4"
        >
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="px-10 py-6 text-xl font-semibold bg-accent hover:bg-primary text-accent-foreground rounded-full shadow-lg"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Started'}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 mb-12 w-full max-w-6xl px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-card/30 rounded-lg shadow-lg">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
              <p className="text-muted-foreground">
                Get a complete breakdown of any UI component's purpose, user flows, and core elements in seconds.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card/30 rounded-lg shadow-lg">
              <ShieldAlert className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Risk Identification</h3>
              <p className="text-muted-foreground">
                Our AI identifies potential usability, functional, and accessibility risks before they become problems.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card/30 rounded-lg shadow-lg">
              <Wrench className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Actionable Suggestions</h3>
              <p className="text-muted-foreground">
                Receive a developer-ready checklist and preventative strategies to build more resilient components.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
