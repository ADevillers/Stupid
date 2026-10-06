import { NextRequest, NextResponse } from 'next/server';
import { ComprehensionLevel } from '@/types';

export const runtime = 'nodejs';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
  conceptName: string;
  currentNote: string;
}

function levelFromUserCount(count: number): ComprehensionLevel {
  if (count >= 4) return 'Expert';
  if (count >= 2) return 'Intermediate';
  return 'Novice';
}

function buildLearningNote(conceptName: string, userMessages: Message[]): string {
  const bullets = userMessages
    .map((m) => m.content.trim())
    .filter(Boolean)
    .map((line) => `- ${line}`);

  if (bullets.length === 0) {
    return `# ${conceptName}\n\nI don't know anything about this yet.`;
  }

  return `# ${conceptName}\n\n## What I've been taught\n\n${bullets.join('\n')}`;
}

function buildReply(
  conceptName: string,
  lastUser: string,
  level: ComprehensionLevel,
  taughtCount: number
): string {
  const snippet =
    lastUser.length > 160 ? `${lastUser.slice(0, 157).trimEnd()}…` : lastUser;

  if (taughtCount <= 1) {
    return `Hmm… "${snippet}" — I think that has something to do with ${conceptName}, but I'm still confused. Can you explain it like I've never heard of it before?`;
  }

  if (level === 'Intermediate') {
    return `Okay, so from what you said ("${snippet}"), I'm starting to piece ${conceptName} together. What happens next, or is there an important detail I'm missing?`;
  }

  return `I think I get ${conceptName} now — especially "${snippet}". Is there a trickier edge case or example that would push me further?`;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { messages = [], conceptName = 'this concept' } = body;

    const userMessages = messages.filter(
      (m) => m.role === 'user' && typeof m.content === 'string'
    );
    const taughtCount = userMessages.length;
    const lastUser =
      userMessages[userMessages.length - 1]?.content?.trim() ||
      'something about this topic';

    const comprehensionLevel = levelFromUserCount(taughtCount);
    const learningNote = buildLearningNote(conceptName, userMessages);
    const reply = buildReply(conceptName, lastUser, comprehensionLevel, taughtCount);

    return NextResponse.json({
      reply,
      learningNote,
      comprehensionLevel,
    });
  } catch (error) {
    console.error('Error in chat API:', error);

    return NextResponse.json(
      {
        reply: "I'm having trouble thinking right now. Could you try explaining that again?",
        learningNote: `# Error\n\nI encountered an error while processing your message.`,
        comprehensionLevel: 'Novice' as ComprehensionLevel,
      },
      { status: 500 }
    );
  }
}
