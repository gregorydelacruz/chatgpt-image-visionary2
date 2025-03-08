
import React, { useState, useEffect } from 'react';
import { useImageProcessing } from '@/hooks/useImageProcessing';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import ResultDisplay from '@/components/ResultDisplay';
import ApiKeyButton from '@/components/ApiKeyButton';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import ImageGallery from '@/components/ImageGallery';
import DownloadButton from '@/components/DownloadButton';
import CategorySelector from '@/components/CategorySelector';
import Footer from '@/components/Footer';
import { isApiKeySet } from '@/lib/imageRecognition';

const Index = () => {
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  
  const {
    isProcessing,
    images,
    selectedImageIndex,
    categories,
    setSelectedImageIndex,
    processImages,
    downloadRenamedImage,
    setImageCategory,
    addCategory,
    downloadAllAsZip
  } = useImageProcessing();
  
  // Check if API key is set on component mount
  useEffect(() => {
    setIsApiKeyConfigured(isApiKeySet());
  }, []);
  
  const handleImagesSelected = async (files: File[]) => {
    if (!isApiKeyConfigured) {
      setIsApiKeyDialogOpen(true);
      return;
    }
    
    await processImages(files);
  };

  // Get the current selected image for display
  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Main content container */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <Header />
        
        <div className="flex items-center justify-center mb-4 gap-2">
          <ApiKeyButton 
            isConfigured={isApiKeyConfigured} 
            onClick={() => setIsApiKeyDialogOpen(true)} 
          />
        </div>
        
        <div className="relative w-full my-8 flex flex-col items-center">
          <ImageUploader 
            onImageSelected={handleImagesSelected} 
            isProcessing={isProcessing} 
          />
          
          <div className={cn(
            "w-full transition-opacity duration-300",
            images.length > 0 ? "opacity-100" : "opacity-0"
          )}>
            {images.length > 0 && (
              <div className="mt-6 flex justify-center">
                <DownloadButton
                  isZip={true}
                  onDownload={downloadAllAsZip}
                />
              </div>
            )}
          </div>
          
          <ImageGallery
            images={images}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />
          
          {currentImage && (
            <>
              <div className="w-full max-w-md mt-6">
                <CategorySelector
                  categories={categories}
                  currentCategory={currentImage.category}
                  onChange={(category) => setImageCategory(selectedImageIndex!, category)}
                  onAddCategory={addCategory}
                  disabled={isProcessing}
                />
              </div>
              
              <ResultDisplay 
                isVisible={currentImage.isCompleted} 
                isLoading={currentImage.isProcessing} 
                results={currentImage.results} 
              />
              
              {currentImage.renamedFile && currentImage.isCompleted && (
                <DownloadButton
                  fileName={currentImage.renamedFile.name}
                  onDownload={() => downloadRenamedImage(selectedImageIndex!)}
                />
              )}
            </>
          )}
        </div>
        
        <Footer />
      </div>
      
      <ApiKeyDialog
        isOpen={isApiKeyDialogOpen}
        onOpenChange={setIsApiKeyDialogOpen}
        onApiKeyStatusChange={setIsApiKeyConfigured}
      />
    </div>
  );
};

export default Index;
