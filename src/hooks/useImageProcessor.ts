
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { recognizeImage } from '@/lib/imageRecognition';
import { determineCategory } from '@/lib/categoryMapper';
import { createRenamedFile } from '@/lib/imageUtils';
import { ProcessedImage } from '@/types/image';

export const useImageProcessor = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const processImages = async (files: File[]) => {
    // Add the new images to our state with initial values
    const newImages = files.map(file => ({
      originalFile: file,
      renamedFile: null,
      results: [],
      isProcessing: true,
      isCompleted: false,
      category: 'Uncategorized'
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
          renamedFile = createRenamedFile(files[i], topLabel);
        }
        
        // Determine the appropriate category based on recognition results
        const category = determineCategory(recognitionResults);
        
        // Update the image in our state
        setImages(prev => prev.map((img, idx) => {
          if (idx === currentIndex) {
            return {
              ...img,
              renamedFile,
              results: recognitionResults,
              isProcessing: false,
              isCompleted: true,
              category
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

  return {
    isProcessing,
    images,
    selectedImageIndex,
    setSelectedImageIndex,
    processImages,
    setImages
  };
};
