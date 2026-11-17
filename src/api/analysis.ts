import { MOCK_ANCESTRY, MOCK_DISEASE_REPORTS } from '../data/mockReports';
import type { AnalysisReport, DiseaseId } from '../domain/types';

export interface AnalysisRequest {
  fileName: string;
  markerCount: number;
  diseaseIds: readonly DiseaseId[];
}

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
