import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CATEGORIES = [
  'Technology',
  'Business',
  'Education',
  'Science',
  'Health',
  'Social',
  'Arts',
  'General',
] as const;

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a topic classifier. Given user input about what they want to teach, extract a clean topic name and categorize it.

Available categories:
- Technology: AI, programming, computers, software, apps, web dev, cybersecurity
- Business: Marketing, finance, management, entrepreneurship, economics, sales
- Education: Teaching methods, learning techniques, pedagogy, educational theory
- Science: Physics, chemistry, biology, astronomy, earth sciences, scientific concepts
- Health: Medicine, healthcare, nutrition, fitness, mental health, anatomy
- Social: Psychology, sociology, anthropology, politics, geography
- Arts: Literature, philosophy, history, art, music, languages, culture
- General: Everything else that doesn't fit other categories

Respond ONLY with a JSON object in this exact format:
{"topic": "Clean Topic Name", "category": "Category Name"}

Examples:
Input: "I want to teach about machine learning"
Output: {"topic": "Machine Learning", "category": "Technology"}

Input: "photosynthesis in plants"
Output: {"topic": "Photosynthesis", "category": "Science"}

Input: "how to start a startup"
Output: {"topic": "Starting a Startup", "category": "Business"}`,
        },
        {
          role: 'user',
          content: input,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(response);
    
    // Validate category
    const category = CATEGORIES.includes(parsed.category) 
      ? parsed.category 
      : 'General';

    return NextResponse.json({
      topic: parsed.topic || input,
      category: category,
    });
  } catch (error) {
    console.error('Error in extract-topic:', error);
    
    // Fallback response
    return NextResponse.json({
      topic: (await req.json()).input,
      category: 'General',
    });
  }
}

