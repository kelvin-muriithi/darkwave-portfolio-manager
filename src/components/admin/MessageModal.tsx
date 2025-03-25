
import { ContactMessage } from '@/models/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Check } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ContactMessage | null;
  onDelete: (id: string, type: 'project' | 'post' | 'message') => void;
}

const MessageModal = ({ isOpen, onClose, message, onDelete }: MessageModalProps) => {
  if (!message) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-background">
        <DialogHeader>
          <DialogTitle>
            View Message
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{message.name}</h3>
              <p className="text-sm text-muted-foreground">{message.email}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(message.date).toLocaleString()}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Subject</h4>
            <p>{message.subject || '(No subject)'}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Message</h4>
            <div className="bg-white/5 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-4">
            <Button 
              variant="destructive" 
              onClick={() => onDelete(message.id, 'message')}
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </Button>
            <Button variant="outline" onClick={onClose}>
              <Check size={14} className="mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
