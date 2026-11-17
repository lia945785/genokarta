import { DnaHelix } from '../components/DnaHelix';
import '../components/report/report.css';
import { Button } from '../components/ui/Button';
import {
  ArrowRightIcon,
  FileIcon,
  DropletIcon,
  InfoIcon,
  LeafIcon,
  ReportIcon,
  type IconComponent,
} from '../components/ui/icons';
import { DISEASE_IDS } from '../data/diseases';
import { FACTOR_INFO } from '../domain/lifestyle';
import { QUESTIONNAIRE_STEPS } from '../domain/questionnaire';
import { plural } from '../utils/format';
import './HomePage.css';

const STEPS: ReadonlyArray<{ title: string; text: string; icon: IconComponent }> = [
  {
    title: 'Завантажте файл',
    text: 'Сирі дані 23andMe, AncestryDNA, MyHeritage або VCF. Система перевірить формат і порахує маркери.',
    icon: FileIcon,
  },
  {
    title: 'Розкажіть про спосіб життя',
    text: 'Сон, харчування, звички, фізична активність і повітря там, де ви живете.',
    icon: LeafIcon,
  },
  {
    title: 'Отримайте звіт',
    text: 'Перцентиль генетичної схильності, внесок маркерів і матриця «гени × спосіб життя».',
    icon: ReportIcon,
  },
];

const HELIX_LABELS = [
  { gene: 'TCF7L2', rsid: 'rs7903146', disease: 'Діабет 2 типу', position: 'top' },
  { gene: 'APOE', rsid: 'rs429358', disease: 'Хвороба Альцгеймера', position: 'middle' },
  { gene: 'CDKN2B-AS1', rsid: 'rs1333049', disease: 'Ішемічна хвороба серця', position: 'bottom' },
] as const;

export function HomePage({ onStart }: { onStart: () => void }) {
  const diseaseCount = DISEASE_IDS.length;
  const factorCount = Object.keys(FACTOR_INFO).length;
  const stepCount = QUESTIONNAIRE_STEPS.length;

  return (
    <div className="page">
      <section className="panel hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <h1 id="hero-title">Дізнайтеся, як гени й спосіб життя впливають на ваше здоров’я</h1>
          <p className="lead">
            Завантажте файл ДНК-тесту, дайте відповідь на кілька запитань і отримайте звіт, де
            пояснено кожен показник: {diseaseCount}{' '}
            {plural(diseaseCount, ['поширена хвороба', 'поширені хвороби', 'поширених хвороб'])}, {factorCount}{' '}
            {plural(factorCount, ['фактор', 'фактори', 'факторів'])} способу життя, {stepCount}{' '}
            {plural(stepCount, ['короткий крок', 'короткі кроки', 'коротких кроків'])} анкети.
          </p>
          <div className="hero__actions">
            <Button size="xl" iconTrailing={ArrowRightIcon} onClick={onStart}>
              Завантажити файл ДНК
            </Button>
            <p className="hero__privacy">Файл перевіряється у браузері й нікуди не надсилається.</p>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <DnaHelix className="hero__helix" />
          {HELIX_LABELS.map((label) => (
            <span key={label.gene} className={`helix-label helix-label--${label.position}`}>
              <span className="helix-label__id">
                <span className="gene">{label.gene}</span>
                <span className="helix-label__rsid">{label.rsid}</span>
              </span>
              <span className="helix-label__disease">{label.disease}</span>
            </span>
          ))}
        </div>
      </section>

      <div className="home-grid">
        <section className="panel" aria-labelledby="how-title">
          <div className="panel__head">
            <div className="panel__title">
              <h2 id="how-title">Як це працює</h2>
              <p className="panel__subtitle">Три кроки до звіту</p>
            </div>
          </div>
          <ol className="steps">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="step">
                  <span className="step__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="step__body">
                    <span className="step__title">{step.title}</span>
                    <span className="step__text">{step.text}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="panel sample" aria-labelledby="sample-title">
          <div className="panel__head">
            <div className="panel__title">
              <h2 id="sample-title">Що буде у звіті</h2>
              <p className="panel__subtitle">Приклад для однієї хвороби</p>
            </div>
            <span className="chip">приклад</span>
          </div>
          <div className="sample__body">
            <p className="sample__disease">
              <DropletIcon aria-hidden="true" />
              Діабет 2 типу
            </p>
            <p className="focal tone-amber">
              <span className="focal__number num">54</span>
              <span className="focal__label">-й перцентиль · середня схильність</span>
            </p>
            <p className="sample__note">
              Перцентиль — це не ймовірність захворіти. Спосіб життя{' '}
              <span className="tone-amber">проміжний</span>: більше руху й корисних звичок у харчуванні
              перевели б його в сприятливий.
            </p>
          </div>
        </section>
      </div>

      <aside className="notice">
        <InfoIcon />
        <p>
          <strong>Це не діагноз.</strong> Звіт показує схильність відносно інших людей. Перцентиль
          не дорівнює ймовірності захворіти, а гени лише частина картини. З питаннями про здоров’я
          звертайтеся до лікаря.
        </p>
      </aside>
    </div>
  );
}
