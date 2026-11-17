export type DiseaseId =
  | 'cad'
  | 'stroke'
  | 'afib'
  | 'hypertension'
  | 't2d'
  | 'crc'
  | 'asthma'
  | 'alzheimer';

export type FactorId =
  | 'bmi'
  | 'smoking'
  | 'activity'
  | 'diet'
  | 'sleep'
  | 'alcohol'
  | 'environment';

export type Smoking = 'never' | 'former' | 'current';
export type Alcohol = 'none' | 'rarely' | 'weekly' | 'daily';
export type Environment = 'clean' | 'moderate' | 'polluted';

export type DietHabitId =
  | 'fruit'
  | 'vegetables'
  | 'wholeGrains'
  | 'fish'
  | 'nuts'
  | 'lowProcessedMeat'
  | 'lowSugaryDrinks'
  | 'lowRefined';

export interface LifestyleAnswers {
  heightCm: number;
  weightKg: number;
  sleepHours: number;
  dietHabits: DietHabitId[];
  smoking: Smoking;
  alcohol: Alcohol;
  activityPerWeek: number;
  environment: Environment;
}

export interface LifestyleDraft {
  heightCm: string;
  weightKg: string;
  sleepHours: number;
  dietHabits: DietHabitId[];
  smoking: Smoking | null;
  alcohol: Alcohol | null;
  activityPerWeek: number;
  environment: Environment | null;
}

export type GeneticCategory = 'low' | 'intermediate' | 'high';
export type LifestyleCategory = 'favorable' | 'intermediate' | 'unfavorable';

export type GenomeFormat = '23andme' | 'ancestry' | 'myheritage' | 'vcf';

export interface GenomeFileInfo {
  name: string;
  sizeBytes: number;
  format: GenomeFormat;
  markerCount: number;
}

export interface Marker {
  rsid: string;
  gene: string;
  genotype: string;
  effectAllele: string;
  weight: number;
}

export interface Coverage {
  markersFound: number;
  markersTotal: number;
  weightCoveredPct: number;
  excludedAmbiguous: number;
}

export interface DiseaseReport {
  diseaseId: DiseaseId;
  scoreId: string;
  percentile: number;
  coverage: Coverage;
  topMarkers: Marker[];
}

export interface AncestryResult {
  group: string;
  probability: number;
  confident: boolean;
}

export interface AnalysisReport {
  createdAt: string;
  fileName: string;
  markersInFile: number;
  ancestry: AncestryResult;
  diseases: DiseaseReport[];
}
