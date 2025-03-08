
import React from 'react';
import { Button } from "@/components/ui/button";
import { Key } from 'lucide-react';

interface ApiKeyButtonProps {
  isConfigured: boolean;
  onClick: () => void;
}

const ApiKeyButton: React.FC<ApiKeyButtonProps> = ({ isConfigured, onClick }) => {
  return isConfigured ? (
    <Button 
      variant="outline" 
      size="sm"
      className="flex items-center gap-2"
      onClick={onClick}
    >
      <Key className="h-4 w-4" />
      Change API Key
    </Button>
  ) : (
    <Button 
      variant="default" 
      size="sm"
      className="flex items-center gap-2"
      onClick={onClick}
    >
      <Key className="h-4 w-4" />
      Set OpenAI API Key
    </Button>
  );
};

export default ApiKeyButton;
