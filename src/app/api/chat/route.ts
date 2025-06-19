import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  apiKey?: string;
}

const SYSTEM_PROMPT = `PrePrompt to custom`;

export async function POST(request: NextRequest) {
  try {
    const { message, apiKey }: ChatRequest = await request.json();

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

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ];

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
  return NextResponse.json(
    { message: 'API Chat DeepSeek - Utilisez POST pour envoyer des messages' },
    { status: 200 }
  );
}