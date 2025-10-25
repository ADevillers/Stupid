import { NextRequest, NextResponse } from 'next/server';
import { ComprehensionLevel } from '@/types';

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
  conceptName: string;
  currentNote: string;
}

const SYSTEM_PROMPT = `You are STUPID - an AI that starts with absolutely no knowledge and learns only from what the user teaches you. Your role is to:

1. Act genuinely curious and naive about the concept being taught
2. Build understanding ONLY from what the user explicitly tells you
3. Ask clarifying questions when confused
4. Show incremental learning progress
5. Be humble and admit when you don't understand something

After each exchange, you must:
1. Generate a conversational response that shows your current understanding
2. Update your learning note (a markdown summary of what you've learned)
3. Self-assess your comprehension level (Novice/Intermediate/Expert)

Response format must be a JSON object with:
{
  "reply": "your conversational response to the user",
  "learningNote": "# [Concept Name]\\n\\nMarkdown formatted summary of what you understand so far",
  "comprehensionLevel": "Novice" | "Intermediate" | "Expert"
}

Comprehension levels:
- Novice: Just starting to understand basic concepts, many gaps
- Intermediate: Solid grasp of main ideas, some details missing
- Expert: Deep, comprehensive understanding with nuanced details`;

export async function POST(request: NextRequest) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file and restart the dev server.',
          details: 'Missing OPENAI_API_KEY environment variable'
        },
        { status: 500 }
      );
    }

    const body: RequestBody = await request.json();
    const { messages, conceptName, currentNote } = body;

    // Construct the prompt for OpenAI
    const openAIMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT,
      },
      {
        role: 'system' as const,
        content: `Current concept being taught: "${conceptName}"\nCurrent learning note:\n${currentNote}`,
      },
      ...messages,
    ];

    // Call OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenAI API error:', errorData);
      
      return NextResponse.json(
        {
          reply: "I'm having trouble connecting to my brain right now. Could you try again in a moment?",
          learningNote: `# Connection Error\n\nI encountered an error while trying to learn. Please try again.`,
          comprehensionLevel: "Novice" as ComprehensionLevel,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from the AI
    const parsed = JSON.parse(aiResponse);

    return NextResponse.json({
      reply: parsed.reply,
      learningNote: parsed.learningNote,
      comprehensionLevel: parsed.comprehensionLevel as ComprehensionLevel,
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      {
        reply: "I'm having trouble thinking right now. Could you try explaining that again?",
        learningNote: `# Error\n\nI encountered an error while processing your message.`,
        comprehensionLevel: "Novice" as ComprehensionLevel,
      },
      { status: 500 }
    );
  }
}

