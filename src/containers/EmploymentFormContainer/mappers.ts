import { EmploymentHistoryInputObject } from '../../../generated/globalTypes';
import { IEmploymentFormValues } from '../../components/EmploymentForm/interfaces';
import {
  reverseDefaultFormatDate,
  historyToDateObject,
} from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IEmploymentFormValues,
): EmploymentHistoryInputObject => ({
  partyId,
  employmentHistories: values.history.map(item => ({
    companyAddressServiceId: item.address?.id || undefined,
    companyName: item.company || undefined,
    contract: item.contract || undefined,
    employedSinceDate: reverseDefaultFormatDate(historyToDateObject(item)),
    employmentStatus: item.status || undefined,
    grossAnnualIncome: Number(item.income) || undefined,
    jobTitle: item.title || undefined,
    workPhoneNumber: item.phoneNumber || undefined,
  })),
});
