import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/400-italic.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import './styles/global.css';

import App from './App';
import { AnalysisProvider } from './state/AnalysisContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Не знайдено елемент #root в index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <AnalysisProvider>
      <App />
    </AnalysisProvider>
  </StrictMode>,
);
