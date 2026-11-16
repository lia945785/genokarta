import type { CoverageLevel } from '../../domain/genetics';
import type { GeneticCategory, LifestyleCategory } from '../../domain/types';

/**
 * Семантичні кольори статусів: низький рівень або сприятливо — зелений,
 * середній — бурштиновий, несприятливо — кораловий. Висока генетична схильність —
 * приглушений рожевий: її не змінити, тож це «підвищено», а не тривога.
 * Назва тону відповідає класам .chip--{tone} і .tone-{tone} у стилях.
 */
export type Tone = 'green' | 'amber' | 'coral' | 'rose' | 'accent';

export const GENETIC_TONE: Record<GeneticCategory, Tone> = {
  low: 'green',
  intermediate: 'amber',
  high: 'rose',
};

export const LIFESTYLE_TONE: Record<LifestyleCategory, Tone> = {
  favorable: 'green',
  intermediate: 'amber',
  unfavorable: 'coral',
};

export const COVERAGE_TONE: Record<CoverageLevel, Tone> = {
  full: 'green',
  partial: 'amber',
  limited: 'coral',
};
