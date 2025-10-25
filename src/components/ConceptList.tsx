'use client';

import React from 'react';
import { useConcepts } from '@/context/ConceptContext';
import { Book, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export const ConceptList: React.FC = () => {
  const { concepts, activeConcept, selectConcept, deleteConcept } = useConcepts();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this concept?')) {
      deleteConcept(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectConcept(id);
    }
  };

  if (concepts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Book className="w-12 h-12 text-neutral-600 mb-3" />
        <p className="text-neutral-500 text-sm">
          No concepts yet.
          <br />
          Type a concept name to start teaching!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Link href="/" className="p-6 border-b border-[#2a2a2a] block hover:bg-[#0a0a0a] transition-colors cursor-pointer">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
          Stupid
        </h1>
        <p className="text-sm text-neutral-500 italic">Teach it... if you can.</p>
      </Link>
      
      <div className="flex-1 overflow-y-auto">
        {concepts.map(concept => (
          <div
            key={concept.id}
            role="button"
            tabIndex={0}
            aria-label={`Select ${concept.name}`}
            className={cn(
              'px-3 py-2.5 border-b border-[#0a0a0a] cursor-pointer transition-colors',
              'hover:bg-[#0d0d0d] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
              activeConcept?.id === concept.id && 'bg-[#141414] border-l-2 border-l-blue-500'
            )}
            onClick={() => selectConcept(concept.id)}
            onKeyDown={(e) => handleKeyDown(e, concept.id)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#e5e5e5] text-sm truncate">{concept.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-600">{concept.category}</span>
                  <span className="text-neutral-700">•</span>
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    concept.comprehensionLevel === 'Novice' && 'bg-amber-500/20 text-amber-400',
                    concept.comprehensionLevel === 'Intermediate' && 'bg-blue-500/20 text-blue-400',
                    concept.comprehensionLevel === 'Expert' && 'bg-emerald-500/20 text-emerald-400'
                  )}>
                    {concept.comprehensionLevel}
                  </span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-xs text-neutral-600">
                    {concept.messages.length}
                  </span>
                </div>
              </div>
              
              <button
                aria-label="Delete concept"
                className="p-1 rounded hover:bg-red-500/20 text-neutral-600 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
                onClick={(e) => handleDelete(e, concept.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

