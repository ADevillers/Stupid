'use client';

import React, { useState } from 'react';
import { ConceptList } from '@/components/ConceptList';
import { ChatWindow } from '@/components/ChatWindow';
import { LearningNote } from '@/components/LearningNote';
import { NewConceptModal } from '@/components/NewConceptModal';
import { useConcepts } from '@/context/ConceptContext';
import { Plus, Home } from 'lucide-react';
import Link from 'next/link';

export default function TeachPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeConcept } = useConcepts();

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#2a2a2a] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded hover:bg-[#1a1a1a] text-neutral-500 hover:text-[#e5e5e5] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go to home"
            >
              <Home className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Stupid</h1>
              <p className="text-sm text-neutral-500">Teaching Interface</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Create new concept"
          >
            <Plus className="w-5 h-5" />
            New Concept
          </button>
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Concept List - Darker */}
        <aside className="w-80 bg-[#060606] border-r border-[#1a1a1a] overflow-hidden">
          <ConceptList />
        </aside>

        {/* Center: Chat Window */}
        <main className="flex-1 overflow-hidden bg-[#0a0a0a]">
          <ChatWindow />
        </main>

        {/* Right: Learning Note - No border */}
        {activeConcept && (
          <aside className="w-96 overflow-hidden">
            <LearningNote />
          </aside>
        )}
      </div>

      {/* New Concept Modal */}
      <NewConceptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

