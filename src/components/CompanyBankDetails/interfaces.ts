import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';
import { BankDetailsAccount } from '../../../generated/BankDetailsAccount';
import { BankAccountInputObject } from '../../../generated/globalTypes';

export interface ICompanyBankDetailsProps {
  onSubmit: (values: BankAccountInputObject) => Promise<any>;
}
