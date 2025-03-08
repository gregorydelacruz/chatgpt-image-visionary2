
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ProcessedImage } from '@/hooks/useImageProcessing';

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

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold mb-4">Processed Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={cn(
              "relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
              selectedImageIndex === index ? "border-blue-500" : "border-transparent",
              "hover:border-blue-300"
            )}
            onClick={() => onImageSelect(index)}
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
  );
};

export default ImageGallery;
