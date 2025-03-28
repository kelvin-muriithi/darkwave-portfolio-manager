
import { ArrowLeft, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { logout } from '@/services/authService';

interface AdminHeaderProps {
  handleLogout: () => void;
}

const AdminHeader = ({ handleLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleRefreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast({ title: "Data refreshed" });
  };

  return (
    <header className="px-6 py-4 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold font-display">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshData}
              className="flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
