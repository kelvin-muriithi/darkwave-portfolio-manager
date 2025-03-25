
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '@/models/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import FileUploader from '@/components/FileUploader';
import { createProject, updateProject } from '@/services/projectService';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
}

const ProjectFormModal = ({ isOpen, onClose, selectedProject }: ProjectFormModalProps) => {
  const queryClient = useQueryClient();
  const [projectTitle, setProjectTitle] = useState('');
  const [projectShortDesc, setProjectShortDesc] = useState('');
  const [projectDetailedDesc, setProjectDetailedDesc] = useState('');
  const [projectTags, setProjectTags] = useState('');
  const [projectMediaUrls, setProjectMediaUrls] = useState<string[]>([]);
  
  // Reset form when selected project changes
  useEffect(() => {
    if (selectedProject) {
      setProjectTitle(selectedProject.title);
      setProjectShortDesc(selectedProject.shortDescription);
      setProjectDetailedDesc(selectedProject.detailedDescription);
      setProjectTags(selectedProject.tags.join(', '));
      setProjectMediaUrls(selectedProject.mediaUrls);
    } else {
      // Clear form for new project
      setProjectTitle('');
      setProjectShortDesc('');
      setProjectDetailedDesc('');
      setProjectTags('');
      setProjectMediaUrls([]);
    }
  }, [selectedProject]);
  
  const createProjectMutation = useMutation({
    mutationFn: (newProject: Omit<Project, 'id'>) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project created successfully' });
      onClose();
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
      onClose();
    },
    onError: () => {
      toast({ 
        title: 'Failed to update project', 
        variant: 'destructive'
      });
    }
  });
  
  const handleSaveProject = () => {
    const projectData = {
      title: projectTitle,
      shortDescription: projectShortDesc,
      detailedDescription: projectDetailedDesc,
      mediaUrls: projectMediaUrls,
      tags: projectTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      date: new Date().toISOString(),
    };
    
    if (selectedProject) {
      updateProjectMutation.mutate({ 
        id: selectedProject.id, 
        project: projectData 
      });
    } else {
      createProjectMutation.mutate(projectData as Omit<Project, 'id'>);
    }
  };
  
  // Handle file upload for project
  const handleProjectFileUpload = (urls: string[]) => {
    setProjectMediaUrls(urls);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-background">
        <DialogHeader>
          <DialogTitle>
            {selectedProject ? 'Edit Project' : 'Add New Project'}
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>
              {selectedProject ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormModal;
