import { IBaseProps } from '../../interfaces/base';
import { Nullish } from '../../../types/common';

export interface IBankAccountStatusProps extends IBaseProps {
  isLoading: boolean;
  isValid: Nullish<boolean>;
  isError: boolean;
}
