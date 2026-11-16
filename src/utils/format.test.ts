import { describe, expect, it } from 'vitest';
import { formatSigned, ordinal, plural } from './format';

describe('plural', () => {
  const forms = ['день', 'дні', 'днів'] as const;
  it('обирає правильну форму', () => {
    expect(plural(1, forms)).toBe('день');
    expect(plural(21, forms)).toBe('день');
    expect(plural(2, forms)).toBe('дні');
    expect(plural(4, forms)).toBe('дні');
    expect(plural(5, forms)).toBe('днів');
    expect(plural(11, forms)).toBe('днів');
    expect(plural(14, forms)).toBe('днів');
    expect(plural(0, forms)).toBe('днів');
  });
});

describe('formatSigned', () => {
  it('додає знак і використовує десяткову кому', () => {
    expect(formatSigned(0.42)).toBe('+0,42');
    expect(formatSigned(-0.47)).toBe('−0,47');
    expect(formatSigned(0)).toBe('0');
  });
});

describe('ordinal', () => {
  it('утворює порядковий числівник', () => {
    expect(ordinal(87)).toBe('87-й');
  });
});
