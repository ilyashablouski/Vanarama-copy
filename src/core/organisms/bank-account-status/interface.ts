import { Nullish } from '../../../types/common';
import { IBaseProps } from '../../interfaces/base';
import { BankAccountValidator_bankAccountValidator } from '../../../../generated/BankAccountValidator';

export interface IBankAccountStatusProps extends IBaseProps {
  data: Nullish<BankAccountValidator_bankAccountValidator>;
  isLoading: boolean;
  isError: boolean;
}
