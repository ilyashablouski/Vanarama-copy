import { EmploymentHistoryInputObject } from '../../../generated/globalTypes';
import { IEmploymentFormValues } from '../../components/EmploymentForm/interfaces';
import { parseDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  partyId: string,
  values: IEmploymentFormValues,
): EmploymentHistoryInputObject => ({
  partyId,
  employmentHistories: values.history.map(item => ({
    companyAddressServiceId: item.address?.id || undefined,
    companyAddressLineOne: item.address?.lineOne,
    companyAddressLineTwo: item.address?.lineTwo,
    companyAddressCity: item.address?.city,
    companyAddressCountry: item.address?.country,
    companyAddressPostcode: item.address?.postcode,
    companyName: item.company || undefined,
    contract: item.contract || undefined,
    employedSinceDate: parseDate('01', item.month, item.year),
    employmentStatus: item.status || undefined,
    grossAnnualIncome: Number(item.income) || undefined,
    jobTitle: item.title || undefined,
    workPhoneNumber: item.phoneNumber || undefined,
  })),
});
