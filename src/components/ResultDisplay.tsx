
import React from 'react';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ResultItem {
  label: string;
  confidence: number;
}

interface ResultDisplayProps {
  isVisible: boolean;
  isLoading: boolean;
  results: ResultItem[];
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  isVisible,
  isLoading,
  results,
  className,
}) => {
  if (!isVisible && !isLoading) return null;

  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto mt-6 transition-all duration-500 animate-slide-up",
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10",
        className
      )}
    >
      <Card className="glass overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Layers className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">Recognition Results</h3>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between animate-pulse-light">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <Badge 
                    variant={index === 0 ? "default" : "outline"}
                    className={cn(
                      "font-mono text-xs",
                      index === 0 ? "bg-blue-500 hover:bg-blue-600" : ""
                    )}
                  >
                    {(item.confidence * 100).toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultDisplay;
