
import { BlogPost } from "@/models/types";

// Get all blog posts from localStorage
const getLocalBlogPosts = (): BlogPost[] => {
  try {
    const posts = localStorage.getItem('mock_blog_posts');
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error parsing local blog posts:', error);
    return [];
  }
};

// Save blog posts to localStorage
const saveLocalBlogPosts = (posts: BlogPost[]): void => {
  try {
    localStorage.setItem('mock_blog_posts', JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving local blog posts:', error);
  }
};

// Blog Posts API
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  console.log('Fetching blog posts from localStorage');
  return getLocalBlogPosts();
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const posts = getLocalBlogPosts();
  return posts.find(post => post.id === id) || null;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
  try {
    const newPost = {
      ...post,
      id: Date.now().toString()
    };
    
    const posts = getLocalBlogPosts();
    const updatedPosts = [newPost, ...posts];
    saveLocalBlogPosts(updatedPosts);
    
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const posts = getLocalBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedPost = { ...posts[index], ...post };
    posts[index] = updatedPost;
    saveLocalBlogPosts(posts);
    
    return updatedPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const posts = getLocalBlogPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    saveLocalBlogPosts(updatedPosts);
    
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockBlogPosts = getBlogPosts;
export const getMockBlogPostById = getBlogPostById;
