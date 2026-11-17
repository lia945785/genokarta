import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { analysisReducer, initialState, type AnalysisAction, type AnalysisState } from './analysisReducer';
import { getSessionStorage, loadState, saveState } from './persistence';

interface AnalysisContextValue {
  state: AnalysisState;
  dispatch: Dispatch<AnalysisAction>;
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    analysisReducer,
    initialState,
    (initial) => loadState(getSessionStorage()) ?? initial,
  );

  useEffect(() => {
    saveState(getSessionStorage(), state);
  }, [state]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis(): AnalysisContextValue {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis має викликатися всередині AnalysisProvider');
  }
  return context;
}
