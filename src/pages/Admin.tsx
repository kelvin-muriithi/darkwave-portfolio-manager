
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabContent, TabsList, Tabs, TabTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  getMockProjects, 
  getMockBlogPosts, 
  createProject, 
  updateProject,
  deleteProject,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '@/services/api';
import { Project, BlogPost } from '@/models/types';
import FileUploader from '@/components/FileUploader';

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("work");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | BlogPost | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deleteItemType, setDeleteItemType] = useState<'project' | 'post' | null>(null);
  
  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectShortDesc, setProjectShortDesc] = useState('');
  const [projectDetailedDesc, setProjectDetailedDesc] = useState('');
  const [projectTags, setProjectTags] = useState('');
  const [projectMediaUrls, setProjectMediaUrls] = useState<string[]>([]);
  
  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogMediaUrl, setBlogMediaUrl] = useState('');
  
  // Fetch projects and blog posts
  const { 
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getMockProjects
  });
  
  const { 
    data: blogPosts,
    isLoading: isBlogPostsLoading,
    isError: isBlogPostsError 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getMockBlogPosts
  });
  
  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: (newProject: Omit<Project, 'id'>) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project created successfully' });
      handleCloseProjectModal();
    },
    onError: () => {
      toast({ 
        title: 'Failed to create project', 
        variant: 'destructive'
      });
    }
  });
  
  const updateProjectMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) => 
      updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project updated successfully' });
      handleCloseProjectModal();
    },
    onError: () => {
      toast({ 
        title: 'Failed to update project', 
        variant: 'destructive'
      });
    }
  });
  
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
  
  const createBlogPostMutation = useMutation({
    mutationFn: (newPost: Omit<BlogPost, 'id'>) => createBlogPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({ title: 'Blog post created successfully' });
      handleCloseBlogModal();
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
      handleCloseBlogModal();
    },
    onError: () => {
      toast({ 
        title: 'Failed to update blog post', 
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
  
  // Handle opening project modal for editing
  const handleEditProject = (project: Project) => {
    setSelectedItem(project);
    setProjectTitle(project.title);
    setProjectShortDesc(project.shortDescription);
    setProjectDetailedDesc(project.detailedDescription);
    setProjectTags(project.tags.join(', '));
    setProjectMediaUrls(project.mediaUrls);
    setIsProjectModalOpen(true);
  };
  
  // Handle opening project modal for creating
  const handleNewProject = () => {
    setSelectedItem(null);
    setProjectTitle('');
    setProjectShortDesc('');
    setProjectDetailedDesc('');
    setProjectTags('');
    setProjectMediaUrls([]);
    setIsProjectModalOpen(true);
  };
  
  // Handle closing project modal
  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedItem(null);
  };
  
  // Handle saving project
  const handleSaveProject = () => {
    const projectData = {
      title: projectTitle,
      shortDescription: projectShortDesc,
      detailedDescription: projectDetailedDesc,
      mediaUrls: projectMediaUrls,
      tags: projectTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      date: new Date().toISOString(),
    };
    
    if (selectedItem && 'id' in selectedItem) {
      updateProjectMutation.mutate({ 
        id: selectedItem.id, 
        project: projectData 
      });
    } else {
      createProjectMutation.mutate(projectData as Omit<Project, 'id'>);
    }
  };
  
  // Handle opening blog modal for editing
  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedItem(post);
    setBlogTitle(post.title);
    setBlogSummary(post.summary);
    setBlogContent(post.content);
    setBlogTags(post.tags.join(', '));
    setBlogMediaUrl(post.mediaUrl);
    setIsBlogModalOpen(true);
  };
  
  // Handle opening blog modal for creating
  const handleNewBlogPost = () => {
    setSelectedItem(null);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogTags('');
    setBlogMediaUrl('');
    setIsBlogModalOpen(true);
  };
  
  // Handle closing blog modal
  const handleCloseBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedItem(null);
  };
  
  // Handle saving blog post
  const handleSaveBlogPost = () => {
    const blogData = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      mediaUrl: blogMediaUrl,
      tags: blogTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      date: new Date().toISOString(),
    };
    
    if (selectedItem && 'id' in selectedItem) {
      updateBlogPostMutation.mutate({ 
        id: selectedItem.id, 
        post: blogData 
      });
    } else {
      createBlogPostMutation.mutate(blogData as Omit<BlogPost, 'id'>);
    }
  };
  
  // Handle opening delete confirmation
  const handleDeleteConfirm = (id: string, type: 'project' | 'post') => {
    setDeleteItemId(id);
    setDeleteItemType(type);
    setIsDeleteConfirmOpen(true);
  };
  
  // Handle confirming deletion
  const handleConfirmDelete = () => {
    if (!deleteItemId || !deleteItemType) return;
    
    if (deleteItemType === 'project') {
      deleteProjectMutation.mutate(deleteItemId);
    } else {
      deleteBlogPostMutation.mutate(deleteItemId);
    }
  };
  
  // Handle file upload for project
  const handleProjectFileUpload = (urls: string[]) => {
    setProjectMediaUrls(urls);
  };
  
  // Handle file upload for blog post
  const handleBlogFileUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setBlogMediaUrl(urls[0]);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="px-6 py-4 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl font-bold font-display">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-7xl mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-white/10 mb-8">
            <TabsList className="bg-transparent">
              <TabTrigger
                value="work"
                className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
              >
                <FolderOpen size={16} className="mr-2" />
                Work Projects
              </TabTrigger>
              <TabTrigger
                value="blog"
                className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
              >
                <FileText size={16} className="mr-2" />
                Blog Posts
              </TabTrigger>
            </TabsList>
          </div>
          
          {/* Work Projects Tab */}
          <TabContent value="work" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Work Projects</h2>
              <Button onClick={handleNewProject}>
                <Plus size={16} className="mr-2" />
                Add Project
              </Button>
            </div>
            
            {isProjectsLoading ? (
              <p>Loading projects...</p>
            ) : isProjectsError ? (
              <p className="text-destructive">Error loading projects</p>
            ) : projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="glass rounded-xl overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.mediaUrls[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {project.shortDescription}
                      </p>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditProject(project)}
                        >
                          <Pencil size={14} className="mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteConfirm(project.id, 'project')}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleNewProject}
                >
                  Add your first project
                </Button>
              </div>
            )}
          </TabContent>
          
          {/* Blog Posts Tab */}
          <TabContent value="blog" className="space-y-6">
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
                  <div 
                    key={post.id} 
                    className="glass rounded-xl overflow-hidden"
                  >
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
                          onClick={() => handleEditBlogPost(post)}
                        >
                          <Pencil size={14} className="mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteConfirm(post.id, 'post')}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
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
          </TabContent>
        </Tabs>
      </main>
      
      {/* Project Modal */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-background">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project title"
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea 
                id="shortDescription" 
                value={projectShortDesc}
                onChange={(e) => setProjectShortDesc(e.target.value)}
                placeholder="Brief description of the project"
                rows={2}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="detailedDescription">Detailed Description</Label>
              <Textarea 
                id="detailedDescription" 
                value={projectDetailedDesc}
                onChange={(e) => setProjectDetailedDesc(e.target.value)}
                placeholder="Comprehensive details about the project"
                rows={6}
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                value={projectTags}
                onChange={(e) => setProjectTags(e.target.value)}
                placeholder="React, Design, UI/UX"
              />
            </div>
            
            <Separator />
            
            <div className="grid gap-3">
              <Label>Media Files</Label>
              <FileUploader 
                multiple={true}
                onFileUpload={handleProjectFileUpload}
                existingUrls={projectMediaUrls}
              />
            </div>
            
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={handleCloseProjectModal}>
                Cancel
              </Button>
              <Button onClick={handleSaveProject}>
                {selectedItem ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Blog Post Modal */}
      <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-background">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Blog Post' : 'Add New Blog Post'}
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
              <Button variant="outline" onClick={handleCloseBlogModal}>
                Cancel
              </Button>
              <Button onClick={handleSaveBlogPost}>
                {selectedItem ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this {deleteItemType === 'project' ? 'project' : 'blog post'}? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
