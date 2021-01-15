import { IBankDetails } from '../../components/BankDetails/interfaces';
import { BankAccountInputObject } from '../../../generated/globalTypes';
import { parseDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IBankDetails,
): BankAccountInputObject => ({
  partyId,
  accountName: values.nameOnTheAccount,
  accountNumber: values.accountNumber,
  sortCode: values.sortCode?.join(''),
  bankName: values.bankName,
  joinedAt: parseDate(
    '01',
    values.openingMonth || '',
    values.openingYear || '',
  ),
});
