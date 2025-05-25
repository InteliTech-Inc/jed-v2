export function validateEmail(email: string): boolean {
  const re = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
  return re.test(String(email).toLowerCase());
}
