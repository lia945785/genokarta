import { useId } from 'react';

interface NumberFieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
}

/** Числове поле: приймає і крапку, і кому як десятковий роздільник. */
export function NumberField({ label, unit, value, onChange, error, autoComplete = 'off' }: NumberFieldProps) {
  const inputId = useId();
  const errorId = useId();
  return (
    <div className="field">
      <label htmlFor={inputId} className="field__label">
        {label}
      </label>
      <div className="field__control">
        <input
          id={inputId}
          className="input"
          type="text"
          inputMode="decimal"
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <span className="field__unit">{unit}</span>
      </div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

interface RadioOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface RadioGroupProps<T extends string> {
  legend: string;
  name: string;
  options: ReadonlyArray<RadioOption<T>>;
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
  /** Підказка під назвою групи, наприклад яка відповідь вважається сприятливою. */
  hint?: string;
}

export function RadioGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  hint,
}: RadioGroupProps<T>) {
  const errorId = useId();
  const hintId = useId();
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <fieldset aria-describedby={describedBy}>
      <legend>{legend}</legend>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <div className="choice-list">
        {options.map((option) => (
          <label key={option.value} className="choice">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="choice__body">
              <span className="choice__title">{option.label}</span>
              {option.hint && <span className="choice__hint">{option.hint}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface RangeFieldProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  hint?: string;
}

export function RangeField({ label, min, max, step, value, onChange, format, hint }: RangeFieldProps) {
  const inputId = useId();
  const hintId = useId();
  return (
    <div className="range">
      <label htmlFor={inputId} className="field__label">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <div className="range__row">
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-valuetext={format(value)}
          aria-describedby={hint ? hintId : undefined}
        />
        <output htmlFor={inputId}>{format(value)}</output>
      </div>
    </div>
  );
}
