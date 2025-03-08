
import { useImageProcessor } from './useImageProcessor';
import { useCategoryManager } from './useCategoryManager';
import { useImageDownloader } from './useImageDownloader';
import { ProcessedImage, RecognitionResult } from '@/types/image';

export type { ProcessedImage, RecognitionResult };
export { useImageProcessor };

export const useImageProcessing = () => {
  const {
    isProcessing,
    images,
    selectedImageIndex,
    setSelectedImageIndex,
    processImages,
    setImages
  } = useImageProcessor();

  const {
    categories,
    predefinedCategories,
    setImageCategory,
    addCategory,
    addPredefinedCategories
  } = useCategoryManager(images, setImages);

  const {
    downloadRenamedImage,
    downloadAllAsZip
  } = useImageDownloader(images);

  return {
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
  };
};
