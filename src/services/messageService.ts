
import { ContactMessage } from "@/models/types";
import { supabase } from "./supabaseClient";

// Messages API
export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const getMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching message:', error);
    return null;
  }
};

export const createMessage = async (message: Omit<ContactMessage, 'id' | 'read'>): Promise<ContactMessage | null> => {
  try {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      read: false
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
};

export const markMessageAsRead = async (id: string): Promise<ContactMessage | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating message:', error);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockMessages = getMessages;
export const getMockMessageById = getMessageById;
