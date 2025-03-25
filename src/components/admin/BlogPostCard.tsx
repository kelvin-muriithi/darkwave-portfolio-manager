
import { BlogPost } from '@/models/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string, type: 'project' | 'post' | 'message') => void;
}

const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.mediaUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {post.summary}
        </p>
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(post)}
          >
            <Pencil size={14} className="mr-2" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(post.id, 'post')}
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
