'use client';
import { useState } from 'react';

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const skills = {
    frontend: [
      { name: 'React/Next.js', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '🔷' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
    ],
    backend: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'PostgreSQL', level: 85, icon: '🐘' },
      { name: 'API Development', level: 90, icon: '🔌' },
    ],
    ai: [
      { name: 'OpenAI API', level: 85, icon: '🤖' },
      { name: 'LangChain', level: 75, icon: '🔗' },
      { name: 'Machine Learning', level: 70, icon: '🧠' },
      { name: 'Chatbot Development', level: 90, icon: '💬' },
    ],
  };

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'ai', label: 'AI & ML', icon: '🤖' },
  ];

  return (
    <section 
      id="skills" 
      className="py-20 transition-all duration-500"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Skills & Expertise
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p 
            className="mt-6 max-w-2xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Proficient in modern technologies with a focus on creating scalable, 
            efficient solutions that drive business growth.
          </p>
        </div>

        {/* Skill Categories Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-strong rounded-2xl p-2 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'glass shadow-lg scale-105'
                    : 'hover:glass-subtle'
                }`}
                style={{
                  color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
                  backgroundColor: activeTab === tab.id ? 'var(--glass-bg)' : 'transparent'
                }}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills[activeTab as keyof typeof skills].map((skill, index) => (
            <div 
              key={skill.name} 
              className="card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4 glass-subtle rounded-xl p-3">
                  {skill.icon}
                </div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {skill.name}
                </h3>
              </div>
              
              {/* Progress Bar Container */}
              <div className="relative">
                <div 
                  className="w-full h-4 glass-subtle rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--glass-bg)' }}
                >
                  <div 
                    className="h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ 
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)`
                    }}
                  >
                    {/* Animated shimmer effect */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, var(--background) 50%, transparent 100%)',
                        animation: 'shimmer 2s infinite'
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Percentage Display */}
                <div className="flex justify-between items-center mt-3">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Proficiency
                  </span>
                  <span 
                    className="text-sm font-bold glass-subtle px-3 py-1 rounded-full"
                    style={{ color: 'var(--primary)' }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute glass-subtle rounded-full animate-float"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;