
import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadFile, uploadMultipleFiles } from '@/services/api';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileUpload: (urls: string[]) => void;
  multiple?: boolean;
  className?: string;
  existingUrls?: string[];
}

const FileUploader = ({ 
  onFileUpload, 
  multiple = false, 
  className,
  existingUrls = []
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(existingUrls);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = multiple 
        ? Array.from(e.dataTransfer.files)
        : [e.dataTransfer.files[0]];
      
      handleFiles(newFiles);
    }
  }, [multiple]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = multiple 
        ? Array.from(e.target.files)
        : [e.target.files[0]];
      
      handleFiles(newFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Create previews for the files
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => 
      i !== index + (prevPreviews.length - files.length - existingUrls.length)
    ));
  };

  const removeExistingFile = (index: number) => {
    const updatedUrls = [...existingUrls];
    updatedUrls.splice(index, 1);
    setPreviews(prev => {
      const updatedPreviews = [...prev];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
    onFileUpload(updatedUrls);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      let uploadedUrls;
      
      if (multiple) {
        uploadedUrls = await uploadMultipleFiles(files);
      } else {
        const url = await uploadFile(files[0]);
        uploadedUrls = url ? [url] : [];
      }
      
      if (uploadedUrls.length > 0) {
        // Combine existing URLs with newly uploaded ones
        const allUrls = [...existingUrls, ...uploadedUrls];
        onFileUpload(allUrls);
        toast({
          title: 'Files uploaded successfully',
          description: `${uploadedUrls.length} file(s) uploaded to Cloudinary.`,
        });
      } else {
        toast({
          title: 'Upload failed',
          description: 'Failed to upload one or more files.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: 'Upload error',
        description: 'An error occurred while uploading files.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setFiles([]);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* File drop area */}
      <div
        className={cn(
          "file-drop-area flex flex-col items-center justify-center",
          dragActive && "border-primary bg-primary/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          accept="image/*,video/*,application/pdf"
        />
        
        <Upload className="text-muted-foreground mb-2" size={28} />
        <p className="font-medium">Drag & drop {multiple ? 'files' : 'a file'} here</p>
        <p className="text-muted-foreground text-sm mb-4">
          or
        </p>
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md transition-colors"
        >
          Browse Files
        </label>
        <p className="text-muted-foreground text-xs mt-4">
          Supported formats: Images, Videos, PDFs
        </p>
      </div>
      
      {/* File previews */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Selected files ({previews.length})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => {
              const isExistingFile = index < existingUrls.length;
              const fileExtension = isExistingFile 
                ? existingUrls[index].split('.').pop()?.toLowerCase() 
                : '';
              const isPdf = fileExtension === 'pdf';
              
              return (
                <div key={index} className="image-preview">
                  {isPdf ? (
                    <div className="bg-secondary/40 h-24 flex items-center justify-center rounded-lg">
                      <span className="text-xs text-center">PDF Document</span>
                    </div>
                  ) : (
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={isExistingFile ? () => removeExistingFile(index) : () => removeFile(index - existingUrls.length)}
                    className="remove-button"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Upload button */}
      {files.length > 0 && (
        <Button 
          onClick={handleUpload} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
