
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
    return data || [];
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
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    
    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
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
