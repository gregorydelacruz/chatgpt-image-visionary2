
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { recognizeImage } from '@/lib/imageRecognition';
import JSZip from 'jszip';

export interface RecognitionResult {
  label: string;
  confidence: number;
}

export interface ProcessedImage {
  originalFile: File;
  renamedFile: File | null;
  results: RecognitionResult[];
  isProcessing: boolean;
  isCompleted: boolean;
  category: string;
}

export const useImageProcessing = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>(['Uncategorized']);
  const [predefinedCategories, setPredefinedCategories] = useState<string[]>([]);

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

  const setImageCategory = (index: number, category: string) => {
    setImages(prev => prev.map((img, idx) => {
      if (idx === index) {
        return {
          ...img,
          category
        };
      }
      return img;
    }));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const addPredefinedCategories = (newCategories: string[]) => {
    // Filter out any duplicates
    const uniqueNewCategories = newCategories.filter(
      cat => !predefinedCategories.includes(cat)
    );
    
    if (uniqueNewCategories.length > 0) {
      setPredefinedCategories(prev => [...prev, ...uniqueNewCategories]);
      
      toast({
        title: "Categories added",
        description: `Added ${uniqueNewCategories.length} predefined categories.`,
      });
    }
  };

  const downloadAllAsZip = async () => {
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "No images to download",
        description: "Please upload and process images first.",
      });
      return;
    }

    try {
      const zip = new JSZip();
      
      // Group images by category
      const categoryFolders: Record<string, JSZip> = {};
      
      for (const image of images) {
        if (!image.renamedFile || !image.isCompleted) continue;
        
        // Get or create the folder for this category
        if (!categoryFolders[image.category]) {
          categoryFolders[image.category] = zip.folder(image.category)!;
        }
        
        // Convert file to blob
        const blob = await image.renamedFile.arrayBuffer();
        
        // Add file to its category folder
        categoryFolders[image.category].file(image.renamedFile.name, blob);
      }
      
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Download the zip file
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "categorized-images.zip";
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Downloading categorized images as zip file.",
      });
    } catch (error) {
      console.error('Error creating zip file:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Failed to create zip file. Please try again.",
      });
    }
  };

  return {
    isProcessing,
    images,
    selectedImageIndex,
    categories,
    predefinedCategories,
    setSelectedImageIndex,
    processImages,
    downloadRenamedImage,
    setImageCategory,
    addCategory,
    addPredefinedCategories,
    downloadAllAsZip
  };
};
