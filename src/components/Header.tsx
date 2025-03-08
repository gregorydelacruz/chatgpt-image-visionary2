
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Edit2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { toast } = useToast();
  const [appName, setAppName] = useState<string>("Vision");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(appName);

  const handleRename = () => {
    if (tempName.trim()) {
      setAppName(tempName);
      setIsEditing(false);
      toast({
        title: "Name updated",
        description: `Application renamed to "${tempName}"`,
      });
    } else {
      setTempName(appName);
      toast({
        variant: "destructive",
        title: "Invalid name",
        description: "The application name cannot be empty.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setTempName(appName);
      setIsEditing(false);
    }
  };

  return (
    <header className={cn("w-full pt-6 pb-4 px-4 md:px-6", className)}>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          {isEditing ? (
            <div className="flex items-center">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 text-3xl md:text-4xl font-bold px-2 py-1 w-auto min-w-[150px] text-center"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                className="ml-2"
                onClick={() => {
                  setTempName(appName);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="ml-1 bg-blue-500 hover:bg-blue-600"
                onClick={handleRename}
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <Sparkles className="h-6 w-6 text-amber-500" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {appName}
              </h1>
              <Button 
                size="sm" 
                variant="ghost" 
                className="p-1 h-auto opacity-50 hover:opacity-100"
                onClick={() => {
                  setTempName(appName);
                  setIsEditing(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {/* Removed the paragraph with "AI-powered image recognition..." text */}
      </div>
    </header>
  );
};

export default Header;
