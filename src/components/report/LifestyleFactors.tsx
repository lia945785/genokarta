import { describeFactorValue, FACTOR_INFO, type FactorStatuses } from '../../domain/lifestyle';
import type { FactorId, LifestyleAnswers } from '../../domain/types';
import { AlertIcon, CheckIcon } from '../ui/icons';
import './LifestyleFactors.css';

interface LifestyleFactorsProps {
  factors: readonly FactorId[];
  statuses: FactorStatuses;
  answers: LifestyleAnswers;
  /** Фактори, відповідь на які змінилася під час останнього оновлення звіту. */
  changed?: readonly FactorId[];
}

export function LifestyleFactors({ factors, statuses, answers, changed = [] }: LifestyleFactorsProps) {
  return (
    <ul className="factor-list">
      {factors.map((factor) => {
        const healthy = statuses[factor];
        const Icon = healthy ? CheckIcon : AlertIcon;
        return (
          <li key={factor} className={`factor ${healthy ? 'is-ok' : 'is-risk'}`}>
            <span className="factor__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="factor__text">
              <span className="factor__name">
                {FACTOR_INFO[factor].name}
                {/* Змінена відповідь лишається позначеною у звіті, доки людина не почне знову або не оновить звіт. */}
                {changed.includes(factor) && <span className="factor__changed">змінено</span>}
              </span>
              <span className="factor__value">
                {describeFactorValue(factor, answers)}, норма: {FACTOR_INFO[factor].healthyRule}
              </span>
            </span>
            <span className={`factor__status ${healthy ? 'tone-green' : 'tone-amber'}`}>
              {healthy ? 'сприятливо' : 'варто покращити'}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
