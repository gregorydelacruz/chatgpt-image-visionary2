
import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EmailCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail('');
    alert("Thanks for subscribing!");
  };

  return (
    <section className="w-full bg-muted/50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full md:w-3/4 mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 text-center">Join our newsletter to receive tips, updates and special offers.</p>
          
          <form onSubmit={handleSubscribe} className="space-y-4 max-w-xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="h-12" 
                  required
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Subscribe <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">We respect your privacy. Unsubscribe at any time.</p>
          </form>
          
          <div className="mt-8 flex flex-col gap-2 max-w-sm mx-auto">
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <p className="text-sm">Receive monthly newsletter with product updates</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <p className="text-sm">Get exclusive access to new features</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <p className="text-sm">Priority customer support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
