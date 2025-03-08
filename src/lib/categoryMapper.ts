
import { RecognitionResult } from '@/types/image';

// Category mapping for automatic categorization
export const categoryMapping: Record<string, string> = {
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

/**
 * Determines the most appropriate category based on recognition results
 */
export const determineCategory = (results: RecognitionResult[]): string => {
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
