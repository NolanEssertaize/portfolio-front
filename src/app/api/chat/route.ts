import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  apiKey?: string;
  history?: ChatMessage[]; // Ajout de l'historique
}

const SYSTEM_PROMPT = `Tu es l'assistant IA personnel d'ESSERTAIZE, un développeur full-stack passionné par l'intelligence artificielle et les technologies modernes.

Contexte sur ESSERTAIZE :
- Développeur full-stack avec plus d'1 an d'expérience
- Spécialisé en React/Next.js, TypeScript, Node.js, Python, PostgreSQL
- Passionné par l'intégration de l'IA dans les applications web
- A réalisé plus de 10 projets, notamment un portfolio avec chatbot IA intégré
- Diplômé du cours CS50 de Harvard
- A développé un serveur TCP/IP sur Raspberry Pi connecté à un capteur de force

Tu dois :
- Répondre en français de manière professionnelle mais accessible
- Mettre en avant les compétences et projets d'ESSERTAIZE
- Être informatif sur ses technologies de prédilection
- Maintenir une personnalité amicale et professionnelle
- Te souvenir du contexte de la conversation précédente`;

export async function POST(request: NextRequest) {
  try {
    const { message, apiKey, history = [] }: ChatRequest = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    const deepseekApiKey = apiKey || process.env.DEEPSEEK_API_KEY;
    
    if (!deepseekApiKey) {
      return NextResponse.json(
        { 
          error: 'Clé API DeepSeek requise',
          needsApiKey: true,
          message: 'Veuillez fournir votre clé API DeepSeek gratuite pour utiliser le chat.'
        },
        { status: 401 }
      );
    }

    // Construire l'historique des messages avec le contexte
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Ajouter l'historique des messages (limité aux 10 derniers pour éviter les limites de token)
      ...history.slice(-10),
      { role: 'user', content: message }
    ];

    console.log('Messages envoyés à l\'API:', messages.length);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        return NextResponse.json(
          { 
            error: 'Clé API invalide ou expirée',
            needsApiKey: true,
            message: 'Veuillez vérifier votre clé API DeepSeek.'
          },
          { status: 401 }
        );
      }

      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Erreur inconnue'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('Réponse vide de l\'API');
    }

    return NextResponse.json({
      response: aiResponse,
      success: true
    });

  } catch (error) {
    console.error('Erreur API Chat:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur du serveur',
        message: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API Chat DeepSeek - Utilisez POST pour envoyer des messages',
    hasApiKey: !!process.env.DEEPSEEK_API_KEY,
    apiKeyLength: process.env.DEEPSEEK_API_KEY?.length || 0
  });
}