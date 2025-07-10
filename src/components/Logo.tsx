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
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))' }} />
        </linearGradient>
      </defs>
      <path
        d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 27.9 72.1 10 50 10Z"
        fill="hsl(var(--primary-foreground))"
      />
      <path
        d="M50 24C48.9 24 48 24.9 48 26V40C48 41.1 48.9 42 50 42C51.1 42 52 41.1 52 40V26C52 24.9 51.1 24 50 24Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M62.9 31.1C62.1 30.3 60.9 30.3 60.1 31.1L52.2 39C51.4 39.8 51.4 41 52.2 41.8C52.6 42.2 53.1 42.4 53.6 42.4C54.1 42.4 54.6 42.2 55 41.8L62.9 33.9C63.7 33.1 63.7 31.9 62.9 31.1Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M37.1 31.1C36.3 31.9 36.3 33.1 37.1 33.9L45 41.8C45.4 42.2 45.9 42.4 46.4 42.4C46.9 42.4 47.4 42.2 47.8 41.8C48.6 41 48.6 39.8 47.8 39L39.9 31.1C39.1 30.3 37.9 30.3 37.1 31.1Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M30 46C28.9 46 28 46.9 28 48V62C28 63.1 28.9 64 30 64C31.1 64 32 63.1 32 62V48C32 46.9 31.1 46 30 46Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M70 46C68.9 46 68 46.9 68 48V62C68 63.1 68.9 64 70 64C71.1 64 72 63.1 72 62V48C72 46.9 71.1 46 70 46Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M62.9 62.9C62.1 62.1 60.9 62.1 60.1 62.9L52.2 70.8C51.4 71.6 51.4 72.8 52.2 73.6C52.6 74 53.1 74.2 53.6 74.2C54.1 74.2 54.6 74 55 73.6L62.9 65.7C63.7 64.9 63.7 63.7 62.9 62.9Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M37.1 62.9C36.3 63.7 36.3 64.9 37.1 65.7L45 73.6C45.4 74 45.9 74.2 46.4 74.2C46.9 74.2 47.4 74 47.8 73.6C48.6 72.8 48.6 71.6 47.8 70.8L39.9 62.9C39.1 62.1 37.9 62.1 37.1 62.9Z"
        fill="hsl(var(--primary))"
      />
    </svg>
  );
}
