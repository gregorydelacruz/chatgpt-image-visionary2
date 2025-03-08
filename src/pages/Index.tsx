
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Plus } from 'lucide-react';

const Index = () => {
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  
  const {
    isProcessing,
    images,
    selectedImageIndex,
    categories,
    predefinedCategories,
    setSelectedImageIndex,
    processImages,
    downloadRenamedImage,
    setImageCategory,
    addCategory,
    addPredefinedCategories,
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

  const handleAddPredefinedCategory = () => {
    if (newCategoryInput.trim()) {
      addPredefinedCategories([newCategoryInput.trim()]);
      setNewCategoryInput('');
    }
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
        
        <div className="w-full mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Add your own custom categories</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              placeholder="Add a predefined category"
              className="flex-1"
            />
            <Button 
              onClick={handleAddPredefinedCategory}
              disabled={!newCategoryInput.trim()}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
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
                  predefinedCategories={predefinedCategories}
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
