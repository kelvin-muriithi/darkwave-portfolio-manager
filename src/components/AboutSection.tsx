
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Code2, Download, Trophy, PenTool, Code, Monitor, Lightbulb
} from 'lucide-react';

const AboutSection = () => {
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
  
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
          <div className="w-24 h-1 bg-neon-blue mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            I'm a creative developer with over 5 years of experience building beautiful, 
            functional web applications. My passion lies at the intersection of design and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left column: Text content */}
          <div className="space-y-6 reveal">
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-muted-foreground">
              I began my career as a graphic designer before transitioning to web development. 
              This unique background allows me to approach projects with both creative vision and 
              technical expertise. I've worked with clients ranging from startups to established 
              brands, helping them create digital experiences that stand out.
            </p>
            <p className="text-muted-foreground">
              My work is driven by a passion for clean, intuitive design and efficient, 
              well-structured code. I believe that the best digital products are those that 
              feel natural and effortless to use, while being built on a foundation of solid 
              engineering principles.
            </p>
            <Button className="mt-4">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
          
          {/* Right column: Skills */}
          <div className="glass rounded-xl p-8 reveal">
            <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkillCard 
                icon={<Code className="h-6 w-6 text-neon-blue" />}
                title="Web Development"
                skills={['React', 'TypeScript', 'Node.js', 'Next.js']}
              />
              <SkillCard 
                icon={<PenTool className="h-6 w-6 text-neon-purple" />}
                title="Design"
                skills={['UI/UX Design', 'Figma', 'Prototyping', 'Design Systems']}
              />
              <SkillCard 
                icon={<Monitor className="h-6 w-6 text-neon-green" />}
                title="Frontend"
                skills={['Responsive Design', 'Animations', 'Accessibility', 'TailwindCSS']}
              />
              <SkillCard 
                icon={<Lightbulb className="h-6 w-6 text-neon-yellow" />}
                title="Creative Coding"
                skills={['Three.js', 'WebGL', 'Canvas', 'SVG Animations']}
              />
            </div>
          </div>
        </div>
        
        {/* Bottom section: Testimonials */}
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <h3 className="text-2xl font-bold mb-6">What People Say</h3>
          <div className="w-24 h-1 bg-neon-purple mx-auto mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Jane is an exceptional developer who combines technical prowess with an eye for design. Her work on our e-commerce platform exceeded our expectations."
            name="Michael Chen"
            role="CTO at TechStart"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          />
          <TestimonialCard 
            quote="Working with Jane was a pleasure. She understood our vision immediately and delivered a website that perfectly captures our brand identity."
            name="Sarah Johnson"
            role="Marketing Director"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          />
          <TestimonialCard 
            quote="Jane's attention to detail and ability to translate complex requirements into elegant solutions made her an invaluable partner for our startup."
            name="David Rodriguez"
            role="Founder & CEO"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          />
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ 
  icon, 
  title, 
  skills 
}: { 
  icon: React.ReactNode; 
  title: string; 
  skills: string[] 
}) => (
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      {icon}
      <h4 className="font-bold">{title}</h4>
    </div>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {skills.map((skill, index) => (
        <li key={index} className="flex items-center">
          <span className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-2"></span>
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

const TestimonialCard = ({ 
  quote, 
  name, 
  role, 
  image 
}: { 
  quote: string; 
  name: string; 
  role: string; 
  image: string 
}) => (
  <div className="glass p-6 rounded-xl relative reveal">
    <div className="absolute -top-4 left-6 text-4xl text-neon-blue">"</div>
    <p className="text-muted-foreground mb-6 mt-2 relative z-10">{quote}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

export default AboutSection;
