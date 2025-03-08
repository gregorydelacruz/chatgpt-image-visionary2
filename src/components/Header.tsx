
import React from 'react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full pt-6 pb-4 px-4 md:px-6 animate-slide-down", className)}>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium animate-fade-in">
          Powered by AI
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Vision
        </h1>
        <p className="text-base text-muted-foreground max-w-md">
          Upload an image and our AI will recognize and describe what it sees.
        </p>
      </div>
    </header>
  );
};

export default Header;
