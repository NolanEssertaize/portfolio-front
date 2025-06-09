const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: 'AI-Powered E-commerce Platform',
      description: 'Full-stack e-commerce solution with AI product recommendations and chatbot support.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API'],
      image: '/api/placeholder/600/400',
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Modern workspace application with real-time editing and team collaboration features.',
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
      image: '/api/placeholder/600/400',
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Smart Analytics Dashboard',
      description: 'Interactive dashboard with data visualization and predictive analytics capabilities.',
      technologies: ['Vue.js', 'Python', 'D3.js', 'FastAPI'],
      image: '/api/placeholder/600/400',
      github: '#',
      demo: '#',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Showcasing a selection of my recent work that demonstrates my skills 
            in full-stack development and AI integration.
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project) => (
            <div key={project.title} className={`group relative bg-card rounded-2xl shadow-lg border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden ${
              project.featured ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''
            }`}>
              <div className={`relative ${project.featured ? 'lg:order-2' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🚀</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className={`p-8 ${project.featured ? 'lg:order-1 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-card-foreground mr-4">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.github}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                    </svg>
                    Code
                  </a>
                  <a 
                    href={project.demo}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;