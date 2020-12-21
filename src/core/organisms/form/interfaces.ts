import { FormHTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';

export interface IFormProps
  extends IBaseProps,
    FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  /**
   * Whether there a validation errors in this form
   */
  invalid?: boolean;
  /**
   * The function to call when the form is submitted
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface IFormErrorProps extends IBaseProps {
  children: React.ReactNode;
}
