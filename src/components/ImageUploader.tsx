
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  isProcessing,
  className 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Save the current file
    setCurrentFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Send to parent
    onImageSelected(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage(null);
    setCurrentFile(null);
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
          previewImage ? "glass border-none" : "",
          isProcessing ? "opacity-70 pointer-events-none" : "hover:border-blue-300 hover:bg-blue-50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !previewImage && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isProcessing}
        />
        
        {previewImage ? (
          <div className="relative">
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute top-0 right-0 z-10 m-2 rounded-full" 
              onClick={clearImage}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={previewImage} 
              alt="Preview" 
              className={cn(
                "w-full object-contain max-h-72 rounded-lg transition-opacity duration-300",
                isProcessing ? "opacity-50" : "opacity-100"
              )} 
            />
            {currentFile && (
              <p className="mt-2 text-sm text-center text-muted-foreground truncate">
                {currentFile.name}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <ImagePlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-1 text-base font-semibold">Upload an image</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
            <Button variant="outline" className="group">
              <Upload className="mr-2 h-4 w-4 group-hover:text-blue-500" /> Select Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
