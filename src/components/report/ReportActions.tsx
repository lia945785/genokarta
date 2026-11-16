import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { DownloadIcon, EditIcon, RefreshIcon } from '../ui/icons';
import './ReportActions.css';

interface ReportActionsProps {
  onEdit: () => void;
  onRestart: () => void;
}

/**
 * Дії в шапці звіту: «Зберегти PDF», «Змінити відповіді», «Почати спочатку».
 * Початок спочатку видаляє файл, відповіді й звіт, тому спершу просить підтвердження.
 */
export function ReportActions({ onEdit, onRestart }: ReportActionsProps) {
  const [confirming, setConfirming] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const wasConfirming = useRef(false);

  // Під час підтвердження фокус переходить на безпечну кнопку «Скасувати»; після скасування — назад на «Почати спочатку».
  useEffect(() => {
    if (confirming) {
      confirmRef.current?.querySelector<HTMLButtonElement>('[data-cancel]')?.focus();
    } else if (wasConfirming.current) {
      actionsRef.current?.querySelector<HTMLButtonElement>('[data-restart]')?.focus();
    }
    wasConfirming.current = confirming;
  }, [confirming]);

  if (confirming) {
    return (
      <div ref={confirmRef} className="restart-confirm no-print" role="group" aria-labelledby="restart-confirm-text">
        <p id="restart-confirm-text">Почати спочатку? Файл, відповіді й звіт буде видалено з цієї вкладки.</p>
        <div className="actions__group">
          <Button color="secondary" size="md" iconLeading={RefreshIcon} onClick={onRestart}>
            Так, почати спочатку
          </Button>
          <Button color="tertiary" size="md" onClick={() => setConfirming(false)} data-cancel>
            Скасувати
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={actionsRef} className="actions__group report-actions no-print">
      <Button color="link-color" size="md" iconLeading={DownloadIcon} onClick={() => window.print()}>
        Зберегти PDF
      </Button>
      <Button color="link-color" size="md" iconLeading={EditIcon} onClick={onEdit}>
        Змінити відповіді
      </Button>
      <Button color="link-color" size="md" iconLeading={RefreshIcon} onClick={() => setConfirming(true)} data-restart>
        Почати спочатку
      </Button>
    </div>
  );
}
