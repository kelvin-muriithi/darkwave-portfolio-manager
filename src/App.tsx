
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { initializeDatabase } from "./services/supabaseClient";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the localStorage on app start
  useEffect(() => {
    const init = async () => {
      try {
        console.log('Initializing local storage...');
        await initializeDatabase();
        console.log('Local storage initialization complete');
        setIsInitialized(true);
      } catch (err) {
        console.error('Failed to initialize local storage:', err);
        toast({
          title: "Data initialization issue",
          description: "There was a problem setting up the local storage.",
          variant: "destructive"
        });
        // Even if there's an error, we'll still consider it initialized
        setIsInitialized(true);
      }
    };
    
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
