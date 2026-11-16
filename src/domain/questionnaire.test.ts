import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DRAFT,
  answersToDraft,
  EMPTY_PROGRESS,
  evaluateDraftFactors,
  firstInvalidStepIndex,
  isDraftChanged,
  parseNumber,
  toAnswers,
  validateStep,
} from './questionnaire';
import type { LifestyleDraft } from './types';

const COMPLETE: LifestyleDraft = {
  ...DEFAULT_DRAFT,
  heightCm: '172',
  weightKg: '68,5',
  smoking: 'never',
  alcohol: 'rarely',
  environment: 'moderate',
};

describe('parseNumber', () => {
  it('приймає крапку й кому', () => {
    expect(parseNumber('68.5')).toBe(68.5);
    expect(parseNumber(' 68,5 ')).toBe(68.5);
  });

  it('повертає null для порожнього або нечислового значення', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('сімдесят')).toBeNull();
  });
});

describe('validateStep', () => {
  it('вимагає зріст і вагу на першому кроці', () => {
    const errors = validateStep('body', DEFAULT_DRAFT);
    expect(Object.keys(errors).sort()).toEqual(['heightCm', 'weightKg']);
  });

  it('перевіряє допустимий діапазон зросту', () => {
    expect(validateStep('body', { ...COMPLETE, heightCm: '17' }).heightCm).toContain('від 100 до 230');
  });

  it('вимагає відповідей про куріння й алкоголь', () => {
    const errors = validateStep('habits', DEFAULT_DRAFT);
    expect(Object.keys(errors).sort()).toEqual(['alcohol', 'smoking']);
  });

  it('крок харчування не має обов’язкових полів', () => {
    expect(validateStep('diet', DEFAULT_DRAFT)).toEqual({});
  });
});

describe('toAnswers', () => {
  it('повертає null, поки анкета не заповнена', () => {
    expect(toAnswers(DEFAULT_DRAFT)).toBeNull();
    expect(toAnswers({ ...COMPLETE, environment: null })).toBeNull();
  });

  it('перетворює чернетку на числові відповіді', () => {
    const answers = toAnswers(COMPLETE);
    expect(answers?.heightCm).toBe(172);
    expect(answers?.weightKg).toBe(68.5);
    expect(answers?.environment).toBe('moderate');
  });
});

describe('evaluateDraftFactors', () => {
  it('не вважає значення за замовчуванням відповіддю', () => {
    expect(evaluateDraftFactors(DEFAULT_DRAFT, EMPTY_PROGRESS)).toEqual({});
  });

  it('рахує повзунок після зміни поля або підтвердження кроку', () => {
    const touched = evaluateDraftFactors(DEFAULT_DRAFT, { confirmedSteps: [], touchedFactors: ['sleep'] });
    expect(Object.keys(touched)).toEqual(['sleep']);

    const confirmed = evaluateDraftFactors(DEFAULT_DRAFT, { confirmedSteps: ['diet'], touchedFactors: [] });
    expect(confirmed).toEqual({ diet: false });
  });

  it('додає ІМТ і звички після відповіді', () => {
    const statuses = evaluateDraftFactors({ ...COMPLETE, weightKg: '95', smoking: 'current' }, EMPTY_PROGRESS);
    expect(statuses.bmi).toBe(false);
    expect(statuses.smoking).toBe(false);
    expect(statuses.environment).toBe(false);
  });
});

describe('firstInvalidStepIndex', () => {
  it('знаходить перший крок із помилкою', () => {
    expect(firstInvalidStepIndex(DEFAULT_DRAFT)).toBe(0);
    expect(firstInvalidStepIndex({ ...COMPLETE, environment: null })).toBe(3);
    expect(firstInvalidStepIndex(COMPLETE)).toBeNull();
  });
});

describe('isDraftChanged', () => {
  const answers = toAnswers(COMPLETE)!;

  it('бачить, що чернетка збігається з відповідями звіту', () => {
    expect(isDraftChanged(COMPLETE, answers)).toBe(false);
    expect(isDraftChanged(answersToDraft(answers), answers)).toBe(false);
  });

  it('помічає змінену відповідь і незавершену чернетку', () => {
    expect(isDraftChanged({ ...COMPLETE, weightKg: '80' }, answers)).toBe(true);
    expect(isDraftChanged({ ...COMPLETE, heightCm: '' }, answers)).toBe(true);
  });

  it('не зважає на порядок звичок харчування', () => {
    const withDiet = toAnswers({ ...COMPLETE, dietHabits: ['vegetables', 'fish'] })!;
    expect(isDraftChanged({ ...COMPLETE, dietHabits: ['fish', 'vegetables'] }, withDiet)).toBe(false);
  });
});

describe('validateStep: зріст у метрах', () => {
  it('підказує перевести метри в сантиметри', () => {
    expect(validateStep('body', { ...COMPLETE, heightCm: '1,75' }).heightCm).toBe(
      'Схоже, це зріст у метрах. Вкажіть у сантиметрах, наприклад 175.',
    );
  });
});
