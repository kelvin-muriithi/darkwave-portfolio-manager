
import { Project, BlogPost } from "@/models/types";

// Mock projects data
export let mockProjects: Project[] = [
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

// Mock blog posts data
export let mockBlogPosts: BlogPost[] = [
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
