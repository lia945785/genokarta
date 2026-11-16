import { describe, expect, it } from 'vitest';
import type { AnalysisReport, GenomeFileInfo, LifestyleAnswers } from '../domain/types';
import { analysisReducer, initialState } from './analysisReducer';

const FILE: GenomeFileInfo = { name: 'demo.txt', sizeBytes: 100, format: '23andme', markerCount: 10 };

const REPORT: AnalysisReport = {
  createdAt: '2026-11-14T10:00:00.000Z',
  fileName: 'demo.txt',
  markersInFile: 10,
  ancestry: { group: 'Європейська', probability: 0.9, confident: true },
  diseases: [],
};

const ANSWERS: LifestyleAnswers = {
  heightCm: 170,
  weightKg: 65,
  sleepHours: 8,
  dietHabits: [],
  smoking: 'never',
  alcohol: 'none',
  activityPerWeek: 2,
  environment: 'clean',
};

describe('analysisReducer', () => {
  it('зберігає порядок хвороб незалежно від порядку вибору', () => {
    let state = analysisReducer(initialState, { type: 'diseaseToggled', id: 'alzheimer' });
    state = analysisReducer(state, { type: 'diseaseToggled', id: 'asthma' });
    state = analysisReducer(state, { type: 'diseaseToggled', id: 'cad' });
    expect(state.diseaseIds).toEqual(['cad', 'asthma', 'alzheimer']);
    state = analysisReducer(state, { type: 'diseaseToggled', id: 'cad' });
    expect(state.diseaseIds).toEqual(['asthma', 'alzheimer']);
  });

  it('скидає старий звіт, коли змінюється файл', () => {
    let state = analysisReducer(initialState, { type: 'reportReceived', report: REPORT, answers: ANSWERS });
    expect(state.report).toEqual(REPORT);
    state = analysisReducer(state, { type: 'fileAccepted', file: FILE });
    expect(state.report).toBeNull();
    expect(state.file).toEqual(FILE);
  });

  it('оновлює лише змінені поля анкети', () => {
    const state = analysisReducer(initialState, { type: 'lifestyleChanged', patch: { heightCm: '180' } });
    expect(state.lifestyle.heightCm).toBe('180');
    expect(state.lifestyle.sleepHours).toBe(initialState.lifestyle.sleepHours);
  });

  it('повертає початковий стан після скидання', () => {
    const state = analysisReducer({ ...initialState, file: FILE }, { type: 'reset' });
    expect(state).toEqual(initialState);
  });

  it('позначає змінений повзунок як відповідь, а інші поля — ні', () => {
    let state = analysisReducer(initialState, { type: 'lifestyleChanged', patch: { heightCm: '180' } });
    expect(state.progress.touchedFactors).toEqual([]);
    state = analysisReducer(state, { type: 'lifestyleChanged', patch: { sleepHours: 8 } });
    state = analysisReducer(state, { type: 'lifestyleChanged', patch: { sleepHours: 9 } });
    expect(state.progress.touchedFactors).toEqual(['sleep']);
  });

  it('запам’ятовує підтверджені кроки без повторів', () => {
    let state = analysisReducer(initialState, { type: 'stepConfirmed', step: 'body' });
    state = analysisReducer(state, { type: 'stepConfirmed', step: 'body' });
    expect(state.progress.confirmedSteps).toEqual(['body']);
  });
});
