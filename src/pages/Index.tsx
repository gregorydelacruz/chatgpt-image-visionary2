
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ResultDisplay from '@/components/ResultDisplay';
import ApiKeyButton from '@/components/ApiKeyButton';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import Footer from '@/components/Footer';
import { recognizeImage, isApiKeySet } from '@/lib/imageRecognition';
import { Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecognitionResult {
  label: string;
  confidence: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<RecognitionResult[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [renamedFile, setRenamedFile] = useState<File | null>(null);
  
  // Check if API key is set on component mount
  useEffect(() => {
    setIsApiKeyConfigured(isApiKeySet());
  }, []);
  
  const handleImageSelected = async (file: File) => {
    if (!isApiKeyConfigured) {
      setIsApiKeyDialogOpen(true);
      return;
    }
    
    setCurrentFile(file);
    setRenamedFile(null);
    
    try {
      setIsProcessing(true);
      setHasResults(false);
      
      // Process the image
      const recognitionResults = await recognizeImage(file);
      
      // Short delay to ensure smooth animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Create a renamed file based on top result
      if (recognitionResults.length > 0) {
        const topLabel = recognitionResults[0].label;
        const fileExt = file.name.split('.').pop();
        const newFileName = `${topLabel.toLowerCase().replace(/\s+/g, '-')}.${fileExt}`;
        
        // Create a new file with the renamed filename
        const renamedBlob = file.slice(0, file.size, file.type);
        const newFile = new File([renamedBlob], newFileName, { type: file.type });
        setRenamedFile(newFile);
      }
      
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

  const downloadRenamedImage = () => {
    if (!renamedFile) return;
    
    // Create a temporary URL for the file
    const url = URL.createObjectURL(renamedFile);
    
    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = renamedFile.name;
    document.body.appendChild(a);
    
    // Trigger the download
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: `Downloading "${renamedFile.name}"`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Main content container */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <Header />
        
        <div className="flex items-center justify-center mb-4 gap-2">
          <ApiKeyButton 
            isConfigured={isApiKeyConfigured} 
            onClick={() => setIsApiKeyDialogOpen(true)} 
          />
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
          
          {renamedFile && hasResults && (
            <div className="mt-4 animate-fade-in">
              <Button 
                onClick={downloadRenamedImage}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download as "{renamedFile.name}"
              </Button>
            </div>
          )}
        </div>
        
        <Footer />
      </div>
      
      <ApiKeyDialog
        isOpen={isApiKeyDialogOpen}
        onOpenChange={setIsApiKeyDialogOpen}
        onApiKeyStatusChange={setIsApiKeyConfigured}
      />
    </div>
  );
};

export default Index;
