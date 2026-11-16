import { describe, expect, it } from 'vitest';
import { MOCK_DISEASE_REPORTS } from '../data/mockReports';
import {
  countEffectAlleles,
  coverageLevel,
  geneticCategory,
  markerContribution,
  sortMarkers,
} from './genetics';
import type { Marker } from './types';

describe('geneticCategory', () => {
  it('межі зон: нижні 20 % — низька, верхні 20 % — висока', () => {
    expect(geneticCategory(0)).toBe('low');
    expect(geneticCategory(19.9)).toBe('low');
    expect(geneticCategory(20)).toBe('intermediate');
    expect(geneticCategory(79.9)).toBe('intermediate');
    expect(geneticCategory(80)).toBe('high');
    expect(geneticCategory(100)).toBe('high');
  });
});

describe('внесок маркера', () => {
  const risk: Marker = { rsid: 'rs1', gene: 'A', genotype: 'CT', effectAllele: 'T', weight: 0.31 };
  const protective: Marker = { rsid: 'rs2', gene: 'B', genotype: 'TT', effectAllele: 't', weight: -0.2 };

  it('рахує кількість ефектних алелів незалежно від регістру', () => {
    expect(countEffectAlleles('CT', 'T')).toBe(1);
    expect(countEffectAlleles('tt', 'T')).toBe(2);
    expect(countEffectAlleles('CC', 'T')).toBe(0);
  });

  it('множить кількість алелів на вагу', () => {
    expect(markerContribution(risk)).toBe(0.31);
    expect(markerContribution(protective)).toBe(-0.4);
  });

  it('сортує за внеском у обидва боки', () => {
    expect(sortMarkers([protective, risk], 'desc').map((m) => m.rsid)).toEqual(['rs1', 'rs2']);
    expect(sortMarkers([risk, protective], 'asc').map((m) => m.rsid)).toEqual(['rs2', 'rs1']);
  });
});

describe('coverageLevel', () => {
  const base = { markersFound: 1, markersTotal: 1, excludedAmbiguous: 0 };
  it('визначає рівень повноти за часткою покритої ваги', () => {
    expect(coverageLevel({ ...base, weightCoveredPct: 80 })).toBe('full');
    expect(coverageLevel({ ...base, weightCoveredPct: 60 })).toBe('partial');
    expect(coverageLevel({ ...base, weightCoveredPct: 59 })).toBe('limited');
  });
});

describe('мокові звіти', () => {
  it('мають коректну структуру', () => {
    for (const report of Object.values(MOCK_DISEASE_REPORTS)) {
      expect(report.percentile >= 0 && report.percentile <= 100).toBe(true);
      expect(report.coverage.markersFound <= report.coverage.markersTotal).toBe(true);
      for (const marker of report.topMarkers) {
        expect(marker.rsid).toMatch(/^rs\d+$/);
        expect(marker.genotype).toMatch(/^[ACGT]{2}$/);
        expect(marker.effectAllele).toMatch(/^[ACGT]$/);
      }
    }
  });
});
