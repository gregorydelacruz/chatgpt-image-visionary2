
import { useToast } from "@/hooks/use-toast";
import JSZip from 'jszip';
import { ProcessedImage } from '@/types/image';

export const useImageDownloader = (images: ProcessedImage[]) => {
  const { toast } = useToast();

  const downloadRenamedImage = (index: number) => {
    const image = images[index];
    if (!image || !image.renamedFile) return;
    
    // Create a temporary URL for the file
    const url = URL.createObjectURL(image.renamedFile);
    
    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = image.renamedFile.name;
    document.body.appendChild(a);
    
    // Trigger the download
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: `Downloading "${image.renamedFile.name}"`,
    });
  };

  const downloadAllAsZip = async () => {
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "No images to download",
        description: "Please upload and process images first.",
      });
      return;
    }

    try {
      const zip = new JSZip();
      
      // Group images by category
      const categoryFolders: Record<string, JSZip> = {};
      
      for (const image of images) {
        if (!image.renamedFile || !image.isCompleted) continue;
        
        // Get or create the folder for this category
        if (!categoryFolders[image.category]) {
          categoryFolders[image.category] = zip.folder(image.category)!;
        }
        
        // Convert file to blob
        const blob = await image.renamedFile.arrayBuffer();
        
        // Add file to its category folder
        categoryFolders[image.category].file(image.renamedFile.name, blob);
      }
      
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Download the zip file
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "categorized-images.zip";
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Downloading categorized images as zip file.",
      });
    } catch (error) {
      console.error('Error creating zip file:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Failed to create zip file. Please try again.",
      });
    }
  };

  return {
    downloadRenamedImage,
    downloadAllAsZip
  };
};
