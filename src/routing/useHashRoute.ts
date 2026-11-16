import { useCallback, useEffect, useState } from 'react';
import { parseRoute, routeToHash, type Route } from './routes';

export type Navigate = (route: Route, options?: { replace?: boolean }) => void;

/**
 * Простий маршрутизатор на основі hash-адреси (#upload, #results).
 * Кнопки «Назад» і «Вперед» браузера працюють, а зібраний застосунок
 * можна відкривати з будь-якої папки без налаштування сервера.
 */
export function useHashRoute(): [Route, Navigate] {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback<Navigate>((next, options) => {
    const hash = routeToHash(next);
    if (options?.replace) {
      window.history.replaceState(null, '', hash);
      setRoute(next);
    } else {
      if (window.location.hash !== hash) window.location.hash = hash;
      // Оновлюємо екран одразу, не чекаючи події hashchange.
      setRoute(next);
    }
  }, []);

  return [route, navigate];
}
