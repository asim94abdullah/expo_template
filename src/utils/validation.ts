const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPassword(value: string, minLength = 8): boolean {
  return value.length >= minLength;
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}
