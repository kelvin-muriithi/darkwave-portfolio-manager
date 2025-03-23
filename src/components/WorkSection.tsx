
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMockProjects } from '@/services/api';
import { Project } from '@/models/types';
import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectModal from './ProjectModal';

const WorkSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getMockProjects
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
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  return (
    <section id="work" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-blue/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Selected Work</h2>
          <div className="w-24 h-1 bg-neon-blue mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Explore a selection of my recent projects, showcasing a blend of design, 
            development, and creative problem-solving.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">
            <p>Error loading projects</p>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available</p>
          </div>
        )}
        
        <div className="text-center mt-12 reveal">
          <Button asChild variant="outline">
            <a href="#" className="group">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: () => void;
}) => (
  <div 
    className="project-card reveal cursor-pointer"
    onClick={onClick}
  >
    <div className="h-64 overflow-hidden">
      <img 
        src={project.mediaUrls[0]} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm line-clamp-2">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70">
            +{project.tags.length - 3}
          </span>
        )}
      </div>
    </div>
    <div className="project-card-overlay">
      <Button variant="outline" size="sm" className="neon-border">
        <Eye size={16} className="mr-2" />
        View Project
      </Button>
    </div>
  </div>
);

export default WorkSection;
