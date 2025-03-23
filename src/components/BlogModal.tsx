
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlogPost } from '@/models/types';
import { X, Calendar } from 'lucide-react';

type BlogModalProps = {
  post: BlogPost | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const BlogModal = ({ post, isOpen, onOpenChange }: BlogModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw] bg-black/95 border border-white/10 p-0">
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <DialogTitle className="text-xl font-bold">{post.title}</DialogTitle>
          <button 
            onClick={() => onOpenChange(false)} 
            className="rounded-full p-2 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <ScrollArea className="h-[calc(90vh-72px)]">
          <div className="p-6">
            {/* Featured image */}
            <div className="rounded-lg overflow-hidden mb-8 border border-white/10">
              <img 
                src={post.mediaUrl} 
                alt={post.title} 
                className="w-full h-auto max-h-[50vh] object-cover"
              />
            </div>
            
            {/* Post header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar size={16} className="mr-2" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-lg font-medium">{post.summary}</p>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Post content */}
            <div className="border-t border-white/10 pt-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
