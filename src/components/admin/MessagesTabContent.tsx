
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ContactMessage } from '@/models/types';
import { getMessages, markMessageAsRead } from '@/services/messageService';
import { useMutation } from '@tanstack/react-query';
import MessageCard from './MessageCard';
import MessageModal from './MessageModal';
import { Loader2 } from 'lucide-react';

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
    isError: isMessagesError,
    error: messagesError
  } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
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
  
  // If there's an error, log it for debugging
  if (isMessagesError && messagesError) {
    console.error('Error in messages tab:', messagesError);
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Messages {unreadMessagesCount > 0 && `(${unreadMessagesCount} unread)`}
        </h2>
      </div>
      
      {isMessagesLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-neon-blue mb-4" />
          <p>Loading messages...</p>
        </div>
      ) : isMessagesError ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Error loading messages</p>
          <p className="text-muted-foreground text-sm">
            There was a problem connecting to the server. Please try again later.
          </p>
        </div>
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
