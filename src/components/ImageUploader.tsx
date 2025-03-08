
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelected: (files: File[]) => void;
  isProcessing: boolean;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  isProcessing,
  className 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState<{file: File, preview: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    // Filter for only image files
    const imageFiles = files.filter(file => file.type.match('image.*'));
    
    if (imageFiles.length === 0) {
      alert('Please select image files only');
      return;
    }
    
    // Create previews for all images
    const newPreviews = imageFiles.map(file => {
      // Create preview
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });
    
    // Add to existing previews
    setPreviewImages(prev => [...prev, ...newPreviews]);
    
    // Send to parent
    onImageSelected(imageFiles);
  };

  const clearImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index].preview);
    
    // Remove the image at the specified index
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    // Release all object URLs
    previewImages.forEach(item => URL.revokeObjectURL(item.preview));
    
    // Clear all previews
    setPreviewImages([]);
    
    // Reset file input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto transition-all duration-300 animate-scale-up",
        className
      )}
    >
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed p-6 transition-all",
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-200",
          previewImages.length > 0 ? "glass border-none" : "",
          isProcessing ? "opacity-70 pointer-events-none" : "hover:border-blue-300 hover:bg-blue-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => previewImages.length === 0 && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isProcessing}
          multiple
        />
        
        {previewImages.length > 0 ? (
          <div className="relative">
            {previewImages.length > 1 && (
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-0 left-0 z-10 m-2" 
                onClick={clearAllImages}
                disabled={isProcessing}
              >
                Clear All
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {previewImages.map((item, index) => (
                <div key={index} className="relative">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute top-0 right-0 z-10 m-1 rounded-full" 
                    onClick={(e) => clearImage(index, e)}
                    disabled={isProcessing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img 
                    src={item.preview} 
                    alt={`Preview ${index + 1}`} 
                    className={cn(
                      "w-full h-32 object-cover rounded-lg transition-opacity duration-300",
                      isProcessing ? "opacity-50" : "opacity-100"
                    )} 
                  />
                  <p className="mt-1 text-xs text-center text-muted-foreground truncate">
                    {item.file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <ImagePlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-1 text-base font-semibold">Upload images</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
            <Button variant="outline" className="group">
              <Upload className="mr-2 h-4 w-4 group-hover:text-blue-500" /> Select Images
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
