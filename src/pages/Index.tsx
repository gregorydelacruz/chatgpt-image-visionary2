
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ResultDisplay from '@/components/ResultDisplay';
import { recognizeImage } from '@/lib/imageRecognition';
import { Loader2 } from 'lucide-react';

interface RecognitionResult {
  label: string;
  confidence: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<RecognitionResult[]>([]);
  const [hasResults, setHasResults] = useState(false);
  
  const handleImageSelected = async (file: File) => {
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
        description: "There was an error analyzing your image. Please try again.",
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
          <p>Upload any image to analyze its contents using AI vision technology.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
