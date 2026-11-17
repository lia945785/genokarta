import type { AncestryResult, DiseaseId, DiseaseReport } from '../domain/types';

export const MOCK_ANCESTRY: AncestryResult = {
  group: 'Європейська',
  probability: 0.94,
  confident: true,
};

export const MOCK_DISEASE_REPORTS: Record<DiseaseId, DiseaseReport> = {
  cad: {
    diseaseId: 'cad',
    scoreId: 'DEMO-CAD',
    percentile: 87,
    coverage: { markersFound: 1398, markersTotal: 1745, weightCoveredPct: 74, excludedAmbiguous: 41 },
    topMarkers: [
      { rsid: 'rs1333049', gene: 'CDKN2B-AS1', genotype: 'CC', effectAllele: 'C', weight: 0.21 },
      { rsid: 'rs646776', gene: 'SORT1', genotype: 'TT', effectAllele: 'T', weight: 0.12 },
      { rsid: 'rs11206510', gene: 'PCSK9', genotype: 'CT', effectAllele: 'T', weight: 0.08 },
      { rsid: 'rs6725887', gene: 'WDR12', genotype: 'CT', effectAllele: 'C', weight: 0.14 },
      { rsid: 'rs1746048', gene: 'CXCL12', genotype: 'CC', effectAllele: 'C', weight: 0.09 },
    ],
  },
  stroke: {
    diseaseId: 'stroke',
    scoreId: 'DEMO-STROKE',
    percentile: 66,
    coverage: { markersFound: 79, markersTotal: 90, weightCoveredPct: 84, excludedAmbiguous: 3 },
    topMarkers: [
      { rsid: 'rs2107595', gene: 'HDAC9', genotype: 'AG', effectAllele: 'A', weight: 0.17 },
      { rsid: 'rs6843082', gene: 'PITX2', genotype: 'GG', effectAllele: 'G', weight: 0.13 },
      { rsid: 'rs879324', gene: 'ZFHX3', genotype: 'AG', effectAllele: 'A', weight: 0.12 },
      { rsid: 'rs12204590', gene: 'FOXF2', genotype: 'AC', effectAllele: 'A', weight: 0.09 },
    ],
  },
  afib: {
    diseaseId: 'afib',
    scoreId: 'DEMO-AF',
    percentile: 23,
    coverage: { markersFound: 98, markersTotal: 111, weightCoveredPct: 86, excludedAmbiguous: 4 },
    topMarkers: [
      { rsid: 'rs2200733', gene: 'PITX2', genotype: 'CC', effectAllele: 'T', weight: 0.39 },
      { rsid: 'rs2106261', gene: 'ZFHX3', genotype: 'CT', effectAllele: 'T', weight: 0.21 },
      { rsid: 'rs13376333', gene: 'KCNN3', genotype: 'CC', effectAllele: 'T', weight: 0.16 },
      { rsid: 'rs3903239', gene: 'PRRX1', genotype: 'AG', effectAllele: 'G', weight: 0.12 },
      { rsid: 'rs3807989', gene: 'CAV1', genotype: 'AG', effectAllele: 'G', weight: 0.1 },
    ],
  },
  crc: {
    diseaseId: 'crc',
    scoreId: 'DEMO-CRC',
    percentile: 91,
    coverage: { markersFound: 121, markersTotal: 140, weightCoveredPct: 83, excludedAmbiguous: 6 },
    topMarkers: [
      { rsid: 'rs6983267', gene: 'CCAT2/MYC', genotype: 'GG', effectAllele: 'G', weight: 0.17 },
      { rsid: 'rs4939827', gene: 'SMAD7', genotype: 'TT', effectAllele: 'T', weight: 0.15 },
      { rsid: 'rs16892766', gene: 'EIF3H', genotype: 'AC', effectAllele: 'C', weight: 0.25 },
      { rsid: 'rs4779584', gene: 'GREM1', genotype: 'CT', effectAllele: 'T', weight: 0.19 },
      { rsid: 'rs3802842', gene: 'COLCA2', genotype: 'AC', effectAllele: 'C', weight: 0.11 },
    ],
  },
  asthma: {
    diseaseId: 'asthma',
    scoreId: 'DEMO-ASTHMA',
    percentile: 9,
    coverage: { markersFound: 152, markersTotal: 212, weightCoveredPct: 64, excludedAmbiguous: 11 },
    topMarkers: [
      { rsid: 'rs9273349', gene: 'HLA-DQ', genotype: 'CT', effectAllele: 'C', weight: 0.18 },
      { rsid: 'rs3771166', gene: 'IL18R1', genotype: 'AG', effectAllele: 'G', weight: 0.14 },
      { rsid: 'rs2305480', gene: 'GSDMB', genotype: 'AA', effectAllele: 'G', weight: 0.19 },
      { rsid: 'rs1342326', gene: 'IL33', genotype: 'AA', effectAllele: 'C', weight: 0.2 },
      { rsid: 'rs2284033', gene: 'IL2RB', genotype: 'AA', effectAllele: 'G', weight: 0.1 },
    ],
  },
  t2d: {
    diseaseId: 't2d',
    scoreId: 'DEMO-T2D',
    percentile: 54,
    coverage: { markersFound: 1077, markersTotal: 1259, weightCoveredPct: 88, excludedAmbiguous: 23 },
    topMarkers: [
      { rsid: 'rs7903146', gene: 'TCF7L2', genotype: 'CT', effectAllele: 'T', weight: 0.31 },
      { rsid: 'rs10811661', gene: 'CDKN2A/B', genotype: 'TT', effectAllele: 'T', weight: 0.17 },
      { rsid: 'rs1801282', gene: 'PPARG', genotype: 'CC', effectAllele: 'C', weight: 0.13 },
      { rsid: 'rs13266634', gene: 'SLC30A8', genotype: 'CT', effectAllele: 'C', weight: 0.12 },
      { rsid: 'rs5219', gene: 'KCNJ11', genotype: 'CC', effectAllele: 'T', weight: 0.09 },
    ],
  },
  hypertension: {
    diseaseId: 'hypertension',
    scoreId: 'DEMO-HTN',
    percentile: 31,
    coverage: { markersFound: 612, markersTotal: 903, weightCoveredPct: 58, excludedAmbiguous: 30 },
    topMarkers: [
      { rsid: 'rs699', gene: 'AGT', genotype: 'AG', effectAllele: 'G', weight: 0.11 },
      { rsid: 'rs4961', gene: 'ADD1', genotype: 'GT', effectAllele: 'T', weight: 0.09 },
      { rsid: 'rs5186', gene: 'AGTR1', genotype: 'AA', effectAllele: 'C', weight: 0.07 },
      { rsid: 'rs1173771', gene: 'NPR3', genotype: 'GG', effectAllele: 'G', weight: 0.05 },
    ],
  },
  alzheimer: {
    diseaseId: 'alzheimer',
    scoreId: 'DEMO-AD',
    percentile: 12,
    coverage: { markersFound: 19, markersTotal: 21, weightCoveredPct: 97, excludedAmbiguous: 1 },
    topMarkers: [
      { rsid: 'rs429358', gene: 'APOE', genotype: 'TT', effectAllele: 'C', weight: 1.12 },
      { rsid: 'rs7412', gene: 'APOE', genotype: 'CT', effectAllele: 'T', weight: -0.47 },
      { rsid: 'rs744373', gene: 'BIN1', genotype: 'AG', effectAllele: 'G', weight: 0.15 },
      { rsid: 'rs11136000', gene: 'CLU', genotype: 'CT', effectAllele: 'C', weight: 0.14 },
      { rsid: 'rs3851179', gene: 'PICALM', genotype: 'TT', effectAllele: 'C', weight: 0.12 },
    ],
  },
};
