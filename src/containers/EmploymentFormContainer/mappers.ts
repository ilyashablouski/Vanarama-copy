import { EmploymentHistoryInputObject } from '../../../generated/globalTypes';
import { IEmploymentFormValues } from '../../components/EmploymentForm/interfaces';

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
    employedSinceDate: `${item.year}-${item.month}-01`,
    employmentStatus: item.status || undefined,
    grossAnnualIncome: Number(item.income) || undefined,
    jobTitle: item.title || undefined,
    workPhoneNumber: item.phoneNumber || undefined,
  })),
});
