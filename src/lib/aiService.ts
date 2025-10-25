import { Message, ComprehensionLevel } from '@/types';

const API_URL = '/api/chat';

interface AIResponse {
  reply: string;
  learningNote: string;
  comprehensionLevel: ComprehensionLevel;
}

export const sendMessageToAI = async (
  messages: Message[],
  conceptName: string,
  currentNote: string
): Promise<AIResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        conceptName,
        currentNote,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error communicating with AI:', error);
    
    // Fallback response if API fails
    return {
      reply: "I'm having trouble understanding right now. Could you try explaining that again?",
      learningNote: currentNote,
      comprehensionLevel: 'Novice',
    };
  }
};

