
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { recognizeImage } from '@/lib/imageRecognition';
import { ProcessedImage } from '@/types/image';

// Category mapping for automatic categorization
const categoryMapping: Record<string, string> = {
  // Ball category
  "ball": "Ball",
  "sphere": "Ball",
  "round": "Ball",
  
  // Sports category
  "sport": "Sports",
  "game": "Sports",
  "athlete": "Sports",
  "competition": "Sports",
  "match": "Sports",
  "tournament": "Sports",
  "court": "Sports",
  "field": "Sports",
  "stadium": "Sports",
  
  // Tennis category
  "tennis": "Tennis", 
  "tennis court": "Tennis", 
  "tennis racket": "Tennis",
  "tennis ball": "Tennis",
  "tennis player": "Tennis",
  "tennis match": "Tennis",
  "tennis tournament": "Tennis",
  
  // Pickleball category
  "pickleball": "Pickleball",
  "pickleball court": "Pickleball",
  "pickleball paddle": "Pickleball",
  "pickleball ball": "Pickleball",
  "pickleball player": "Pickleball",
  "pickleball match": "Pickleball",
  "pickleball tournament": "Pickleball"
};

// Helper function to determine the most appropriate category based on recognition results
const determineCategory = (results: Array<{ label: string; confidence: number }>): string => {
  if (!results || results.length === 0) return "Uncategorized";
  
  // Check each result label against our mapping
  for (const result of results) {
    const label = result.label.toLowerCase();
    
    // Direct match with keys in the mapping
    if (categoryMapping[label]) {
      return categoryMapping[label];
    }
    
    // Check if any key in the mapping is contained within the label
    for (const [key, category] of Object.entries(categoryMapping)) {
      if (label.includes(key)) {
        return category;
      }
    }
    
    // Check if any word in the label matches a key in the mapping
    const words = label.split(/\s+/);
    for (const word of words) {
      if (categoryMapping[word]) {
        return categoryMapping[word];
      }
    }
  }
  
  // Default category if no matches found
  return "Uncategorized";
};

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
          const fileExt = files[i].name.split('.').pop();
          
          // Add a timestamp to ensure uniqueness between similar images
          const timestamp = new Date().getTime();
          const uniqueSuffix = timestamp.toString().slice(-6);
          
          // Clean up the label and create a more descriptive filename
          const cleanedLabel = topLabel.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-');   // Replace spaces with hyphens
          
          const newFileName = `${cleanedLabel}-${uniqueSuffix}.${fileExt}`;
          
          // Create a new file with the renamed filename
          const renamedBlob = files[i].slice(0, files[i].size, files[i].type);
          renamedFile = new File([renamedBlob], newFileName, { type: files[i].type });
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
