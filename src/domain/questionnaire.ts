import { BMI_LIMIT, calcBmi, HEALTHY_DIET_MIN, type FactorStatuses } from './lifestyle';
import type { LifestyleAnswers, LifestyleDraft } from './types';

export const QUESTIONNAIRE_STEPS = [
  { id: 'body', title: 'Тіло і сон' },
  { id: 'diet', title: 'Харчування' },
  { id: 'habits', title: 'Звички й активність' },
  { id: 'environment', title: 'Середовище' },
] as const;

export type QuestionnaireStepId = (typeof QUESTIONNAIRE_STEPS)[number]['id'];

export const DEFAULT_DRAFT: LifestyleDraft = {
  heightCm: '',
  weightKg: '',
  sleepHours: 7,
  dietHabits: [],
  smoking: null,
  alcohol: null,
  activityPerWeek: 2,
  environment: null,
};

/**
 * Фактори, у яких поле має значення за замовчуванням (повзунки сну й активності, порожній список звичок
 * харчування). Таке значення ще не є відповіддю: воно стає нею, коли людина змінила поле
 * або підтвердила крок кнопкою «Далі».
 */
export type DefaultedFactor = 'sleep' | 'diet' | 'activity';

const DEFAULTED_FACTOR_STEP: Record<DefaultedFactor, QuestionnaireStepId> = {
  sleep: 'body',
  diet: 'diet',
  activity: 'habits',
};

/** Поле чернетки, зміна якого означає відповідь на фактор зі значенням за замовчуванням. */
export const DEFAULTED_FACTOR_FIELD: Record<DefaultedFactor, keyof LifestyleDraft> = {
  sleep: 'sleepHours',
  diet: 'dietHabits',
  activity: 'activityPerWeek',
};

export interface QuestionnaireProgress {
  /** Кроки, які людина підтвердила кнопкою «Далі» (або надіслала анкету). */
  confirmedSteps: QuestionnaireStepId[];
  /** Фактори зі значенням за замовчуванням, поле яких людина змінила. */
  touchedFactors: DefaultedFactor[];
}

export const EMPTY_PROGRESS: QuestionnaireProgress = { confirmedSteps: [], touchedFactors: [] };

export function isDefaultedFactorAnswered(factor: DefaultedFactor, progress: QuestionnaireProgress): boolean {
  return progress.touchedFactors.includes(factor) || progress.confirmedSteps.includes(DEFAULTED_FACTOR_STEP[factor]);
}

/** Перший крок, що не проходить перевірку; null, якщо вся анкета заповнена коректно. */
export function firstInvalidStepIndex(draft: LifestyleDraft): number | null {
  const index = QUESTIONNAIRE_STEPS.findIndex((step) => hasErrors(validateStep(step.id, draft)));
  return index === -1 ? null : index;
}

export const HEIGHT_RANGE = { min: 100, max: 230 } as const;
export const WEIGHT_RANGE = { min: 30, max: 250 } as const;

export type StepErrors = Partial<
  Record<'heightCm' | 'weightKg' | 'smoking' | 'alcohol' | 'environment', string>
>;

/** Перетворює введений текст на число; приймає і крапку, і кому. */
export function parseNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateStep(step: QuestionnaireStepId, draft: LifestyleDraft): StepErrors {
  const errors: StepErrors = {};

  if (step === 'body') {
    const height = parseNumber(draft.heightCm);
    if (height === null) {
      errors.heightCm = 'Вкажіть зріст у сантиметрах.';
    } else if (height >= 1 && height <= 2.5) {
      errors.heightCm = `Схоже, це зріст у метрах. Вкажіть у сантиметрах, наприклад ${Math.round(height * 100)}.`;
    } else if (height < HEIGHT_RANGE.min || height > HEIGHT_RANGE.max) {
      errors.heightCm = `Зріст має бути від ${HEIGHT_RANGE.min} до ${HEIGHT_RANGE.max} см.`;
    }

    const weight = parseNumber(draft.weightKg);
    if (weight === null) {
      errors.weightKg = 'Вкажіть вагу в кілограмах.';
    } else if (weight < WEIGHT_RANGE.min || weight > WEIGHT_RANGE.max) {
      errors.weightKg = `Вага має бути від ${WEIGHT_RANGE.min} до ${WEIGHT_RANGE.max} кг.`;
    }
  }

  if (step === 'habits') {
    if (draft.smoking === null) errors.smoking = 'Оберіть варіант про куріння.';
    if (draft.alcohol === null) errors.alcohol = 'Оберіть варіант про алкоголь.';
  }

  if (step === 'environment' && draft.environment === null) {
    errors.environment = 'Оберіть, яке повітря там, де ви живете.';
  }

  return errors;
}

export function hasErrors(errors: StepErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Повертає перевірені відповіді або null, якщо анкета ще не заповнена коректно. */
export function toAnswers(draft: LifestyleDraft): LifestyleAnswers | null {
  const allValid = QUESTIONNAIRE_STEPS.every((step) => !hasErrors(validateStep(step.id, draft)));
  const heightCm = parseNumber(draft.heightCm);
  const weightKg = parseNumber(draft.weightKg);

  if (
    !allValid ||
    heightCm === null ||
    weightKg === null ||
    draft.smoking === null ||
    draft.alcohol === null ||
    draft.environment === null
  ) {
    return null;
  }

  return {
    heightCm,
    weightKg,
    sleepHours: draft.sleepHours,
    dietHabits: [...draft.dietHabits],
    smoking: draft.smoking,
    alcohol: draft.alcohol,
    activityPerWeek: draft.activityPerWeek,
    environment: draft.environment,
  };
}

/**
 * Попередня оцінка факторів за незаповненою анкетою (для живого підсумку).
 * Фактор, на який ще немає відповіді, у результаті відсутній. Значення повзунків і порожній
 * список звичок за замовчуванням відповіддю не вважаються, доки людина їх не змінила
 * або не підтвердила крок.
 */
export function evaluateDraftFactors(
  draft: LifestyleDraft,
  progress: QuestionnaireProgress,
): Partial<FactorStatuses> {
  const statuses: Partial<FactorStatuses> = {};
  if (isDefaultedFactorAnswered('activity', progress)) statuses.activity = draft.activityPerWeek >= 1;
  if (isDefaultedFactorAnswered('diet', progress)) statuses.diet = draft.dietHabits.length >= HEALTHY_DIET_MIN;
  if (isDefaultedFactorAnswered('sleep', progress)) statuses.sleep = draft.sleepHours >= 7 && draft.sleepHours <= 9;

  const bodyErrors = validateStep('body', draft);
  const height = parseNumber(draft.heightCm);
  const weight = parseNumber(draft.weightKg);
  if (!hasErrors(bodyErrors) && height !== null && weight !== null) {
    statuses.bmi = calcBmi(height, weight) < BMI_LIMIT;
  }
  if (draft.smoking !== null) statuses.smoking = draft.smoking !== 'current';
  if (draft.alcohol !== null) statuses.alcohol = draft.alcohol === 'none' || draft.alcohol === 'rarely';
  if (draft.environment !== null) statuses.environment = draft.environment === 'clean';

  return statuses;
}

/** Чернетка з уже надісланих відповідей: щоб скасувати незбережені зміни анкети. */
export function answersToDraft(answers: LifestyleAnswers): LifestyleDraft {
  return {
    heightCm: String(answers.heightCm),
    weightKg: String(answers.weightKg),
    sleepHours: answers.sleepHours,
    dietHabits: [...answers.dietHabits],
    smoking: answers.smoking,
    alcohol: answers.alcohol,
    activityPerWeek: answers.activityPerWeek,
    environment: answers.environment,
  };
}

/**
 * Чи розійшлася чернетка анкети з відповідями, за якими побудовано звіт.
 * Незавершена чи некоректна чернетка теж вважається зміною: звіт її не відображає.
 * Порядок звичок харчування не має значення.
 */
export function isDraftChanged(draft: LifestyleDraft, answers: LifestyleAnswers): boolean {
  const current = toAnswers(draft);
  if (!current) return true;
  const sameDiet =
    current.dietHabits.length === answers.dietHabits.length &&
    current.dietHabits.every((habit) => answers.dietHabits.includes(habit));
  return !(
    sameDiet &&
    current.heightCm === answers.heightCm &&
    current.weightKg === answers.weightKg &&
    current.sleepHours === answers.sleepHours &&
    current.smoking === answers.smoking &&
    current.alcohol === answers.alcohol &&
    current.activityPerWeek === answers.activityPerWeek &&
    current.environment === answers.environment
  );
}
