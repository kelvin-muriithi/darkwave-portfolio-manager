
import { createClient } from '@supabase/supabase-js';
import { Project, BlogPost, ContactMessage } from '@/models/types';

// Supabase configuration - using public keys
const supabaseUrl = 'https://wtvgfiwguznyjgmhgcwb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmdmaXdndXpueWpnbWhnY3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTg5NTcsImV4cCI6MjA1ODQ3NDk1N30.BD1gpduPakeZVBkmAEcmC-k-ylE1eUhW634hLG06aIQ';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is available and set flag
let isSupabaseAvailable = false;

export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('messages').select('count').limit(1);
    isSupabaseAvailable = !error;
    console.log('Supabase connection check:', isSupabaseAvailable ? 'Connected' : 'Not connected');
    return isSupabaseAvailable;
  } catch (error) {
    console.error('Supabase connection error:', error);
    isSupabaseAvailable = false;
    return false;
  }
};

// Expose connection status check
export const isSupabaseConnected = () => isSupabaseAvailable;

// Initialize database with mock data if needed
export const initializeDatabase = async () => {
  try {
    console.log('Initializing database with sample data...');
    
    // Check connection first
    await checkSupabaseConnection();
    
    if (!isSupabaseAvailable) {
      console.log('Supabase not available, will use localStorage for data storage');
      
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
      return;
    }
    
    // If Supabase is available, check tables
    const { data: projectsCheck, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (projectsError) {
      console.log('Projects table query failed, will use mock data:', projectsError.message);
    }
    
    // Try to query blog posts table
    const { data: postsCheck, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (postsError) {
      console.log('Blog posts table query failed, will use mock data:', postsError.message);
    }
    
    // Try to query messages table
    const { data: messagesCheck, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
    
    if (messagesError) {
      console.log('Messages table query failed, will use mock data:', messagesError.message);
    }
    
    // Import mock data
    const { mockProjects, mockBlogPosts, mockMessages } = await import('./mockData');
    
    console.log('Database initialized successfully - using mock data for any missing tables');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Storage bucket operations - only attempt if Supabase is connected
export const createStorageBucketIfNotExists = async () => {
  try {
    console.log('Checking Supabase storage bucket...');
    
    // Check connection first
    if (!await checkSupabaseConnection()) {
      console.log('Supabase not available, skipping bucket creation');
      return;
    }
    
    // Check if we can list buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing storage buckets:', listError);
      console.log('Skipping bucket creation due to permissions error');
      return;
    }
    
    const bucketName = 'media';
    
    if (!buckets || !buckets.find(b => b.name === bucketName)) {
      console.log('Attempting to create storage bucket:', bucketName);
      
      try {
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: true // Make bucket public
        });
        
        if (error) {
          console.error('Error creating storage bucket:', error);
          console.log('Will continue without creating bucket - uploads may fail');
        } else {
          console.log('Storage bucket created successfully');
        }
      } catch (createError) {
        console.error('Exception creating bucket:', createError);
        console.log('Will continue without creating bucket - uploads may fail');
      }
    } else {
      console.log('Storage bucket already exists');
    }
  } catch (error) {
    console.error('Error checking/creating storage bucket:', error);
    console.log('Will continue without bucket check - uploads may fail');
  }
};

// File upload function with fallback
export const uploadFileToStorage = async (file: File): Promise<string | null> => {
  // Check Supabase connection first
  if (!await checkSupabaseConnection()) {
    console.log('Supabase not available, using fallback upload');
    return fallbackUploadFile(file);
  }
  
  try {
    const bucketName = 'media';
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    console.log(`Uploading file ${fileName} to Supabase Storage bucket ${bucketName}...`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        upsert: true
      });
    
    if (error) {
      console.error('Supabase upload error:', error);
      return fallbackUploadFile(file);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    
    console.log(`File uploaded successfully. Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to Supabase Storage:', error);
    return fallbackUploadFile(file);
  }
};

// Fallback file upload - returns placeholder images if Supabase upload fails
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

// Initialize database when this module loads
checkSupabaseConnection();
