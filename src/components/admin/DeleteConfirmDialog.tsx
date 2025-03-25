
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'project' | 'post' | 'message' | null;
  onConfirm: () => void;
}

const DeleteConfirmDialog = ({ isOpen, onClose, itemType, onConfirm }: DeleteConfirmDialogProps) => {
  if (!itemType) return null;

  const itemTypeName = 
    itemType === 'project' ? 'project' : 
    itemType === 'post' ? 'blog post' : 'message';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Are you sure you want to delete this {itemTypeName}? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
