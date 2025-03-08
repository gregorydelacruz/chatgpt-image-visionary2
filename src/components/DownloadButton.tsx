
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Archive } from 'lucide-react';

interface DownloadButtonProps {
  fileName?: string;
  onDownload: () => void;
  isZip?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  fileName, 
  onDownload,
  isZip = false
}) => {
  return (
    <div className="mt-4 animate-fade-in">
      <Button 
        onClick={onDownload}
        className="flex items-center gap-2"
      >
        {isZip ? (
          <Archive className="h-4 w-4" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isZip 
          ? "Download All as ZIP" 
          : `Download as "${fileName}"`}
      </Button>
    </div>
  );
};

export default DownloadButton;
