
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
    // Clear local cache before refreshing to ensure fresh data
    localStorage.removeItem('mock_messages');
    localStorage.removeItem('mock_projects');
    localStorage.removeItem('mock_blog_posts');
    
    // Invalidate all queries to force refetch
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    
    // Add some sample data if needed (for testing)
    const generateSampleData = () => {
      // Sample message if none exist
      const sampleMessage = {
        id: `sample-${Date.now()}`,
        name: 'Sample User',
        email: 'sample@example.com',
        subject: 'Test Message',
        message: 'This is a sample message to test the system.',
        date: new Date().toISOString(),
        read: false
      };
      
      // Get existing messages or create new array
      const existingMessages = JSON.parse(localStorage.getItem('mock_messages') || '[]');
      
      // Only add sample if no messages exist
      if (existingMessages.length === 0) {
        localStorage.setItem('mock_messages', JSON.stringify([sampleMessage]));
      }
    };
    
    // Generate sample data
    generateSampleData();
    
    toast({ 
      title: "Data refreshed",
      description: "All data has been refreshed and sample data added if needed"
    });
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
              Refresh Data
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
