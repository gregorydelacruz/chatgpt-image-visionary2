
/**
 * Creates a renamed file based on recognition results
 */
export const createRenamedFile = (originalFile: File, topLabel: string): File => {
  const fileExt = originalFile.name.split('.').pop();
  
  // Add a timestamp to ensure uniqueness between similar images
  const timestamp = new Date().getTime();
  const uniqueSuffix = timestamp.toString().slice(-6);
  
  // Clean up the label and create a more descriptive filename
  const cleanedLabel = topLabel.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-');   // Replace spaces with hyphens
  
  const newFileName = `${cleanedLabel}-${uniqueSuffix}.${fileExt}`;
  
  // Create a new file with the renamed filename
  const renamedBlob = originalFile.slice(0, originalFile.size, originalFile.type);
  return new File([renamedBlob], newFileName, { type: originalFile.type });
};
