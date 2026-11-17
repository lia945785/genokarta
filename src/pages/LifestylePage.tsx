import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { requestAnalysis } from '../api/analysis';
import { LiveSummary } from '../components/questionnaire/LiveSummary';
import {
  BodyStep,
  DietStep,
  EnvironmentStep,
  HabitsStep,
  type StepFieldsProps,
} from '../components/questionnaire/QuestionnaireSteps';
import { StepIndicator } from '../components/questionnaire/StepIndicator';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon, ReportIcon } from '../components/ui/icons';
import {
  firstInvalidStepIndex,
  hasErrors,
  isDraftChanged,
  QUESTIONNAIRE_STEPS,
  toAnswers,
  validateStep,
  type QuestionnaireStepId,
  type StepErrors,
} from '../domain/questionnaire';
import type { LifestyleDraft } from '../domain/types';
import { useAnalysis } from '../state/AnalysisContext';
import './LifestylePage.css';

const STEP_FIELDS: Record<QuestionnaireStepId, (props: StepFieldsProps) => ReactNode> = {
  body: BodyStep,
  diet: DietStep,
  habits: HabitsStep,
  environment: EnvironmentStep,
};

interface LifestylePageProps {
  onBack: () => void;
  onDone: () => void;
  onReturnToReport: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'failed';

export function LifestylePage({ onBack, onDone, onReturnToReport }: LifestylePageProps) {
  const { state, dispatch } = useAnalysis();
  const [stepIndex, setStepIndex] = useState(() => {
    if (state.answers) return 0;
    const next = QUESTIONNAIRE_STEPS.findIndex((item) => !state.progress.confirmedSteps.includes(item.id));
    return next === -1 ? 0 : next;
  });
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isFirstStepRender = useRef(true);
  const [errorFocusRequest, setErrorFocusRequest] = useState(0);

  const draft = state.lifestyle;
  const step = QUESTIONNAIRE_STEPS[stepIndex];
  const isLastStep = stepIndex === QUESTIONNAIRE_STEPS.length - 1;
  const isEditing = state.report !== null && state.answers !== null;
  const hasUnsavedChanges = isEditing && state.answers !== null && isDraftChanged(draft, state.answers);

  function discardChanges() {
    dispatch({ type: 'draftRestored' });
    onReturnToReport();
  }
  const confirmedSteps = state.progress.confirmedSteps;

  useEffect(() => {
    if (isFirstStepRender.current) {
      isFirstStepRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [stepIndex]);

  useEffect(() => {
    if (errorFocusRequest === 0) return;
    const form = formRef.current;
    const firstError = form?.querySelector<HTMLElement>('.field-error[id]');
    if (!form || !firstError) return;
    const owner = form.querySelector<HTMLElement>(`[aria-describedby~="${CSS.escape(firstError.id)}"]`);
    const target =
      owner instanceof HTMLInputElement
        ? owner
        : (owner?.querySelector<HTMLInputElement>('input:checked') ?? owner?.querySelector<HTMLInputElement>('input'));
    target?.focus();
  }, [errorFocusRequest]);

  function update(patch: Partial<LifestyleDraft>) {
    dispatch({ type: 'lifestyleChanged', patch });
    setErrors((current) => {
      const next: StepErrors = { ...current };
      for (const key of Object.keys(patch)) delete next[key as keyof StepErrors];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stepErrors = validateStep(step.id, draft);
    setErrors(stepErrors);
    if (hasErrors(stepErrors)) {
      setErrorFocusRequest((count) => count + 1);
      return;
    }
    dispatch({ type: 'stepConfirmed', step: step.id });

    if (!isLastStep) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const invalidIndex = firstInvalidStepIndex(draft);
    if (invalidIndex !== null) {
      setStepIndex(invalidIndex);
      setErrors(validateStep(QUESTIONNAIRE_STEPS[invalidIndex].id, draft));
      setErrorFocusRequest((count) => count + 1);
      return;
    }

    const answers = toAnswers(draft);
    if (!answers || !state.file) return;

    setSubmitState('submitting');
    try {
      const report = await requestAnalysis({
        fileName: state.file.name,
        markerCount: state.file.markerCount,
        diseaseIds: state.diseaseIds,
      });
      dispatch({ type: 'reportReceived', report, answers });
      onDone();
    } catch {
      setSubmitState('failed');
    }
  }

  function handleBack() {
    setErrors({});
    if (stepIndex === 0) {
      onBack();
    } else {
      setStepIndex(stepIndex - 1);
    }
  }

  function canGoToStep(index: number): boolean {
    return index !== stepIndex && (index < stepIndex || confirmedSteps.includes(QUESTIONNAIRE_STEPS[index].id));
  }

  function goToStep(index: number) {
    if (canGoToStep(index)) {
      setErrors({});
      setStepIndex(index);
    }
  }

  const submitting = submitState === 'submitting';
  const StepFields = STEP_FIELDS[step.id];

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <h1>Розкажіть про спосіб життя</h1>
          <p className="lead">
            Відповіді покажуть, як звички впливають на обрані хвороби. Вони зберігаються лише до
            закриття вкладки.
          </p>
        </div>
        {isEditing && (
          <div className="actions__group no-print">
            {hasUnsavedChanges ? (
              <Button color="secondary" size="md" iconLeading={ArrowLeftIcon} onClick={discardChanges}>
                Скасувати зміни й повернутися до звіту
              </Button>
            ) : (
              <Button color="secondary" size="md" iconLeading={ArrowLeftIcon} onClick={onReturnToReport}>
                Повернутися до звіту
              </Button>
            )}
          </div>
        )}
      </header>

      <div className="lifestyle-grid">
        <form ref={formRef} className="panel questionnaire" onSubmit={handleSubmit} noValidate>
          <StepIndicator
            currentIndex={stepIndex}
            confirmedSteps={confirmedSteps}
            canGoTo={canGoToStep}
            onGoTo={goToStep}
          />

          <div className="questionnaire__head">
            <p className="questionnaire__count">
              Крок <span className="num">{stepIndex + 1}</span> з{' '}
              <span className="num">{QUESTIONNAIRE_STEPS.length}</span>
            </p>
            <h2 ref={stepHeadingRef} tabIndex={-1}>
              {step.title}
            </h2>
          </div>

          <StepFields draft={draft} errors={errors} onChange={update} />

          {submitState === 'failed' && (
            <p className="field-error" role="alert">
              Не вдалося підготувати звіт. Спробуйте ще раз.
            </p>
          )}

          <div className="actions questionnaire__actions">
            <Button color="secondary" size="lg" iconLeading={ArrowLeftIcon} onClick={handleBack} isDisabled={submitting}>
              Назад
            </Button>
            <Button
              type="submit"
              size="lg"
              iconTrailing={isLastStep ? ReportIcon : ArrowRightIcon}
              isLoading={submitting}
              showTextWhileLoading
            >
              {isLastStep ? (submitting ? 'Готуємо звіт…' : isEditing ? 'Оновити звіт' : 'Отримати звіт') : 'Далі'}
            </Button>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {submitting ? 'Готуємо звіт' : ''}
          </p>
          {hasErrors(errors) && (
            <p className="visually-hidden" role="alert">
              Перевірте відповіді на цьому кроці.
            </p>
          )}
        </form>

        <LiveSummary draft={draft} progress={state.progress} />
      </div>
    </div>
  );
}
