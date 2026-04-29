export const startOfTodayUtc = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

export const subtractYears = (date: Date, years: number): Date => {
  const copy = new Date(date.getTime());
  copy.setUTCFullYear(copy.getUTCFullYear() - years);
  return copy;
};

export const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date.getTime());
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
};

export const calculateAge = (birthDate: Date, referenceDate: Date): number => {
  let age = referenceDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDifference = referenceDate.getUTCMonth() - birthDate.getUTCMonth();
  const dayDifference = referenceDate.getUTCDate() - birthDate.getUTCDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age;
};

export const roundToOneDecimal = (value: number): number => Math.round(value * 10) / 10;
