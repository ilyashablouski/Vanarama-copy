import { ValidationOptions } from 'react-hook-form';
import { PASSWORD_REGEX } from './regex';

export const requiredField = (message: string): ValidationOptions => ({
  required: {
    value: true,
    message,
  },
});

export const passwordValidator: ValidationOptions = {
  required: {
    value: true,
    message: 'Your Password is required',
  },
  pattern: {
    value: PASSWORD_REGEX,
    message: 'Your Password does not meet the requirements',
  },
};

export const newPasswordValidator: ValidationOptions = {
  required: {
    value: true,
    message: 'Please fill in your new password',
  },
  pattern: {
    value: PASSWORD_REGEX,
    message: 'Your Password does not meet the requirements',
  },
};

export const confirmPasswordValidator = (
  password: string,
): ValidationOptions => ({
  validate: (confirmPassword: string) =>
    password !== confirmPassword ? 'Repeat Password does not match' : undefined,
  required: {
    value: true,
    message: 'Please fill in your repeat password',
  },
});
