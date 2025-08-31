
'use client';

import { motion } from 'framer-motion';
import { FileCode } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-16 gap-4">
      <div className="relative w-24 h-24">
        <FileCode className="w-24 h-24 text-primary/30" />
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-primary/70 shadow-lg shadow-primary/50"
          animate={{ y: [0, 96, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      <p className="text-lg text-muted-foreground">Analyzing component...</p>
    </div>
  );
}
