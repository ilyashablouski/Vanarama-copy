import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as ICreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';

export const responseToInitialFormValues = (
  data?: ICreditApplication['aboutDetailsV2'],
): IBusinessAboutFormValues => {
  return {
    companyType: data?.companyType ?? '',
    consent: data?.emailConsent ?? false,
    email: data?.emailAddresses?.[0].value ?? '',
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
    marketing: data?.smsConsent ?? false,
    mobile: data?.telephoneNumbers?.[0].value ?? '',
    termsAndConditions: data?.termsAndConditions ?? false,
    title: data?.title ?? '',
    privacyPolicy: data?.privacyPolicy ?? false,
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
