
import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaSectionProps {
  onApiKeyDialogOpen: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onApiKeyDialogOpen }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Image Workflow?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who have simplified their image management process.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onApiKeyDialogOpen}
          >
            Configure API Key <Search className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
