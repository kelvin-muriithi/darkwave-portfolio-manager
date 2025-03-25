
import { Project, BlogPost, ContactMessage } from "@/models/types";
import { v4 as uuidv4 } from 'uuid';

// Initialize data from localStorage or use default values if not present
const getInitialMockProjects = (): Project[] => {
  const storedProjects = localStorage.getItem('mockProjects');
  if (storedProjects) {
    try {
      return JSON.parse(storedProjects);
    } catch (e) {
      console.error('Error parsing stored projects:', e);
    }
  }
  
  // Default mock projects data
  return [
    {
      id: uuidv4(),
      title: 'E-Commerce Web App',
      shortDescription: 'A modern e-commerce platform built with React and Node.js',
      detailedDescription: 'This e-commerce platform features a responsive design, user authentication, shopping cart functionality, payment processing, and an admin dashboard. It was built using React for the frontend, Node.js and Express for the backend, and MongoDB for the database.',
      mediaUrls: [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
      ],
      date: new Date().toISOString(),
      tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce']
    },
    {
      id: uuidv4(),
      title: 'Portfolio Website Redesign',
      shortDescription: 'A modern portfolio website with animations and a custom CMS',
      detailedDescription: 'I redesigned my portfolio website with a focus on modern design, smooth animations, and a custom content management system. The site features a dark mode, project showcase, blog section, and contact form. It was built using React, Tailwind CSS, and a custom CMS.',
      mediaUrls: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
      ],
      date: new Date().toISOString(),
      tags: ['React', 'TailwindCSS', 'CMS', 'Portfolio']
    },
    {
      id: uuidv4(),
      title: 'Mobile Banking App',
      shortDescription: 'A secure mobile banking application with biometric authentication',
      detailedDescription: 'This mobile banking app allows users to manage their accounts, transfer money, pay bills, and more. It features biometric authentication, real-time notifications, and a user-friendly interface. It was built using React Native and integrates with a secure banking API.',
      mediaUrls: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
      ],
      date: new Date().toISOString(),
      tags: ['React Native', 'Banking', 'Mobile App', 'Security']
    }
  ];
};

const getInitialMockBlogPosts = (): BlogPost[] => {
  const storedBlogPosts = localStorage.getItem('mockBlogPosts');
  if (storedBlogPosts) {
    try {
      return JSON.parse(storedBlogPosts);
    } catch (e) {
      console.error('Error parsing stored blog posts:', e);
    }
  }
  
  // Default mock blog posts data
  return [
    {
      id: uuidv4(),
      title: 'The Future of Web Development',
      summary: 'Exploring the latest trends and technologies in web development',
      content: 'Web development is constantly evolving, with new technologies and trends emerging every year. In this post, I explore the latest trends in web development, including serverless architecture, JAMstack, and the rise of headless CMS solutions. I also discuss how these trends are changing the way we build web applications and what skills developers need to stay competitive in the industry.',
      mediaUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      date: new Date().toISOString(),
      tags: ['Web Development', 'Trends', 'Technology']
    },
    {
      id: uuidv4(),
      title: 'Optimizing React Performance',
      summary: 'Tips and techniques for improving React application performance',
      content: 'React is a popular JavaScript library for building user interfaces, but it can suffer from performance issues if not used correctly. In this post, I share practical tips and techniques for optimizing React application performance, including code splitting, memoization, virtualization, and more. These techniques can help you build faster, more responsive React applications that provide a better user experience.',
      mediaUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      date: new Date().toISOString(),
      tags: ['React', 'Performance', 'JavaScript']
    },
    {
      id: uuidv4(),
      title: 'Designing for Accessibility',
      summary: 'Best practices for creating accessible web applications',
      content: 'Accessibility is an essential aspect of web development that is often overlooked. In this post, I discuss the importance of designing for accessibility and share best practices for creating web applications that are accessible to all users, including those with disabilities. I cover topics such as semantic HTML, keyboard navigation, screen reader compatibility, and more.',
      mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      date: new Date().toISOString(),
      tags: ['Accessibility', 'Design', 'UX', 'HTML']
    }
  ];
};

const getInitialMockMessages = (): ContactMessage[] => {
  const storedMessages = localStorage.getItem('mockMessages');
  if (storedMessages) {
    try {
      return JSON.parse(storedMessages);
    } catch (e) {
      console.error('Error parsing stored messages:', e);
    }
  }
  
  // Default mock messages data
  return [
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential web development project for my company. Please contact me when you have a moment.',
      date: new Date().toISOString(),
      read: true
    },
    {
      id: uuidv4(),
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Collaboration Opportunity',
      message: 'Hello, I found your portfolio impressive and would like to discuss a potential collaboration on an upcoming project.',
      date: new Date().toISOString(),
      read: false
    },
    {
      id: uuidv4(),
      name: 'Michael Johnson',
      email: 'michael@example.com',
      subject: 'Website Redesign',
      message: 'Our company is looking to redesign our website and we\'re impressed with your work. Can we schedule a call to discuss details?',
      date: new Date().toISOString(),
      read: false
    }
  ];
};

// Initialize mock data with localStorage or defaults
export let mockProjects: Project[] = getInitialMockProjects();
export let mockBlogPosts: BlogPost[] = getInitialMockBlogPosts();
export let mockMessages: ContactMessage[] = getInitialMockMessages();

// Helper function to update mock projects data
export const updateMockProjects = (updatedProjects: Project[]): void => {
  mockProjects = [...updatedProjects];
  // Persist to localStorage
  localStorage.setItem('mockProjects', JSON.stringify(mockProjects));
};

// Helper function to update mock blog posts data
export const updateMockBlogPosts = (updatedBlogPosts: BlogPost[]): void => {
  mockBlogPosts = [...updatedBlogPosts];
  // Persist to localStorage
  localStorage.setItem('mockBlogPosts', JSON.stringify(mockBlogPosts));
};

// Helper function to update mock messages data
export const updateMockMessages = (updatedMessages: ContactMessage[]): void => {
  mockMessages = [...updatedMessages];
  // Persist to localStorage
  localStorage.setItem('mockMessages', JSON.stringify(mockMessages));
};
