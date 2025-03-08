
// This file handles the integration with the OpenAI vision API

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

// Interface for OpenAI API responses
interface OpenAIVisionResponse {
  label: string;
  confidence: number;
}

// Get the OpenAI API key from localStorage
const getApiKey = (): string => {
  return localStorage.getItem('openai_api_key') || '';
};

// Save the OpenAI API key to localStorage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('openai_api_key', apiKey);
};

// Check if the API key is set
export const isApiKeySet = (): boolean => {
  const apiKey = getApiKey();
  return !!apiKey;
};

// Clear the API key from localStorage
export const clearApiKey = (): void => {
  localStorage.removeItem('openai_api_key');
};

export const recognizeImage = async (imageFile: File): Promise<Array<{ label: string; confidence: number }>> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API key not set');
  }
  
  try {
    const base64Image = await imageToBase64(imageFile);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in image recognition. Analyze the provided image and return exactly 5 objects or concepts visible in the image, with confidence scores. Your response must be ONLY a valid JSON array with no markdown formatting, no code blocks, and no explanations. Format: [{\"label\": \"object name\", \"confidence\": 0.95}, ...]'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'What objects do you see in this image? Return ONLY raw JSON.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ],
        max_tokens: 300,
        temperature: 0.2
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse the response content which should be a JSON string
    try {
      // Extract the message content and clean it up
      const content = data.choices[0].message.content.trim();
      console.log('OpenAI response:', content);
      
      // Remove any markdown code block indicators if present
      const cleanedContent = content
        .replace(/^```json\s*/i, '')
        .replace(/```\s*$/i, '')
        .replace(/^```\s*/i, '')
        .trim();
      
      // Try to parse the JSON response
      const parsedContent = JSON.parse(cleanedContent);
      
      // Validate the response format
      if (Array.isArray(parsedContent)) {
        return parsedContent.map(item => ({
          label: item.label || "Unknown",
          confidence: item.confidence || 0.5
        })).slice(0, 5); // Ensure we return exactly 5 items
      } else {
        throw new Error('Invalid response format');
      }
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse recognition results');
    }
  } catch (error) {
    console.error('Error in image recognition:', error);
    throw error;
  }
};
