
import { Project } from "@/models/types";
import { supabase } from "./supabaseClient";

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    // Transform data to match our model
    const projects: Project[] = data.map(item => ({
      id: item.id,
      title: item.title,
      shortDescription: item.short_description || item.shortDescription,
      detailedDescription: item.detailed_description || item.detailedDescription,
      mediaUrls: item.media_urls || item.mediaUrls,
      date: item.date,
      tags: item.tags
    }));
    
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    // Transform data to match our model
    const project: Project = {
      id: data.id,
      title: data.title,
      shortDescription: data.short_description || data.shortDescription,
      detailedDescription: data.detailed_description || data.detailedDescription,
      mediaUrls: data.media_urls || data.mediaUrls,
      date: data.date,
      tags: data.tags
    };
    
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const newProject = {
      id: Date.now().toString(),
      title: project.title,
      short_description: project.shortDescription,
      detailed_description: project.detailedDescription,
      media_urls: project.mediaUrls,
      date: project.date,
      tags: project.tags
    };
    
    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform data to match our model
    return {
      id: data.id,
      title: data.title,
      shortDescription: data.short_description,
      detailedDescription: data.detailed_description,
      mediaUrls: data.media_urls,
      date: data.date,
      tags: data.tags
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    // Transform the project data to match database schema
    const projectData: any = {};
    if (project.title) projectData.title = project.title;
    if (project.shortDescription) projectData.short_description = project.shortDescription;
    if (project.detailedDescription) projectData.detailed_description = project.detailedDescription;
    if (project.mediaUrls) projectData.media_urls = project.mediaUrls;
    if (project.date) projectData.date = project.date;
    if (project.tags) projectData.tags = project.tags;
    
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform data to match our model
    return {
      id: data.id,
      title: data.title,
      shortDescription: data.short_description,
      detailedDescription: data.detailed_description,
      mediaUrls: data.media_urls,
      date: data.date,
      tags: data.tags
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockProjects = getProjects;
export const getMockProjectById = getProjectById;
