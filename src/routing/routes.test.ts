import { describe, expect, it } from 'vitest';
import { parseRoute, resolveRoute, routeToHash } from './routes';

describe('parseRoute', () => {
  it('розбирає hash-адреси', () => {
    expect(parseRoute('#upload')).toBe('upload');
    expect(parseRoute('#/results')).toBe('results');
    expect(parseRoute('#')).toBe('home');
    expect(parseRoute('')).toBe('home');
    expect(parseRoute('#/unknown')).toBe('home');
  });

  it('routeToHash і parseRoute узгоджені', () => {
    for (const route of ['home', 'upload', 'lifestyle', 'results'] as const) {
      expect(parseRoute(routeToHash(route))).toBe(route);
    }
  });
});

describe('resolveRoute', () => {
  const empty = { hasFile: false, hasDiseases: false, hasReport: false };

  it('не пускає до анкети без файлу й хвороб', () => {
    expect(resolveRoute('lifestyle', empty)).toBe('upload');
    expect(resolveRoute('lifestyle', { ...empty, hasFile: true })).toBe('upload');
    expect(resolveRoute('lifestyle', { ...empty, hasFile: true, hasDiseases: true })).toBe('lifestyle');
  });

  it('без звіту веде на найближчий незавершений крок', () => {
    expect(resolveRoute('results', empty)).toBe('upload');
    expect(resolveRoute('results', { ...empty, hasFile: true, hasDiseases: true })).toBe('lifestyle');
    expect(resolveRoute('results', { hasFile: true, hasDiseases: true, hasReport: true })).toBe('results');
  });

  it('головна й завантаження доступні завжди', () => {
    expect(resolveRoute('home', empty)).toBe('home');
    expect(resolveRoute('upload', empty)).toBe('upload');
  });
});
