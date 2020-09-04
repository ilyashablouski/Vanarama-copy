// import { AboutFormPerson } from '../../../../generated/AboutFormPerson';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  data: any,
): IBusinessAboutFormValues => {
  return {
    companyType: data?.company_type,
    consent: data?.consent,
    email: data?.email,
    firstName: data?.first_name,
    lastName: data?.last_name,
    marketing: data?.marketing,
    mobile: data?.mobile,
    termsAndConditions: data?.terms_and_conditions,
    title: data?.title,
  };
};
