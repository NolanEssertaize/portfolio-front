'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atomic/atoms';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  featured: boolean;
  demo?: string;
  demoLabel?: string;
  gradient?: string;
}


const ProjectsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);
  const [showToast, setShowToast] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('nolan.essertaize26@gmail.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Generate random values only on client-side
  useEffect(() => {
    const elements = Array.from({ length: 8 }, () => ({
      width: Math.random() * 20 + 8,
      height: Math.random() * 20 + 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    }));
    
    setFloatingElements(elements);
    setMounted(true);
  }, []);

  const projects: Project[] = [
    {
      title: 'AI-Powered Portfolio',
      description: 'Full-stack portfolio with chatbot support powered by AI. I have built the server that contain that portfolio, bought credit for that DeepSeek API, and the domain name',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Fast API', 'Nginx', 'UbuntuServer'],
      image: '/ProjectAI.png',
      github: 'https://github.com/NolanEssertaize/portfolio-front',
      featured: true,
    },
    {
      title: 'CS50 Course',
      description: 'The CS50 Introduction and all his side project he include',
      technologies: ['C', 'C++', 'Algorithm', 'HTML', 'CSS', 'MP3', 'PNG', 'JPEG'],
      image: '/CS50.png',
      github: 'https://www.edx.org/cs50',
      featured: false,
    },
    {
      title: 'TCP/IP Server BAC+2',
      description: 'Build a TCP/IP Server on an raspberry pi that is connected to a strength captor that is capturing pull-up motion and registering on a mobile app',
      technologies: ['Java', 'RS232', 'Team'],
      image: '/TCPIP.png',
      github: 'https://www.canva.com/design/DAFeGReujvA/843jfXbe723PRx4z1dQ4OQ/edit?utm_content=DAFeGReujvA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      featured: false,
      gradient: 'from-orange-500 to-red-600',
    },
      {
        title: 'Learning AI',
        description: 'Exploring artificial intelligence concepts and applications.',
        technologies: ['Next.js', 'AI'],
        image: '/AILesson.png',
        github: '#',
        demo: '/kaizen',
        featured: false,
      },
    ];

  return (
    <section 
      id="projects" 
      className="py-20 transition-all duration-500"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Featured Projects
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p 
            className="mt-6 max-w-2xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Showcasing a selection of my recent work that demonstrates my skills 
            in full-stack development and AI integration.
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className={`group relative card-glass rounded-3xl shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden ${
                project.featured ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project Image/Visual */}
              <div className={`relative ${project.featured ? 'lg:order-2' : ''}`}>
                <div className="aspect-video relative overflow-hidden">
                  {/* Background Image with Unified Color Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                    }}
                  ></div>
                  
                  {/* Unified Color Overlay for Theme Consistency */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, var(--mountain-primary), var(--mountain-secondary))`,
                      mixBlendMode: 'multiply',
                      opacity: 0.7
                    }}
                  ></div>
                  
                  {/* Additional Theme-Aware Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(45deg, transparent 30%, var(--glass-bg) 70%)`,
                      opacity: 0.8
                    }}
                  ></div>
                  
                  {/* Animated Background Pattern - Only render on client */}
                  {mounted && (
                    <div className="absolute inset-0 opacity-20">
                      {floatingElements.map((element, i) => (
                        <div
                          key={i}
                          className="absolute glass-subtle rounded-full animate-float"
                          style={{
                            width: `${element.width}px`,
                            height: `${element.height}px`,
                            left: `${element.left}%`,
                            top: `${element.top}%`,
                            animationDelay: `${element.animationDelay}s`,
                            animationDuration: `${element.animationDuration}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-0 transition-all duration-500 flex items-center justify-center"
                    style={{ background: '' }}
                  >
                  </div>

                  {/* Corner Badge for Featured Project */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div
                        className="glass-strong text-xs font-semibold px-3 py-1 rounded-full border transform rotate-12"
                        style={{
                          color: 'var(--primary)',
                          borderColor: 'var(--primary)',
                          backgroundColor: 'var(--glass-bg)'
                        }}
                      >
                        <span className="material-icons align-middle mr-1">star</span> Featured
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Content */}
              <div className={`p-8 ${project.featured ? 'lg:order-1 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                <div className="flex items-center mb-6">
                  <h3 
                    className="text-2xl font-bold mr-4"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span 
                      className="glass-subtle text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{ 
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)'
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                
                <p 
                  className="mb-6 leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {project.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="glass-subtle px-3 py-2 rounded-full text-sm font-medium hover:glass transition-all duration-300"
                      style={{ color: 'var(--secondary-foreground)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {project.demo && (
                    <Link href={project.demo}>
                      <Button
                        variant="ghost"
                        animation="roll-replace"
                        className="glass-subtle hover:glass px-4 py-2 rounded-xl transition-all duration-300"
                        style={{ color: 'var(--muted-foreground)' }}
                        leftIcon={
                          <div className="w-5 h-6 glass-subtle rounded-full flex items-center justify-center">
                            <span className="material-icons text-3xl">rocket_launch</span>
                          </div>
                        }
                      >
                        {project.demoLabel ?? 'Demo'}
                      </Button>
                    </Link>
                  )}
                  <a
                    target="_blank"
                    href={project.github}
                    className="flex items-center glass-subtle hover:glass px-4 py-2 rounded-xl transition-all duration-300 group"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">View</span>
                  </a>
                </div>
              </div>

              {/* Decorative Elements - Static positions to avoid hydration mismatch */}
              <div className="absolute -top-2 -right-2 w-4 h-4 glass-subtle rounded-full animate-float opacity-50"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 glass-subtle rounded-full animate-float animation-delay-300 opacity-30"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-strong rounded-2xl p-8 inline-block">
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Interested in working together?
            </h3>
            <p 
              className="mb-6"
              style={{ color: 'var(--muted-foreground)' }}
            >
              I&apos;m always open to discussing new opportunities and exciting projects.
            </p>
            <Button
              onClick={copyEmail}
              className="btn-glass px-6 py-3 rounded-xl font-medium transition-all duration-300"
              style={{ color: 'var(--primary)' }}
            >
              Keep in Touch
            </Button>
            {showToast && (
              <div
                className="fixed top-3 left-1/2 transform -translate-x-1/2 glass-strong z-200 px-4 py-2 rounded-xl"
                style={{ color: 'var(--foreground)', backgroundColor: 'var(--glass-bg)' }}
              >
                Email copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
