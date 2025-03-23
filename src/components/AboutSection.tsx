
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, MapPin, Database, Globe, LineChart, Layers, Map, Activity, Server
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
            I'm a Geospatial Engineer with a strong foundation in data science, machine learning, 
            and spatial analysis, passionate about solving complex challenges through spatial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left column: Text content */}
          <div className="space-y-6 reveal">
            <h3 className="text-2xl font-bold">My Background</h3>
            <p className="text-muted-foreground">
              I hold a Bachelor's Degree in Geospatial Engineering from the Technical University of Kenya 
              and bring over 3 years of hands-on experience in geospatial data workflows, remote sensing, 
              and geostatistical modeling.
            </p>
            <p className="text-muted-foreground">
              My professional background includes machine learning data annotation, survey operations, 
              and spatial data management. I specialize in integrating geospatial technologies with Python-based 
              data science tools to solve complex environmental and engineering challenges.
            </p>
            <p className="text-muted-foreground">
              I have a growing interest in methane transformation technologies and climate-focused applications 
              of GIS. I'm particularly focused on leveraging spatial data and predictive modeling to support 
              sustainability and emissions reduction efforts.
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
                icon={<Globe className="h-6 w-6 text-neon-blue" />}
                title="Geospatial Analysis"
                skills={['GIS (QGIS, ArcGIS)', 'Remote Sensing', 'Spatial Statistics', 'Cartography']}
              />
              <SkillCard 
                icon={<Database className="h-6 w-6 text-neon-purple" />}
                title="Data Science"
                skills={['Python (Pandas, NumPy)', 'Machine Learning', 'Statistical Analysis', 'GeoPandas']}
              />
              <SkillCard 
                icon={<Map className="h-6 w-6 text-neon-green" />}
                title="Spatial Modeling"
                skills={['Geostatistics', 'Environmental Modeling', 'Land Use Analysis', 'Spatial Interpolation']}
              />
              <SkillCard 
                icon={<LineChart className="h-6 w-6 text-neon-yellow" />}
                title="Data Visualization"
                skills={['Matplotlib', 'Plotly', 'Spatial Visualization', 'Dashboard Development']}
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
            quote="Kelvin's expertise in geospatial analysis provided invaluable insights for our environmental monitoring project. His ability to integrate multiple data sources was impressive."
            name="Sarah Johnson"
            role="Environmental Scientist"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          />
          <TestimonialCard 
            quote="Working with Kelvin was a pleasure. His deep understanding of spatial data science helped us solve complex analytical challenges with elegant solutions."
            name="Michael Chen"
            role="Data Science Lead"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          />
          <TestimonialCard 
            quote="Kelvin's attention to detail and ability to translate complex spatial requirements into actionable insights made him an invaluable asset to our research team."
            name="David Rodriguez"
            role="Research Director"
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
