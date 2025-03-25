
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderOpen, FileText, MessageSquare } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { isAuthenticated, logout } from '@/services/authService';
import { deleteProject } from '@/services/projectService';
import { deleteBlogPost } from '@/services/blogService';
import { deleteMessage, getMessages } from '@/services/messageService';

// Import admin components
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectTabContent from '@/components/admin/ProjectTabContent';
import BlogTabContent from '@/components/admin/BlogTabContent';
import MessagesTabContent from '@/components/admin/MessagesTabContent';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("work");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deleteItemType, setDeleteItemType] = useState<'project' | 'post' | 'message' | null>(null);
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Get unread message count for badge
  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages
  });
  
  const unreadMessagesCount = messages?.filter(message => !message.read).length || 0;
  
  // Mutations
  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project deleted successfully' });
      setIsDeleteConfirmOpen(false);
    },
    onError: () => {
      toast({ 
        title: 'Failed to delete project', 
        variant: 'destructive'
      });
    }
  });
  
  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({ title: 'Blog post deleted successfully' });
      setIsDeleteConfirmOpen(false);
    },
    onError: () => {
      toast({ 
        title: 'Failed to delete blog post', 
        variant: 'destructive'
      });
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({ title: 'Message deleted successfully' });
      setIsDeleteConfirmOpen(false);
    },
    onError: () => {
      toast({ 
        title: 'Failed to delete message', 
        variant: 'destructive'
      });
    }
  });
  
  // Handle opening delete confirmation
  const handleDeleteConfirm = (id: string, type: 'project' | 'post' | 'message') => {
    setDeleteItemId(id);
    setDeleteItemType(type);
    setIsDeleteConfirmOpen(true);
  };
  
  // Handle confirming deletion
  const handleConfirmDelete = () => {
    if (!deleteItemId || !deleteItemType) return;
    
    if (deleteItemType === 'project') {
      deleteProjectMutation.mutate(deleteItemId);
    } else if (deleteItemType === 'post') {
      deleteBlogPostMutation.mutate(deleteItemId);
    } else if (deleteItemType === 'message') {
      deleteMessageMutation.mutate(deleteItemId);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader handleLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="container max-w-7xl mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-white/10 mb-8">
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="work"
                className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
              >
                <FolderOpen size={16} className="mr-2" />
                Work Projects
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
              >
                <FileText size={16} className="mr-2" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className={`tab-button ${activeTab === 'messages' ? 'active' : ''} relative`}
              >
                <MessageSquare size={16} className="mr-2" />
                Messages
                {unreadMessagesCount > 0 && (
                  <Badge variant="default" className="ml-2 bg-neon-blue text-white">
                    {unreadMessagesCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Tab Contents */}
          <TabsContent value="work">
            <ProjectTabContent onDeleteConfirm={handleDeleteConfirm} />
          </TabsContent>
          
          <TabsContent value="blog">
            <BlogTabContent onDeleteConfirm={handleDeleteConfirm} />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTabContent onDeleteConfirm={handleDeleteConfirm} />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        itemType={deleteItemType}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Admin;
