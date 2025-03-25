
import { uploadFileToStorage } from './supabaseClient';

// File Upload API
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const fileUrl = await uploadFileToStorage(file);
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null) as string[];
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    return [];
  }
};
