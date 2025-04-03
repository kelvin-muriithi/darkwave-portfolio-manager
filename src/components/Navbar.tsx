
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold font-display">
            <span className="neon-text-blue">Kelvin Muriithi</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <Button asChild variant="outline" size="sm" className="ml-4">
              <Link to="/admin">Admin</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-black/95 z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col p-8 space-y-6">
          <MobileNavLink href="#about" onClick={toggleMobileMenu}>About</MobileNavLink>
          <MobileNavLink href="#work" onClick={toggleMobileMenu}>Work</MobileNavLink>
          <MobileNavLink href="#blog" onClick={toggleMobileMenu}>Blog</MobileNavLink>
          <MobileNavLink href="#contact" onClick={toggleMobileMenu}>Contact</MobileNavLink>
          <Button asChild variant="outline" size="sm" className="mt-6">
            <Link to="/admin" onClick={toggleMobileMenu}>Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
  >
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  onClick, 
  children 
}: { 
  href: string; 
  onClick: () => void; 
  children: React.ReactNode 
}) => (
  <a
    href={href}
    className="flex items-center justify-between text-xl font-medium py-2 border-b border-white/10"
    onClick={onClick}
  >
    {children}
    <ChevronRight size={20} />
  </a>
);

export default Navbar;
