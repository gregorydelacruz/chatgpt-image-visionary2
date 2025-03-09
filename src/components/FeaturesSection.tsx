
import React from 'react';
import { Tag, Users, Video } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="feature-section" className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Features, Real Benefits</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Our intelligent image processing solution addresses your key challenges</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <Tag className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Categorization</h3>
          <p className="text-muted-foreground">Stop manually sorting files. Our AI automatically categorizes your images based on content.</p>
        </div>
        
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Custom Categories</h3>
          <p className="text-muted-foreground">Create your own categories tailored to your specific needs and workflow.</p>
        </div>
        
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
          <p className="text-muted-foreground">Process multiple images at once and download them all with a single click.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
