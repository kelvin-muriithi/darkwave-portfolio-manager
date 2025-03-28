
import { ContactMessage } from "@/models/types";
import { supabase, isSupabaseConnected } from "./supabaseClient";
import { toast } from "@/hooks/use-toast";

// Get all messages from localStorage
const getLocalMessages = (): ContactMessage[] => {
  try {
    const messages = localStorage.getItem('mock_messages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error parsing local messages:', error);
    return [];
  }
};

// Save messages to localStorage
const saveLocalMessages = (messages: ContactMessage[]): void => {
  try {
    localStorage.setItem('mock_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving local messages:', error);
  }
};

// Messages API
export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    console.log('Fetching messages...');
    
    // If Supabase is not connected, use localStorage
    if (!isSupabaseConnected()) {
      console.log('Using localStorage for messages (Supabase not connected)');
      const localMessages = getLocalMessages();
      
      // If no messages in localStorage, create a test one
      if (!localMessages || localMessages.length === 0) {
        const testMessage: ContactMessage = {
          id: 'test-123',
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'This is a test message. To add more messages, use the contact form on your site or click "Refresh Data" in the admin panel.',
          date: new Date().toISOString(),
          read: false
        };
        
        saveLocalMessages([testMessage]);
        return [testMessage];
      }
      
      return localMessages;
    }
    
    // Try to fetch from Supabase if connected
    console.log('Fetching messages from Supabase...');
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching messages:', error);
      return getLocalMessages();
    }
    
    if (data && data.length > 0) {
      // Cache the messages in localStorage
      saveLocalMessages(data);
      console.log(`Stored ${data.length} messages in localStorage cache`);
    }
    
    console.log(`Retrieved ${data?.length || 0} messages from Supabase`);
    return data || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return getLocalMessages();
  }
};

export const getMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    console.log(`Fetching message with ID: ${id}`);
    
    // If Supabase is not connected, use localStorage
    if (!isSupabaseConnected()) {
      const messages = getLocalMessages();
      return messages.find(msg => msg.id === id) || null;
    }
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.warn('Supabase error fetching message by ID:', error);
      // Try to get from localStorage
      const messages = getLocalMessages();
      return messages.find(msg => msg.id === id) || null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching message:', error);
    const messages = getLocalMessages();
    return messages.find(msg => msg.id === id) || null;
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
    
    // If Supabase is not connected, use localStorage
    if (!isSupabaseConnected()) {
      const messages = getLocalMessages();
      const updatedMessages = [newMessage, ...messages];
      saveLocalMessages(updatedMessages);
      
      toast({
        title: "Message saved locally",
        description: "Your message was saved to local storage"
      });
      
      return newMessage;
    }
    
    // First, try to insert into Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();
    
    if (error) {
      console.warn('Supabase error creating message, using local storage instead:', error);
      // Fall back to localStorage
      const messages = getLocalMessages();
      const updatedMessages = [newMessage, ...messages];
      saveLocalMessages(updatedMessages);
      
      toast({
        title: "Message saved locally",
        description: "Your message was saved to local storage (Supabase unavailable)"
      });
      
      return newMessage;
    }
    
    console.log('Message created successfully in Supabase');
    
    // Also update localStorage cache
    const messages = getLocalMessages();
    const updatedMessages = [data, ...messages];
    saveLocalMessages(updatedMessages);
    
    toast({
      title: "Message sent successfully",
      description: "Your message has been saved to the database"
    });
    
    return data;
  } catch (error) {
    console.error('Error creating message:', error);
    toast({
      title: "Failed to save message",
      description: "There was a problem saving your message",
      variant: "destructive"
    });
    return null;
  }
};

export const markMessageAsRead = async (id: string): Promise<ContactMessage | null> => {
  try {
    console.log(`Marking message ${id} as read`);
    
    // If Supabase is not connected, use localStorage
    if (!isSupabaseConnected()) {
      const messages = getLocalMessages();
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      );
      saveLocalMessages(updatedMessages);
      return updatedMessages.find(msg => msg.id === id) || null;
    }
    
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
      const messages = getLocalMessages();
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      );
      saveLocalMessages(updatedMessages);
      return updatedMessages.find(msg => msg.id === id) || null;
    }
    
    // Also update localStorage cache
    const messages = getLocalMessages();
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    saveLocalMessages(updatedMessages);
    
    return data;
  } catch (error) {
    console.error('Error updating message:', error);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting message ${id}`);
    
    // If Supabase is not connected, use localStorage
    if (!isSupabaseConnected()) {
      const messages = getLocalMessages();
      const updatedMessages = messages.filter(msg => msg.id !== id);
      saveLocalMessages(updatedMessages);
      return true;
    }
    
    // Try with Supabase first
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.warn('Supabase error deleting message, using localStorage instead:', error);
      // Fall back to localStorage
      const messages = getLocalMessages();
      const updatedMessages = messages.filter(msg => msg.id !== id);
      saveLocalMessages(updatedMessages);
    }
    
    // Also update localStorage cache
    const messages = getLocalMessages();
    const updatedMessages = messages.filter(msg => msg.id !== id);
    saveLocalMessages(updatedMessages);
    
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};

// For backward compatibility (these should no longer be used)
export const getMockMessages = getMessages;
export const getMockMessageById = getMessageById;
