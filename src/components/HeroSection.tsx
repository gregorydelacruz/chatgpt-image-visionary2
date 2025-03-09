
import React from 'react';
import { ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
      <div className="w-full md:w-1/2 space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          <span>Intelligent Image Processing</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Too many scattered photos? Our super service re-names, organizes, and compiles them into categorized folders in one zip file so you can finally find what matters.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          📂 "Tame Your Photo Chaos – Try It Free!"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ImageIcon className="mr-2 h-5 w-5" /> Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('feature-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative">
          <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
          <div className="glass p-3 md:p-5 rounded-xl shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="Vision App Interface" 
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
