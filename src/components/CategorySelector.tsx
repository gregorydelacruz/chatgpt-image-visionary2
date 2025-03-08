
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Folder, Plus, Check, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CategorySelectorProps {
  categories: string[];
  currentCategory: string;
  onChange: (category: string) => void;
  onAddCategory: (category: string) => void;
  disabled?: boolean;
  predefinedCategories?: string[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  currentCategory,
  onChange,
  onAddCategory,
  disabled = false,
  predefinedCategories = []
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      onChange(newCategory.trim());
      setNewCategory('');
    }
    setIsAddingNew(false);
  };

  // All categories - combination of user-added and predefined
  const allCategories = [...new Set([...categories, ...predefinedCategories])];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Folder className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Category</span>
      </div>
      
      {isAddingNew ? (
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1"
            autoFocus
            disabled={disabled}
          />
          <Button 
            size="sm" 
            onClick={handleAddCategory}
            disabled={!newCategory.trim() || disabled}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => (
            <Button
              key={category}
              size="sm"
              variant={currentCategory === category ? "default" : "outline"}
              onClick={() => onChange(category)}
              disabled={disabled}
              className={cn(
                "transition-all",
                currentCategory === category ? "" : "hover:border-blue-300"
              )}
            >
              {category}
              {predefinedCategories.includes(category) && (
                <Badge variant="secondary" className="ml-1 px-1 py-0">
                  <Tag className="h-3 w-3 mr-1" />
                  preset
                </Badge>
              )}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddingNew(true)}
            disabled={disabled}
            className="border-dashed border-gray-300"
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
