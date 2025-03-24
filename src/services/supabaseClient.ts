
import { createClient } from '@supabase/supabase-js';
import { Project, BlogPost, ContactMessage } from '@/models/types';

// Supabase configuration - using public keys
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://supabase-demo.lovable.dev';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check and initialize database tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // We'll use a single call to check if our mock data should be initialized
    const { data: projects } = await supabase.from('projects').select('*').limit(1);
    
    if (!projects || projects.length === 0) {
      console.log('Initializing database with sample data...');
      
      // Import mock data
      const { mockProjects, mockBlogPosts, mockMessages } = await import('./mockData');
      
      // Insert projects
      await supabase.from('projects').insert(mockProjects);
      
      // Insert blog posts
      await supabase.from('blog_posts').insert(mockBlogPosts);
      
      // Insert messages
      await supabase.from('messages').insert(mockMessages);
      
      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
