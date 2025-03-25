
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlogPost } from '@/models/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import FileUploader from '@/components/FileUploader';
import { createBlogPost, updateBlogPost } from '@/services/blogService';

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBlogPost: BlogPost | null;
}

const BlogFormModal = ({ isOpen, onClose, selectedBlogPost }: BlogFormModalProps) => {
  const queryClient = useQueryClient();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogMediaUrl, setBlogMediaUrl] = useState('');
  
  // Reset form when selected blog post changes
  useEffect(() => {
    if (selectedBlogPost) {
      setBlogTitle(selectedBlogPost.title);
      setBlogSummary(selectedBlogPost.summary);
      setBlogContent(selectedBlogPost.content);
      setBlogTags(selectedBlogPost.tags.join(', '));
      setBlogMediaUrl(selectedBlogPost.mediaUrl);
    } else {
      // Clear form for new blog post
      setBlogTitle('');
      setBlogSummary('');
      setBlogContent('');
      setBlogTags('');
      setBlogMediaUrl('');
    }
  }, [selectedBlogPost]);
  
  const createBlogPostMutation = useMutation({
    mutationFn: (newPost: Omit<BlogPost, 'id'>) => createBlogPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({ title: 'Blog post created successfully' });
      onClose();
    },
    onError: () => {
      toast({ 
        title: 'Failed to create blog post', 
        variant: 'destructive'
      });
    }
  });
  
  const updateBlogPostMutation = useMutation({
    mutationFn: ({ id, post }: { id: string; post: Partial<BlogPost> }) => 
      updateBlogPost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({ title: 'Blog post updated successfully' });
      onClose();
    },
    onError: () => {
      toast({ 
        title: 'Failed to update blog post', 
        variant: 'destructive'
      });
    }
  });
  
  const handleSaveBlogPost = () => {
    const blogData = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      mediaUrl: blogMediaUrl,
      tags: blogTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      date: new Date().toISOString(),
    };
    
    if (selectedBlogPost) {
      updateBlogPostMutation.mutate({ 
        id: selectedBlogPost.id, 
        post: blogData 
      });
    } else {
      createBlogPostMutation.mutate(blogData as Omit<BlogPost, 'id'>);
    }
  };
  
  // Handle file upload for blog post
  const handleBlogFileUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setBlogMediaUrl(urls[0]);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-background">
        <DialogHeader>
          <DialogTitle>
            {selectedBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="blogTitle">Title</Label>
            <Input 
              id="blogTitle" 
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Blog post title"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="blogSummary">Summary</Label>
            <Textarea 
              id="blogSummary" 
              value={blogSummary}
              onChange={(e) => setBlogSummary(e.target.value)}
              placeholder="Brief summary of the post"
              rows={2}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="blogContent">Content</Label>
            <Textarea 
              id="blogContent" 
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              placeholder="Full content of the blog post"
              rows={8}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="blogTags">Tags (comma separated)</Label>
            <Input 
              id="blogTags" 
              value={blogTags}
              onChange={(e) => setBlogTags(e.target.value)}
              placeholder="Web Development, JavaScript, React"
            />
          </div>
          
          <Separator />
          
          <div className="grid gap-3">
            <Label>Featured Image</Label>
            <FileUploader 
              multiple={false}
              onFileUpload={(urls) => handleBlogFileUpload(urls)}
              existingUrls={blogMediaUrl ? [blogMediaUrl] : []}
            />
          </div>
          
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlogPost}>
              {selectedBlogPost ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogFormModal;
