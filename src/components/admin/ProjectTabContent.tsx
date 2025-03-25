
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/services/projectService';
import { Project } from '@/models/types';
import ProjectCard from './ProjectCard';
import ProjectFormModal from './ProjectFormModal';

interface ProjectTabContentProps {
  onDeleteConfirm: (id: string, type: 'project' | 'post' | 'message') => void;
}

const ProjectTabContent = ({ onDeleteConfirm }: ProjectTabContentProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { 
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  
  const handleNewProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };
  
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };
  
  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };
  
  return (
    <div className="space-y-6">
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
            <ProjectCard 
              key={project.id} 
              project={project}
              onEdit={handleEditProject}
              onDelete={onDeleteConfirm}
            />
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
      
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
        selectedProject={selectedProject}
      />
    </div>
  );
};

export default ProjectTabContent;
