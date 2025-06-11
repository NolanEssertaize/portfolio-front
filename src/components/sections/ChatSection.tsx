'use client';
import { useState } from 'react';

const ChatSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsLoading(true);
    // TODO: Connect to your AI backend here
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message })
    // });
    
    setTimeout(() => {
      setIsLoading(false);
      setMessage('');
    }, 1000);
  };

  return (
    <section 
      id="chat" 
      className="py-20 transition-all duration-500"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            AI Assistant
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          ></div>
          <p 
            className="mt-6 max-w-2xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Ask me anything about my work, skills, or projects. This AI chatbot 
            is powered by my custom backend integration.
          </p>
        </div>

        <div className="card-glass rounded-3xl shadow-2xl overflow-hidden">
          {/* Chat Messages Area */}
          <div 
            className="h-96 p-6 overflow-y-auto relative"
            style={{ 
              background: `linear-gradient(to bottom, var(--glass-bg), var(--surface-glass))` 
            }}
          >
            <div className="space-y-6">
              {/* Welcome Message */}
              <div className="flex items-start space-x-4 animate-fade-in-up">
                <div className="glass rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="glass rounded-2xl p-4 max-w-xs border-l-4" style={{ borderLeftColor: 'var(--primary)' }}>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    Hello! I&apos;m ESSERTAIZE&apos;s AI assistant. Feel free to ask me about my projects, skills, or experience!
                  </p>
                </div>
              </div>
              
              {/* Placeholder for future messages */}
              <div className="text-center py-8">
                <div className="glass-subtle rounded-2xl p-6 inline-block">
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Chat functionality will be connected to your backend
                  </p>
                </div>
              </div>

              {/* Floating message bubbles animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute glass-subtle rounded-full animate-float"
                    style={{
                      width: '8px',
                      height: '8px',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                      opacity: 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6 glass-strong border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 glass rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                style={{ 
                  color: 'var(--foreground)',
                  borderColor: 'var(--glass-border)',
                  // Custom focus ring using box-shadow instead of Tailwind's ring
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 2px var(--primary)`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="btn-glass px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: 'var(--primary)' }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Send</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle"
            >
              <span className="text-3xl">🧠</span>
            </div>
            <h3 
              className="font-semibold mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              Smart Responses
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Powered by advanced AI to provide helpful information
            </p>
          </div>
          
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle"
            >
              <span className="text-3xl">⚡</span>
            </div>
            <h3 
              className="font-semibold mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              Real-time
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Instant responses through custom backend integration
            </p>
          </div>
          
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle"
            >
              <span className="text-3xl">🎯</span>
            </div>
            <h3 
              className="font-semibold mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              Contextual
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Understands questions about my work and experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;