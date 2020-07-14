import { ValidationOptions } from 'react-hook-form';
import {
  PASSWORD_REGEX,
  POSTCODE_REGEX,
  EMAIL_REGEX,
  WORLDWIDE_MOBILE_REGEX,
} from './regex';

const MAX_EMAIL_LENGTH = 254;

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

export const fullNameValidator = {
  required: {
    value: true,
    message: 'Please enter your full name',
  },
};

export const postcodeValidator = {
  required: {
    value: true,
    message: 'Please enter your postcode',
  },
  validate: (postcode: string) => {
    if (postcode.replace(' ', '').length < 5) {
      return 'Oops, your postcode looks a little too short';
    }
    if (postcode.replace(' ', '').length > 7) {
      return 'Oops, your postcode looks a little too long';
    }
    return undefined;
  },
  pattern: {
    value: POSTCODE_REGEX,
    message: 'Please only use numbers, characters and spaces',
  },
};

export const emailValidator = {
  required: {
    value: true,
    message: 'Please enter your email address',
  },
  maxLength: {
    value: MAX_EMAIL_LENGTH,
    message: `Email address should not exceed ${MAX_EMAIL_LENGTH} characters`,
  },
  pattern: {
    value: EMAIL_REGEX,
    message: 'Oops, this email address is invalid',
  },
};

export const phoneNumberValidator = {
  required: {
    value: true,
    message: 'Please enter your mobile number',
  },
  minLength: {
    value: 11,
    message:
      'Oops, this mobile number is too short. Please enter 11 characters or more',
  },
  maxLength: {
    value: 16,
    message:
      'Oops, this mobile number is too long. Please enter 16 characters or less',
  },
  pattern: {
    value: WORLDWIDE_MOBILE_REGEX,
    message: 'Please enter your mobile number without spaces or hyphens',
  },
};

export const termsAndCons = {
  required: {
    value: true,
    message: 'The terms and conditions must be accepted',
  },
};
