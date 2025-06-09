const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I&apos;m a full-stack developer with a passion for creating innovative solutions 
              that bridge the gap between cutting-edge technology and real-world applications. 
              My journey in software development spans multiple technologies and industries.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Specializing in modern web technologies and AI integration, I focus on 
              building scalable applications that deliver exceptional user experiences 
              while solving complex business challenges.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 border border-border rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-semibold mb-4 text-foreground">What I Do</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Full Stack Web Development
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  AI Integration & Chatbots
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  API Development & Integration
                </li>
                <li className="flex items-center text-muted-foreground">
                  <svg className="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Modern UI/UX Design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;