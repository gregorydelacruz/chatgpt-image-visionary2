
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
import { 
  Tag, Plus, Sparkles, ImageIcon, Check, MessageCircle, 
  ArrowRight, Video, Search, Star, Users, Mail 
} from 'lucide-react';

const Index = () => {
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [email, setEmail] = useState('');
  const [showChat, setShowChat] = useState(false);
  
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log("Subscribed:", email);
    setEmail('');
    // Show a confirmation
    alert("Thanks for subscribing!");
  };

  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-background via-background to-muted/30">
      <Header className="w-full max-w-7xl mx-auto" />
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Intelligent Image Processing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Transform Your Images With AI Power
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Upload your images and let our intelligent system categorize and process them automatically. Save time and organize better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ImageIcon className="mr-2 h-5 w-5" /> Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('feature-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="glass p-3 md:p-5 rounded-xl shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Vision App Interface" 
                className="rounded-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="w-full bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Trusted by Users Worldwide</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">15k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-purple-600">1M+</div>
              <div className="text-sm text-muted-foreground">Images Processed</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-sm text-muted-foreground">4.9/5 Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features/Benefits */}
      <section id="feature-section" className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features, Real Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Our intelligent image processing solution addresses your key challenges</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Categorization</h3>
            <p className="text-muted-foreground">Stop manually sorting files. Our AI automatically categorizes your images based on content.</p>
          </div>
          
          <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Categories</h3>
            <p className="text-muted-foreground">Create your own categories tailored to your specific needs and workflow.</p>
          </div>
          
          <div className="glass p-6 rounded-xl hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
            <p className="text-muted-foreground">Process multiple images at once and download them all with a single click.</p>
          </div>
        </div>
      </section>
      
      {/* Product Demo/Upload Section */}
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
      
      {/* Contact Form Section */}
      <section className="w-full bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">Join our newsletter to receive tips, updates and special offers.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="h-12" 
                    required
                  />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </form>
            
            <div className="mt-8 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-sm">Receive monthly newsletter with product updates</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-sm">Get exclusive access to new features</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-sm">Priority customer support</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 glass p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Need Help?</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageCircle className="h-4 w-4" />
                Chat with us
              </Button>
            </div>
            
            {showChat ? (
              <div className="bg-background rounded-lg p-4 h-64 flex flex-col">
                <div className="flex-1 overflow-auto mb-4 p-2">
                  <div className="p-3 bg-muted rounded-lg mb-2 max-w-[80%]">
                    <p className="text-sm">Hi there! How can we help you today?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="sm">Send</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">We're here to help with any questions about our image processing service.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">support@vision-app.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Live chat: 9am-5pm EST</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Image Workflow?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have simplified their image management process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsApiKeyDialogOpen(true)}
            >
              Configure API Key <Search className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
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
