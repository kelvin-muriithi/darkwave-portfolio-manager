
import { BlogPost } from "@/models/types";
import { supabase } from "./supabaseClient";

// Blog Posts API
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
  try {
    const newPost = {
      ...post,
      id: Date.now().toString()
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(newPost)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockBlogPosts = getBlogPosts;
export const getMockBlogPostById = getBlogPostById;
