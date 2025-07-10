import * as React from 'react';

export function VibeLearnAILogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>
      <path
        d="M62.5 12.5H37.5C23.43 12.5 12.5 23.43 12.5 37.5V62.5C12.5 76.57 23.43 87.5 37.5 87.5H62.5C76.57 87.5 87.5 76.57 87.5 62.5V37.5C87.5 23.43 76.57 12.5 62.5 12.5Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M31.25 50C31.25 45.4417 34.0292 41.5208 38.125 39.5833V60.4167C34.0292 58.4792 31.25 54.5583 31.25 50ZM43.75 37.5V62.5L68.75 50L43.75 37.5Z"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
  );
}
