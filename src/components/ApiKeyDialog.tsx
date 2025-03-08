
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Key } from 'lucide-react';
import { isApiKeySet, saveApiKey, clearApiKey } from '@/lib/imageRecognition';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeyStatusChange: (isConfigured: boolean) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  onApiKeyStatusChange
}) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      if (!apiKey.startsWith('sk-')) {
        toast({
          variant: "destructive",
          title: "Invalid API Key Format",
          description: "OpenAI API keys should start with 'sk-'. Please enter a valid OpenAI API key.",
        });
        return;
      }
      
      saveApiKey(apiKey.trim());
      onApiKeyStatusChange(true);
      onOpenChange(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
      });
    }
  };
  
  const handleClearApiKey = () => {
    clearApiKey();
    setApiKey('');
    onApiKeyStatusChange(false);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Enter your OpenAI API key to use the GPT-4o vision model. 
              Your key will be stored locally in your browser.
            </p>
            <p className="text-sm text-yellow-600 font-medium">
              Note: API keys should start with "sk-" and can be either standard keys or project-based keys (sk-proj-...).
            </p>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            {isApiKeySet() && (
              <Button variant="destructive" onClick={handleClearApiKey}>
                Remove Key
              </Button>
            )}
            <div className="ml-auto">
              <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSaveApiKey}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
