import { Category } from '@/types';

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  Technology: [
    'ai',
    'machine learning',
    'programming',
    'computer',
    'software',
    'code',
    'algorithm',
    'neural',
    'web',
    'cyber',
    'api',
    'database',
    'javascript',
    'python',
    'typescript',
  ],
  Business: [
    'marketing',
    'finance',
    'startup',
    'management',
    'sales',
    'economy',
    'business',
    'entrepreneur',
  ],
  Education: [
    'teaching',
    'learning',
    'pedagogy',
    'education',
    'classroom',
    'curriculum',
    'student',
  ],
  Science: [
    'physics',
    'chemistry',
    'biology',
    'photosynthesis',
    'astronomy',
    'science',
    'quantum',
    'molecule',
    'evolution',
  ],
  Health: [
    'medicine',
    'health',
    'nutrition',
    'fitness',
    'anatomy',
    'mental',
    'doctor',
    'disease',
  ],
  Social: [
    'psychology',
    'sociology',
    'politics',
    'society',
    'culture',
    'anthropology',
    'geography',
  ],
  Arts: [
    'literature',
    'philosophy',
    'history',
    'art',
    'music',
    'language',
    'painting',
    'poetry',
  ],
  General: [],
};

function titleCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) =>
      word.length === 0 ? word : word[0].toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export function classifyTopicLocally(input: string): {
  topic: string;
  category: Category;
} {
  const normalized = input.trim().toLowerCase();
  let best: Category = 'General';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [
    Category,
    string[],
  ][]) {
    if (category === 'General') continue;
    const score = keywords.reduce(
      (acc, keyword) => (normalized.includes(keyword) ? acc + 1 : acc),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }

  return {
    topic: titleCase(input),
    category: best,
  };
}
