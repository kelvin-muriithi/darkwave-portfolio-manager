
// This file now only contains mock functionality using localStorage
import { Project, BlogPost, ContactMessage } from '@/models/types';

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

// Initialize storage with mock data if needed
export const initializeDatabase = async () => {
  try {
    console.log('Initializing local storage for data...');
    
    if (!isLocalStorageAvailable()) {
      console.error('LocalStorage is not available in this environment');
      return;
    }
    
    // Initialize localStorage with empty arrays if they don't exist
    if (!localStorage.getItem('mock_messages')) {
      localStorage.setItem('mock_messages', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('mock_projects')) {
      localStorage.setItem('mock_projects', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('mock_blog_posts')) {
      localStorage.setItem('mock_blog_posts', JSON.stringify([]));
    }
    
    console.log('LocalStorage initialized for data storage');
    
    // Import mock data if needed
    const { mockProjects, mockBlogPosts, mockMessages } = await import('./mockData');
  } catch (error) {
    console.error('Error initializing local storage:', error);
  }
};

// Fallback file upload - returns placeholder images
export const fallbackUploadFile = (file: File): string => {
  // Return a placeholder image URL based on file type
  if (file.type.startsWith('image/')) {
    const placeholders = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'https://images.unsplash.com/photo-1518770660439-4636190af475',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }
  return 'https://via.placeholder.com/300';
};

// File upload function using only fallback
export const uploadFileToStorage = async (file: File): Promise<string | null> => {
  console.log('Using fallback upload for: ', file.name);
  return fallbackUploadFile(file);
};

// Initialize local storage when this module loads
initializeDatabase();
