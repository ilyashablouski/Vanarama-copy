import { ValidationOptions } from 'react-hook-form';

export const emailValidator: ValidationOptions = {
  required: {
    value: true,
    message: 'Your Email is required',
  },
};

export const passwordValidator: ValidationOptions = {
  required: {
    value: true,
    message: 'Your Password is required',
  },
};
