
import { Project } from "@/models/types";

// Get all projects from localStorage
const getLocalProjects = (): Project[] => {
  try {
    const projects = localStorage.getItem('mock_projects');
    return projects ? JSON.parse(projects) : [];
  } catch (error) {
    console.error('Error parsing local projects:', error);
    return [];
  }
};

// Save projects to localStorage
const saveLocalProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem('mock_projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving local projects:', error);
  }
};

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  console.log('Fetching projects from localStorage');
  return getLocalProjects();
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const projects = getLocalProjects();
  return projects.find(project => project.id === id) || null;
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    
    const projects = getLocalProjects();
    const updatedProjects = [newProject, ...projects];
    saveLocalProjects(updatedProjects);
    
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    const projects = getLocalProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedProject = { ...projects[index], ...project };
    projects[index] = updatedProject;
    saveLocalProjects(projects);
    
    return updatedProject;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const projects = getLocalProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    saveLocalProjects(updatedProjects);
    
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockProjects = getProjects;
export const getMockProjectById = getProjectById;
