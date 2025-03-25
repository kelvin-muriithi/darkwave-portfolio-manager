
import { uploadFileToStorage, fallbackUploadFile } from './supabaseClient';
import { toast } from '@/hooks/use-toast';

// File Upload API
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    console.log('Starting file upload to Supabase Storage:', file.name);
    // First, try to upload to Supabase
    const fileUrl = await uploadFileToStorage(file);
    
    if (fileUrl) {
      console.log('Upload complete. URL:', fileUrl);
      return fileUrl;
    } else {
      // If Supabase upload fails, use the fallback
      console.log('Supabase upload failed, using fallback...');
      const fallbackUrl = fallbackUploadFile(file);
      console.log('Using fallback URL:', fallbackUrl);
      toast({
        title: "Using placeholder image",
        description: "Couldn't upload to Supabase storage, using a placeholder image instead.",
        variant: "default"
      });
      return fallbackUrl;
    }
  } catch (error) {
    console.error('Error in uploadFile service:', error);
    // Use fallback on error
    console.log('Error occurred, using fallback...');
    const fallbackUrl = fallbackUploadFile(file);
    console.log('Using fallback URL:', fallbackUrl);
    toast({
      title: "Using placeholder image",
      description: "Couldn't upload to Supabase storage, using a placeholder image instead.",
      variant: "default" 
    });
    return fallbackUrl;
  }
};

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  try {
    console.log(`Uploading ${files.length} files to Supabase Storage`);
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(url => url !== null) as string[];
    console.log(`Successfully uploaded ${successfulUploads.length} of ${files.length} files`);
    return successfulUploads;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    // Use fallback images instead
    const fallbackUrls = files.map(file => fallbackUploadFile(file));
    toast({
      title: "Using placeholder images",
      description: "Couldn't upload to Supabase storage, using placeholder images instead.",
      variant: "default"
    });
    return fallbackUrls;
  }
};
