import { categorizeLifestyle, FACTOR_INFO, type FactorStatuses } from '../../domain/lifestyle';
import { LIFESTYLE_LABEL } from '../../domain/matrix';
import type { FactorId, LifestyleCategory } from '../../domain/types';
import './WhatIfPanel.css';

interface WhatIfPanelProps {
  factors: readonly FactorId[];
  statuses: FactorStatuses;
  improved: readonly FactorId[];
  onToggle: (factor: FactorId) => void;
  scenario: LifestyleCategory;
}

export function WhatIfPanel({ factors, statuses, improved, onToggle, scenario }: WhatIfPanelProps) {
  const changeable = factors.filter((factor) => !statuses[factor]);
  const current = categorizeLifestyle(statuses, factors);

  let result = '';
  if (improved.length > 0) {
    result =
      scenario === current
        ? current === 'favorable'
          ? 'Категорія не зміниться: спосіб життя вже сприятливий, а це найнижчий відносний ризик у вашому рядку матриці.'
          : `Категорія не зміниться: спосіб життя лишиться ${LIFESTYLE_LABEL[current].toLowerCase()}, тож позначка в матриці стоїть на місці. Щоб перейти до іншої клітинки, оберіть більше звичок.`
        : `У цьому сценарії спосіб життя ${LIFESTYLE_LABEL[scenario].toLowerCase()}. Генетична схильність не змінюється, тому позначка рухається лише вздовж свого рядка матриці.`;
  }

  return (
    <fieldset className="what-if no-print">
      <legend>
        <span className="what-if__title">Що, якщо змінити звички?</span>
      </legend>
      {changeable.length === 0 ? (
        <p className="field-hint">Усі фактори для цієї хвороби вже сприятливі.</p>
      ) : (
        <div className="choice-list choice-list--two">
          {changeable.map((factor) => (
            <label key={factor} className="choice choice--compact">
              <input type="checkbox" checked={improved.includes(factor)} onChange={() => onToggle(factor)} />
              <span className="choice__title">{FACTOR_INFO[factor].improvement}</span>
            </label>
          ))}
        </div>
      )}
      <p className="what-if__result" aria-live="polite">
        {result}
      </p>
    </fieldset>
  );
}
