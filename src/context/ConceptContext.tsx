'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Concept, Message, Category, ComprehensionLevel } from '@/types';

interface ConceptContextType {
  concepts: Concept[];
  activeConcept: Concept | null;
  createConcept: (name: string, category: Category) => void;
  selectConcept: (id: string) => void;
  addMessage: (conceptId: string, message: Message) => void;
  updateLearningNote: (conceptId: string, note: string, level: ComprehensionLevel) => void;
  deleteConcept: (id: string) => void;
}

const ConceptContext = createContext<ConceptContextType | undefined>(undefined);

// Demo data for initial concepts
const DEMO_CONCEPTS: Concept[] = [
  {
    id: 'demo-1',
    name: 'Neural Networks',
    category: 'Technology',
    comprehensionLevel: 'Intermediate',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    learningNote: `# Neural Networks

## What I Understand

A **neural network** is a computing system inspired by biological neural networks in the human brain. It's a fundamental concept in machine learning and artificial intelligence.

### Key Components

1. **Neurons (Nodes)**: Basic processing units that receive inputs and produce outputs
2. **Layers**: Networks are organized in layers
   - Input layer: Receives the initial data
   - Hidden layers: Process and transform the data
   - Output layer: Produces the final result
3. **Weights**: Each connection between neurons has a weight that determines the strength of the signal
4. **Activation Functions**: Functions that decide whether a neuron should "fire" or not

### How It Works

Neural networks learn through a process called **training**:
- Data is fed through the network (forward propagation)
- The network makes predictions
- Errors are calculated by comparing predictions to actual values
- The network adjusts its weights to reduce errors (backpropagation)
- This process repeats many times until the network learns patterns

### Applications

Neural networks are used in:
- Image recognition
- Natural language processing
- Speech recognition
- Game playing (like AlphaGo)
- Autonomous vehicles

## Current Understanding Level

I now grasp the basic architecture and training process of neural networks. I understand that they're powerful tools for pattern recognition but require significant data and computational resources.`,
    messages: [
      {
        id: 'msg-demo-1-1',
        role: 'user',
        content: 'Let me teach you about neural networks. They are computing systems inspired by biological neural networks in the brain.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-1-2',
        role: 'assistant',
        content: 'Interesting! So neural networks are meant to work similarly to how brains work? Can you tell me more about how they are structured?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-1-3',
        role: 'user',
        content: 'Yes! Neural networks have layers of neurons. There\'s an input layer that receives data, hidden layers that process it, and an output layer that gives the final result. Each neuron connects to neurons in the next layer with weighted connections.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-1-4',
        role: 'assistant',
        content: 'That makes sense! So the data flows through these layers from input to output. What are these "weights" and why are they important?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-1-5',
        role: 'user',
        content: 'Weights determine how much influence one neuron has on another. During training, the network adjusts these weights through backpropagation to minimize errors and learn patterns from data.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-1-6',
        role: 'assistant',
        content: 'Ah! So training is about adjusting the weights so the network gets better at making predictions. That\'s like learning from mistakes. What kind of problems can neural networks solve?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: 'demo-2',
    name: 'Active Learning Strategies',
    category: 'Education',
    comprehensionLevel: 'Intermediate',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    learningNote: `# Active Learning Strategies

## Core Concept

**Active learning** is an educational approach where students engage with material through activities rather than passively receiving information. It's based on the principle that learning is enhanced when students actively participate in the learning process.

### Key Principles

1. **Engagement**: Students are active participants, not passive listeners
2. **Practice**: Learning by doing rather than just listening
3. **Immediate Feedback**: Students get quick responses to their work
4. **Reflection**: Time to think about what they're learning

### Common Active Learning Techniques

- **Think-Pair-Share**: Students think individually, discuss with a partner, then share with the class
- **Problem-Based Learning**: Real-world problems drive the learning process
- **Peer Teaching**: Students explain concepts to each other
- **Case Studies**: Analyzing real situations to apply knowledge
- **Interactive Discussions**: Structured conversations that promote critical thinking

### Benefits

Active learning has been shown to:
- Improve retention of information
- Develop critical thinking skills
- Increase student motivation
- Promote deeper understanding
- Better prepare students for real-world applications

### Implementation Challenges

- Requires more preparation time for educators
- Can be harder to assess than traditional methods
- Some students may resist the change from passive learning
- Needs appropriate class size and resources

## My Understanding

I now understand that active learning shifts the focus from teaching to learning, making students responsible for their own education through engagement and practice.`,
    messages: [
      {
        id: 'msg-demo-2-1',
        role: 'user',
        content: 'Active learning is an approach where students engage directly with the material through activities, rather than just listening to lectures.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-2-2',
        role: 'assistant',
        content: 'So instead of just sitting and listening, students actually do things? What kind of activities are we talking about?',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-2-3',
        role: 'user',
        content: 'Exactly! Activities like think-pair-share where students think individually, discuss with a partner, and share with the class. Or problem-based learning where real problems drive the learning.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-2-4',
        role: 'assistant',
        content: 'I see! So active learning makes students more involved. Does research show this works better than traditional lectures?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: 'demo-3',
    name: 'Product-Market Fit',
    category: 'Business',
    comprehensionLevel: 'Novice',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    learningNote: `# Product-Market Fit

## What I'm Learning

**Product-market fit** is when a product successfully satisfies a strong market demand. It's one of the most important concepts in entrepreneurship and startup success.

### Basic Understanding

From what I understand so far:
- It means your product solves a real problem that people care about
- People are willing to pay for your solution
- The market is big enough to sustain a business
- Customers are satisfied and keep using the product

### Signs of Product-Market Fit

I'm learning that you might have product-market fit when:
- Users are enthusiastically using your product
- Word-of-mouth growth is happening naturally
- It's becoming hard to keep up with demand
- Customer retention rates are high

### Why It Matters

Product-market fit is crucial because:
- Most startups fail due to lack of product-market fit
- It validates that your business idea has real potential
- It's the foundation for scaling a business
- Without it, growth efforts are wasteful

## Current Status

I'm still learning the basics of this concept. I need to understand more about how to measure product-market fit and what steps to take to achieve it.`,
    messages: [
      {
        id: 'msg-demo-3-1',
        role: 'user',
        content: 'Product-market fit is when your product successfully satisfies a strong market demand. It\'s the sweet spot where what you\'re offering matches what people actually want.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-3-2',
        role: 'assistant',
        content: 'So it\'s about making something that people actually want and will use? How do you know when you\'ve achieved product-market fit?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'msg-demo-3-3',
        role: 'user',
        content: 'Good question! Signs include strong user engagement, natural word-of-mouth growth, high retention rates, and users being upset if they couldn\'t use your product anymore.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ],
  },
];

export const ConceptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [concepts, setConcepts] = useState<Concept[]>(DEMO_CONCEPTS);
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);

  const createConcept = useCallback((name: string, category: Category) => {
    const newConcept: Concept = {
      id: `concept-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      category,
      messages: [],
      learningNote: '# Learning in Progress...\n\nI don\'t know anything about this yet. Teach me!',
      comprehensionLevel: 'Novice',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConcepts(prev => [...prev, newConcept]);
    setActiveConcept(newConcept);
  }, []);

  const selectConcept = useCallback((id: string) => {
    const concept = concepts.find(c => c.id === id);
    if (concept) {
      setActiveConcept(concept);
    }
  }, [concepts]);

  const addMessage = useCallback((conceptId: string, message: Message) => {
    setConcepts(prev => prev.map(concept => {
      if (concept.id === conceptId) {
        const updated = {
          ...concept,
          messages: [...concept.messages, message],
          updatedAt: new Date(),
        };
        
        // Update active concept if it's the current one
        if (activeConcept?.id === conceptId) {
          setActiveConcept(updated);
        }
        
        return updated;
      }
      return concept;
    }));
  }, [activeConcept]);

  const updateLearningNote = useCallback((conceptId: string, note: string, level: ComprehensionLevel) => {
    setConcepts(prev => prev.map(concept => {
      if (concept.id === conceptId) {
        const updated = {
          ...concept,
          learningNote: note,
          comprehensionLevel: level,
          updatedAt: new Date(),
        };
        
        // Update active concept if it's the current one
        if (activeConcept?.id === conceptId) {
          setActiveConcept(updated);
        }
        
        return updated;
      }
      return concept;
    }));
  }, [activeConcept]);

  const deleteConcept = useCallback((id: string) => {
    setConcepts(prev => prev.filter(c => c.id !== id));
    if (activeConcept?.id === id) {
      setActiveConcept(null);
    }
  }, [activeConcept]);

  return (
    <ConceptContext.Provider
      value={{
        concepts,
        activeConcept,
        createConcept,
        selectConcept,
        addMessage,
        updateLearningNote,
        deleteConcept,
      }}
    >
      {children}
    </ConceptContext.Provider>
  );
};

export const useConcepts = () => {
  const context = useContext(ConceptContext);
  if (!context) {
    throw new Error('useConcepts must be used within ConceptProvider');
  }
  return context;
};

