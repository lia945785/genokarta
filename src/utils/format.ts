const NBSP = ' ';

const intFormatter = new Intl.NumberFormat('uk-UA');
const decimalFormatter = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 });
const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatInt(value: number): string {
  return intFormatter.format(Math.round(value));
}

export function formatNumber(value: number): string {
  return decimalFormatter.format(value);
}

export function formatPercent(value: number): string {
  return `${formatNumber(value)}${NBSP}%`;
}

export function formatSigned(value: number): string {
  const abs = decimalFormatter.format(Math.abs(value));
  if (value > 0) return `+${abs}`;
  if (value < 0) return `−${abs}`;
  return abs;
}

export function formatFileSize(bytes: number): string {
  const megabyte = 1024 * 1024;
  if (bytes < megabyte) {
    return `${formatInt(Math.max(1, bytes / 1024))}${NBSP}КБ`;
  }
  return `${formatNumber(Math.round((bytes / megabyte) * 10) / 10)}${NBSP}МБ`;
}

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function ordinal(value: number): string {
  return `${Math.round(value)}-й`;
}

export function plural(value: number, forms: readonly [string, string, string]): string {
  const n = Math.abs(Math.trunc(value));
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}
