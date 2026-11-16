export type Route = 'home' | 'upload' | 'lifestyle' | 'results';

export const ROUTES: readonly Route[] = ['home', 'upload', 'lifestyle', 'results'];

/** «#lifestyle» (або «#/lifestyle») → 'lifestyle'. Невідомі адреси ведуть на головну. */
export function parseRoute(hash: string): Route {
  const name = hash.replace(/^#\/?/, '').split('?')[0];
  return (ROUTES as readonly string[]).includes(name) ? (name as Route) : 'home';
}

export function routeToHash(route: Route): string {
  return route === 'home' ? '#' : `#${route}`;
}

export interface FlowState {
  hasFile: boolean;
  hasDiseases: boolean;
  hasReport: boolean;
}

/**
 * Не пускає на крок, для якого ще немає даних:
 * без звіту немає сторінки результатів, без файлу й хвороб немає анкети.
 */
export function resolveRoute(requested: Route, flow: FlowState): Route {
  const readyForLifestyle = flow.hasFile && flow.hasDiseases;
  if (requested === 'results' && !flow.hasReport) {
    return readyForLifestyle ? 'lifestyle' : 'upload';
  }
  if (requested === 'lifestyle' && !readyForLifestyle) {
    return 'upload';
  }
  return requested;
}
