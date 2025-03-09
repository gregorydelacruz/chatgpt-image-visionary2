
import React from 'react';
import { HandHelping, Check, Clock, User, Search, Folder, Rocket, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConciergeSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <div className="glass p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <HandHelping className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">📸 Done-for-You Concierge Service</h2>
            </div>
            <h3 className="text-xl font-semibold mb-4">Let Us Handle the Chaos!</h3>
            
            <p className="text-lg mb-6">
              Overwhelmed by thousands of scattered photos? Let us do the work for you!
              Our Concierge Service takes the hassle out of organizing your digital memories. 
              Simply provide access to your photo sources, and we'll manually curate, rename, 
              categorize, and deliver a perfectly organized collection—without you lifting a finger.
            </p>
            
            <div className="mb-8">
              <h4 className="flex items-center text-xl font-semibold mb-4">
                <span className="mr-2">💎</span> What's Included?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Personalized Organization:</strong> AI + human expertise to ensure 100% accuracy and meaningful file names.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Cross-Platform Sorting:</strong> We pull your photos from multiple locations (cloud, hard drives, phone backups).</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Duplicates & Junk Removed:</strong> We eliminate blurry, duplicate, and irrelevant images.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Fully Labeled & Searchable:</strong> Your photos will be neatly categorized with easy-to-search names.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Delivered Ready-to-Use:</strong> Receive a professionally organized zip file or have us upload it to your preferred storage.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm">
              <h4 className="flex items-center text-xl font-semibold mb-4">
                <span className="mr-2">🎯</span> Perfect for:
              </h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Busy professionals with no time to sort through years of photos</span>
                </li>
                <li className="flex items-start">
                  <User className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Families looking to preserve memories in a structured way</span>
                </li>
                <li className="flex items-start">
                  <Search className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Content creators needing an efficient, searchable archive</span>
                </li>
                <li className="flex items-start">
                  <Folder className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Anyone tired of digital clutter</span>
                </li>
              </ul>
              
              <div className="text-center space-y-4">
                <h4 className="flex items-center justify-center text-xl font-semibold">
                  <Rocket className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Get White-Glove Photo Organization – Done for You!</span>
                </h4>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Your Concierge Service Today!
                </Button>
                <p className="text-sm flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                  <span>Limited Spots Available</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
