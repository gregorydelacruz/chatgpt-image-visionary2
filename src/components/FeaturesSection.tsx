
import React from 'react';
import { Tag, Folder, FileSearch, Lock, Zap } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="feature-section" className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Core Features & Benefits</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <Tag className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">📸 AI-Powered Organization</h3>
          <p className="text-muted-foreground">Scattered photos? Our AI automatically sorts them into neatly labeled folders—no manual effort needed.</p>
        </div>
        
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <FileSearch className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">🔍 Smart Image Renaming</h3>
          <p className="text-muted-foreground">No more confusing file names! AI assigns clear, meaningful names to each photo, making searching effortless.</p>
        </div>
        
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
            <Folder className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">📂 One-Click Zip Download</h3>
          <p className="text-muted-foreground">All your organized photos, neatly packed in a single zip file—ready to access anytime, anywhere.</p>
        </div>

        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">🚀 Instantly Find Any Photo</h3>
          <p className="text-muted-foreground">Stop scrolling endlessly! AI-powered tagging lets you locate any image in seconds.</p>
        </div>
        
        <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
          <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">🔒 Secure & Private</h3>
          <p className="text-muted-foreground">Your memories, your control. Fully encrypted processing ensures your photos stay safe and private.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
