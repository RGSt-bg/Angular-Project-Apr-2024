import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regExp = new RegExp(`[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+`);

  return (control) => {
    const isEmailInvalid = control.value === '' || regExp.test(control.value);
    return isEmailInvalid ? null : { emailValidator: true };
  };
}

export function matchPasswordsValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const rePasswordFormControl = control.get(rePasswordControlName);
    const areMatching =
      passwordFormControl?.value == rePasswordFormControl?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}