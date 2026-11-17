import { useState } from 'react';
import { DISEASES, KHERA_2016_URL, RUTTEN_2018_URL } from '../../data/diseases';
import { coverageLevel, geneticCategory } from '../../domain/genetics';
import {
  applyScenario,
  categorizeLifestyle,
  countHealthy,
  type FactorStatuses,
} from '../../domain/lifestyle';
import { GENETIC_LABEL, LIFESTYLE_LABEL } from '../../domain/matrix';
import type { DiseaseReport, FactorId, LifestyleAnswers } from '../../domain/types';
import { DISEASE_ICON } from '../ui/icons';
import { COVERAGE_VERDICT, CoveragePanel } from './CoveragePanel';
import { LifestyleFactors } from './LifestyleFactors';
import { MarkersTable } from './MarkersTable';
import { PercentileBar } from './PercentileBar';
import { RiskMatrix } from './RiskMatrix';
import { COVERAGE_TONE, GENETIC_TONE, LIFESTYLE_TONE } from './tone';
import { WhatIfPanel } from './WhatIfPanel';
import './report.css';
import './DiseasePanel.css';

interface DiseasePanelProps {
  report: DiseaseReport;
  answers: LifestyleAnswers;
  statuses: FactorStatuses;
  active: boolean;
  panelId: string;
  changedFactors?: readonly FactorId[];
}

export function DiseasePanel({ report, answers, statuses, active, panelId, changedFactors }: DiseasePanelProps) {
  const disease = DISEASES[report.diseaseId];
  const Icon = DISEASE_ICON[report.diseaseId];
  const [improved, setImproved] = useState<FactorId[]>([]);

  const genetic = geneticCategory(report.percentile);
  const lifestyle = categorizeLifestyle(statuses, disease.factors);
  const scenarioLifestyle = categorizeLifestyle(applyScenario(statuses, improved), disease.factors);
  const healthyCount = countHealthy(statuses, disease.factors);

  function toggleFactor(factor: FactorId) {
    setImproved((current) =>
      current.includes(factor) ? current.filter((item) => item !== factor) : [...current, factor],
    );
  }

  return (
    <section
      id={panelId}
      aria-labelledby={`${panelId}-title`}
      className={active ? 'disease-detail' : 'disease-detail is-inactive'}
    >
      <header className="disease-detail__head">
        <span className="disease-detail__icon" aria-hidden="true">
          <Icon />
        </span>
        <h2 id={`${panelId}-title`}>{disease.name}</h2>
      </header>

      <div className="panel spread">
        <section className="report-block spread__inherited" aria-labelledby={`${panelId}-genes`}>
          <p className="caption">Що ви успадкували</p>
          <h3 id={`${panelId}-genes`}>Генетична схильність</h3>
          <p className="report-block__text">
            Перцентиль показує, яку частку людей референсної групи перевищує ваш сумарний бал за
            маркерами. Це не ймовірність захворіти.
          </p>
          <p className={`focal tone-${GENETIC_TONE[genetic]}`}>
            <span className="focal__number num">{Math.round(report.percentile)}</span>
            <span className="focal__label">
              -й перцентиль · {GENETIC_LABEL[genetic].toLowerCase()} схильність
            </span>
          </p>
          <PercentileBar percentile={report.percentile} />
        </section>

        <section className="report-block spread__yours" aria-labelledby={`${panelId}-life`}>
          <p className="caption">Що залежить від вас</p>
          <h3 id={`${panelId}-life`}>
            Спосіб життя: <span className={`tone-${LIFESTYLE_TONE[lifestyle]}`}>{LIFESTYLE_LABEL[lifestyle].toLowerCase()}</span>
          </h3>
          <p className="report-block__text">
            {lifestyle === 'favorable'
              ? 'Ваші звички вже відповідають найнижчому відносному ризику, можливому за вашої генетики.'
              : 'Гени змінити не можна, а звички можна: матриця нижче показує, як сприятливий спосіб життя знижує відносний ризик.'}
            {disease.factorsSource === 'khera2016' &&
              ' У дослідженні Khera et al. за високої генетичної схильності сприятливий спосіб життя був пов’язаний із відносним ризиком коронарних подій на 46 % нижчим, ніж несприятливий.'}
            {disease.factorsSource === 'rutten2018' &&
              ' У дослідженні Rutten-Jacobs et al. несприятливий спосіб життя був пов’язаний із ризиком інсульту на 66 % вищим, ніж сприятливий, незалежно від генетики.'}{' '}
            Сприятливих факторів: <span className="num">{healthyCount}</span> з{' '}
            <span className="num">{disease.factors.length}</span>
            {disease.factorsSource === 'illustrative' && ' (набір факторів ілюстративний).'}
          </p>
          <LifestyleFactors factors={disease.factors} statuses={statuses} answers={answers} changed={changedFactors} />
          <RiskMatrix
            genetic={genetic}
            current={lifestyle}
            scenario={improved.length > 0 ? scenarioLifestyle : null}
          />
          <WhatIfPanel
            factors={disease.factors}
            statuses={statuses}
            improved={improved}
            onToggle={toggleFactor}
            scenario={scenarioLifestyle}
          />
          <p className="source-note">
            {disease.factorsSource === 'khera2016' ? (
              <>
                Категорії та оцінку ефекту взято з дослідження{' '}
                <a href={KHERA_2016_URL} target="_blank" rel="noopener noreferrer">
                  Khera et al. (NEJM, 2016)
                </a>
                .
              </>
            ) : disease.factorsSource === 'rutten2018' ? (
              <>
                Чотири фактори взято з дослідження{' '}
                <a href={RUTTEN_2018_URL} target="_blank" rel="noopener noreferrer">
                  Rutten-Jacobs et al. (BMJ, 2018)
                </a>{' '}
                на 306&nbsp;473 учасниках UK Biobank.
              </>
            ) : (
              <>
                Набір факторів для цієї хвороби ілюстративний. Правило категорій узято з дослідження{' '}
                <a href={KHERA_2016_URL} target="_blank" rel="noopener noreferrer">
                  Khera et al. (NEJM, 2016)
                </a>{' '}
                про ішемічну хворобу серця.
              </>
            )}
          </p>
        </section>
      </div>

      <details className="panel tech-details">
        <summary>
          <span className="tech-details__title">Технічні деталі розрахунку</span>
          <span className={`tech-details__verdict tone-${COVERAGE_TONE[coverageLevel(report.coverage)]}`}>
            {COVERAGE_VERDICT[coverageLevel(report.coverage)].label}
          </span>
          <span className="tech-details__hint">повнота даних і маркери з найбільшим внеском</span>
        </summary>
        <div className="tech-details__body">
          <p className="table-note">
            Ідентифікатор полігенного скору: <span className="mono">{report.scoreId}</span>. Скор — це
            сума внесків багатьох генетичних маркерів, кожен з яких окремо майже не впливає на ризик.
          </p>
          <CoveragePanel coverage={report.coverage} />
          <MarkersTable markers={report.topMarkers} />
        </div>
      </details>

      <section className="panel next-steps" aria-labelledby={`${panelId}-next`}>
        <h3 id={`${panelId}-next`}>Що робити далі</h3>
        <p>
          Цей результат не діагноз. Якщо хтось із близьких родичів мав цю хворобу або вас щось турбує,
          обговоріть звіт із сімейним лікарем. Звички з позначкою «варто покращити» можна змінити, і
          саме вони переміщують вашу позначку в матриці.
        </p>
        <p className="next-steps__checkup">
          <span className="next-steps__label">Що зазвичай перевіряють лікарі.</span> {disease.checkup}
        </p>
      </section>
    </section>
  );
}
