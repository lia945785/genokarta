import type { CoverageLevel } from '../../domain/genetics';
import type { GeneticCategory, LifestyleCategory } from '../../domain/types';

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
