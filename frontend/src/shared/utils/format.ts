export const formatInteger = (value: number): string => new Intl.NumberFormat('en-US').format(value);

export const formatPercentage = (value: number): string => `${value.toFixed(1)}%`;

export const formatDate = (value: string): string => new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(value));

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
