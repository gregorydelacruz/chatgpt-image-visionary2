
import React, { useState, useEffect } from 'react';
import { useImageProcessing } from '@/hooks/useImageProcessing';
import { isApiKeySet } from '@/lib/imageRecognition';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApiKeyButton from '@/components/ApiKeyButton';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import ProductDemoSection from '@/components/ProductDemoSection';
import ContactSection from '@/components/ContactSection';
import FaqSection from '@/components/FaqSection';
import ConciergeSection from '@/components/ConciergeSection';
import CtaSection from '@/components/CtaSection';

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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-background via-background to-muted/30">
      <Header className="w-full max-w-7xl mx-auto" />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Social Proof */}
      <SocialProofSection />
      
      {/* Features/Benefits */}
      <FeaturesSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Product Demo/Upload Section */}
      <ProductDemoSection 
        images={images}
        selectedImageIndex={selectedImageIndex}
        isProcessing={isProcessing}
        setSelectedImageIndex={setSelectedImageIndex}
        handleImagesSelected={handleImagesSelected}
        downloadAllAsZip={downloadAllAsZip}
        downloadRenamedImage={downloadRenamedImage}
        setImageCategory={setImageCategory}
        addCategory={addCategory}
        categories={categories}
        predefinedCategories={predefinedCategories}
      />
      
      {/* Concierge Service Section */}
      <ConciergeSection />
      
      {/* FAQ Section */}
      <FaqSection />
      
      {/* Contact Form Section */}
      <ContactSection />
      
      {/* CTA Section */}
      <CtaSection onApiKeyDialogOpen={() => setIsApiKeyDialogOpen(true)} />
      
      <div className="fixed bottom-6 right-6 flex gap-3">
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
        
        <ApiKeyButton 
          isConfigured={isApiKeyConfigured} 
          onClick={() => setIsApiKeyDialogOpen(true)} 
        />
      </div>
      
      <Footer className="mt-10" />
      
      <ApiKeyDialog
        isOpen={isApiKeyDialogOpen}
        onOpenChange={setIsApiKeyDialogOpen}
        onApiKeyStatusChange={setIsApiKeyConfigured}
      />
    </div>
  );
};

export default Index;
