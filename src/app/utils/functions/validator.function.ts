import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;

    if (!cnpj) {
      return null; // No CNPJ entered, so it's valid
    }

    // CNPJ must be 14 digits
    if (cnpj.length !== 14) {
      return { cnpjValid: false };
    }

    // Invalid known CNPJ patterns
    const invalidCnpjPatterns = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999'
    ];

    if (invalidCnpjPatterns.includes(cnpj)) {
      return { cnpjValid: false };
    }

    // Validate checksum digits
    const validateCnpjChecksum = (cnpj: string): boolean => {
      let length = cnpj.length - 2;
      let numbers = cnpj.substring(0, length);
      const digits = cnpj.substring(length);
      let sum = 0;
      let pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i), 10) * pos--;
        if (pos < 2) pos = 9;
      }

      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(0), 10)) return false;

      length = length + 1;
      numbers = cnpj.substring(0, length);
      sum = 0;
      pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i), 10) * pos--;
        if (pos < 2) pos = 9;
      }

      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(1), 10)) return false;

      return true;
    };

    return validateCnpjChecksum(cnpj) ? { cnpjValid: true } : { cnpjValid: false };
  };
}