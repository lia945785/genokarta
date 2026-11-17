import { describe, expect, it } from 'vitest';
import type { GenomeFormat } from './types';
import { inspectGenomeFile } from './fileValidation';

const files = import.meta.glob<string>('../../test-files/*.{txt,csv,vcf,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function load(name: string): File {
  const text = files[`../../test-files/${name}`];
  if (text === undefined) throw new Error(`Немає тестового файлу ${name}`);
  return new File([text], name);
}

const valid: Array<[string, GenomeFormat, number]> = [
  ['valid-23andme.txt', '23andme', 122],
  ['valid-ancestry.txt', 'ancestry', 120],
  ['valid-myheritage.csv', 'myheritage', 120],
  ['valid-sample.vcf', 'vcf', 60],
];

const invalid: Array<[string, string]> = [
  ['invalid-empty.txt', 'Файл порожній'],
  ['invalid-extension.json', 'непідтримуваний формат'],
  ['invalid-content.txt', 'Не вдалося розпізнати вміст'],
  ['invalid-missing-genotype.txt', 'Не вдалося розпізнати вміст'],
  ['invalid-headers-only.csv', 'не знайдено жодного маркера'],
];

describe('тестові файли з test-files', () => {
  it.each(valid)('%s приймається як %s з %i маркерами', async (name, format, markerCount) => {
    await expect(inspectGenomeFile(load(name))).resolves.toEqual({ ok: true, format, markerCount });
  });

  it.each(invalid)('%s відхиляється: «%s…»', async (name, message) => {
    const result = await inspectGenomeFile(load(name));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain(message);
  });
});
