
import { ContactMessage } from "@/models/types";
import { supabase } from "./supabaseClient";

// Messages API
export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    console.log('Fetching messages from Supabase...');
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching messages:', error);
      // Try to get from localStorage if Supabase fails
      const localMessages = localStorage.getItem('mock_messages');
      if (localMessages) {
        console.log('Using cached messages from localStorage');
        return JSON.parse(localMessages);
      }
      throw error;
    }
    
    if (data && data.length > 0) {
      // Cache the messages in localStorage
      localStorage.setItem('mock_messages', JSON.stringify(data));
    }
    
    console.log(`Retrieved ${data?.length || 0} messages from Supabase`);
    return data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    // Try to get from localStorage
    const localMessages = localStorage.getItem('mock_messages');
    if (localMessages) {
      console.log('Using cached messages from localStorage after error');
      return JSON.parse(localMessages);
    }
    return [];
  }
};

export const getMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    console.log(`Fetching message with ID: ${id}`);
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
    console.log('Creating new message:', message);
    
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      read: false
    };
    
    // First, try to insert into Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();
    
    if (error) {
      console.warn('Supabase error creating message, using local storage instead:', error);
      // Fall back to localStorage
      const existingMessages = localStorage.getItem('mock_messages');
      let messages = existingMessages ? JSON.parse(existingMessages) : [];
      messages = [newMessage, ...messages];
      localStorage.setItem('mock_messages', JSON.stringify(messages));
      return newMessage;
    }
    
    console.log('Message created successfully in Supabase');
    return data;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
};

export const markMessageAsRead = async (id: string): Promise<ContactMessage | null> => {
  try {
    console.log(`Marking message ${id} as read`);
    
    // First try with Supabase
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.warn('Supabase error updating message, using localStorage instead:', error);
      // Fall back to localStorage
      const existingMessages = localStorage.getItem('mock_messages');
      if (existingMessages) {
        let messages = JSON.parse(existingMessages);
        messages = messages.map((msg: ContactMessage) => 
          msg.id === id ? { ...msg, read: true } : msg
        );
        localStorage.setItem('mock_messages', JSON.stringify(messages));
        return messages.find((msg: ContactMessage) => msg.id === id) || null;
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating message:', error);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting message ${id}`);
    
    // Try with Supabase first
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.warn('Supabase error deleting message, using localStorage instead:', error);
      // Fall back to localStorage
      const existingMessages = localStorage.getItem('mock_messages');
      if (existingMessages) {
        let messages = JSON.parse(existingMessages);
        messages = messages.filter((msg: ContactMessage) => msg.id !== id);
        localStorage.setItem('mock_messages', JSON.stringify(messages));
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockMessages = getMessages;
export const getMockMessageById = getMessageById;
