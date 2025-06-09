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
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Proficient in modern technologies with a focus on creating scalable, 
            efficient solutions that drive business growth.
          </p>
        </div>

        {/* Skill Categories Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-xl p-2 shadow-lg border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills[activeTab as keyof typeof skills].map((skill) => (
            <div key={skill.name} className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-semibold text-card-foreground">{skill.name}</h3>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-muted-foreground mt-2">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;