import { useState } from 'react';
import { DiseasePicker } from '../components/DiseasePicker';
import { FileDropzone } from '../components/FileDropzone';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/ui/icons';
import { useAnalysis } from '../state/AnalysisContext';
import './UploadPage.css';

interface UploadPageProps {
  onBack: () => void;
  onNext: () => void;
}

export function UploadPage({ onBack, onNext }: UploadPageProps) {
  const { state, dispatch } = useAnalysis();
  const [showErrors, setShowErrors] = useState(false);

  const fileMissing = state.file === null;
  const diseasesMissing = state.diseaseIds.length === 0;

  function handleNext() {
    if (fileMissing || diseasesMissing) {
      setShowErrors(true);
      return;
    }
    onNext();
  }

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <h1>Завантажте файл ДНК-тесту</h1>
          <p className="lead">Додайте файл і оберіть хвороби, які хочете перевірити.</p>
        </div>
      </header>

      <div className="upload-grid">
        <section className="panel" aria-labelledby="file-title">
          <div className="panel__head">
            <div className="panel__title">
              <h2 id="file-title">Файл з результатами тесту</h2>
              <p className="panel__subtitle">Файл перевіряється у браузері й нікуди не надсилається</p>
            </div>
          </div>
          <FileDropzone
            file={state.file}
            onAccepted={(file) => dispatch({ type: 'fileAccepted', file })}
            onCleared={() => dispatch({ type: 'fileCleared' })}
            onCheckStarted={() => setShowErrors(false)}
          />
          {showErrors && fileMissing && (
            <p className="field-error" role="alert">
              Спершу додайте файл.
            </p>
          )}
        </section>

        <section className="panel picker">
          <DiseasePicker
            selected={state.diseaseIds}
            onToggle={(id) => dispatch({ type: 'diseaseToggled', id })}
            onSelectAll={() => dispatch({ type: 'allDiseasesSelected' })}
            error={showErrors && diseasesMissing ? 'Оберіть хоча б одну хворобу.' : null}
          />
        </section>
      </div>

      <div className="panel actions">
        <Button color="secondary" size="lg" iconLeading={ArrowLeftIcon} onClick={onBack}>
          На головну
        </Button>
        <Button size="lg" iconTrailing={ArrowRightIcon} onClick={handleNext}>
          Далі: спосіб життя
        </Button>
      </div>
    </div>
  );
}
