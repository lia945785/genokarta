import { useRef, useState } from 'react';
import { requestAnalysis } from '../api/analysis';
import { DiseaseCarousel } from '../components/report/DiseaseCarousel';
import { DiseasePanel } from '../components/report/DiseasePanel';
import { ReportActions } from '../components/report/ReportActions';
import { ReportSummary } from '../components/report/ReportSummary';
import { ReportUpdatedNote, StaleReportBanner, type RefreshState } from '../components/report/StaleReportBanner';
import '../components/report/report.css';
import '../components/report/ReportPrint.css';
import { InfoIcon } from '../components/ui/icons';
import { changedFactorIds, evaluateFactors } from '../domain/lifestyle';
import { toAnswers } from '../domain/questionnaire';
import type { DiseaseId, FactorId } from '../domain/types';
import { useExpandDetailsForPrint } from '../hooks/useExpandDetailsForPrint';
import { useAnalysis } from '../state/AnalysisContext';
import { formatDate, formatInt } from '../utils/format';

interface ResultsPageProps {
  onRestart: () => void;
  onEditLifestyle: () => void;
  reportStale: boolean;
}

export function ResultsPage({ onRestart, onEditLifestyle, reportStale }: ResultsPageProps) {
  const { state, dispatch } = useAnalysis();
  const { report, answers } = state;
  const [refreshState, setRefreshState] = useState<RefreshState>('idle');
  const [changedFactors, setChangedFactors] = useState<FactorId[]>([]);
  const [activeId, setActiveId] = useState<DiseaseId | null>(report?.diseases[0]?.diseaseId ?? null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useExpandDetailsForPrint('details.tech-details');

  if (!report || !answers) return null;

  const statuses = evaluateFactors(answers);
  const draftAnswers = reportStale ? toAnswers(state.lifestyle) : null;
  const diseases = report.diseases;
  const currentIndex = Math.max(
    0,
    diseases.findIndex((disease) => disease.diseaseId === activeId),
  );

  async function refreshReport() {
    if (!draftAnswers || !state.file || !answers) return;
    setRefreshState('refreshing');
    try {
      const fresh = await requestAnalysis({
        fileName: state.file.name,
        markerCount: state.file.markerCount,
        diseaseIds: state.diseaseIds,
      });
      setChangedFactors(changedFactorIds(answers, draftAnswers));
      dispatch({ type: 'reportReceived', report: fresh, answers: draftAnswers });
      setRefreshState('done');
      headingRef.current?.focus();
    } catch {
      setRefreshState('failed');
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <h1 ref={headingRef} tabIndex={-1}>
            Ваш звіт
          </h1>
          <p className="lead">
            Сформовано {formatDate(report.createdAt)} для файлу <span className="mono">{report.fileName}</span>{' '}
            (<span className="num">{formatInt(report.markersInFile)}</span> маркерів). Референсна група —
            «{report.ancestry.group.toLowerCase()}», задана прикладом.
          </p>
        </div>
        <ReportActions onEdit={onEditLifestyle} onRestart={onRestart} />
      </header>

      {reportStale && (
        <StaleReportBanner
          canRefresh={draftAnswers !== null}
          refreshState={refreshState}
          onRefresh={refreshReport}
          onFinishQuestionnaire={onEditLifestyle}
          onDiscard={() => dispatch({ type: 'draftRestored' })}
        />
      )}
      {refreshState === 'done' && !reportStale && <ReportUpdatedNote />}

      <aside className="notice">
        <InfoIcon />
        <p>
          <strong>Це не медичний висновок.</strong> Генетичні результати в цій версії демонстраційні: з
          вашого файлу взято лише кількість маркерів, а спосіб життя оцінено за вашими відповідями.
        </p>
      </aside>

      <ReportSummary diseases={diseases} statuses={statuses} />

      {diseases.length > 1 && (
        <DiseaseCarousel
          diseases={diseases}
          statuses={statuses}
          currentIndex={currentIndex}
          onSelect={setActiveId}
        />
      )}

      {diseases.map((disease, index) => (
        <DiseasePanel
          key={disease.diseaseId}
          report={disease}
          answers={answers}
          statuses={statuses}
          active={index === currentIndex}
          panelId={`panel-${disease.diseaseId}`}
          changedFactors={changedFactors}
        />
      ))}
    </div>
  );
}
