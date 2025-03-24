
import { ContactMessage } from "@/models/types";
import { mockMessages, updateMockMessages } from "./mockData";

// Messages API
export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    // For now using mock data until backend is connected
    return getMockMessages();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const getMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    // For now using mock data until backend is connected
    return getMockMessageById(id);
  } catch (error) {
    console.error('Error fetching message:', error);
    return null;
  }
};

export const createMessage = async (message: Omit<ContactMessage, 'id' | 'read'>): Promise<ContactMessage | null> => {
  try {
    // Create a new message with a unique ID
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      read: false
    };
    
    // Add to mock data
    mockMessages.push(newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
};

export const markMessageAsRead = async (id: string): Promise<ContactMessage | null> => {
  try {
    // Find message index
    const index = mockMessages.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    // Update message
    mockMessages[index].read = true;
    return mockMessages[index];
  } catch (error) {
    console.error('Error updating message:', error);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    // Find message index
    const initialLength = mockMessages.length;
    const updatedMessages = mockMessages.filter(message => message.id !== id);
    
    // Update the mock data using the helper function
    updateMockMessages(updatedMessages);
    
    // Return true if a message was removed
    return updatedMessages.length < initialLength;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};

// Mock API implementations
export const getMockMessages = (): Promise<ContactMessage[]> => {
  return Promise.resolve([...mockMessages]);
};

export const getMockMessageById = (id: string): Promise<ContactMessage | null> => {
  const message = mockMessages.find(m => m.id === id);
  return Promise.resolve(message ? {...message} : null);
};
