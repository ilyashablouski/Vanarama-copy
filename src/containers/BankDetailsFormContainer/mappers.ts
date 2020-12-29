import { IBankDetails } from '../../components/BankDetails/interfaces';
import { BankAccountInputObject } from '../../../generated/globalTypes';
import { reverseDefaultFormatDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IBankDetails,
): BankAccountInputObject => {
  const joiningDate = `${values.openingMonth}-01-${values.openingYear}`;
  const joiningDateFormatted = reverseDefaultFormatDate(new Date(joiningDate));

  return {
    partyId,
    accountName: values.nameOnTheAccount,
    accountNumber: values.accountNumber,
    sortCode: values.sortCode?.join(''),
    bankName: values.bankName,
    joinedAt: joiningDateFormatted,
  };
};
