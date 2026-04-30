const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (value: string): boolean => emailPattern.test(value.trim());
