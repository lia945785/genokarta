import type { KeyboardEvent } from 'react';
import { DISEASES } from '../../data/diseases';
import { geneticCategory } from '../../domain/genetics';
import { categorizeLifestyle, type FactorStatuses } from '../../domain/lifestyle';
import { GENETIC_LABEL, LIFESTYLE_LABEL } from '../../domain/matrix';
import type { DiseaseId, DiseaseReport } from '../../domain/types';
import { ordinal } from '../../utils/format';
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/icons';
import './DiseaseCarousel.css';

interface DiseaseCarouselProps {
  diseases: readonly DiseaseReport[];
  statuses: FactorStatuses;
  currentIndex: number;
  onSelect: (id: DiseaseId) => void;
}

export function DiseaseCarousel({ diseases, statuses, currentIndex, onSelect }: DiseaseCarouselProps) {
  const count = diseases.length;
  const current = diseases[currentIndex];
  const prev = diseases[(currentIndex - 1 + count) % count];
  const next = diseases[(currentIndex + 1) % count];
  const currentGenetic = geneticCategory(current.percentile);

  function show(offset: number) {
    onSelect(diseases[(currentIndex + offset + count) % count].diseaseId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    show(event.key === 'ArrowRight' ? 1 : -1);
  }

  return (
    <section className="carousel no-print" aria-roledescription="карусель" aria-label="Хвороби у звіті" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => show(-1)}
        aria-label={`Попередня хвороба: ${DISEASES[prev.diseaseId].name}`}
      >
        <ArrowLeftIcon aria-hidden="true" />
        <span className="carousel__neighbor" aria-hidden="true">
          {DISEASES[prev.diseaseId].name}
        </span>
      </button>

      <div className="carousel__current" aria-live="polite" aria-atomic="true">
        <span className="carousel__name">{DISEASES[current.diseaseId].name}</span>
        <span className="visually-hidden">
          , {ordinal(current.percentile)} перцентиль, генетична схильність {GENETIC_LABEL[currentGenetic].toLowerCase()}
        </span>
      </div>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => show(1)}
        aria-label={`Наступна хвороба: ${DISEASES[next.diseaseId].name}`}
      >
        <span className="carousel__neighbor" aria-hidden="true">
          {DISEASES[next.diseaseId].name}
        </span>
        <ArrowRightIcon aria-hidden="true" />
      </button>

      <div className="carousel__dots">
        {diseases.map((disease, index) => {
          const info = DISEASES[disease.diseaseId];
          const genetic = geneticCategory(disease.percentile);
          const lifestyle = categorizeLifestyle(statuses, info.factors);
          return (
            <button
              key={disease.diseaseId}
              type="button"
              className="carousel__dot"
              aria-current={index === currentIndex ? 'true' : undefined}
              aria-label={`${info.name}: ${ordinal(disease.percentile)} перцентиль, генетична схильність ${GENETIC_LABEL[genetic].toLowerCase()}, спосіб життя ${LIFESTYLE_LABEL[lifestyle].toLowerCase()}`}
              onClick={() => onSelect(disease.diseaseId)}
            />
          );
        })}
      </div>
    </section>
  );
}
