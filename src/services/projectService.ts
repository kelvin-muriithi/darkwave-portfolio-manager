
import { Project } from "@/models/types";
import { mockProjects, updateMockProjects } from "./mockData";

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  try {
    // For now using mock data until backend is connected
    return getMockProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    // For now using mock data until backend is connected
    return getMockProjectById(id);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    // Create a new project with a unique ID
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    
    // Add to mock data
    const updatedProjects = [...mockProjects, newProject];
    updateMockProjects(updatedProjects);
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    // Find project index
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Update project
    const updatedProjects = [...mockProjects];
    updatedProjects[index] = { ...updatedProjects[index], ...project };
    updateMockProjects(updatedProjects);
    return updatedProjects[index];
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    // Find project index
    const initialLength = mockProjects.length;
    const updatedProjects = mockProjects.filter(project => project.id !== id);
    
    // Update the mock data using the helper function
    updateMockProjects(updatedProjects);
    
    // Return true if a project was removed
    return updatedProjects.length < initialLength;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// Mock API implementations
export const getMockProjects = (): Promise<Project[]> => {
  return Promise.resolve([...mockProjects]);
};

export const getMockProjectById = (id: string): Promise<Project | null> => {
  const project = mockProjects.find(p => p.id === id);
  return Promise.resolve(project ? {...project} : null);
};
