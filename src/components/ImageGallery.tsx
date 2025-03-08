
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, FolderIcon } from 'lucide-react';
import { ProcessedImage } from '@/types/image';

interface ImageGalleryProps {
  images: ProcessedImage[];
  selectedImageIndex: number | null;
  onImageSelect: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  selectedImageIndex,
  onImageSelect
}) => {
  if (images.length === 0) return null;

  // Group images by category
  const imagesByCategory: Record<string, ProcessedImage[]> = {};
  
  images.forEach(image => {
    if (!imagesByCategory[image.category]) {
      imagesByCategory[image.category] = [];
    }
    imagesByCategory[image.category].push(image);
  });

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold mb-4">Processed Images</h3>
      
      {Object.entries(imagesByCategory).map(([category, categoryImages]) => (
        <div key={category} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">{category}</h4>
            <span className="text-xs text-muted-foreground">({categoryImages.length})</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-2">
            {categoryImages.map((image, categoryIndex) => {
              // Find the original index in the full images array
              const originalIndex = images.findIndex(img => img === image);
              
              return (
                <div 
                  key={originalIndex} 
                  className={cn(
                    "relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                    selectedImageIndex === originalIndex ? "border-blue-500" : "border-transparent",
                    "hover:border-blue-300"
                  )}
                  onClick={() => onImageSelect(originalIndex)}
                >
                  <img 
                    src={URL.createObjectURL(image.originalFile)} 
                    alt={`Thumbnail ${originalIndex}`}
                    className="w-full h-20 object-cover"
                  />
                  {image.isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="h-5 w-5 text-white animate-spin" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
