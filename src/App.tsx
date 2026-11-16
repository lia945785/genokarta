import { useEffect, useRef } from 'react';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { LifestylePage } from './pages/LifestylePage';
import { ResultsPage } from './pages/ResultsPage';
import { UploadPage } from './pages/UploadPage';
import { isDraftChanged } from './domain/questionnaire';
import { resolveRoute } from './routing/routes';
import { useHashRoute } from './routing/useHashRoute';
import { useAnalysis } from './state/AnalysisContext';

export default function App() {
  const { state, dispatch } = useAnalysis();
  const [requestedRoute, navigate] = useHashRoute();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const flow = {
    hasFile: state.file !== null,
    hasDiseases: state.diseaseIds.length > 0,
    hasReport: state.report !== null,
  };
  const route = resolveRoute(requestedRoute, flow);
  // Звіт застарів, якщо після нього відповіді анкети змінили, але звіт не оновили.
  const reportStale = state.answers !== null && isDraftChanged(state.lifestyle, state.answers);

  // Якщо користувач відкрив крок, до якого ще не дійшов, виправляємо адресу.
  useEffect(() => {
    if (route !== requestedRoute) navigate(route, { replace: true });
  }, [route, requestedRoute, navigate]);

  // Після переходу на інший екран прокручуємо вгору й переводимо фокус на вміст.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  function restart() {
    dispatch({ type: 'reset' });
    navigate('home');
  }

  let page;
  switch (route) {
    case 'upload':
      page = <UploadPage onBack={() => navigate('home')} onNext={() => navigate('lifestyle')} />;
      break;
    case 'lifestyle':
      page = (
        <LifestylePage
          onBack={() => navigate('upload')}
          onDone={() => navigate('results')}
          onReturnToReport={() => navigate('results')}
        />
      );
      break;
    case 'results':
      page = (
        <ResultsPage
          onRestart={restart}
          onEditLifestyle={() => navigate('lifestyle')}
          reportStale={reportStale}
        />
      );
      break;
    default:
      page = <HomePage onStart={() => navigate('upload')} />;
  }

  return (
    <AppShell
      route={route}
      flow={flow}
      reportStale={reportStale}
      fileName={state.file?.name ?? null}
      onNavigate={(next) => navigate(next)}
    >
      <main ref={mainRef} tabIndex={-1} id="main" className="app-main">
        {page}
      </main>
    </AppShell>
  );
}
