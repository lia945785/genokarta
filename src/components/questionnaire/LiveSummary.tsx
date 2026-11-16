import { calcBmi, FACTOR_INFO, formatBmi } from '../../domain/lifestyle';
import { evaluateDraftFactors, parseNumber, type QuestionnaireProgress } from '../../domain/questionnaire';
import type { FactorId, LifestyleDraft } from '../../domain/types';
import { AlertIcon, CheckIcon } from '../ui/icons';
import './questionnaire.css';

const FACTOR_ORDER: readonly FactorId[] = ['bmi', 'sleep', 'diet', 'smoking', 'alcohol', 'activity', 'environment'];

interface LiveSummaryProps {
  draft: LifestyleDraft;
  progress: QuestionnaireProgress;
}

/**
 * «Попередній підсумок» поруч з анкетою: ІМТ і стан кожного фактора, поки людина відповідає.
 * Значення за замовчуванням відповіддю не вважаються (див. evaluateDraftFactors).
 */
export function LiveSummary({ draft, progress }: LiveSummaryProps) {
  const preview = evaluateDraftFactors(draft, progress);
  const height = parseNumber(draft.heightCm);
  const weight = parseNumber(draft.weightKg);
  const bmi = preview.bmi !== undefined && height !== null && weight !== null ? calcBmi(height, weight) : null;
  const answered = FACTOR_ORDER.filter((factor) => preview[factor] !== undefined);
  const favorable = answered.filter((factor) => preview[factor]).length;

  return (
    <aside className="panel live-summary" aria-labelledby="summary-title">
      <div className="panel__head">
        <div className="panel__title">
          <h2 id="summary-title">Попередній підсумок</h2>
          <p className="panel__subtitle">Оновлюється, поки ви відповідаєте</p>
        </div>
      </div>
      <div className="live-summary__stats">
        <div className="tile">
          <p className="live-summary__label">Індекс маси тіла</p>
          <p className="live-summary__value num">{bmi !== null ? formatBmi(bmi) : '—'}</p>
        </div>
        <div className="tile">
          <p className="live-summary__label">Сприятливих факторів</p>
          <p className="live-summary__value num">
            {favorable}
            <small> з {answered.length}</small>
          </p>
        </div>
      </div>
      <ul className="live-summary__list">
        {FACTOR_ORDER.map((factor) => {
          const status = preview[factor];
          const state = status === undefined ? 'unknown' : status ? 'ok' : 'risk';
          return (
            <li key={factor} className={`live-factor is-${state}`}>
              <span className="live-factor__icon" aria-hidden="true">
                {state === 'ok' ? <CheckIcon /> : state === 'risk' ? <AlertIcon /> : null}
              </span>
              <span className="live-factor__name">{FACTOR_INFO[factor].name}</span>
              <span className="live-factor__status">
                {state === 'ok' ? 'сприятливо' : state === 'risk' ? 'варто покращити' : 'немає відповіді'}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
