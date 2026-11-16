import { MOCK_ANCESTRY, MOCK_DISEASE_REPORTS } from '../data/mockReports';
import type { AnalysisReport, DiseaseId } from '../domain/types';

export interface AnalysisRequest {
  fileName: string;
  markerCount: number;
  diseaseIds: readonly DiseaseId[];
}

/**
 * Заглушка серверного аналізу. Імітує затримку мережі й повертає моковий звіт.
 *
 * Коли бекенд курсової буде готовий, тіло функції замінюється на запит, наприклад:
 *   const body = new FormData();
 *   body.append('file', file);
 *   body.append('diseases', diseaseIds.join(','));
 *   const response = await fetch('/api/analyses', { method: 'POST', body });
 *   return (await response.json()) as AnalysisReport;
 * Решта застосунку від цього не зміниться, бо працює лише з типом AnalysisReport.
 */
export async function requestAnalysis(
  request: AnalysisRequest,
  delayMs = 900,
): Promise<AnalysisReport> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return {
    createdAt: new Date().toISOString(),
    fileName: request.fileName,
    markersInFile: request.markerCount,
    ancestry: MOCK_ANCESTRY,
    diseases: request.diseaseIds.map((id) => MOCK_DISEASE_REPORTS[id]),
  };
}
