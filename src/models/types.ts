export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  mediaUrls: string[];
  date: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  mediaUrl: string;
  date: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  icon?: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  date: string;
}

// Contact message type
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
