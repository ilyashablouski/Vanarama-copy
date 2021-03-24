import { ValidationOptions } from 'react-hook-form';
import {
  PASSWORD_REGEX,
  POSTCODE_REGEX,
  EMAIL_REGEX,
  WORLDWIDE_MOBILE_REGEX,
  NUMBERS_REGEX,
  LETTERS_AND_NUMBERS_REGEX,
  NAME_REGEX,
} from './regex';

const MAX_EMAIL_LENGTH = 254;

export const requiredField = (message: string): ValidationOptions => ({
  required: { value: true, message },
});

export const passwordValidator: ValidationOptions = {
  required: { value: true, message: 'Your Password is required' },
  pattern: {
    value: PASSWORD_REGEX,
    message: 'Your Password does not meet the requirements',
  },
};

export const newPasswordValidator: ValidationOptions = {
  required: { value: true, message: 'Please fill in your new password' },
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
  required: { value: true, message: 'Please fill in your repeat password' },
});

export const fullNameValidator = {
  required: { value: true, message: 'Please enter your full name' },
  minLength: {
    value: 2,
    message:
      'Oops, this name’s too short. Please make it 2 characters or more.',
  },
  maxLength: {
    value: 100,
    message:
      'Oops, this name’s too long. Please keep it to 100 characters or less.',
  },
  pattern: {
    value: NAME_REGEX,
    message: 'Please use only letters, apostrophes and dashes.',
  },
};

export const postcodeValidator = {
  required: { value: true, message: 'Please enter your postcode' },
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
  required: { value: true, message: 'Please enter your email address' },
  maxLength: {
    value: MAX_EMAIL_LENGTH,
    message: `Email address should not exceed ${MAX_EMAIL_LENGTH} characters`,
  },
  pattern: {
    value: EMAIL_REGEX,
    message: 'Oops, this email address is invalid',
  },
};

export const firstNameValidator = {
  required: {
    value: true,
    message: 'Please enter your first name',
  },
  minLength: {
    value: 2,
    message:
      'Oops, this name’s too short. Please make it 2 characters or more.',
  },
  maxLength: {
    value: 50,
    message:
      'Oops, this name’s too long. Please keep it to 50 characters or less.',
  },
  pattern: {
    value: NAME_REGEX,
    message: 'Please use only letters, apostrophes and dashes.',
  },
};

export const lastNameValidator = {
  required: { value: true, message: 'Please enter your last name' },
  minLength: {
    value: 2,
    message:
      'Oops, this last name’s too short. Please make it 2 characters or more.',
  },
  maxLength: {
    value: 50,
    message:
      'Oops, this last name’s too long. Please keep it to 50 characters or less.',
  },
  pattern: {
    value: NAME_REGEX,
    message: 'Please use only letters, apostrophes and dashes.',
  },
};

export const phoneNumberValidator = {
  required: { value: true, message: 'Please enter your phone number' },
  minLength: {
    value: 11,
    message:
      'Oops, this phone number is too short. Please enter 11 characters or more',
  },
  maxLength: {
    value: 16,
    message:
      'Oops, this phone number is too long. Please enter 16 characters or less',
  },
  pattern: {
    value: WORLDWIDE_MOBILE_REGEX,
    message: 'Please enter your phone number without spaces or hyphens',
  },
};

export const termsAndCons = {
  required: {
    value: true,
    message: 'The terms and conditions must be accepted',
  },
};

export const privacyPolicy = {
  required: {
    value: true,
    message: 'The privacy policy must be confirmed',
  },
};

export const annualValidator = (message: string) => ({
  required: { value: true, message },
  maxLength: {
    value: 50,
    message:
      'Oops, this seems too long. Please keep it to 50 characters or less.',
  },
  pattern: { value: NUMBERS_REGEX, message: 'Please only use numbers' },
});

export const requiredTextFieldValidator = (
  message: string,
  maxLength: number,
) => ({
  required: { value: true, message },
  minLength: {
    value: 2,
    message:
      'Oops, this name’s too short. Please make it 2 characters or longer',
  },
  maxLength: {
    value: maxLength,
    message: `Oops, this name's too long. Please make it ${maxLength} characters or shorter`,
  },
});

export const vehicleRegistrationNumberValidator = {
  required: {
    value: true,
    message: 'Please enter vehicle registration number',
  },
  minLength: {
    value: 4,
    message:
      'Oops, that’s a short registration number. Please make it at least 4 characters long',
  },
  maxLength: {
    value: 7,
    message:
      'Oops, that’s a long registration number. Please make it not longer than 7 characters long',
  },
  pattern: {
    value: LETTERS_AND_NUMBERS_REGEX,
    message: 'Please only use letters and numbers',
  },
};

export const companyNameValidator = {
  required: {
    value: true,
    message: 'Please enter your company name',
  },
};

export const fleetSizeValidator = {
  required: {
    value: true,
    message: 'Please enter your fleet size',
  },
};
