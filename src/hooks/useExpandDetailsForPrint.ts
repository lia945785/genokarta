import { useEffect } from 'react';

/**
 * Перед друком розгортає згорнуті блоки <details> із заданим селектором, після друку
 * повертає як було. Так у PDF потрапляють і «Технічні деталі розрахунку».
 */
export function useExpandDetailsForPrint(selector: string): void {
  useEffect(() => {
    let reopened: HTMLDetailsElement[] = [];

    function openForPrint() {
      reopened = [...document.querySelectorAll<HTMLDetailsElement>(`${selector}:not([open])`)];
      for (const details of reopened) details.open = true;
    }

    function restoreAfterPrint() {
      for (const details of reopened) details.open = false;
      reopened = [];
    }

    window.addEventListener('beforeprint', openForPrint);
    window.addEventListener('afterprint', restoreAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', openForPrint);
      window.removeEventListener('afterprint', restoreAfterPrint);
    };
  }, [selector]);
}
