
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full text-center text-sm text-muted-foreground", className)}>
      <div className="glass px-4 py-3 rounded-xl inline-flex items-center gap-1">
        Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> by Gregory de la Cruz
      </div>
    </footer>
  );
};

export default Footer;
