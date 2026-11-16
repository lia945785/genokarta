import { describe, expect, it } from 'vitest';
import { DISEASE_IDS, DISEASES } from './diseases';
import { MOCK_DISEASE_REPORTS } from './mockReports';

describe('довідник хвороб', () => {
  it('для кожної хвороби є опис, фактори й моковий звіт', () => {
    for (const id of DISEASE_IDS) {
      expect(DISEASES[id].id).toBe(id);
      expect(DISEASES[id].factors.length >= 3).toBe(true);
      expect(MOCK_DISEASE_REPORTS[id].diseaseId).toBe(id);
      expect(DISEASES[id].checkup.trim().length).toBeGreaterThan(0);
    }
  });

  it('список хвороб не містить повторів', () => {
    expect(new Set(DISEASE_IDS).size).toBe(DISEASE_IDS.length);
  });

  it('генотипи й ефектні алелі в моках мають коректний вигляд', () => {
    for (const id of DISEASE_IDS) {
      for (const marker of MOCK_DISEASE_REPORTS[id].topMarkers) {
        expect(marker.rsid).toMatch(/^rs\d+$/);
        expect(marker.genotype).toMatch(/^[ACGT]{2}$/);
        expect(marker.effectAllele).toMatch(/^[ACGT]$/);
      }
    }
  });
});
