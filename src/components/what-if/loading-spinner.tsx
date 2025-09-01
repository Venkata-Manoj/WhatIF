
'use client';

import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const stages = [
    "Warming up the AI...",
    "Analyzing component purpose...",
    "Mapping user flows...",
    "Identifying potential risks...",
    "Generating preventative suggestions...",
    "Creating developer checklist...",
    "Finalizing report...",
];

export function LoadingSpinner() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentStage((prevStage) => (prevStage + 1) % stages.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col justify-center items-center py-16 gap-6">
       <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="w-24 h-24 text-primary/80" />
      </motion.div>
      <div className="text-center">
        <p className="text-lg text-muted-foreground transition-all duration-300">
            {stages[currentStage]}
        </p>
         <div className="flex items-center justify-center gap-1 mt-2">
            <motion.div
                className='h-2 w-2 bg-primary/50 rounded-full'
                animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0}}
            />
             <motion.div
                className='h-2 w-2 bg-primary/50 rounded-full'
                animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2}}
            />
             <motion.div
                className='h-2 w-2 bg-primary/50 rounded-full'
                animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4}}
            />
        </div>
      </div>
    </div>
  );
}
