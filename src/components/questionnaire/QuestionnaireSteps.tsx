import {
  ALCOHOL_OPTIONS,
  DIET_HABITS,
  ENVIRONMENT_OPTIONS,
  FACTOR_INFO,
  SMOKING_OPTIONS,
} from '../../domain/lifestyle';
import type { StepErrors } from '../../domain/questionnaire';
import type { DietHabitId, LifestyleDraft } from '../../domain/types';
import { formatNumber, plural } from '../../utils/format';
import { NumberField, RadioGroup, RangeField } from '../FormControls';
import './questionnaire.css';

export interface StepFieldsProps {
  draft: LifestyleDraft;
  errors: StepErrors;
  onChange: (patch: Partial<LifestyleDraft>) => void;
}

export function BodyStep({ draft, errors, onChange }: StepFieldsProps) {
  return (
    <div className="questionnaire__fields">
      <div className="body-grid">
        <NumberField
          label="Зріст"
          unit="см"
          value={draft.heightCm}
          onChange={(value) => onChange({ heightCm: value })}
          error={errors.heightCm}
        />
        <NumberField
          label="Вага"
          unit="кг"
          value={draft.weightKg}
          onChange={(value) => onChange({ weightKg: value })}
          error={errors.weightKg}
        />
      </div>
      <RangeField
        label="Скільки годин на добу ви зазвичай спите?"
        min={4}
        max={11}
        step={0.5}
        value={draft.sleepHours}
        onChange={(value) => onChange({ sleepHours: value })}
        format={(value) => `${formatNumber(value)} год`}
        hint={`Сприятливо: ${FACTOR_INFO.sleep.healthyRule}.`}
      />
      <p className="field-hint">
        Із зросту й ваги застосунок порахує індекс маси тіла. Сприятливо: {FACTOR_INFO.bmi.healthyRule}.
      </p>
    </div>
  );
}

export function DietStep({ draft, onChange }: StepFieldsProps) {
  function toggleHabit(id: DietHabitId) {
    const habits = draft.dietHabits.includes(id)
      ? draft.dietHabits.filter((habit) => habit !== id)
      : [...draft.dietHabits, id];
    onChange({ dietHabits: habits });
  }

  return (
    <fieldset className="questionnaire__fields">
      <legend>Що з цього про вас?</legend>
      <div className="choice-list choice-list--two">
        {DIET_HABITS.map((habit) => (
          <label key={habit.id} className="choice choice--compact">
            <input
              type="checkbox"
              checked={draft.dietHabits.includes(habit.id)}
              onChange={() => toggleHabit(habit.id)}
            />
            <span className="choice__title">{habit.label}</span>
          </label>
        ))}
      </div>
      <p className="field-hint" aria-live="polite">
        Обрано {draft.dietHabits.length} з {DIET_HABITS.length}. Харчування вважається здоровим, якщо обрано{' '}
        {FACTOR_INFO.diet.healthyRule}.
      </p>
    </fieldset>
  );
}

export function HabitsStep({ draft, errors, onChange }: StepFieldsProps) {
  return (
    <div className="questionnaire__fields">
      <RadioGroup
        legend="Куріння"
        name="smoking"
        options={SMOKING_OPTIONS}
        value={draft.smoking}
        onChange={(value) => onChange({ smoking: value })}
        error={errors.smoking}
        hint="Сприятливо: не курити зараз. Якщо ви кинули, це теж зараховується."
      />
      <RadioGroup
        legend="Алкоголь"
        name="alcohol"
        options={ALCOHOL_OPTIONS}
        value={draft.alcohol}
        onChange={(value) => onChange({ alcohol: value })}
        error={errors.alcohol}
        hint={`Сприятливо: ${FACTOR_INFO.alcohol.healthyRule}.`}
      />
      <RangeField
        label="Скільки днів на тиждень ви рухаєтеся щонайменше 30 хвилин?"
        hint={`Спорт, швидка ходьба, велосипед, танці. Сприятливо: ${FACTOR_INFO.activity.healthyRule}.`}
        min={0}
        max={7}
        step={1}
        value={draft.activityPerWeek}
        onChange={(value) => onChange({ activityPerWeek: value })}
        format={(value) => `${value} ${plural(value, ['день', 'дні', 'днів'])}`}
      />
    </div>
  );
}

export function EnvironmentStep({ draft, errors, onChange }: StepFieldsProps) {
  return (
    <div className="questionnaire__fields">
      <RadioGroup
        legend="Яке повітря там, де ви живете?"
        name="environment"
        options={ENVIRONMENT_OPTIONS}
        value={draft.environment}
        onChange={(value) => onChange({ environment: value })}
        error={errors.environment}
        hint="Сприятливим вважається лише чисте повітря; звичайне місто й забруднений район — ні."
      />
    </div>
  );
}
