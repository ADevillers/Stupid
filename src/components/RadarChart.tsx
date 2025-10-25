'use client';

import React, { useMemo } from 'react';
import { useConcepts } from '@/context/ConceptContext';
import { Category, ComprehensionLevel } from '@/types';

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

// Humorous punchlines based on overall knowledge level
const getPunchline = (overallLevel: ComprehensionLevel, totalConcepts: number): string => {
  if (totalConcepts === 0) {
    return "Your AI is actually fully stupid.";
  }
  
  const punchlines = {
    'Novice': [
      "Your AI is basically a goldfish with amnesia.",
      "Your AI is still figuring out which way is up.",
      "Your AI thinks the earth might be flat.",
      "Your AI is confidently wrong about everything.",
    ],
    'Intermediate': [
      "Your AI is getting there, slowly.",
      "Your AI knows just enough to be dangerous.",
      "Your AI is the less stupid of the cluster.",
      "Your AI occasionally has a good idea.",
    ],
    'Expert': [
      "Your AI is surprisingly not completely useless.",
      "Your AI might actually know something now.",
      "Your AI has transcended basic stupidity.",
      "Your AI is the valedictorian of stupid school.",
    ],
  };
  
  const options = punchlines[overallLevel];
  // Use deterministic selection based on concept count to avoid hydration mismatch
  return options[totalConcepts % options.length];
};

export const RadarChart: React.FC = () => {
  const { concepts } = useConcepts();

  const { categoryScores, overallLevel, punchline } = useMemo(() => {
    const scores = CATEGORIES.map(category => {
      const categoryConcepts = concepts.filter(c => c.category === category);
      
      if (categoryConcepts.length === 0) {
        return { category, score: 0 };
      }

      const avgScore = categoryConcepts.reduce(
        (sum, c) => sum + getLevelScore(c.comprehensionLevel),
        0
      ) / categoryConcepts.length;

      return { category, score: avgScore };
    });

    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const avgOverallScore = concepts.length > 0 ? totalScore / CATEGORIES.length : 0;
    const level = getScoreLevel(avgOverallScore);
    const punch = getPunchline(level, concepts.length);

    return {
      categoryScores: scores,
      overallLevel: level,
      punchline: punch,
    };
  }, [concepts]);

  const size = 240;
  const center = size / 2;
  const maxRadius = (size / 2) - 50;
  const angleStep = (2 * Math.PI) / CATEGORIES.length;

  const getPoint = (angle: number, radius: number) => {
    const x = center + radius * Math.cos(angle - Math.PI / 2);
    const y = center + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  // Generate grid circles
  const gridCircles = [1, 2, 3].map(level => {
    const radius = (maxRadius / 3) * level;
    return radius;
  });

  // Generate axis lines and labels
  const axes = CATEGORIES.map((category, index) => {
    const angle = angleStep * index;
    const endPoint = getPoint(angle, maxRadius);
    const labelPoint = getPoint(angle, maxRadius + 35);
    
    return {
      category,
      angle,
      endPoint,
      labelPoint,
    };
  });

  // Generate data polygon
  const dataPoints = categoryScores.map((data, index) => {
    const angle = angleStep * index;
    const radius = (data.score / 3) * maxRadius;
    return getPoint(angle, radius);
  });

  const pathData = dataPoints.length > 0
    ? `M ${dataPoints[0].x} ${dataPoints[0].y} ` +
      dataPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
      ' Z'
    : '';

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-visible px-4">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid circles */}
          {gridCircles.map((radius, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axes.map((axis, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={axis.endPoint.x}
              y2={axis.endPoint.y}
              stroke="#2a2a2a"
              strokeWidth="1"
            />
          ))}

          {/* Data polygon */}
          {dataPoints.length > 0 && (
            <>
              <path
                d={pathData}
                fill="rgba(59, 130, 246, 0.2)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              {dataPoints.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#3b82f6"
                />
              ))}
            </>
          )}

          {/* Labels */}
          {axes.map((axis, i) => {
            const textAnchor = 
              axis.labelPoint.x < center - 5 ? 'end' : 
              axis.labelPoint.x > center + 5 ? 'start' : 
              'middle';
            
            return (
              <text
                key={i}
                x={axis.labelPoint.x}
                y={axis.labelPoint.y}
                textAnchor={textAnchor}
                fill="#a3a3a3"
                fontSize="13"
                fontWeight="600"
              >
                {axis.category}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Punchline */}
      <p className="text-sm text-neutral-400 italic text-center max-w-md">
        {punchline}
      </p>
    </div>
  );
};

