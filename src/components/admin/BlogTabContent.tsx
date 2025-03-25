
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPosts } from '@/services/blogService';
import { BlogPost } from '@/models/types';
import BlogPostCard from './BlogPostCard';
import BlogFormModal from './BlogFormModal';

interface BlogTabContentProps {
  onDeleteConfirm: (id: string, type: 'project' | 'post' | 'message') => void;
}

const BlogTabContent = ({ onDeleteConfirm }: BlogTabContentProps) => {
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  
  const { 
    data: blogPosts,
    isLoading: isBlogPostsLoading,
    isError: isBlogPostsError 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });
  
  const handleNewBlogPost = () => {
    setSelectedBlogPost(null);
    setIsBlogModalOpen(true);
  };
  
  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsBlogModalOpen(true);
  };
  
  const handleCloseBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlogPost(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={handleNewBlogPost}>
          <Plus size={16} className="mr-2" />
          Add Post
        </Button>
      </div>
      
      {isBlogPostsLoading ? (
        <p>Loading blog posts...</p>
      ) : isBlogPostsError ? (
        <p className="text-destructive">Error loading blog posts</p>
      ) : blogPosts && blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogPostCard 
              key={post.id} 
              post={post}
              onEdit={handleEditBlogPost}
              onDelete={onDeleteConfirm}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleNewBlogPost}
          >
            Add your first blog post
          </Button>
        </div>
      )}
      
      <BlogFormModal
        isOpen={isBlogModalOpen}
        onClose={handleCloseBlogModal}
        selectedBlogPost={selectedBlogPost}
      />
    </div>
  );
};

export default BlogTabContent;
