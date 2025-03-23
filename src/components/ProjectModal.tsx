
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from '@/models/types';
import { X } from 'lucide-react';

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProjectModal = ({ project, isOpen, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw] bg-black/95 border border-white/10 p-0">
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <DialogTitle className="text-xl font-bold">{project.title}</DialogTitle>
          <button 
            onClick={() => onOpenChange(false)} 
            className="rounded-full p-2 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <ScrollArea className="h-[calc(90vh-72px)]">
          <div className="p-6">
            {/* Top section: Split into two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left column: Media gallery */}
              <div className="lg:col-span-1 space-y-4">
                {project.mediaUrls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-white/10">
                    <img 
                      src={url} 
                      alt={`${project.title} - image ${index + 1}`} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Right column: Title and short description */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground text-justify">{project.shortDescription}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="mt-6 text-sm text-muted-foreground">
                  Completed on {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Bottom section: Full width detailed description */}
            <div className="border-t border-white/10 pt-8">
              <h4 className="text-lg font-medium mb-4">Project Details</h4>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {project.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
