
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
import ThemeToggle from '@/components/ThemeToggle';
import { isApiKeySet } from '@/lib/imageRecognition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Plus, Sparkles, ImageIcon } from 'lucide-react';

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

  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-background to-muted/50">
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-b-3xl -z-10 blur-3xl"></div>
        
        <Header className="animate-slide-down" />
        
        <div className="flex items-center justify-center mb-6 gap-3 animate-fade-in">
          <ApiKeyButton 
            isConfigured={isApiKeyConfigured} 
            onClick={() => setIsApiKeyDialogOpen(true)} 
          />
          <ThemeToggle />
        </div>
        
        <div className="w-full mb-8 glass p-5 rounded-xl animate-scale-up shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Add Your Own Custom Categories</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              placeholder="Add a predefined category"
              className="flex-1 border-blue-200 focus-visible:ring-blue-400"
            />
            <Button 
              onClick={handleAddPredefinedCategory}
              disabled={!newCategoryInput.trim()}
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        
        <div className="relative w-full my-8 flex flex-col items-center">
          <div className="w-full text-center mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-semibold tracking-tight">Image Recognition Made Beautiful</h2>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Upload your images and watch as AI intelligently categorizes and processes them with stunning visual results.
            </p>
          </div>
          
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
        
        <Footer className="mt-10" />
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
