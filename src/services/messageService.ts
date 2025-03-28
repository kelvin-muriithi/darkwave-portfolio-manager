
import { ContactMessage } from "@/models/types";
import { toast } from "@/hooks/use-toast";

// Get all messages from localStorage
export const getLocalMessages = (): ContactMessage[] => {
  try {
    const messages = localStorage.getItem('mock_messages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error parsing local messages:', error);
    return [];
  }
};

// Save messages to localStorage
export const saveLocalMessages = (messages: ContactMessage[]): void => {
  try {
    localStorage.setItem('mock_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving local messages:', error);
  }
};

// Messages API
export const getMessages = async (): Promise<ContactMessage[]> => {
  console.log('Fetching messages from localStorage...');
  const localMessages = getLocalMessages();
  
  // If no messages in localStorage, create a test one
  if (!localMessages || localMessages.length === 0) {
    console.log('No messages found, creating sample message');
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
};

export const getMessageById = async (id: string): Promise<ContactMessage | null> => {
  const messages = getLocalMessages();
  return messages.find(msg => msg.id === id) || null;
};

export const createMessage = async (message: Omit<ContactMessage, 'id' | 'read'>): Promise<ContactMessage | null> => {
  try {
    console.log('Creating new message:', message);
    
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      read: false
    };
    
    const messages = getLocalMessages();
    const updatedMessages = [newMessage, ...messages];
    saveLocalMessages(updatedMessages);
    
    toast({
      title: "Message saved locally",
      description: "Your message was saved successfully"
    });
    
    return newMessage;
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
    
    const messages = getLocalMessages();
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    saveLocalMessages(updatedMessages);
    return updatedMessages.find(msg => msg.id === id) || null;
  } catch (error) {
    console.error('Error updating message:', error);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting message ${id}`);
    
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
