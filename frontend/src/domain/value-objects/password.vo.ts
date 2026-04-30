const uppercasePattern = /[A-Z]/;
const lowercasePattern = /[a-z]/;
const numberPattern = /\d/;
const symbolPattern = /[^A-Za-z0-9]/;

export const isStrongPassword = (value: string): boolean =>
  value.length >= 8 && value.length <= 128 &&
  uppercasePattern.test(value) &&
  lowercasePattern.test(value) &&
  numberPattern.test(value) &&
  symbolPattern.test(value);
