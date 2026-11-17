import { QUESTIONNAIRE_STEPS, type QuestionnaireStepId } from '../../domain/questionnaire';
import './questionnaire.css';

interface StepIndicatorProps {
  currentIndex: number;
  confirmedSteps: readonly QuestionnaireStepId[];
  canGoTo: (index: number) => boolean;
  onGoTo: (index: number) => void;
}

export function StepIndicator({ currentIndex, confirmedSteps, canGoTo, onGoTo }: StepIndicatorProps) {
  return (
    <ol className="segments" aria-label="Кроки анкети">
      {QUESTIONNAIRE_STEPS.map((item, index) => {
        const current = index === currentIndex;
        const done = !current && (index < currentIndex || confirmedSteps.includes(item.id));
        return (
          <li key={item.id}>
            <button
              type="button"
              className={`segment ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
              aria-current={current ? 'step' : undefined}
              disabled={!canGoTo(index)}
              onClick={() => onGoTo(index)}
            >
              <span className="segment__number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="segment__label">{item.title}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
