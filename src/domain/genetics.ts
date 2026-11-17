import type { Coverage, GeneticCategory, Marker } from './types';

export function geneticCategory(percentile: number): GeneticCategory {
  if (percentile >= 80) return 'high';
  if (percentile < 20) return 'low';
  return 'intermediate';
}

export function countEffectAlleles(genotype: string, effectAllele: string): number {
  const allele = effectAllele.toUpperCase();
  return [...genotype.toUpperCase()].filter((letter) => letter === allele).length;
}

export function markerContribution(marker: Marker): number {
  const raw = countEffectAlleles(marker.genotype, marker.effectAllele) * marker.weight;
  return Math.round(raw * 100) / 100;
}

export type SortDirection = 'desc' | 'asc';

export function sortMarkers(markers: readonly Marker[], direction: SortDirection): Marker[] {
  const sign = direction === 'desc' ? -1 : 1;
  return [...markers].sort((a, b) => sign * (markerContribution(a) - markerContribution(b)));
}

export type CoverageLevel = 'full' | 'partial' | 'limited';

export function coverageLevel(coverage: Coverage): CoverageLevel {
  if (coverage.weightCoveredPct >= 80) return 'full';
  if (coverage.weightCoveredPct >= 60) return 'partial';
  return 'limited';
}

export function markersFoundPct(coverage: Coverage): number {
  if (coverage.markersTotal === 0) return 0;
  return Math.round((coverage.markersFound / coverage.markersTotal) * 100);
}
