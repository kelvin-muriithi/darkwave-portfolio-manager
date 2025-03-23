
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMockBlogPosts } from '@/services/api';
import { BlogPost } from '@/models/types';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogModal from './BlogModal';

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getMockBlogPosts
  });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  
  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Latest Blog</h2>
          <div className="w-24 h-1 bg-neon-purple mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Insights, tutorials, and thoughts on design, development, and technology.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>Error loading blog posts</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onClick={() => handlePostClick(post)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available</p>
          </div>
        )}
        
        <div className="text-center mt-12 reveal">
          <Button asChild variant="outline">
            <a href="#" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
      
      <BlogModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  );
};

const BlogCard = ({ 
  post, 
  onClick 
}: { 
  post: BlogPost; 
  onClick: () => void;
}) => (
  <div 
    className="blog-card cursor-pointer reveal h-full flex flex-col"
    onClick={onClick}
  >
    <div className="h-48 overflow-hidden">
      <img 
        src={post.mediaUrl} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <Calendar size={14} className="mr-2" />
        <span>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
      
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
        {post.summary}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {post.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <button className="mt-4 text-sm font-medium text-neon-purple flex items-center group">
        Read more
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

export default BlogSection;
