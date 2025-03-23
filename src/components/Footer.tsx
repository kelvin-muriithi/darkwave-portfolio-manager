
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold neon-text-blue font-display">Portfolio</h3>
            <p className="text-muted-foreground max-w-xs">
              Showcasing my creative work and thoughts through a curated collection of projects and insights.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              <a href="#about" className="text-muted-foreground hover:text-white transition-colors">About</a>
              <a href="#work" className="text-muted-foreground hover:text-white transition-colors">Work</a>
              <a href="#blog" className="text-muted-foreground hover:text-white transition-colors">Blog</a>
              <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
            
            <form className="mt-6">
              <label htmlFor="newsletter" className="text-sm font-medium block mb-2">
                Subscribe to my newsletter
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/80 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUpCircle size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
