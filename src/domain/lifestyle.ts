import { formatNumber, plural } from '../utils/format';
import type {
  Alcohol,
  DietHabitId,
  Environment,
  FactorId,
  LifestyleAnswers,
  LifestyleCategory,
  Smoking,
} from './types';

/**
 * Модель способу життя побудовано за дослідженням
 * Khera A. V. et al. Genetic Risk, Adherence to a Healthy Lifestyle, and Coronary Disease.
 * NEJM, 2016. Там використано чотири фактори (не курити, ІМТ < 30, фізична активність
 * щонайменше раз на тиждень, здорове харчування), а спосіб життя вважається сприятливим,
 * якщо виконано 3–4 з них, проміжним — 2, несприятливим — 0–1.
 * Сон, алкоголь і середовище додано для інших хвороб як ілюстративні фактори.
 */

export const DIET_HABITS: ReadonlyArray<{ id: DietHabitId; label: string }> = [
  { id: 'fruit', label: 'Їм фрукти щодня' },
  { id: 'vegetables', label: 'Їм овочі щодня' },
  { id: 'wholeGrains', label: 'Обираю цільнозернові продукти' },
  { id: 'fish', label: 'Їм рибу хоча б раз на тиждень' },
  { id: 'nuts', label: 'Їм горіхи або бобові кілька разів на тиждень' },
  { id: 'lowProcessedMeat', label: 'Рідко їм ковбаси та інше оброблене м’ясо' },
  { id: 'lowSugaryDrinks', label: 'Рідко п’ю солодкі напої' },
  { id: 'lowRefined', label: 'Рідко їм випічку з білого борошна' },
];

/** Харчування вважається здоровим, якщо виконано хоча б половину звичок. */
export const HEALTHY_DIET_MIN = Math.ceil(DIET_HABITS.length / 2);

export const SMOKING_OPTIONS: ReadonlyArray<{ value: Smoking; label: string }> = [
  { value: 'never', label: 'Ніколи не курив(ла)' },
  { value: 'former', label: 'Курив(ла), але кинув(ла)' },
  { value: 'current', label: 'Курю зараз' },
];

export const ALCOHOL_OPTIONS: ReadonlyArray<{ value: Alcohol; label: string }> = [
  { value: 'none', label: 'Не вживаю' },
  { value: 'rarely', label: 'Рідко, кілька разів на місяць' },
  { value: 'weekly', label: 'Кілька разів на тиждень' },
  { value: 'daily', label: 'Щодня' },
];

export const ENVIRONMENT_OPTIONS: ReadonlyArray<{
  value: Environment;
  label: string;
  hint: string;
}> = [
  { value: 'clean', label: 'Чисте повітря', hint: 'Село, передмістя, поруч парк або ліс' },
  { value: 'moderate', label: 'Звичайне місто', hint: 'Житловий район без великих доріг поруч' },
  {
    value: 'polluted',
    label: 'Забруднене повітря',
    hint: 'Промисловий район або жвава траса поруч',
  },
];

export const FACTOR_INFO: Record<
  FactorId,
  { name: string; healthyRule: string; improvement: string }
> = {
  bmi: { name: 'Маса тіла', healthyRule: 'ІМТ нижче 30', improvement: 'Знизити ІМТ нижче 30' },
  smoking: { name: 'Куріння', healthyRule: 'не курити', improvement: 'Кинути курити' },
  activity: {
    name: 'Фізична активність',
    healthyRule: 'щонайменше раз на тиждень по 30 хв',
    improvement: 'Займатися спортом щотижня',
  },
  diet: {
    name: 'Харчування',
    healthyRule: `щонайменше ${HEALTHY_DIET_MIN} з ${DIET_HABITS.length} корисних звичок`,
    improvement: 'Додати корисні звички в харчування',
  },
  sleep: { name: 'Сон', healthyRule: '7–9 годин на добу', improvement: 'Спати 7–9 годин' },
  alcohol: {
    name: 'Алкоголь',
    healthyRule: 'не вживати або рідко',
    improvement: 'Вживати алкоголь рідше',
  },
  environment: {
    name: 'Середовище',
    healthyRule: 'чисте повітря',
    improvement: 'Більше часу на чистому повітрі: парк, ліс, за містом',
  },
};

/** Для кожного фактора: true — сприятливо, false — варто покращити. */
export type FactorStatuses = Record<FactorId, boolean>;

/** Індекс маси тіла, округлений до десятих. */
/** Межа ІМТ для сприятливого фактора (Khera et al., 2016): нижче 30. */
export const BMI_LIMIT = 30;

export function calcBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function evaluateFactors(answers: LifestyleAnswers): FactorStatuses {
  return {
    bmi: calcBmi(answers.heightCm, answers.weightKg) < BMI_LIMIT,
    smoking: answers.smoking !== 'current',
    activity: answers.activityPerWeek >= 1,
    diet: answers.dietHabits.length >= HEALTHY_DIET_MIN,
    sleep: answers.sleepHours >= 7 && answers.sleepHours <= 9,
    alcohol: answers.alcohol === 'none' || answers.alcohol === 'rarely',
    environment: answers.environment === 'clean',
  };
}

export function countHealthy(statuses: FactorStatuses, relevant: readonly FactorId[]): number {
  return relevant.filter((factor) => statuses[factor]).length;
}

/**
 * Категорія способу життя за часткою сприятливих факторів.
 * Для чотирьох факторів це точно відповідає правилу Khera et al.:
 * 3–4 → сприятливий, 2 → проміжний, 0–1 → несприятливий.
 */
export function categorizeLifestyle(
  statuses: FactorStatuses,
  relevant: readonly FactorId[],
): LifestyleCategory {
  if (relevant.length === 0) return 'intermediate';
  const share = countHealthy(statuses, relevant) / relevant.length;
  if (share >= 0.75) return 'favorable';
  if (share >= 0.5) return 'intermediate';
  return 'unfavorable';
}

/** Сценарій «що, якщо»: обрані фактори вважаються виправленими. */
export function applyScenario(
  statuses: FactorStatuses,
  improved: readonly FactorId[],
): FactorStatuses {
  const next: FactorStatuses = { ...statuses };
  for (const factor of improved) {
    next[factor] = true;
  }
  return next;
}

function labelOf<T extends string>(
  options: ReadonlyArray<{ value: T; label: string }>,
  value: T,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/** Значення фактора словами для звіту. */
const bmiFormatter = new Intl.NumberFormat('uk-UA', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/**
 * ІМТ завжди з одним знаком після коми — саме те значення, яке оцінюється (calcBmi округлює
 * до десятих). Тож «30,0» поруч із нормою «ІМТ нижче 30» читається однозначно, а не як «30».
 */
export function formatBmi(bmi: number): string {
  return bmiFormatter.format(bmi);
}

export function describeFactorValue(factor: FactorId, answers: LifestyleAnswers): string {
  switch (factor) {
    case 'bmi':
      return `ІМТ ${formatBmi(calcBmi(answers.heightCm, answers.weightKg))}`;
    case 'smoking':
      return labelOf(SMOKING_OPTIONS, answers.smoking);
    case 'activity':
      return `${answers.activityPerWeek} ${plural(answers.activityPerWeek, ['день', 'дні', 'днів'])} на тиждень`;
    case 'diet':
      return `${answers.dietHabits.length} з ${DIET_HABITS.length} корисних звичок`;
    case 'sleep':
      return `${formatNumber(answers.sleepHours)} год на добу`;
    case 'alcohol':
      return labelOf(ALCOHOL_OPTIONS, answers.alcohol);
    case 'environment':
      return labelOf(ENVIRONMENT_OPTIONS, answers.environment);
  }
}

/**
 * Фактори, відповідь на які змінилася між двома наборами відповідей (порівнюємо так, як їх
 * показує звіт). Потрібно, щоб позначити «змінено» у звіті після його оновлення.
 */
export function changedFactorIds(previous: LifestyleAnswers, next: LifestyleAnswers): FactorId[] {
  return (Object.keys(FACTOR_INFO) as FactorId[]).filter(
    (factor) => describeFactorValue(factor, previous) !== describeFactorValue(factor, next),
  );
}
