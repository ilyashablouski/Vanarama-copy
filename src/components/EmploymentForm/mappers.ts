import { EmploymentFormEmployment } from '../../../generated/EmploymentFormEmployment';
import { EMPTY_EMPLOYMENT_ENTRY, IEmploymentFormValues } from './interfaces';
import { addressToDisplay } from '../../utils/address';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  employments: EmploymentFormEmployment[],
): IEmploymentFormValues => {
  if (!employments.length) {
    return { history: [EMPTY_EMPLOYMENT_ENTRY] };
  }

  return {
    /**
     * NOTE: We must sort the dates to stop a bug whereby valid entries
     * are being auto-removed due to having more than 3 years history
     * because the server returns them in the incorrect order.
     */
    history: [...employments]
      .sort(
        (firstForm, secondForm) =>
          new Date(secondForm.employedSinceDate ?? '').getTime() -
          new Date(firstForm.employedSinceDate ?? '').getTime(),
      )
      .map(item => {
        const started = new Date(item.employedSinceDate ?? '');

        return {
          company: item.companyName,
          contract: item.contract,
          income: item.grossAnnualIncome
            ? String(item.grossAnnualIncome)
            : null,
          month: String(started.getMonth() + 1),
          phoneNumber: item.workPhoneNumber,
          status: item.employmentStatus || '',
          title: item.jobTitle || '',
          year: String(started.getFullYear()),
          address: item.companyAddressServiceId
            ? {
                id: item.companyAddressServiceId,
                label: addressToDisplay({
                  city: item.companyAddressCity,
                  lineOne: item.companyAddressLineOne,
                  lineTwo: item.companyAddressLineTwo,
                  postcode: item.companyAddressPostcode,
                }),
              }
            : undefined,
        };
      }),
  };
};
