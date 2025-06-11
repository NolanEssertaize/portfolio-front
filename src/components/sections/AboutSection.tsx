const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-20 transition-all duration-500"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            About Me
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="card-glass rounded-2xl p-8">
            <h3 
              className="text-2xl font-semibold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Passionate Developer & Problem Solver
            </h3>
            <p 
              className="mb-6 leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              I&apos;m a full-stack developer with a passion for creating innovative solutions 
              that bridge the gap between cutting-edge technology and real-world applications. 
              My journey in software development spans multiple technologies and industries.
            </p>
            <p 
              className="mb-8 leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Specializing in modern web technologies and AI integration, I focus on 
              building scalable applications that deliver exceptional user experiences 
              while solving complex business challenges.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center glass rounded-xl p-4">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  1+
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Years Experience
                </div>
              </div>
              <div className="text-center glass rounded-xl p-4">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  10+
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Projects Completed
                </div>
              </div>
              <div className="text-center glass rounded-xl p-4">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  100%
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Overhall Satisfaction
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="card-glass rounded-2xl p-8">
              <h4 
                className="text-xl font-semibold mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                What I Do
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center group">
                  <div 
                    className="w-5 h-5 mr-4 rounded-full flex items-center justify-center glass-subtle group-hover:glass transition-all duration-300"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-3 h-3" fill="var(--background)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    Full Stack Web Development
                  </span>
                </li>
                <li className="flex items-center group">
                  <div 
                    className="w-5 h-5 mr-4 rounded-full flex items-center justify-center glass-subtle group-hover:glass transition-all duration-300"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-3 h-3" fill="var(--background)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    AI Integration & Chatbots
                  </span>
                </li>
                <li className="flex items-center group">
                  <div 
                    className="w-5 h-5 mr-4 rounded-full flex items-center justify-center glass-subtle group-hover:glass transition-all duration-300"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-3 h-3" fill="var(--background)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    API Development & Integration
                  </span>
                </li>
                <li className="flex items-center group">
                  <div 
                    className="w-5 h-5 mr-4 rounded-full flex items-center justify-center glass-subtle group-hover:glass transition-all duration-300"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-3 h-3" fill="var(--background)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    Modern UI/UX Design
                  </span>
                </li>
              </ul>
              
              {/* Decorative glass orbs */}
              <div className="absolute -top-4 -right-4 w-8 h-8 glass-subtle rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 glass-subtle rounded-full animate-float animation-delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;