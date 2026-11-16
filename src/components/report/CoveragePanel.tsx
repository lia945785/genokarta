import { useId } from 'react';
import { coverageLevel, markersFoundPct, type CoverageLevel } from '../../domain/genetics';
import type { Coverage } from '../../domain/types';
import { formatInt, formatPercent } from '../../utils/format';
import './CoveragePanel.css';

export const COVERAGE_VERDICT: Record<CoverageLevel, { label: string; text: string }> = {
  full: {
    label: 'Повний розрахунок',
    text: 'У файлі є маркери з більшою частиною ваги скору.',
  },
  partial: {
    label: 'Частковий розрахунок',
    text: 'Частини вагомих маркерів у файлі немає.',
  },
  limited: {
    label: 'Обмежений розрахунок',
    text: 'Бракує багатьох вагомих маркерів, тому результат варто сприймати обережно.',
  },
};

/**
 * Приладна шкала 0–100: темна підкладка, суцільна заливка й засічки порогів.
 * Пороги 60 і 80 % відповідають межам «частковий» і «повний» розрахунок.
 */
function Meter({ value, label, thresholds = [] }: { value: number; label: string; thresholds?: number[] }) {
  return (
    <span className="meter" role="img" aria-label={label}>
      <span className="meter__fill" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
      {thresholds.map((threshold) => (
        <span key={threshold} className="meter__tick" style={{ left: `${threshold}%` }} />
      ))}
    </span>
  );
}

/** Показники повноти та обмежень розрахунку. */
export function CoveragePanel({ coverage }: { coverage: Coverage }) {
  const titleId = useId();
  const level = coverageLevel(coverage);
  const verdict = COVERAGE_VERDICT[level];
  const foundPct = markersFoundPct(coverage);

  return (
    <section className="coverage" aria-labelledby={titleId}>
      <div className="coverage__head">
        <div className="coverage__title">
          <h4 id={titleId}>Повнота та обмеження розрахунку</h4>
        </div>
        {/* Вердикт про повноту вже видно в підсумку згорнутого блока; тут — чесна позначка, що числа прикладові. */}
        <span className="chip">приклад, не з вашого файлу</span>
      </div>
      <dl className="coverage__grid">
        <div className="tile">
          <dt>Знайдено маркерів</dt>
          <dd>
            <span className="num">{formatPercent(foundPct)}</span>
            <small className="num">
              {formatInt(coverage.markersFound)} / {formatInt(coverage.markersTotal)}
            </small>
          </dd>
          <Meter value={foundPct} label={`Знайдено ${formatPercent(foundPct)} маркерів`} />
        </div>
        <div className="tile">
          <dt>Покрито ваги скору</dt>
          <dd>
            <span className="num">{formatPercent(coverage.weightCoveredPct)}</span>
            <small>пороги 60 і 80&nbsp;%</small>
          </dd>
          <Meter
            value={coverage.weightCoveredPct}
            label={`Покрито ${formatPercent(coverage.weightCoveredPct)} ваги скору`}
            thresholds={[60, 80]}
          />
        </div>
        <div className="tile">
          <dt>Виключено неоднозначних</dt>
          <dd>
            <span className="num">{formatInt(coverage.excludedAmbiguous)}</span>
            <small>A/T і C/G маркери</small>
          </dd>
        </div>
      </dl>
      <p className="coverage__note">
        {verdict.text} Ці показники описують повноту розрахунку, а не точність прогнозу. У демо-версії
        числа прикладові й не залежать від вашого файлу.
      </p>
    </section>
  );
}
