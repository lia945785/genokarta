import { DISEASE_IDS } from '../data/diseases';
import {
  answersToDraft,
  DEFAULT_DRAFT,
  DEFAULTED_FACTOR_FIELD,
  EMPTY_PROGRESS,
  type DefaultedFactor,
  type QuestionnaireProgress,
  type QuestionnaireStepId,
} from '../domain/questionnaire';
import type {
  AnalysisReport,
  DiseaseId,
  GenomeFileInfo,
  LifestyleAnswers,
  LifestyleDraft,
} from '../domain/types';

/**
 * Увесь стан застосунку. Вміст ДНК-файлу сюди не потрапляє:
 * зберігаються лише назва, розмір, формат і кількість маркерів.
 * Стан зберігається в sessionStorage цієї вкладки (див. persistence.ts): переживає
 * перезавантаження сторінки й зникає після закриття вкладки.
 */
export interface AnalysisState {
  file: GenomeFileInfo | null;
  diseaseIds: DiseaseId[];
  lifestyle: LifestyleDraft;
  /** Які кроки анкети підтверджено й які поля зі значенням за замовчуванням людина змінила. */
  progress: QuestionnaireProgress;
  answers: LifestyleAnswers | null;
  report: AnalysisReport | null;
}

export type AnalysisAction =
  | { type: 'fileAccepted'; file: GenomeFileInfo }
  | { type: 'fileCleared' }
  | { type: 'diseaseToggled'; id: DiseaseId }
  | { type: 'allDiseasesSelected' }
  | { type: 'lifestyleChanged'; patch: Partial<LifestyleDraft> }
  | { type: 'stepConfirmed'; step: QuestionnaireStepId }
  /** Скасувати незбережені зміни анкети: повернути відповіді, за якими побудовано звіт. */
  | { type: 'draftRestored' }
  | { type: 'reportReceived'; report: AnalysisReport; answers: LifestyleAnswers }
  | { type: 'reset' };

export const initialState: AnalysisState = {
  file: null,
  diseaseIds: [],
  lifestyle: DEFAULT_DRAFT,
  progress: EMPTY_PROGRESS,
  answers: null,
  report: null,
};

export function analysisReducer(state: AnalysisState, action: AnalysisAction): AnalysisState {
  switch (action.type) {
    case 'fileAccepted':
      return { ...state, file: action.file, report: null };
    case 'fileCleared':
      return { ...state, file: null, report: null };
    case 'diseaseToggled': {
      const selected = state.diseaseIds.includes(action.id);
      const diseaseIds = selected
        ? state.diseaseIds.filter((id) => id !== action.id)
        : DISEASE_IDS.filter((id) => id === action.id || state.diseaseIds.includes(id));
      return { ...state, diseaseIds, report: null };
    }
    case 'allDiseasesSelected':
      return { ...state, diseaseIds: [...DISEASE_IDS], report: null };
    case 'lifestyleChanged': {
      const newlyTouched = (Object.keys(DEFAULTED_FACTOR_FIELD) as DefaultedFactor[]).filter(
        (factor) => DEFAULTED_FACTOR_FIELD[factor] in action.patch && !state.progress.touchedFactors.includes(factor),
      );
      return {
        ...state,
        lifestyle: { ...state.lifestyle, ...action.patch },
        progress:
          newlyTouched.length > 0
            ? { ...state.progress, touchedFactors: [...state.progress.touchedFactors, ...newlyTouched] }
            : state.progress,
      };
    }
    case 'stepConfirmed':
      if (state.progress.confirmedSteps.includes(action.step)) return state;
      return {
        ...state,
        progress: { ...state.progress, confirmedSteps: [...state.progress.confirmedSteps, action.step] },
      };
    case 'draftRestored':
      return state.answers ? { ...state, lifestyle: answersToDraft(state.answers) } : state;
    case 'reportReceived':
      return { ...state, report: action.report, answers: action.answers };
    case 'reset':
      return initialState;
  }
}
