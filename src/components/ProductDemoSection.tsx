
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';
import ImageGallery from '@/components/ImageGallery';
import ResultDisplay from '@/components/ResultDisplay';
import CategorySelector from '@/components/CategorySelector';
import { ProcessedImage } from '@/types/image';

interface ProductDemoSectionProps {
  images: ProcessedImage[];
  selectedImageIndex: number | null;
  isProcessing: boolean;
  setSelectedImageIndex: (index: number) => void;
  handleImagesSelected: (files: File[]) => void;
  downloadAllAsZip: () => void;
  downloadRenamedImage: (index: number) => void;
  setImageCategory: (index: number, category: string) => void;
  addCategory: (category: string) => void;
  categories: string[];
  predefinedCategories: string[];
}

const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({
  images,
  selectedImageIndex,
  isProcessing,
  setSelectedImageIndex,
  handleImagesSelected,
  downloadAllAsZip,
  downloadRenamedImage,
  setImageCategory,
  addCategory,
  categories,
  predefinedCategories
}) => {
  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <section id="upload-section" className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Try our image processing tool right now</p>
      </div>
      
      <div className="relative w-full my-8 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <ImageUploader 
            onImageSelected={handleImagesSelected} 
            isProcessing={isProcessing} 
          />
        </div>
        
        <div className={cn(
          "w-full transition-opacity duration-500",
          images.length > 0 ? "opacity-100" : "opacity-0"
        )}>
          {images.length > 0 && (
            <div className="mt-8 flex justify-center animate-fade-in">
              <DownloadButton
                isZip={true}
                onDownload={downloadAllAsZip}
              />
            </div>
          )}
        </div>
        
        {images.length > 0 && (
          <div className="w-full mt-10 glass p-6 rounded-xl shadow-sm animate-slide-up">
            <ImageGallery
              images={images}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>
        )}
        
        {currentImage && (
          <div className="w-full mt-8 flex flex-col md:flex-row gap-6 animate-fade-in">
            <div className="w-full md:w-1/2 glass p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Image Category</h3>
              </div>
              <CategorySelector
                categories={categories}
                currentCategory={currentImage.category}
                onChange={(category) => setImageCategory(selectedImageIndex!, category)}
                onAddCategory={addCategory}
                disabled={isProcessing}
                predefinedCategories={predefinedCategories}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <ResultDisplay 
                isVisible={currentImage.isCompleted} 
                isLoading={currentImage.isProcessing} 
                results={currentImage.results} 
              />
              
              {currentImage.renamedFile && currentImage.isCompleted && (
                <div className="mt-4 flex justify-center">
                  <DownloadButton
                    fileName={currentImage.renamedFile.name}
                    onDownload={() => downloadRenamedImage(selectedImageIndex!)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDemoSection;
