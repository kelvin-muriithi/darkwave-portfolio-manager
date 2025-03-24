
import { BlogPost } from "@/models/types";
import { mockBlogPosts } from "./mockData";

// Blog Posts API
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // For now using mock data until backend is connected
    return getMockBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    // For now using mock data until backend is connected
    return getMockBlogPostById(id);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
  try {
    // Create a new blog post with a unique ID
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    };
    
    // Add to mock data
    mockBlogPosts.push(newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    // Find post index
    const index = mockBlogPosts.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Update post
    mockBlogPosts[index] = { ...mockBlogPosts[index], ...post };
    return mockBlogPosts[index];
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    // Find post index
    const initialLength = mockBlogPosts.length;
    mockBlogPosts = mockBlogPosts.filter(post => post.id !== id);
    
    // Return true if a post was removed
    return mockBlogPosts.length < initialLength;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// Mock API implementations
export const getMockBlogPosts = (): Promise<BlogPost[]> => {
  return Promise.resolve([...mockBlogPosts]);
};

export const getMockBlogPostById = (id: string): Promise<BlogPost | null> => {
  const post = mockBlogPosts.find(p => p.id === id);
  return Promise.resolve(post ? {...post} : null);
};
