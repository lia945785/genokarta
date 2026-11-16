import { describe, expect, it } from 'vitest';
import {
  applyScenario,
  calcBmi,
  changedFactorIds,
  formatBmi,
  categorizeLifestyle,
  describeFactorValue,
  evaluateFactors,
  type FactorStatuses,
} from './lifestyle';
import type { FactorId, LifestyleAnswers } from './types';

const HEALTHY: LifestyleAnswers = {
  heightCm: 170,
  weightKg: 65,
  sleepHours: 8,
  dietHabits: ['fruit', 'vegetables', 'fish', 'nuts'],
  smoking: 'never',
  alcohol: 'rarely',
  activityPerWeek: 3,
  environment: 'clean',
};

const KHERA_FACTORS: FactorId[] = ['smoking', 'bmi', 'activity', 'diet'];

function statusesWith(healthy: FactorId[]): FactorStatuses {
  return {
    bmi: healthy.includes('bmi'),
    smoking: healthy.includes('smoking'),
    activity: healthy.includes('activity'),
    diet: healthy.includes('diet'),
    sleep: healthy.includes('sleep'),
    alcohol: healthy.includes('alcohol'),
    environment: healthy.includes('environment'),
  };
}

describe('calcBmi', () => {
  it('рахує індекс маси тіла з округленням до десятих', () => {
    expect(calcBmi(170, 65)).toBe(22.5);
    expect(calcBmi(172, 91.5)).toBe(30.9);
  });
});

describe('evaluateFactors', () => {
  it('усі фактори сприятливі для здорових відповідей', () => {
    const statuses = evaluateFactors(HEALTHY);
    expect(Object.values(statuses).every(Boolean)).toBe(true);
  });

  it('позначає несприятливі фактори', () => {
    const statuses = evaluateFactors({
      ...HEALTHY,
      weightKg: 95,
      smoking: 'current',
      activityPerWeek: 0,
      dietHabits: ['fruit'],
      sleepHours: 5.5,
      alcohol: 'daily',
      environment: 'polluted',
    });
    expect(Object.values(statuses).some(Boolean)).toBe(false);
  });

  it('колишній курець вважається таким, що не курить', () => {
    expect(evaluateFactors({ ...HEALTHY, smoking: 'former' }).smoking).toBe(true);
  });
});

describe('categorizeLifestyle (правило Khera et al., 2016)', () => {
  it('3–4 сприятливі фактори з 4 — сприятливий спосіб життя', () => {
    expect(categorizeLifestyle(statusesWith(KHERA_FACTORS), KHERA_FACTORS)).toBe('favorable');
    expect(categorizeLifestyle(statusesWith(['smoking', 'bmi', 'activity']), KHERA_FACTORS)).toBe('favorable');
  });

  it('2 з 4 — проміжний', () => {
    expect(categorizeLifestyle(statusesWith(['smoking', 'diet']), KHERA_FACTORS)).toBe('intermediate');
  });

  it('0–1 з 4 — несприятливий', () => {
    expect(categorizeLifestyle(statusesWith(['activity']), KHERA_FACTORS)).toBe('unfavorable');
    expect(categorizeLifestyle(statusesWith([]), KHERA_FACTORS)).toBe('unfavorable');
  });
});

describe('applyScenario', () => {
  it('робить обрані фактори сприятливими й не змінює вихідний об’єкт', () => {
    const original = statusesWith([]);
    const scenario = applyScenario(original, ['smoking', 'bmi']);
    expect(scenario.smoking).toBe(true);
    expect(scenario.bmi).toBe(true);
    expect(scenario.diet).toBe(false);
    expect(original.smoking).toBe(false);
  });
});

describe('describeFactorValue', () => {
  it('правильно узгоджує числівники', () => {
    expect(describeFactorValue('activity', { ...HEALTHY, activityPerWeek: 1 })).toBe('1 день на тиждень');
    expect(describeFactorValue('activity', { ...HEALTHY, activityPerWeek: 3 })).toBe('3 дні на тиждень');
    expect(describeFactorValue('activity', { ...HEALTHY, activityPerWeek: 5 })).toBe('5 днів на тиждень');
  });
});

describe('formatBmi', () => {
  it('завжди показує один знак після коми, як у розрахунку', () => {
    expect(formatBmi(24.2)).toBe('24,2');
    expect(formatBmi(30)).toBe('30,0');
    expect(formatBmi(calcBmi(175, 91.9))).toBe('30,0');
  });
});

describe('changedFactorIds', () => {
  it('повертає лише фактори зі зміненими відповідями', () => {
    expect(changedFactorIds(HEALTHY, HEALTHY)).toEqual([]);
    expect(changedFactorIds(HEALTHY, { ...HEALTHY, weightKg: 95, smoking: 'current' }).sort()).toEqual([
      'bmi',
      'smoking',
    ]);
  });
});
