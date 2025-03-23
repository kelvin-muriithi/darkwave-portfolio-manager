
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative p-4">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-neon-blue/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="text-center glass p-12 rounded-xl w-full max-w-md">
        <h1 className="text-7xl font-bold font-display neon-text-blue animate-glow mb-6">404</h1>
        <p className="text-xl text-white mb-6">Oops! The page you're looking for does not exist.</p>
        <p className="text-muted-foreground mb-8">
          The page at <span className="font-mono text-neon-blue">{location.pathname}</span> could not be found.
        </p>
        <Button asChild className="animate-pulse-neon">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
