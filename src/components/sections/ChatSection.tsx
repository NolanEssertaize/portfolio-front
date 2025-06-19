'use client';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasValidApiKey, setHasValidApiKey] = useState(false);
  const [serverHasApiKey, setServerHasApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if server has API key
    fetch('/api/chat')
      .then(res => res.json())
      .then(data => {
        console.log('Server API check:', data);
        if (data.hasApiKey) {
          setServerHasApiKey(true);
          setHasValidApiKey(true);
        } else {
          // Check localStorage for user API key
          const savedApiKey = localStorage.getItem('DEEPSEEK_API_KEY');
          if (savedApiKey) {
            setApiKey(savedApiKey);
            setHasValidApiKey(true);
          } else {
            setShowApiKeyInput(true);
          }
        }
      })
      .catch(err => {
        console.error('Error checking server API key:', err);
        // Fallback to localStorage check
        const savedApiKey = localStorage.getItem('DEEPSEEK_API_KEY');
        if (savedApiKey) {
          setApiKey(savedApiKey);
          setHasValidApiKey(true);
        } else {
          setShowApiKeyInput(true);
        }
      });

    // Charger l'historique des messages depuis localStorage
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sauvegarder l'historique dans localStorage à chaque changement
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('DEEPSEEK_API_KEY', apiKey.trim());
      setHasValidApiKey(true);
      setShowApiKeyInput(false);
    }
  };


  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!hasValidApiKey && !apiKey.trim()) {
      setShowApiKeyInput(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Préparer l'historique pour l'API (format simplifié)
      const chatHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          apiKey: serverHasApiKey ? undefined : apiKey,
          history: chatHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.needsApiKey) {
          setShowApiKeyInput(true);
          setHasValidApiKey(false);
          setServerHasApiKey(false);
        }
        throw new Error(data.message || 'Erreur de communication');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (apiKey && !hasValidApiKey) {
        saveApiKey();
      }

    } catch (error) {
      console.error('Erreur chat:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Erreur: ${error instanceof Error ? error.message : 'Une erreur est survenue'}`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
            Ask me questions about my work, skills or projects. 
            This chatbot is powered by DeepSeek API and keeps memory of our conversation.
          </p>
        </div>

        <div className="card-glass rounded-3xl shadow-2xl overflow-hidden">
          {/* Header avec gestion API Key */}
          <div className="glass-strong p-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center space-x-3">
              <div className="glass rounded-full p-2">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  ESSERTAIZE Assistant
                </h3>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {serverHasApiKey 
                    ? 'Connected' 
                    : hasValidApiKey 
                      ? 'Connected' 
                      : 'Configuration required'
                  } • {messages.length} messages
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="glass-subtle p-2 rounded-lg text-xs"
                  style={{ color: 'var(--muted-foreground)' }}
                  title="Effacer l'historique"
                >
                  🗑️ Clear
                </button>
              )}  
            </div>
          </div>

          {/* Zone des messages */}
          <div 
            className="h-[500px] p-6 overflow-y-auto relative"
            style={{ 
              background: `linear-gradient(to bottom, var(--glass-bg), var(--surface-glass))` 
            }}
          >
            <div className="space-y-6">
              {/* Message de bienvenue */}
              {messages.length === 0 && (
                <div className="flex items-start space-x-4 animate-fade-in-up">
                  <div className="glass rounded-full p-3 flex-shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="glass rounded-2xl p-4 max-w-2xl border-l-4" style={{ borderLeftColor: 'var(--primary)' }}> {/* Changement: max-w-xs -> max-w-2xl */}
                    <ReactMarkdown 
                      components={{
                        // Personnalisation des éléments markdown
                        h1: ({children}) => <h1 className="text-lg font-bold mb-2" style={{ color: 'var(--primary)' }}>{children}</h1>,
                        h2: ({children}) => <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--primary)' }}>{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>{children}</h3>,
                        strong: ({children}) => <strong className="font-semibold" style={{ color: 'var(--primary)' }}>{children}</strong>,
                        em: ({children}) => <em className="italic" style={{ color: 'var(--accent-foreground)' }}>{children}</em>,
                        ul: ({children}) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
                        li: ({children}) => <li className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{children}</li>,
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        code: ({children}) => <code className="glass-subtle px-1 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--primary)' }}>{children}</code>,
                      }}
                    >
                      Hi! I'm ESSERTAIZE's AI assistant. Feel free to ask me questions about his projects, skills or experience!
                      
                      💡 I now keep memory of our conversation.
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Messages de conversation */}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className="glass rounded-full p-3 flex-shrink-0">
                    <span className="text-2xl">{msg.role === 'user' ? '👤' : '🤖'}</span>
                  </div>
                  <div 
                    className={`glass rounded-2xl p-4 max-w-4xl border-l-4 ${msg.role === 'user' ? 'border-r-4 border-l-0' : ''}`} // Changement: max-w-sm -> max-w-4xl
                    style={{ 
                      borderLeftColor: msg.role === 'user' ? 'transparent' : 'var(--primary)',
                      borderRightColor: msg.role === 'user' ? 'var(--accent)' : 'transparent'
                    }}
                  >
                    {msg.role === 'assistant' ? (
                      // Rendu markdown pour les réponses de l'assistant
                      <ReactMarkdown 
                        components={{
                          h1: ({children}) => <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0" style={{ color: 'var(--primary)' }}>{children}</h1>,
                          h2: ({children}) => <h2 className="text-base font-semibold mb-2 mt-3 first:mt-0" style={{ color: 'var(--primary)' }}>{children}</h2>,
                          h3: ({children}) => <h3 className="text-sm font-semibold mb-2 mt-2 first:mt-0" style={{ color: 'var(--primary)' }}>{children}</h3>,
                          strong: ({children}) => <strong className="font-semibold" style={{ color: 'var(--primary)' }}>{children}</strong>,
                          em: ({children}) => <em className="italic" style={{ color: 'var(--accent-foreground)' }}>{children}</em>,
                          ul: ({children}) => <ul className="list-disc list-inside space-y-1 my-3 ml-2">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside space-y-1 my-3 ml-2">{children}</ol>,
                          li: ({children}) => <li className="text-sm leading-relaxed" style={{ color: 'var(--card-foreground)' }}>{children}</li>,
                          p: ({children}) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                          code: ({children}) => <code className="glass-subtle px-2 py-1 rounded text-xs font-mono" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--primary)' }}>{children}</code>,
                          blockquote: ({children}) => <blockquote className="border-l-4 pl-4 my-3 italic" style={{ borderLeftColor: 'var(--primary)', color: 'var(--muted-foreground)' }}>{children}</blockquote>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      // Texte simple pour les messages utilisateur
                      <p 
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ color: 'var(--card-foreground)' }}
                      >
                        {msg.content}
                      </p>
                    )}
                    <p 
                      className="text-xs mt-3 opacity-70"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Indicateur de frappe */}
              {isLoading && (
                <div className="flex items-start space-x-4">
                  <div className="glass rounded-full p-3 flex-shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="glass rounded-2xl p-4 border-l-4" style={{ borderLeftColor: 'var(--primary)' }}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--primary)' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--primary)', animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--primary)', animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Zone de saisie */}
          <div className="p-6 glass-strong border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={hasValidApiKey ? "Ask your questions ..." : "Please contact support"}
                className="flex-1 glass rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                style={{ 
                  color: 'var(--foreground)',
                  borderColor: 'var(--glass-border)',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 2px var(--primary)`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isLoading || !hasValidApiKey}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim() || !hasValidApiKey}
                className="btn-glass px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: 'var(--primary)' }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Send</span>
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

        {/* Fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Contextual Memory
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Remembers your conversation and can reference previous messages
            </p>
          </div>
          
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle">
              <span className="text-3xl">🔐</span>
            </div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Local History
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Your history is saved locally in your browser
            </p>
          </div>
          
          <div className="text-center card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center glass-subtle">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Powered by DeepSeek
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Powered by DeepSeek API with personalized context about ESSERTAIZE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;