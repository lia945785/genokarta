import { useId } from 'react';
import { DISEASE_IDS, DISEASES } from '../data/diseases';
import type { DiseaseId } from '../domain/types';
import { Button } from './ui/Button';
import { DISEASE_ICON, InfoIcon } from './ui/icons';
import './DiseasePicker.css';

interface DiseasePickerProps {
  selected: readonly DiseaseId[];
  onToggle: (id: DiseaseId) => void;
  onSelectAll: () => void;
  error?: string | null;
}

export function DiseasePicker({ selected, onToggle, onSelectAll, error }: DiseasePickerProps) {
  const errorId = useId();
  const legendId = useId();
  const allSelected = selected.length === DISEASE_IDS.length;

  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-labelledby={legendId}>
      <div className="panel__head">
        <div className="panel__title">
          <h2 id={legendId} className="picker-legend">
            Які хвороби перевірити
          </h2>
          <p className="panel__subtitle">
            Обрано <span className="num">{selected.length}</span> з{' '}
            <span className="num">{DISEASE_IDS.length}</span>
          </p>
        </div>
        {!allSelected && (
          <Button color="link-color" onClick={onSelectAll}>
            Обрати всі
          </Button>
        )}
      </div>
      <div className="choice-list choice-list--diseases">
        {DISEASE_IDS.map((id) => {
          const disease = DISEASES[id];
          const Icon = DISEASE_ICON[id];
          return (
            <label key={id} className="choice choice--disease">
              <input type="checkbox" checked={selected.includes(id)} onChange={() => onToggle(id)} />
              <span className="choice__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="choice__body">
                <span className="choice__title">{disease.name}</span>
                <span className="choice__hint">{disease.description}</span>
              </span>
            </label>
          );
        })}
      </div>
      <div aria-live="polite">
        {selected.includes('alzheimer') && (
          <aside className="notice picker-warning">
            <InfoIcon />
            <p>
              <strong>Хвороба Альцгеймера: перш ніж дивитися звіт.</strong> Результат для цієї хвороби може
              засмутити. Перевірок для людей без симптомів немає, а висока генетична схильність не означає, що
              хвороба розвинеться. Якщо ви не впевнені, що хочете це знати, приберіть позначку — решта звіту не
              зміниться.
            </p>
          </aside>
        )}
      </div>
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
