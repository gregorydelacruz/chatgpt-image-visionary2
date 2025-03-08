
// This file handles the integration with the vision API

// Convert image to base64
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

// Mock API call for now - this will be replaced with actual OpenAI integration
export const recognizeImage = async (imageFile: File): Promise<Array<{ label: string; confidence: number }>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response - in a real app, this would call the OpenAI API
  // The fileName helps us generate somewhat relevant mock results
  const fileName = imageFile.name.toLowerCase();
  
  if (fileName.includes('cat') || fileName.includes('kitten')) {
    return [
      { label: 'Domestic Cat', confidence: 0.98 },
      { label: 'Feline', confidence: 0.94 },
      { label: 'Pet', confidence: 0.87 },
      { label: 'Mammal', confidence: 0.82 },
      { label: 'Carnivore', confidence: 0.76 }
    ];
  } else if (fileName.includes('dog') || fileName.includes('puppy')) {
    return [
      { label: 'Dog', confidence: 0.97 },
      { label: 'Canine', confidence: 0.93 },
      { label: 'Pet', confidence: 0.89 },
      { label: 'Mammal', confidence: 0.84 },
      { label: 'Domestic Animal', confidence: 0.79 }
    ];
  } else if (fileName.includes('food') || fileName.includes('meal')) {
    return [
      { label: 'Food', confidence: 0.96 },
      { label: 'Meal', confidence: 0.88 },
      { label: 'Cuisine', confidence: 0.82 },
      { label: 'Dish', confidence: 0.77 },
      { label: 'Gastronomy', confidence: 0.71 }
    ];
  } else {
    // Default random results
    return [
      { label: 'Object', confidence: 0.89 },
      { label: 'Item', confidence: 0.76 },
      { label: 'Thing', confidence: 0.65 },
      { label: 'Material', confidence: 0.58 },
      { label: 'Artifact', confidence: 0.42 }
    ];
  }
};
