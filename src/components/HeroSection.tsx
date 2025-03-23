
import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
      id="hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-blue/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left column: Photo */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start order-2 lg:order-1 reveal">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-white/10 animate-pulse-neon">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/30"></div>
            </div>
          </div>
          
          {/* Right column: Text content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="space-y-6 max-w-2xl">
              <p className="text-neon-blue font-mono text-sm reveal">Hello, I'm</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight reveal">
                <span className="block">Jane Anderson</span>
                <span className="block text-neon-blue animate-glow">Creative Developer</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl reveal">
                I craft digital experiences that combine elegant design with cutting-edge technology. 
                Specializing in web development, UX design, and creative coding.
              </p>
              
              <div className="flex flex-wrap gap-4 reveal">
                <Button asChild size="lg">
                  <a href="#work">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button variant="outline" size="lg">
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>
              
              <div className="flex gap-6 pt-4 reveal">
                <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Github size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer" onClick={scrollToNextSection}>
        <span className="text-sm text-muted-foreground">Scroll</span>
        <ArrowDown className="animate-bounce h-5 w-5 text-neon-blue" />
      </div>
    </div>
  );
};

export default HeroSection;
