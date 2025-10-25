// Core type definitions for Project STUPID

export type ComprehensionLevel = 'Novice' | 'Intermediate' | 'Expert';

export type Category = 
  | 'Technology' 
  | 'Business' 
  | 'Education'
  | 'Science' 
  | 'Health'
  | 'Social'
  | 'Arts'
  | 'General';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Concept {
  id: string;
  name: string;
  category: Category;
  messages: Message[];
  learningNote: string;
  comprehensionLevel: ComprehensionLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryProgress {
  category: Category;
  level: ComprehensionLevel;
  conceptCount: number;
}

