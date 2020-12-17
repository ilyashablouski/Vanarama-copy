import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';

export const responseToInitialFormValues = (
  data: any,
): IBusinessAboutFormValues => {
  return {
    companyType: data?.company_type,
    consent: data?.consent,
    email: data?.email_addresses?.[0].value,
    firstName: data?.first_name,
    lastName: data?.last_name,
    marketing: data?.marketing,
    mobile: data?.telephone_numbers?.[0].value,
    termsAndConditions: data?.terms_and_conditions,
    title: data?.title,
    privacyPolicy: data?.privacyPolicy,
  };
};

export const mapAboutPersonData = (person: AboutFormPerson) => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const mobile =
    person?.telephoneNumbers?.find(_ => _.kind === 'Mobile')?.value || '';

  return {
    companyType: '',
    consent: person?.emailConsent || false,
    email,
    firstName: person.firstName,
    lastName: person.lastName,
    marketing: person?.smsConsent || false,
    mobile,
    termsAndConditions: person.termsAndConditions || false,
    title: person?.title || '',
    uuid: person.uuid,
    privacyPolicy: person.privacyPolicy || false,
  };
};

export const mapAboutDataCreditApp = () => ({});
