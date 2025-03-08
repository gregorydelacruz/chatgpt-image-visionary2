
export interface RecognitionResult {
  label: string;
  confidence: number;
}

export interface ProcessedImage {
  originalFile: File;
  renamedFile: File | null;
  results: RecognitionResult[];
  isProcessing: boolean;
  isCompleted: boolean;
  category: string;
}
