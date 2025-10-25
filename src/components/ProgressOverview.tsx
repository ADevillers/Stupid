'use client';

import React, { useMemo } from 'react';
import { useConcepts } from '@/context/ConceptContext';
import { Category, CategoryProgress, ComprehensionLevel } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = [
  'Technology',
  'Business',
  'Education',
  'Science',
  'Health',
  'Social',
  'Arts',
];

const getLevelScore = (level: ComprehensionLevel): number => {
  switch (level) {
    case 'Novice': return 1;
    case 'Intermediate': return 2;
    case 'Expert': return 3;
  }
};

const getScoreLevel = (avgScore: number): ComprehensionLevel => {
  if (avgScore < 1.5) return 'Novice';
  if (avgScore < 2.5) return 'Intermediate';
  return 'Expert';
};

export const ProgressOverview: React.FC = () => {
  const { concepts } = useConcepts();

  const categoryProgress = useMemo((): CategoryProgress[] => {
    return CATEGORIES.map(category => {
      const categoryConcepts = concepts.filter(c => c.category === category);
      
      if (categoryConcepts.length === 0) {
        return {
          category,
          level: 'Novice',
          conceptCount: 0,
        };
      }

      const avgScore = categoryConcepts.reduce(
        (sum, c) => sum + getLevelScore(c.comprehensionLevel),
        0
      ) / categoryConcepts.length;

      return {
        category,
        level: getScoreLevel(avgScore),
        conceptCount: categoryConcepts.length,
      };
    });
  }, [concepts]);

  const getLevelColor = (level: ComprehensionLevel) => {
    switch (level) {
      case 'Novice':
        return 'bg-amber-500';
      case 'Intermediate':
        return 'bg-sky-500';
      case 'Expert':
        return 'bg-emerald-500';
    }
  };

  const getLevelWidth = (level: ComprehensionLevel) => {
    switch (level) {
      case 'Novice':
        return 'w-1/3';
      case 'Intermediate':
        return 'w-2/3';
      case 'Expert':
        return 'w-full';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-800 mb-4">Knowledge Progress</h3>
      
      {categoryProgress.map(({ category, level, conceptCount }) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-stone-700">{category}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">{conceptCount} concept(s)</span>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                level === 'Novice' && 'bg-amber-100 text-amber-700',
                level === 'Intermediate' && 'bg-sky-100 text-sky-700',
                level === 'Expert' && 'bg-emerald-100 text-emerald-700'
              )}>
                {level}
              </span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-500',
                getLevelWidth(level),
                getLevelColor(level)
              )}
            />
          </div>
        </div>
      ))}

      {concepts.length === 0 && (
        <p className="text-sm text-stone-500 text-center py-4">
          No concepts yet. Start teaching to see progress!
        </p>
      )}
    </div>
  );
};

