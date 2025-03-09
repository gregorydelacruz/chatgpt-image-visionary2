
import React from 'react';
import { Star } from 'lucide-react';

const SocialProofSection: React.FC = () => {
  return (
    <section className="w-full bg-muted/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Trusted by Users Worldwide</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600">15k+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-purple-600">1M+</div>
            <div className="text-sm text-muted-foreground">Images Processed</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-sm text-muted-foreground">4.9/5 Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
