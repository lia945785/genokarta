import { DISEASES } from '../../data/diseases';
import { coverageLevel, geneticCategory, markersFoundPct } from '../../domain/genetics';
import { categorizeLifestyle, type FactorStatuses } from '../../domain/lifestyle';
import { GENETIC_LABEL, LIFESTYLE_LABEL } from '../../domain/matrix';
import type { DiseaseReport } from '../../domain/types';
import { formatInt, formatPercent } from '../../utils/format';
import { COVERAGE_VERDICT } from './CoveragePanel';
import { COVERAGE_TONE, GENETIC_TONE, LIFESTYLE_TONE } from './tone';
import './ReportSummary.css';

interface ReportSummaryProps {
  diseases: readonly DiseaseReport[];
  statuses: FactorStatuses;
}

export function ReportSummary({ diseases, statuses }: ReportSummaryProps) {
  return (
    <section className="report-summary print-only" aria-labelledby="report-summary-title">
      <h2 id="report-summary-title">Підсумок звіту</h2>
      <table className="report-summary__table">
        <thead>
          <tr>
            <th scope="col">Хвороба</th>
            <th scope="col" className="num">
              Перцентиль
            </th>
            <th scope="col">Генетична схильність</th>
            <th scope="col">Спосіб життя</th>
            <th scope="col" className="num">
              Знайдено маркерів
            </th>
            <th scope="col" className="num">
              Покрито ваги
            </th>
            <th scope="col">Розрахунок</th>
          </tr>
        </thead>
        <tbody>
          {diseases.map((report) => {
            const disease = DISEASES[report.diseaseId];
            const genetic = geneticCategory(report.percentile);
            const lifestyle = categorizeLifestyle(statuses, disease.factors);
            const coverage = coverageLevel(report.coverage);
            return (
              <tr key={report.diseaseId}>
                <th scope="row">{disease.name}</th>
                <td className="num">{Math.round(report.percentile)}</td>
                <td className={`tone-${GENETIC_TONE[genetic]}`}>{GENETIC_LABEL[genetic]}</td>
                <td className={`tone-${LIFESTYLE_TONE[lifestyle]}`}>{LIFESTYLE_LABEL[lifestyle]}</td>
                <td className="num">
                  {formatInt(report.coverage.markersFound)} з {formatInt(report.coverage.markersTotal)}{' '}
                  <span className="report-summary__pct">({formatPercent(markersFoundPct(report.coverage))})</span>
                </td>
                <td className="num">{formatPercent(report.coverage.weightCoveredPct)}</td>
                <td className={`tone-${COVERAGE_TONE[coverage]}`}>{COVERAGE_VERDICT[coverage].label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="report-summary__note">
        Далі кожній хворобі присвячено окремий аркуш: генетична схильність, фактори способу життя,
        матриця «гени × спосіб життя», повнота розрахунку й маркери з найбільшим внеском. Технічні
        показники в демо-версії прикладові й не залежать від вашого файлу.
      </p>
    </section>
  );
}
