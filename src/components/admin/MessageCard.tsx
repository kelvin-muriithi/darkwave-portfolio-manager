
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
  
  const formattedDate = new Date(message.date).toLocaleDateString();
  
  return (
    <div 
      ref={cardRef}
      className={`glass rounded-xl p-4 transition-all hover:bg-white/5 cursor-pointer ${
        !message.read ? 'border-l-4 border-neon-blue' : ''
      }`}
      onClick={() => onView(message)}
      role="button"
      tabIndex={0}
      aria-label={`Message from ${message.name} about ${message.subject}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="font-bold">{message.name}</h3>
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
      <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
      <p className="font-medium mb-2">{message.subject || 'No Subject'}</p>
      <p className="text-sm line-clamp-2">{message.message}</p>
    </div>
  );
};

export default MessageCard;
