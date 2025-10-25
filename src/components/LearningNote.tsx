'use client';

import React, { useState, useEffect } from 'react';
import { useConcepts } from '@/context/ConceptContext';
import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadarChart } from './RadarChart';

export const LearningNote: React.FC = () => {
  const { activeConcept } = useConcepts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!activeConcept) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500 p-6">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-neutral-600" />
          <p className="text-sm">No learning note yet</p>
        </div>
      </div>
    );
  }

  const getComprehensionColor = () => {
    switch (activeConcept.comprehensionLevel) {
      case 'Novice':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Intermediate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Expert':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getProgressPercentage = () => {
    switch (activeConcept.comprehensionLevel) {
      case 'Novice':
        return '10%';
      case 'Intermediate':
        return '60%';
      case 'Expert':
        return '100%';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] p-4 gap-4 overflow-y-auto">
      {/* Radar Chart Card */}
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg p-4">
        <div className="flex justify-center">
          <RadarChart />
        </div>
      </div>

      {/* Markdown Note Card */}
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg p-6 flex-1">
        {/* Comprehension indicator */}
        <div className="mb-4 pb-4 border-b border-[#2a2a2a] space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Comprehension:</span>
            <span className={cn('px-3 py-1 rounded-full text-xs font-medium border', getComprehensionColor())}>
              {activeConcept.comprehensionLevel}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div
              style={{ width: getProgressPercentage() }}
              className={cn(
                'h-full transition-all duration-500',
                activeConcept.comprehensionLevel === 'Novice' && 'bg-amber-500',
                activeConcept.comprehensionLevel === 'Intermediate' && 'bg-blue-500',
                activeConcept.comprehensionLevel === 'Expert' && 'bg-emerald-500'
              )}
            />
          </div>
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => <h1 className="text-2xl font-bold text-[#e5e5e5] mb-4" {...props} />,
              h2: ({ ...props }) => <h2 className="text-xl font-bold text-[#e5e5e5] mb-3 mt-6" {...props} />,
              h3: ({ ...props }) => <h3 className="text-lg font-semibold text-[#e5e5e5] mb-2 mt-4" {...props} />,
              p: ({ ...props }) => <p className="text-neutral-400 mb-3 leading-relaxed" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc list-inside text-neutral-400 mb-3 space-y-1" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal list-inside text-neutral-400 mb-3 space-y-1" {...props} />,
              li: ({ ...props }) => <li className="text-neutral-400" {...props} />,
              strong: ({ ...props }) => <strong className="font-semibold text-[#e5e5e5]" {...props} />,
              em: ({ ...props }) => <em className="italic text-neutral-400" {...props} />,
              code: ({ ...props }) => (
                <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm text-blue-400 font-mono" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-[#2a2a2a] pl-4 italic text-neutral-500 my-4" {...props} />
              ),
            }}
          >
            {activeConcept.learningNote}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer at bottom */}
      <div className="bg-[#1a1a1a] border border-[#333333] border-t-0 rounded-b-lg shadow-lg px-6 py-3 -mt-4">
        <p className="text-xs text-neutral-600 text-center">
          {mounted ? `Last updated: ${activeConcept.updatedAt.toLocaleString()}` : 'Last updated: ...'}
        </p>
      </div>
    </div>
  );
};

