
import React, { useState } from 'react';
import { Mail, Check, MessageCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ContactSection: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="w-full bg-muted/50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Need Help?</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="h-4 w-4" />
              Chat with us
            </Button>
          </div>
          
          {showChat ? (
            <div className="bg-background rounded-lg p-4 h-64 flex flex-col">
              <div className="flex-1 overflow-auto mb-4 p-2">
                <div className="p-3 bg-muted rounded-lg mb-2 max-w-[80%]">
                  <p className="text-sm">Hi there! How can we help you today?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="sm">Send</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">We're here to help with any questions about our image processing service.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">support@vision-app.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Live chat: 9am-5pm EST</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
