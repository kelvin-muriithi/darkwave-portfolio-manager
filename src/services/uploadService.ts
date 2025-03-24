
// Base URL for API calls - adjust as needed
const API_URL = "/api";

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "dz7jnudle";
const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Using default unsigned upload preset

// File Upload API
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Failed to upload file to Cloudinary');
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null) as string[];
  } catch (error) {
    console.error('Error uploading multiple files to Cloudinary:', error);
    return [];
  }
};
