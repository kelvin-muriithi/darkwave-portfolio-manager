
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { initializeDatabase, createStorageBucketIfNotExists } from "./services/supabaseClient";

const queryClient = new QueryClient();

const App = () => {
  // Initialize the database and storage on app start
  useEffect(() => {
    const init = async () => {
      console.log('Initializing Supabase database and storage...');
      await createStorageBucketIfNotExists();
      await initializeDatabase();
      console.log('Supabase initialization complete');
    };
    
    init().catch(err => {
      console.error('Failed to initialize Supabase:', err);
    });
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
