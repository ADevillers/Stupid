'use client';

import React, { useState } from 'react';
import { useConcepts } from '@/context/ConceptContext';
import { Category } from '@/types';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const NewConceptModal: React.FC<NewConceptModalProps> = ({ isOpen, onClose }) => {
  const { createConcept } = useConcepts();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createConcept(name.trim(), category);
      setName('');
      setCategory('General');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-[#1a1a1a] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#2a2a2a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-2xl font-bold text-[#e5e5e5]">
            New Concept
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded hover:bg-[#2a2a2a] text-neutral-500 hover:text-[#e5e5e5] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="concept-name" className="block text-sm font-medium text-neutral-400 mb-2">
              What do you want to teach?
            </label>
            <input
              id="concept-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Photosynthesis, Quantum Physics, Recursion..."
              className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#141414] text-[#e5e5e5] placeholder-neutral-600"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="concept-category" className="block text-sm font-medium text-neutral-400 mb-2">
              Category
            </label>
            <select
              id="concept-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-3 border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#141414] text-[#e5e5e5]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#2a2a2a] rounded-lg text-neutral-400 font-medium hover:bg-[#141414] transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-[#2a2a2a] disabled:text-neutral-600 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

