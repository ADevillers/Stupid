'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useConcepts } from '@/context/ConceptContext';
import { Message } from '@/types';
import { sendMessageToAI } from '@/lib/aiService';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatWindow: React.FC = () => {
  const { activeConcept, addMessage, updateLearningNote } = useConcepts();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConcept?.messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !activeConcept || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // Add user message
    addMessage(activeConcept.id, userMessage);
    setInput('');
    setIsLoading(true);

    try {
      // Get AI response
      const response = await sendMessageToAI(
        [...activeConcept.messages, userMessage],
        activeConcept.name,
        activeConcept.learningNote
      );

      // Add AI message
      const aiMessage: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
      };

      addMessage(activeConcept.id, aiMessage);

      // Update learning note and comprehension level
      updateLearningNote(
        activeConcept.id,
        response.learningNote,
        response.comprehensionLevel
      );
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeConcept) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500">
        <div className="text-center">
          <p className="text-lg mb-2">No concept selected</p>
          <p className="text-sm">Create or select a concept to start teaching!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <h2 className="text-xl font-semibold text-[#e5e5e5]">{activeConcept.name}</h2>
        <p className="text-sm text-neutral-500 mt-1">
          Teaching session • {activeConcept.category}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-20 py-6 space-y-4">
        {activeConcept.messages.length === 0 && (
          <div className="text-center text-neutral-500 py-8">
            <p className="text-sm">
              Start teaching me about <strong className="text-neutral-400">{activeConcept.name}</strong>!
              <br />
              I know nothing yet, so please be patient.
            </p>
          </div>
        )}

        {activeConcept.messages.map(message => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[55%] rounded-lg px-4 py-3',
                message.role === 'user'
                  ? 'bg-blue-500/20 text-[#e5e5e5] border border-blue-500/30'
                  : 'bg-[#141414] text-[#e5e5e5] border border-[#2a2a2a]'
              )}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              {mounted && (
                <p className="text-xs text-neutral-600 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[55%] bg-[#141414] rounded-lg px-4 py-3 border border-[#2a2a2a]">
              <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-20 py-4 border-t border-[#2a2a2a]">
        <div className="flex gap-3 items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Teach me something..."
            className="flex-1 px-4 py-3 border border-[#2a2a2a] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#141414] text-[#e5e5e5] placeholder-neutral-600"
            rows={1}
            disabled={isLoading}
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
              input.trim() && !isLoading
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-[#2a2a2a] text-neutral-600 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-neutral-600 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

