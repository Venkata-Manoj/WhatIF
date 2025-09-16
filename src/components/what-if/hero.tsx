
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 sm:py-16 px-4 flex flex-col items-center text-center no-print relative overflow-hidden"
    >
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter">
        Build Bulletproof UI, Instantly
      </h1>
      <p className="max-w-3xl mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
        Stop guessing, start knowing. WhatIF uses AI to analyze your UI components, identifying potential risks and providing actionable suggestions so you can build more robust and user-friendly interfaces, faster.
      </p>
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="#how-it-works">
            See How It Works
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
