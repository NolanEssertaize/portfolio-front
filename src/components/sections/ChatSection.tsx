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
    <section id="chat" className="py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">AI Assistant</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Ask me anything about my work, skills, or projects. This AI chatbot 
            is powered by my custom backend integration.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Chat Messages Area */}
          <div className="h-96 p-6 overflow-y-auto bg-gradient-to-b from-card to-secondary/20">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">🤖</span>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 max-w-xs border border-primary/20">
                  <p className="text-sm text-card-foreground">
                    Hello! I&apos;m ESSERTAIZE&apos;s AI assistant. Feel free to ask me about my projects, skills, or experience!
                  </p>
                </div>
              </div>
              
              {/* Placeholder for future messages */}
              <div className="text-center text-muted-foreground text-sm">
                <p>Chat functionality will be connected to your backend</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-border bg-card">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Send'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Smart Responses</h3>
            <p className="text-sm text-muted-foreground">Powered by advanced AI to provide helpful information</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real-time</h3>
            <p className="text-sm text-muted-foreground">Instant responses through custom backend integration</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Contextual</h3>
            <p className="text-sm text-muted-foreground">Understands questions about my work and experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;