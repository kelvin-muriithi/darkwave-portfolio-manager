
import { uploadFileToStorage } from './supabaseClient';

// File Upload API
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    console.log('Starting file upload to Supabase Storage:', file.name);
    const fileUrl = await uploadFileToStorage(file);
    console.log('Upload complete. URL:', fileUrl);
    return fileUrl;
  } catch (error) {
    console.error('Error in uploadFile service:', error);
    return null;
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
    return [];
  }
};
