
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ResultDisplay from '@/components/ResultDisplay';
import { recognizeImage, isApiKeySet, saveApiKey, clearApiKey } from '@/lib/imageRecognition';
import { Loader2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface RecognitionResult {
  label: string;
  confidence: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<RecognitionResult[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  
  // Check if API key is set on component mount
  useEffect(() => {
    setIsApiKeyConfigured(isApiKeySet());
  }, []);
  
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
      setIsApiKeyConfigured(true);
      setIsApiKeyDialogOpen(false);
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
    setIsApiKeyConfigured(false);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
  };
  
  const handleImageSelected = async (file: File) => {
    if (!isApiKeyConfigured) {
      setIsApiKeyDialogOpen(true);
      return;
    }
    
    try {
      setIsProcessing(true);
      setHasResults(false);
      
      // Process the image
      const recognitionResults = await recognizeImage(file);
      
      // Short delay to ensure smooth animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update state with results
      setResults(recognitionResults);
      setHasResults(true);
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your image successfully.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        variant: "destructive",
        title: "Processing failed",
        description: error instanceof Error ? error.message : "There was an error analyzing your image. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Main content container */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <Header />
        
        <div className="flex items-center justify-center mb-4 gap-2">
          {isApiKeyConfigured ? (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsApiKeyDialogOpen(true)}
            >
              <Key className="h-4 w-4" />
              Change API Key
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsApiKeyDialogOpen(true)}
            >
              <Key className="h-4 w-4" />
              Set OpenAI API Key
            </Button>
          )}
        </div>
        
        <div className="relative w-full my-8 flex flex-col items-center">
          <ImageUploader 
            onImageSelected={handleImageSelected} 
            isProcessing={isProcessing} 
          />
          
          {isProcessing && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex flex-col items-center justify-center glass rounded-lg p-4">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm font-medium">Analyzing image...</p>
              </div>
            </div>
          )}
          
          <ResultDisplay 
            isVisible={hasResults} 
            isLoading={isProcessing} 
            results={results} 
          />
        </div>
        
        {/* Footer */}
        <footer className="mt-auto pt-6 pb-8 text-center text-sm text-muted-foreground">
          <p>Upload any image to analyze its contents using GPT-4o vision technology.</p>
        </footer>
      </div>
      
      {/* API Key Dialog */}
      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
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
              {isApiKeyConfigured && (
                <Button variant="destructive" onClick={handleClearApiKey}>
                  Remove Key
                </Button>
              )}
              <div className="ml-auto">
                <Button variant="outline" className="mr-2" onClick={() => setIsApiKeyDialogOpen(false)}>
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
    </div>
  );
};

export default Index;
