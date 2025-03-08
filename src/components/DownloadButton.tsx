
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  fileName: string;
  onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileName, onDownload }) => {
  return (
    <div className="mt-4 animate-fade-in">
      <Button 
        onClick={onDownload}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download as "{fileName}"
      </Button>
    </div>
  );
};

export default DownloadButton;
