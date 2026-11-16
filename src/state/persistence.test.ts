import { describe, expect, it } from 'vitest';
import { analysisReducer, initialState } from './analysisReducer';
import { loadState, saveState, STORAGE_KEY } from './persistence';

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

describe('persistence', () => {
  it('відновлює збережений стан', () => {
    const storage = memoryStorage();
    let state = analysisReducer(initialState, { type: 'diseaseToggled', id: 'cad' });
    state = analysisReducer(state, { type: 'lifestyleChanged', patch: { heightCm: '170', sleepHours: 8 } });
    saveState(storage, state);
    expect(loadState(storage)).toEqual(state);
  });

  it('ігнорує пошкоджені, застарілі й чужі записи', () => {
    expect(loadState(memoryStorage({ [STORAGE_KEY]: '{not json' }))).toBeNull();
    expect(loadState(memoryStorage({ [STORAGE_KEY]: JSON.stringify({ version: 0, state: initialState }) }))).toBeNull();
    expect(loadState(memoryStorage())).toBeNull();
    expect(loadState(null)).toBeNull();
  });

  it('відкидає невідомі хвороби й доповнює відсутні поля', () => {
    const saved = {
      version: 1,
      state: { file: null, diseaseIds: ['cad', 'flu'], lifestyle: { heightCm: '170' }, progress: {} },
    };
    const state = loadState(memoryStorage({ [STORAGE_KEY]: JSON.stringify(saved) }));
    expect(state?.diseaseIds).toEqual(['cad']);
    expect(state?.lifestyle.sleepHours).toBe(initialState.lifestyle.sleepHours);
    expect(state?.progress).toEqual(initialState.progress);
  });

  it('не падає, якщо сховище недоступне для запису', () => {
    const broken = {
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
    };
    expect(() => saveState(broken, initialState)).not.toThrow();
  });
});
