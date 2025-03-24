
import { Project, BlogPost, Testimonial, TimelineEntry, NewsletterSubscription } from "@/models/types";

// Base URL for API calls - adjust as needed
const API_URL = "/api";

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "dz7jnudle";
const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Using default unsigned upload preset

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  try {
    // For now using mock data until backend is connected
    return getMockProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    // For now using mock data until backend is connected
    return getMockProjectById(id);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    // Create a new project with a unique ID
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    
    // Add to mock data
    mockProjects.push(newProject);
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    // Find project index
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Update project
    mockProjects[index] = { ...mockProjects[index], ...project };
    return mockProjects[index];
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    // Find project index
    const initialLength = mockProjects.length;
    mockProjects = mockProjects.filter(project => project.id !== id);
    
    // Return true if a project was removed
    return mockProjects.length < initialLength;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

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

// Mock data
let mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Web App',
    shortDescription: 'A modern e-commerce platform built with React and Node.js',
    detailedDescription: 'This e-commerce platform features a responsive design, user authentication, shopping cart functionality, payment processing, and an admin dashboard. It was built using React for the frontend, Node.js and Express for the backend, and MongoDB for the database.',
    mediaUrls: [
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample2.jpg'
    ],
    date: '2023-06-15',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce']
  },
  {
    id: '2',
    title: 'Portfolio Website Redesign',
    shortDescription: 'A modern portfolio website with animations and a custom CMS',
    detailedDescription: 'I redesigned my portfolio website with a focus on modern design, smooth animations, and a custom content management system. The site features a dark mode, project showcase, blog section, and contact form. It was built using React, Tailwind CSS, and a custom CMS.',
    mediaUrls: [
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample3.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample4.jpg'
    ],
    date: '2023-08-22',
    tags: ['React', 'TailwindCSS', 'CMS', 'Portfolio']
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    shortDescription: 'A secure mobile banking application with biometric authentication',
    detailedDescription: 'This mobile banking app allows users to manage their accounts, transfer money, pay bills, and more. It features biometric authentication, real-time notifications, and a user-friendly interface. It was built using React Native and integrates with a secure banking API.',
    mediaUrls: [
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample5.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample6.jpg'
    ],
    date: '2023-10-10',
    tags: ['React Native', 'Banking', 'Mobile App', 'Security']
  }
];

let mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    summary: 'Exploring the latest trends and technologies in web development',
    content: 'Web development is constantly evolving, with new technologies and trends emerging every year. In this post, I explore the latest trends in web development, including serverless architecture, JAMstack, and the rise of headless CMS solutions. I also discuss how these trends are changing the way we build web applications and what skills developers need to stay competitive in the industry.',
    mediaUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample7.jpg',
    date: '2023-07-18',
    tags: ['Web Development', 'Trends', 'Technology']
  },
  {
    id: '2',
    title: 'Optimizing React Performance',
    summary: 'Tips and techniques for improving React application performance',
    content: 'React is a popular JavaScript library for building user interfaces, but it can suffer from performance issues if not used correctly. In this post, I share practical tips and techniques for optimizing React application performance, including code splitting, memoization, virtualization, and more. These techniques can help you build faster, more responsive React applications that provide a better user experience.',
    mediaUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample8.jpg',
    date: '2023-09-05',
    tags: ['React', 'Performance', 'JavaScript']
  },
  {
    id: '3',
    title: 'Designing for Accessibility',
    summary: 'Best practices for creating accessible web applications',
    content: 'Accessibility is an essential aspect of web development that is often overlooked. In this post, I discuss the importance of designing for accessibility and share best practices for creating web applications that are accessible to all users, including those with disabilities. I cover topics such as semantic HTML, keyboard navigation, screen reader compatibility, and more.',
    mediaUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample9.jpg',
    date: '2023-11-12',
    tags: ['Accessibility', 'Design', 'UX', 'HTML']
  }
];

// Mock API implementations
export const getMockProjects = (): Promise<Project[]> => {
  return Promise.resolve([...mockProjects]);
};

export const getMockProjectById = (id: string): Promise<Project | null> => {
  const project = mockProjects.find(p => p.id === id);
  return Promise.resolve(project ? {...project} : null);
};

export const getMockBlogPosts = (): Promise<BlogPost[]> => {
  return Promise.resolve([...mockBlogPosts]);
};

export const getMockBlogPostById = (id: string): Promise<BlogPost | null> => {
  const post = mockBlogPosts.find(p => p.id === id);
  return Promise.resolve(post ? {...post} : null);
};

// Authentication functions
export const AUTH_TOKEN_KEY = 'portfolio_auth_token';

// Simple authentication check - in a real app, this would validate with a backend
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

// Login function - in a real app, this would validate credentials with a backend
export const login = (username: string, password: string): boolean => {
  // Add your hardcoded credentials here (this is just for demo purposes)
  // In a real application, this should be handled securely on a backend
  if (username === "admin" && password === "password123") {
    localStorage.setItem(AUTH_TOKEN_KEY, 'demo_token');
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
