const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: 'AI-Powered Portfolio',
      description: 'Full-stack portfolio with chatbot support powered by AI.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Fast API'],
      image: '/public/ProjectAI.png',
      github: 'https://github.com/NolanEssertaize/portfolio-front',
      demo: '#',
      featured: true,
    },
    {
      title: 'CS50 Course',
      description: 'The CS50 Introduction and all his side project he include',
      technologies: ['C', 'C++', 'Algorithm', 'HTML', 'CSS', 'MP3', 'PNG', 'JPEG'],
      image: '/public/CS50.png',
      github: 'https://github.com/code50/163408317/tree/main/CS50_Introduction',
      demo: '#',
      featured: false,
    },
    {
      title: 'TCP/IP Server BAC+2',
      description: 'Build a TCP/IP Server on an raspberry pi that is connected to a strength captor that is capturing pull-up motion and registering on a mobile app',
      technologies: ['Java', 'RS232', 'Team'],
      image: '/public/TCPIP.png',
      github: '#',
      demo: '#',
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
                <div 
                  className="aspect-video flex items-center justify-center glass-subtle relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, var(--mountain-primary), var(--mountain-secondary))` 
                  }}
                >
                  {/* Placeholder Project Visual */}
                  <div className="text-6xl opacity-30 transform group-hover:scale-110 transition-transform duration-500">
                    🚀
                  </div>
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute glass-subtle rounded-full animate-float"
                        style={{
                          width: `${Math.random() * 30 + 10}px`,
                          height: `${Math.random() * 30 + 10}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--glass-bg)' }}
                  >
                    <div className="glass rounded-full p-4">
                      <svg className="w-8 h-8" fill="none" stroke="var(--primary)" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
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
                  <a 
                    target="_blank"
                    href={project.github}
                    className="flex items-center glass-subtle hover:glass px-4 py-2 rounded-xl transition-all duration-300 group"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    className="flex items-center glass-subtle hover:glass px-4 py-2 rounded-xl transition-all duration-300 group"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    <span className="font-medium">Live Demo</span>
                  </a>
                </div>
              </div>

              {/* Decorative Elements */}
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
            <button 
              className="btn-glass px-6 py-3 rounded-xl font-medium transition-all duration-300"
              style={{ color: 'var(--primary)' }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;