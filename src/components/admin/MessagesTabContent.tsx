
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContactMessage } from '@/models/types';
import { getMessages, markMessageAsRead } from '@/services/messageService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MessageCard from './MessageCard';
import MessageModal from './MessageModal';

interface MessagesTabContentProps {
  onDeleteConfirm: (id: string, type: 'project' | 'post' | 'message') => void;
}

const MessagesTabContent = ({ onDeleteConfirm }: MessagesTabContentProps) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const queryClient = useQueryClient();
  
  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError
  } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages
  });
  
  const markMessageAsReadMutation = useMutation({
    mutationFn: (id: string) => markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });
  
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
    
    // Mark as read if it's unread
    if (!message.read) {
      markMessageAsReadMutation.mutate(message.id);
    }
  };
  
  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedMessage(null);
  };
  
  // Count unread messages
  const unreadMessagesCount = messages?.filter(message => !message.read).length || 0;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages {unreadMessagesCount > 0 && `(${unreadMessagesCount} unread)`}</h2>
      </div>
      
      {isMessagesLoading ? (
        <p>Loading messages...</p>
      ) : isMessagesError ? (
        <p className="text-destructive">Error loading messages</p>
      ) : messages && messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onView={handleViewMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No messages found</p>
        </div>
      )}
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        message={selectedMessage}
        onDelete={onDeleteConfirm}
      />
    </div>
  );
};

export default MessagesTabContent;
