import type { GeneticCategory, LifestyleCategory } from './types';

export const GENETIC_ORDER: readonly GeneticCategory[] = ['low', 'intermediate', 'high'];
export const LIFESTYLE_ORDER: readonly LifestyleCategory[] = [
  'favorable',
  'intermediate',
  'unfavorable',
];

export const GENETIC_LABEL: Record<GeneticCategory, string> = {
  low: 'Низька',
  intermediate: 'Середня',
  high: 'Висока',
};

export const LIFESTYLE_LABEL: Record<LifestyleCategory, string> = {
  favorable: 'Сприятливий',
  intermediate: 'Проміжний',
  unfavorable: 'Несприятливий',
};

/**
 * Відносний рівень ризику клітинки матриці від 0 до 4.
 * Використовується лише для відтінку клітинки, а не як числова оцінка ризику.
 */
export function riskLevel(genetic: GeneticCategory, lifestyle: LifestyleCategory): number {
  return GENETIC_ORDER.indexOf(genetic) + LIFESTYLE_ORDER.indexOf(lifestyle);
}
