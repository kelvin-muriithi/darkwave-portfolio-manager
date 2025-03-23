
import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
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
                  src="/lovable-uploads/5d0dcc6a-279a-472e-b818-70db2accf097.png" 
                  alt="Kelvin Muriithi" 
                  className="w-full h-full object-cover object-top"
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
                <span className="block">Kelvin Muriithi</span>
                <span className="block text-neon-blue animate-glow">Geospatial Engineer</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl reveal">
                I specialize in spatial data science, combining geospatial technologies with 
                data science tools to solve complex environmental and engineering challenges.
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
                <a href="mailto:kelvinmuriiithi@gmail.com" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Mail size={20} />
                </a>
                <a href="https://www.linkedin.com/in/kelvin-muriithi-0662b0280/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="tel:+254741581776" className="text-muted-foreground hover:text-neon-blue transition-colors duration-300">
                  <Phone size={20} />
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
