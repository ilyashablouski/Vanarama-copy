import moment from 'moment';
import { IBankDetails } from '../../components/BankDetails/interfaces';
import { BankAccountInputObject } from '../../../generated/globalTypes';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IBankDetails,
): BankAccountInputObject => {
  const joiningDate = `${values.openingMonth}-${values.openingYear}`;
  const joiningDateFormatted = moment(joiningDate, 'MM-YYYY').format(
    'YYYY-MM-DD',
  );

  return {
    partyId,
    accountName: values.nameOnTheAccount,
    accountNumber: values.accountNumber,
    sortCode: values.sortCode?.join(''),
    bankName: values.bankName,
    joinedAt: joiningDateFormatted,
  };
};
