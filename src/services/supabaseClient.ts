
import { createClient } from '@supabase/supabase-js';
import { Project, BlogPost, ContactMessage } from '@/models/types';

// Supabase configuration - using public keys
const supabaseUrl = 'https://wtvgfiwguznyjgmhgcwb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmdmaXdndXpueWpnbWhnY3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTg5NTcsImV4cCI6MjA1ODQ3NDk1N30.BD1gpduPakeZVBkmAEcmC-k-ylE1eUhW634hLG06aIQ';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check and initialize database tables if they don't exist
export const initializeDatabase = async () => {
  try {
    console.log('Initializing database with sample data...');
    
    // Create tables if they don't exist - using direct SQL via RPC
    const { error: projectsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'projects',
      columns: 'id text primary key, title text, short_description text, detailed_description text, media_urls jsonb, date timestamptz, tags jsonb'
    });
    
    const { error: postsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'blog_posts',
      columns: 'id text primary key, title text, summary text, content text, media_url text, date timestamptz, tags jsonb'
    });
    
    const { error: messagesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'messages',
      columns: 'id text primary key, name text, email text, subject text, message text, date timestamptz, read boolean'
    });
    
    // Handle any table creation errors
    if (projectsError || postsError || messagesError) {
      console.error('Error creating tables:', { projectsError, postsError, messagesError });
      
      // Fallback to check if tables exist even if RPC fails
      const { data: projects } = await supabase.from('projects').select('*').limit(1);
      
      if (!projects || projects.length === 0) {
        // Import mock data
        const { mockProjects, mockBlogPosts, mockMessages } = await import('./mockData');
        
        // Insert projects
        await supabase.from('projects').insert(mockProjects.map(project => ({
          ...project,
          short_description: project.shortDescription,
          detailed_description: project.detailedDescription,
          media_urls: project.mediaUrls
        })));
        
        // Insert blog posts
        await supabase.from('blog_posts').insert(mockBlogPosts);
        
        // Insert messages
        await supabase.from('messages').insert(mockMessages);
      }
    } else {
      // Check if data needs to be initialized
      const { data: projects } = await supabase.from('projects').select('*').limit(1);
      
      if (!projects || projects.length === 0) {
        // Import mock data
        const { mockProjects, mockBlogPosts, mockMessages } = await import('./mockData');
        
        // Insert projects
        await supabase.from('projects').insert(mockProjects.map(project => ({
          ...project,
          short_description: project.shortDescription,
          detailed_description: project.detailedDescription,
          media_urls: project.mediaUrls
        })));
        
        // Insert blog posts
        await supabase.from('blog_posts').insert(mockBlogPosts);
        
        // Insert messages
        await supabase.from('messages').insert(mockMessages);
      }
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Storage bucket operations
export const createStorageBucketIfNotExists = async () => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketName = 'media';
    
    if (!buckets || !buckets.find(b => b.name === bucketName)) {
      // Create bucket
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true // Make bucket public
      });
      
      if (error) {
        console.error('Error creating storage bucket:', error);
      } else {
        console.log('Storage bucket created successfully');
      }
    } else {
      console.log('Storage bucket already exists');
    }
  } catch (error) {
    console.error('Error checking/creating storage bucket:', error);
  }
};

// File upload function
export const uploadFileToStorage = async (file: File): Promise<string | null> => {
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
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    
    console.log(`File uploaded successfully. Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to Supabase Storage:', error);
    return null;
  }
};
