import { DISEASE_IDS } from '../data/diseases';
import { DEFAULT_DRAFT, EMPTY_PROGRESS } from '../domain/questionnaire';
import { initialState, type AnalysisState } from './analysisReducer';

/**
 * Збереження стану в sessionStorage, щоб перезавантаження сторінки не стирало відповіді й звіт.
 * sessionStorage належить лише цій вкладці й очищується після її закриття, тож обіцянка
 * «відповіді зберігаються лише до закриття вкладки» лишається правдивою.
 * Зберігаються ті самі дані, що й у стані: метадані файлу (без його вмісту), вибір хвороб,
 * відповіді анкети й звіт.
 */

export const STORAGE_KEY = 'genokarta:session';
/** Збільшуйте, якщо змінюється форма AnalysisState: старі записи тоді просто ігноруються. */
export const STORAGE_VERSION = 1;

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Читає збережений стан. Будь-що пошкоджене чи застаріле дає null, і застосунок починає з нуля. */
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

/** Записує стан. Помилки (приватний режим, переповнене сховище) не ламають застосунок. */
export function saveState(storage: WritableStorage | null, state: AnalysisState): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }));
  } catch {
    // Без збереження застосунок працює як раніше: стан живе лише в пам'яті.
  }
}

/** sessionStorage, якщо браузер дозволяє до нього доступ; інакше null. */
export function getSessionStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}
