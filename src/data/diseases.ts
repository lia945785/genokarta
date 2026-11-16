import type { DiseaseId, FactorId } from '../domain/types';

/** Дослідження, з яких узято набір факторів способу життя. */
export type FactorsSource = 'khera2016' | 'rutten2018' | 'illustrative';

export interface DiseaseInfo {
  id: DiseaseId;
  name: string;
  description: string;
  /** Фактори способу життя, які враховуються для цієї хвороби. */
  factors: readonly FactorId[];
  /** Звідки взято набір факторів. */
  factorsSource: FactorsSource;
  /**
   * Що зазвичай перевіряє лікар: загальна довідка для блоку «Що робити далі», не рекомендація
   * конкретній людині. Текст погоджено з автором проєкту.
   */
  checkup: string;
}

/** Порядок у списку: серцево-судинні, обмінні, онкологічні, дихальні, неврологічні. */
export const DISEASE_IDS: readonly DiseaseId[] = [
  'cad',
  'stroke',
  'afib',
  'hypertension',
  't2d',
  'crc',
  'asthma',
  'alzheimer',
];

export const DISEASES: Record<DiseaseId, DiseaseInfo> = {
  cad: {
    id: 'cad',
    name: 'Ішемічна хвороба серця',
    description: 'Ураження серця через звуження коронарних артерій, найчастіше внаслідок атеросклерозу.',
    factors: ['smoking', 'bmi', 'activity', 'diet'],
    factorsSource: 'khera2016',
    checkup: 'Тиск, холестерин (ліпідограма) і глюкоза в крові.',
  },
  stroke: {
    id: 'stroke',
    name: 'Інсульт',
    description: 'Гостре порушення кровообігу в мозку через закупорку або розрив судини.',
    factors: ['smoking', 'diet', 'bmi', 'activity'],
    factorsSource: 'rutten2018',
    checkup: 'Насамперед артеріальний тиск, його можна контролювати.',
  },
  afib: {
    id: 'afib',
    name: 'Фібриляція передсердь',
    description: 'Порушення ритму, за якого передсердя скорочуються хаотично. Підвищує ризик інсульту.',
    factors: ['alcohol', 'bmi', 'activity', 'smoking', 'sleep'],
    factorsSource: 'illustrative',
    checkup: 'Якщо відчуваєте перебої чи прискорене серцебиття, ЕКГ.',
  },
  hypertension: {
    id: 'hypertension',
    name: 'Артеріальна гіпертензія',
    description: 'Стійко підвищений артеріальний тиск, що навантажує серце й судини.',
    factors: ['bmi', 'activity', 'diet', 'alcohol', 'sleep', 'environment'],
    factorsSource: 'illustrative',
    checkup: 'Вимірювати тиск хоча б раз на рік, удома або на прийомі.',
  },
  t2d: {
    id: 't2d',
    name: 'Діабет 2 типу',
    description: 'Порушення обміну глюкози, за якого клітини погано реагують на інсулін.',
    factors: ['bmi', 'activity', 'diet', 'sleep', 'smoking'],
    factorsSource: 'illustrative',
    checkup: 'Глюкоза натще або глікований гемоглобін (HbA1c).',
  },
  crc: {
    id: 'crc',
    name: 'Колоректальний рак',
    description: 'Злоякісна пухлина товстої або прямої кишки.',
    factors: ['smoking', 'alcohol', 'bmi', 'activity', 'diet'],
    factorsSource: 'illustrative',
    checkup: 'Скринінг (тест на приховану кров або колоноскопія) зазвичай радять із 45–50 років, раніше, якщо хворіли родичі.',
  },
  asthma: {
    id: 'asthma',
    name: 'Бронхіальна астма',
    description: 'Хронічне запалення дихальних шляхів із нападами задишки й кашлю.',
    factors: ['smoking', 'environment', 'bmi', 'activity'],
    factorsSource: 'illustrative',
    checkup: 'Кашель, свистяче дихання чи задишка — привід звернутися до лікаря; він може призначити спірометрію.',
  },
  alzheimer: {
    id: 'alzheimer',
    name: 'Хвороба Альцгеймера',
    description: 'Нейродегенеративне захворювання, найпоширеніша причина деменції.',
    factors: ['activity', 'smoking', 'alcohol', 'sleep', 'environment'],
    factorsSource: 'illustrative',
    checkup: 'Перевірки для людей без симптомів немає; якщо помічаєте зміни пам’яті, зверніться до лікаря.',
  },
};

export const KHERA_2016_URL = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5338864';
export const RUTTEN_2018_URL = 'https://doi.org/10.1136/bmj.k4168';
