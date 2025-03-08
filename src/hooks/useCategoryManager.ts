
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ProcessedImage } from '@/types/image';

export const useCategoryManager = (images: ProcessedImage[], setImages: React.Dispatch<React.SetStateAction<ProcessedImage[]>>) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<string[]>(['Uncategorized', 'Ball', 'Sports', 'Tennis', 'Pickleball']);
  const [predefinedCategories, setPredefinedCategories] = useState<string[]>(['Ball', 'Sports', 'Tennis', 'Pickleball']);

  // Update categories whenever images change
  useEffect(() => {
    // Extract all categories from images
    const imageCategories = images.map(img => img.category);
    // Create a unique set of all categories
    const uniqueCategories = [...new Set(['Uncategorized', 'Ball', 'Sports', 'Tennis', 'Pickleball', ...imageCategories])];
    setCategories(uniqueCategories);
  }, [images]);

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

  return {
    categories,
    predefinedCategories,
    setImageCategory,
    addCategory,
    addPredefinedCategories
  };
};
