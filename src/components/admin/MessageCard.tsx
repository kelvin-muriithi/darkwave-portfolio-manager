
import { ContactMessage } from '@/models/types';
import { Badge } from '@/components/ui/badge';

interface MessageCardProps {
  message: ContactMessage;
  onView: (message: ContactMessage) => void;
}

const MessageCard = ({ message, onView }: MessageCardProps) => {
  return (
    <div 
      className={`glass rounded-xl p-4 transition-all ${!message.read ? 'border-l-4 border-neon-blue' : ''}`}
      onClick={() => onView(message)}
      role="button"
      tabIndex={0}
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
          {new Date(message.date).toLocaleDateString()}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
      <p className="font-medium mb-2">{message.subject}</p>
      <p className="text-sm line-clamp-2">{message.message}</p>
    </div>
  );
};

export default MessageCard;
