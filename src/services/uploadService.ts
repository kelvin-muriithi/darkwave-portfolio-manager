
import { fallbackUploadFile } from './supabaseClient';

// File upload service - now just uses the fallback method
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    console.log(`Uploading file ${file.name}...`);
    return fallbackUploadFile(file);
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Batch upload multiple files
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  } catch (error) {
    console.error('Error uploading files:', error);
    return [];
  }
};
