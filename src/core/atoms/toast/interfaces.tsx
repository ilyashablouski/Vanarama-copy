import { ReactText } from 'react';
import { IBaseProps } from '../../interfaces/base';

export type ToastVariant = 'error' | 'info' | 'warning' | 'success';

export interface IToastProps extends IBaseProps {
  message: string;
  title: string;
  variant: ToastVariant;
}

type Options = Omit<IToastProps, 'message' | 'title' | 'variant'>;

export type ToastFn = (
  title: string,
  message: string,
  options?: Options,
) => ReactText;
