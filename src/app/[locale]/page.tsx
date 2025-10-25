'use client';

import React, { useState } from 'react';
import { ConceptList } from '@/components/ConceptList';
import { ChatWindow } from '@/components/ChatWindow';
import { LearningNote } from '@/components/LearningNote';
import { RadarChart } from '@/components/RadarChart';
import { useConcepts } from '@/context/ConceptContext';
import { Category } from '@/types';
import { ArrowRight, Loader2 } from 'lucide-react';

const CATEGORIES: Category[] = [
  'Technology',
  'Business',
  'Education',
  'Science',
  'Health',
  'Social',
  'Arts',
  'General',
];

export default function Home() {
  const { activeConcept, createConcept } = useConcepts();
  const [conceptInput, setConceptInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const extractTopicAndCategory = async (input: string): Promise<{ topic: string; category: Category }> => {
    try {
      const response = await fetch('/api/extract-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to extract topic');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error extracting topic:', error);
      return { topic: input, category: 'General' };
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && conceptInput.trim() && !isExtracting) {
      e.preventDefault();
      setIsExtracting(true);
      
      const { topic, category } = await extractTopicAndCategory(conceptInput.trim());
      createConcept(topic, category);
      setConceptInput('');
      setIsExtracting(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Left Sidebar - Concept List (Always visible) */}
      <aside className="w-80 bg-[#141414] border-r border-[#2a2a2a] overflow-hidden flex-shrink-0">
        <ConceptList />
      </aside>

      {/* Center Panel */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {!activeConcept ? (
          // Welcome screen with radar chart
          <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
            <div className="max-w-2xl w-full space-y-8">
              {/* Logo and Slogan */}
              <div className="text-center mb-8">
                <h1 className="text-7xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Stupid
                </h1>
                <p className="text-xl text-neutral-400 font-light tracking-wide">
                  Teach it... if you can.
                </p>
              </div>

              {/* Radar Chart */}
              <div className="flex justify-center my-12">
                <RadarChart />
              </div>

              {/* Quick Start Input */}
              <div className="relative">
                <input
                  type="text"
                  value={conceptInput}
                  onChange={(e) => setConceptInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What do you want to teach?"
                  className="w-full px-6 py-4 bg-[#141414] border border-[#2a2a2a] rounded-lg text-[#e5e5e5] placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                  aria-label="Concept name input"
                  disabled={isExtracting}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isExtracting ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-neutral-600" />
                  )}
                </div>
              </div>

              <p className="text-sm text-neutral-500 text-center">
                {isExtracting ? 'Analyzing your input...' : 'Press Enter to start teaching a new concept'}
              </p>
            </div>
          </div>
        ) : (
          // Chat Window when concept is active
          <ChatWindow />
        )}
      </main>

      {/* Right Panel - Learning Notes (Only visible when concept is active) */}
      {activeConcept && (
        <aside className="w-96 bg-[#141414] border-l border-[#2a2a2a] overflow-hidden flex-shrink-0">
          <LearningNote />
        </aside>
      )}

    </div>
  );
}
