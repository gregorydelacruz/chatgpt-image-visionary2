
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // Add this import
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

interface ProcessedImage {
  originalFile: File;
  renamedFile: File | null;
  results: RecognitionResult[];
  isProcessing: boolean;
  isCompleted: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Check if API key is set on component mount
  useEffect(() => {
    setIsApiKeyConfigured(isApiKeySet());
  }, []);
  
  const handleImagesSelected = async (files: File[]) => {
    if (!isApiKeyConfigured) {
      setIsApiKeyDialogOpen(true);
      return;
    }
    
    // Add the new images to our state with initial values
    const newImages = files.map(file => ({
      originalFile: file,
      renamedFile: null,
      results: [],
      isProcessing: true,
      isCompleted: false
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setIsProcessing(true);
    
    // Process each image sequentially
    for (let i = 0; i < files.length; i++) {
      const currentIndex = images.length + i;
      
      try {
        // Set the current image as selected
        setSelectedImageIndex(currentIndex);
        
        // Process the image
        const recognitionResults = await recognizeImage(files[i]);
        
        // Short delay to ensure smooth animation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Create a renamed file based on top result
        let renamedFile = null;
        if (recognitionResults.length > 0) {
          const topLabel = recognitionResults[0].label;
          const fileExt = files[i].name.split('.').pop();
          const newFileName = `${topLabel.toLowerCase().replace(/\s+/g, '-')}.${fileExt}`;
          
          // Create a new file with the renamed filename
          const renamedBlob = files[i].slice(0, files[i].size, files[i].type);
          renamedFile = new File([renamedBlob], newFileName, { type: files[i].type });
        }
        
        // Update the image in our state
        setImages(prev => prev.map((img, idx) => {
          if (idx === currentIndex) {
            return {
              ...img,
              renamedFile,
              results: recognitionResults,
              isProcessing: false,
              isCompleted: true
            };
          }
          return img;
        }));
        
        if (i === files.length - 1) {
          toast({
            title: "Analysis complete",
            description: `Processed ${files.length} image${files.length > 1 ? 's' : ''} successfully.`,
          });
        }
      } catch (error) {
        console.error('Error processing image:', error);
        
        // Update the failed image in our state
        setImages(prev => prev.map((img, idx) => {
          if (idx === currentIndex) {
            return {
              ...img,
              isProcessing: false,
              isCompleted: false
            };
          }
          return img;
        }));
        
        toast({
          variant: "destructive",
          title: "Processing failed",
          description: error instanceof Error ? error.message : "There was an error analyzing an image. Please try again.",
        });
      }
    }
    
    setIsProcessing(false);
  };

  const downloadRenamedImage = (index: number) => {
    const image = images[index];
    if (!image || !image.renamedFile) return;
    
    // Create a temporary URL for the file
    const url = URL.createObjectURL(image.renamedFile);
    
    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = image.renamedFile.name;
    document.body.appendChild(a);
    
    // Trigger the download
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: `Downloading "${image.renamedFile.name}"`,
    });
  };

  // Get the current selected image for display
  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

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
            onImageSelected={handleImagesSelected} 
            isProcessing={isProcessing} 
          />
          
          {images.length > 0 && (
            <div className="w-full mt-8">
              <h3 className="text-lg font-semibold mb-4">Processed Images</h3>
              <div className="grid grid-cols-4 gap-3 my-4">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                      selectedImageIndex === index ? "border-blue-500" : "border-transparent",
                      "hover:border-blue-300"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={URL.createObjectURL(image.originalFile)} 
                      alt={`Thumbnail ${index}`}
                      className="w-full h-20 object-cover"
                    />
                    {image.isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentImage && (
            <>
              <ResultDisplay 
                isVisible={currentImage.isCompleted} 
                isLoading={currentImage.isProcessing} 
                results={currentImage.results} 
              />
              
              {currentImage.renamedFile && currentImage.isCompleted && (
                <div className="mt-4 animate-fade-in">
                  <Button 
                    onClick={() => downloadRenamedImage(selectedImageIndex!)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download as "{currentImage.renamedFile.name}"
                  </Button>
                </div>
              )}
            </>
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

