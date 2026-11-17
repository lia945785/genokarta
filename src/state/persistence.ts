import { DISEASE_IDS } from '../data/diseases';
import { DEFAULT_DRAFT, EMPTY_PROGRESS } from '../domain/questionnaire';
import { initialState, type AnalysisState } from './analysisReducer';

export const STORAGE_KEY = 'genokarta:session';
export const STORAGE_VERSION = 1;

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function loadState(storage: ReadableStorage | null): AnalysisState | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== STORAGE_VERSION || !isRecord(parsed.state)) return null;

    const saved = parsed.state;
    if (!Array.isArray(saved.diseaseIds) || !isRecord(saved.lifestyle) || !isRecord(saved.progress)) return null;

    return {
      ...initialState,
      file: isRecord(saved.file) ? (saved.file as unknown as AnalysisState['file']) : null,
      diseaseIds: DISEASE_IDS.filter((id) => (saved.diseaseIds as unknown[]).includes(id)),
      lifestyle: { ...DEFAULT_DRAFT, ...(saved.lifestyle as Partial<AnalysisState['lifestyle']>) },
      progress: { ...EMPTY_PROGRESS, ...(saved.progress as Partial<AnalysisState['progress']>) },
      answers: isRecord(saved.answers) ? (saved.answers as unknown as AnalysisState['answers']) : null,
      report: isRecord(saved.report) ? (saved.report as unknown as AnalysisState['report']) : null,
    };
  } catch {
    return null;
  }
}

export function saveState(storage: WritableStorage | null, state: AnalysisState): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }));
  } catch {
    return;
  }
}

export function getSessionStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}
