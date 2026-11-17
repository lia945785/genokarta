import {
  GENETIC_LABEL,
  GENETIC_ORDER,
  LIFESTYLE_LABEL,
  LIFESTYLE_ORDER,
  riskLevel,
} from '../../domain/matrix';
import type { GeneticCategory, LifestyleCategory } from '../../domain/types';
import './RiskMatrix.css';

interface RiskMatrixProps {
  genetic: GeneticCategory;
  current: LifestyleCategory;
  scenario: LifestyleCategory | null;
}

const COLUMN_LABEL: Partial<Record<LifestyleCategory, string>> = {
  favorable: 'Сприят­ливий',
  intermediate: 'Промі­жний',
  unfavorable: 'Не­сприят­ливий',
};

export function RiskMatrix({ genetic, current, scenario }: RiskMatrixProps) {
  const rows = [...GENETIC_ORDER].reverse();
  const showScenario = scenario !== null && scenario !== current;

  return (
    <div className="matrix-block">
      <table className="risk-matrix">
        <caption>
          Гени × спосіб життя<span className="visually-hidden">
            . Кожна клітинка має відносний рівень ризику від 1 (найнижчий) до 5 (найвищий), без
            абсолютних відсотків. Ви зараз: генетична схильність {GENETIC_LABEL[genetic].toLowerCase()},
            спосіб життя {LIFESTYLE_LABEL[current].toLowerCase()}, рівень {riskLevel(genetic, current) + 1} з 5.
            {showScenario &&
              scenario &&
              ` У сценарії «що, якщо» спосіб життя ${LIFESTYLE_LABEL[scenario].toLowerCase()}, рівень ${
                riskLevel(genetic, scenario) + 1
              } з 5.`}
          </span>
        </caption>
        <thead>
          <tr>
            <td />
            <th scope="colgroup" colSpan={3} className="risk-matrix__axis">
              Спосіб життя
            </th>
          </tr>
          <tr>
            <th scope="col" className="risk-matrix__axis risk-matrix__corner">
              Генетична схильність
            </th>
            {LIFESTYLE_ORDER.map((lifestyle) => (
              <th key={lifestyle} scope="col">
                {COLUMN_LABEL[lifestyle] ?? LIFESTYLE_LABEL[lifestyle]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <th scope="row">{GENETIC_LABEL[row]}</th>
              {LIFESTYLE_ORDER.map((column) => {
                const isCurrent = row === genetic && column === current;
                const isScenario = showScenario && row === genetic && column === scenario;
                const classes = [
                  'risk-cell',
                  `risk-cell--level-${riskLevel(row, column)}`,
                  isCurrent ? 'is-current' : '',
                  isScenario ? 'is-scenario' : '',
                ].join(' ');
                return (
                  <td key={column} className={classes}>
                    <span className="visually-hidden">
                      Рівень {riskLevel(row, column) + 1} з 5{isCurrent || isScenario ? ',' : ''}
                    </span>
                    {isCurrent && <span className="cell-tag">ви зараз</span>}
                    {isScenario && <span className="cell-tag cell-tag--scenario">сценарій</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="matrix-legend" aria-hidden="true">
        <span>нижчий відносний ризик</span>
        <span className="matrix-legend__steps">
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`risk-cell--level-${level}`} />
          ))}
        </span>
        <span>вищий</span>
      </div>
    </div>
  );
}
