
import { ContactMessage } from '@/models/types';
import { Badge } from '@/components/ui/badge';
import { useRef, useEffect } from 'react';

interface MessageCardProps {
  message: ContactMessage;
  onView: (message: ContactMessage) => void;
}

const MessageCard = ({ message, onView }: MessageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Ensure keyboard accessibility works properly
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onView(message);
      }
    };
    
    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [message, onView]);
  
  // Format date from ISO string, handling invalid dates gracefully
  const formattedDate = (() => {
    try {
      return new Date(message.date).toLocaleDateString();
    } catch (e) {
      console.error("Invalid date format:", message.date);
      return "Invalid date";
    }
  })();
  
  // Check if we have all required fields or if the message is malformed
  const isValidMessage = message && message.name && message.email && message.message;
  
  if (!isValidMessage) {
    console.warn("Invalid message format:", message);
  }
  
  return (
    <div 
      ref={cardRef}
      className={`glass rounded-xl p-4 transition-all hover:bg-white/5 cursor-pointer ${
        !message.read ? 'border-l-4 border-neon-blue' : ''
      }`}
      onClick={() => onView(message)}
      role="button"
      tabIndex={0}
      aria-label={`Message from ${message.name || 'Unknown'} about ${message.subject || 'No subject'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="font-bold">{message.name || 'Unknown Sender'}</h3>
          {!message.read && (
            <Badge variant="default" className="ml-2 bg-neon-blue text-white">
              New
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {formattedDate}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{message.email || 'No email'}</p>
      <p className="font-medium mb-2">{message.subject || 'No Subject'}</p>
      <p className="text-sm line-clamp-2">{message.message || 'No message content'}</p>
    </div>
  );
};

export default MessageCard;
