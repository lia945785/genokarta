import type { GenomeFormat } from './types';

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ['.txt', '.csv', '.tsv', '.vcf'] as const;

export const FORMAT_LABEL: Record<GenomeFormat, string> = {
  '23andme': '23andMe',
  ancestry: 'AncestryDNA',
  myheritage: 'MyHeritage',
  vcf: 'VCF',
};

export type ValidationResult =
  | { ok: true; format: GenomeFormat; markerCount: number }
  | { ok: false; error: string };

export function checkFileMeta(name: string, sizeBytes: number): string | null {
  const lowerName = name.toLowerCase();
  if (!ALLOWED_EXTENSIONS.some((extension) => lowerName.endsWith(extension))) {
    return `Файл «${name}» має непідтримуваний формат. Завантажте файл .txt, .csv, .tsv або .vcf.`;
  }
  if (sizeBytes === 0) {
    return 'Файл порожній. Оберіть інший файл.';
  }
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return 'Файл більший за 50 МБ. Система приймає сирі дані генотипування (23andMe, AncestryDNA, MyHeritage) або VCF до 50 МБ.';
  }
  return null;
}

const LINE_23ANDME = /^(rs|i)\d+\t(\d{1,2}|X|Y|MT)\t\d+\t[ACGTDI-]{1,2}$/i;
const HEADER_ANCESTRY = /^rsid\tchromosome\tposition\tallele1\tallele2/i;
const HEADER_MYHERITAGE = /^"?rsid"?,"?chromosome"?,"?position"?,"?result"?/i;
const HEADER_LINE = /^"?rsid"?[\t,]/i;

export function detectFormat(text: string): GenomeFormat | null {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .slice(0, 60);

  if (lines[0]?.startsWith('##fileformat=VCF')) return 'vcf';
  if (lines.some((line) => HEADER_ANCESTRY.test(line))) return 'ancestry';
  if (lines.some((line) => HEADER_MYHERITAGE.test(line))) return 'myheritage';

  const firstDataLine = lines.find((line) => !line.startsWith('#'));
  if (firstDataLine && LINE_23ANDME.test(firstDataLine)) return '23andme';

  return null;
}

export function countMarkers(text: string): number {
  let count = 0;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line === '' || line.startsWith('#') || HEADER_LINE.test(line)) continue;
    count += 1;
  }
  return count;
}

export async function inspectGenomeFile(file: File): Promise<ValidationResult> {
  const metaError = checkFileMeta(file.name, file.size);
  if (metaError) return { ok: false, error: metaError };

  const text = await file.text();
  const format = detectFormat(text.slice(0, 16_384));
  if (!format) {
    return {
      ok: false,
      error:
        'Не вдалося розпізнати вміст. Очікуємо сирі дані 23andMe, AncestryDNA, MyHeritage або файл VCF.',
    };
  }

  const markerCount = countMarkers(text);
  if (markerCount === 0) {
    return { ok: false, error: 'У файлі не знайдено жодного маркера.' };
  }

  return { ok: true, format, markerCount };
}
