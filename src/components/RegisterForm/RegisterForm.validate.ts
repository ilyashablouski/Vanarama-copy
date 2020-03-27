import { ValidationOptions } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';

export const emailValidator: ValidationOptions = {
  required: {
    value: true,
    message: 'Your Email is required',
  },
  pattern: {
    value: EMAIL_REGEX,
    message: 'Invalid email address',
  },
};

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

export const confirmPasswordValidator = (
  password: string,
): ValidationOptions => ({
  validate: (confirmPassword: string) =>
    password !== confirmPassword ? 'Repeat Password does not match' : null,
  required: {
    value: true,
    message: 'Repeat Password is required',
  },
});
