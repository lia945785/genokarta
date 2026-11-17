import { Button } from '../ui/Button';
import { AlertIcon, CheckIcon, EditIcon, RefreshIcon } from '../ui/icons';
import './StaleReportBanner.css';

export type RefreshState = 'idle' | 'refreshing' | 'failed' | 'done';

interface StaleReportBannerProps {
  canRefresh: boolean;
  refreshState: RefreshState;
  onRefresh: () => void;
  onFinishQuestionnaire: () => void;
  onDiscard: () => void;
}

export function StaleReportBanner({
  canRefresh,
  refreshState,
  onRefresh,
  onFinishQuestionnaire,
  onDiscard,
}: StaleReportBannerProps) {
  return (
    <div className="stale-banner no-print" role="status">
      <AlertIcon aria-hidden="true" />
      <div className="stale-banner__body">
        <p>
          <strong>Відповіді анкети змінено, а звіт ще показує попередні.</strong>{' '}
          {canRefresh
            ? 'Оновіть звіт, щоб побачити нову оцінку, або скасуйте зміни.'
            : 'Анкету не завершено: заповніть її до кінця або скасуйте зміни.'}
        </p>
        {refreshState === 'failed' && <p className="field-error">Не вдалося оновити звіт. Спробуйте ще раз.</p>}
        <div className="actions__group">
          {canRefresh ? (
            <Button
              size="md"
              iconLeading={RefreshIcon}
              onClick={onRefresh}
              isLoading={refreshState === 'refreshing'}
              showTextWhileLoading
            >
              {refreshState === 'refreshing' ? 'Оновлюємо звіт…' : 'Оновити звіт'}
            </Button>
          ) : (
            <Button size="md" iconLeading={EditIcon} onClick={onFinishQuestionnaire}>
              Завершити анкету
            </Button>
          )}
          <Button color="tertiary" size="md" onClick={onDiscard}>
            Скасувати зміни
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReportUpdatedNote() {
  return (
    <p className="update-note no-print" role="status">
      <CheckIcon aria-hidden="true" />
      Звіт оновлено за вашими новими відповідями.
    </p>
  );
}
