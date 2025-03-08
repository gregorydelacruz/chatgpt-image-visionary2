
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { recognizeImage } from '@/lib/imageRecognition';
import { ProcessedImage } from '@/types/image';

// Category mapping for automatic categorization
const categoryMapping: Record<string, string> = {
  "mountains": "Nature", "beaches": "Nature", "forests": "Nature", "deserts": "Nature",
  "waterfalls": "Nature", "sunsets": "Nature", "sunrises": "Nature",
  "rain": "Weather", "snow": "Weather", "storms": "Weather", "clouds": "Weather",
  "fog": "Weather", "lightning": "Weather",
  "trees": "Plants", "flowers": "Plants", "plants": "Plants", "gardens": "Plants",
  "wild animals": "Animals", "birds": "Animals", "insects": "Animals", "marine life": "Animals",
  "spring": "Seasons", "summer": "Seasons", "autumn": "Seasons", "winter": "Seasons",
  "family gatherings": "People", "portraits": "People", "candid shots": "People",
  "group photos": "People", "events": "People", "outings": "People",
  "individual portraits": "People", "professional headshots": "People",
  "weddings": "Celebrations", "birthdays": "Celebrations", "anniversaries": "Celebrations",
  "graduations": "Celebrations",
  "countries": "Travel", "cities": "Travel", "landmarks": "Travel",
  "airplanes": "Vehicles", "trains": "Vehicles", "cars": "Vehicles", "boats": "Vehicles",
  "motorcycles": "Vehicles", "bicycles": "Vehicles", "subways": "Vehicles",
  "locomotives": "Vehicles", "trams": "Vehicles", "helicopters": "Vehicles",
  "drones": "Vehicles", "sailboats": "Vehicles", "yachts": "Vehicles", "canoes": "Vehicles",
  "hiking": "Outdoor Activities", "camping": "Outdoor Activities", "road trips": "Outdoor Activities",
  "local traditions": "Culture", "festivals": "Culture", "food": "Culture",
  "postcards": "Travel", "tickets": "Travel", "maps": "Travel",
  "christmas": "Holidays", "halloween": "Holidays", "thanksgiving": "Holidays",
  "easter": "Holidays", "diwali": "Holidays", "chinese new year": "Holidays",
  "oktoberfest": "Holidays", "carnival": "Holidays", "independence day": "Holidays",
  "valentine's day": "Holidays",
  "music festivals": "Entertainment", "live performances": "Entertainment",
  "games": "Entertainment", "tournaments": "Entertainment", "races": "Entertainment",
  "parades": "Entertainment", "fairs": "Entertainment", "local events": "Entertainment",
  "breakfast": "Food", "lunch": "Food", "dinner": "Food",
  "italian": "Food", "chinese": "Food", "indian": "Food",
  "cakes": "Food", "pastries": "Food", "ice cream": "Food",
  "coffee": "Food", "tea": "Food", "cocktails": "Food", "smoothies": "Food",
  "recipes": "Food", "ingredients": "Food", "kitchen scenes": "Food",
  "nature photography": "Photography", "portraits": "Photography", "street photography": "Photography",
  "artworks": "Art", "murals": "Art", "galleries": "Art",
  "diy projects": "Crafts", "handmade items": "Crafts",
  "graphic design": "Design", "fashion": "Fashion", "architecture": "Design",
  "dance": "Performing Arts", "theater": "Performing Arts", "music": "Performing Arts",
  "smartphones": "Technology", "laptops": "Technology", "cameras": "Technology",
  "robots": "Technology", "drones": "Technology", "ai": "Technology",
  "apps": "Technology", "websites": "Technology", "games": "Technology",
  "tvs": "Technology", "speakers": "Technology", "smart home devices": "Technology",
  "soccer": "Sports", "basketball": "Sports", "baseball": "Sports",
  "tennis": "Sports", "golf": "Sports", "swimming": "Sports",
  "hiking": "Sports", "cycling": "Sports", "skiing": "Sports",
  "gym workouts": "Fitness", "yoga": "Fitness", "running": "Fitness",
  "marathons": "Sports", "tournaments": "Sports", "races": "Sports",
  "dogs": "Animals", "cats": "Animals", "birds": "Animals", "fish": "Animals",
  "lions": "Animals", "elephants": "Animals", "dolphins": "Animals",
  "cows": "Animals", "horses": "Animals", "chickens": "Animals",
  "butterflies": "Animals", "bees": "Animals", "ants": "Animals",
  "fish": "Marine Life", "sharks": "Marine Life", "coral reefs": "Marine Life",
  "skyscrapers": "Architecture", "houses": "Architecture", "bridges": "Architecture",
  "eiffel tower": "Landmarks", "statue of liberty": "Landmarks", "taj mahal": "Landmarks",
  "home decor": "Design", "offices": "Design", "restaurants": "Design",
  "castles": "Historical", "ruins": "Historical", "temples": "Historical",
  "classrooms": "Education", "libraries": "Education", "campuses": "Education",
  "books": "Education", "notes": "Education", "study sessions": "Education",
  "seminars": "Education", "training": "Education", "conferences": "Education",
  "experiments": "Education", "labs": "Education", "research": "Education",
  "drawing": "Education", "painting": "Education", "sculpting": "Education",
  "desks": "Work", "meetings": "Work", "coworkers": "Work",
  "presentations": "Work", "prototypes": "Work", "designs": "Work",
  "startups": "Work", "products": "Work", "branding": "Work",
  "home offices": "Work", "virtual meetings": "Work",
  "gym": "Health", "yoga": "Health", "running": "Health",
  "healthy meals": "Health", "smoothies": "Health", "supplements": "Health",
  "meditation": "Health", "relaxation": "Health", "therapy": "Health",
  "hospitals": "Health", "doctors": "Health", "treatments": "Health",
  "skincare": "Health", "spa": "Health", "wellness routines": "Health",
  "patterns": "Misc", "textures": "Misc", "colors": "Misc",
  "funny images": "Misc", "internet culture": "Misc",
  "quotes": "Misc", "motivational images": "Misc",
  "unclassified": "Misc", "unique photos": "Misc",
  "old photos": "Misc", "backups": "Misc"
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
