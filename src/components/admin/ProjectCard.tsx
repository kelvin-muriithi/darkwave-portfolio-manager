
import { Project } from '@/models/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string, type: 'project' | 'post' | 'message') => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <div className="glass rounded-xl overflow-hidden">
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
            onClick={() => onEdit(project)}
          >
            <Pencil size={14} className="mr-2" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(project.id, 'project')}
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
