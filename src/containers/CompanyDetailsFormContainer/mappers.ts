import { parseDate } from '../../utils/dates';
import {
  SubmissionValues,
  ICompanyDetailsFormValues,
} from '../../components/CompanyDetailsForm/interfaces';
import { SaveCompanyDetailsMutation_createUpdateLimitedCompany as ICompany } from '../../../generated/SaveCompanyDetailsMutation';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';

const getAddress = (
  addresess: {
    [key: string]: any;
  },
  kind: string,
) =>
  addresess?.find((address: { [key: string]: any }) => address.kind === kind) ||
  {};

export const mapAddresses = (values: SubmissionValues) =>
  values.tradingDifferent
    ? [
        {
          serviceId: values.registeredAddress?.id,
          kind: 'registered',
        },
        {
          serviceId: values.tradingAddress?.id,
          kind: 'trading',
        },
      ]
    : [
        {
          serviceId: values.registeredAddress?.id,
          kind: 'registered',
        },
      ];

export const mapEmailAddress = (values: SubmissionValues) => ({
  kind: 'Home',
  value: values.email,
  primary: true,
});

export const mapTelephoneNumbers = (values: SubmissionValues) => [
  { value: values.telephone, primary: true },
];

export const mapFormValues = (
  values: SubmissionValues,
  personUuid: string,
  companyUuid?: string,
  companyType?: string,
) => {
  const searchResult =
    values.inputMode === 'search' && values.companySearchResult;

  return {
    person: { uuid: personUuid },
    uuid: companyUuid || values.uuid || null,
    companyType: companyType || 'Limited',
    legalName: searchResult ? searchResult.title : values.companyName,
    companyNumber: searchResult
      ? searchResult.companyNumber
      : values.companyNumber,
    tradingSince: searchResult
      ? searchResult.dateOfCreation
      : parseDate('01', values.tradingSinceMonth, values.tradingSinceYear),
    addresses: mapAddresses(values),
    withTradingAddress: values.tradingDifferent,
    companyNature: values.nature,
    emailAddress: mapEmailAddress(values),
    telephoneNumbers: mapTelephoneNumbers(values),
  };
};

export const mapAddress = (data: any) => ({
  city: data?.city,
  country: data?.country,
  endedOn: data?.ended_on,
  kind: data?.kind,
  label: data?.label,
  lineOne: data?.line_one,
  lineThree: data?.line_three,
  lineTwo: data?.line_two,
  postcode: data?.postcode,
  property_status: data?.property_status,
  id: data?.service_id,
  startedOn: data?.started_on,
});

export const mapDefaultValues = (data: {
  [key: string]: any;
}): ICompanyDetailsFormValues => {
  const tradingSince = data.trading_since
    ? new Date(data?.trading_since)
    : undefined;
  return {
    uuid: data?.uuid,
    companySearchResult: data?.company_search_result
      ? {
          addressSnippet: data?.company_search_result?.address_snippet,
          companyNumber: data?.company_search_result?.company_number,
          companyStatus: data?.company_search_result?.company_status,
          dateOfCreation: data?.company_search_result?.date_of_creation,
          title: data?.company_search_result?.title,
        }
      : undefined,
    companyNumber: data?.business_registration_number,
    companyName: data?.business_name,
    tradingSinceMonth: (tradingSince?.getMonth() || '').toString(),
    tradingSinceYear: (tradingSince?.getFullYear() || '').toString(),
    nature: data?.nature_of_business,
    registeredAddress: mapAddress(getAddress(data?.addresses, 'registered')),
    tradingDifferent: !!Object.keys(getAddress(data?.addresses, 'trading'))
      .length,
    tradingAddress: mapAddress(getAddress(data?.addresses, 'trading')),
    email: data?.email_addresses?.[0]?.value,
    telephone: data?.telephone_numbers?.[0]?.value,
  };
};

export const mapCompanyDetailsToCreditApplication = (
  values: ICompanyDetailsFormValues,
  company: ICompany | null,
  aboutDetails?: IBusinessAboutFormValues | null,
) => {
  const registeredAddress =
    company?.addresses?.find(address => address.kind === 'registered') || {};
  const tradingAddress =
    company?.addresses?.find(address => address.kind === 'trading') || {};

  return {
    uuid: company?.uuid,
    companySearchResult: values.companySearchResult,
    businessName: values.companySearchResult?.title || values.companyName,
    businessRegistrationNumber:
      values.companySearchResult?.companyNumber || values.companyNumber,
    natureOfBusiness: values.nature,
    addresses: [
      {
        ...registeredAddress,
        label: values.registeredAddress?.label,
      },
      values.tradingAddress?.label
        ? {
            ...tradingAddress,
            label: values.tradingAddress?.label,
          }
        : undefined,
    ].filter(Boolean),
    tradingSince:
      values?.companySearchResult?.dateOfCreation ??
      parseDate('01', values.tradingSinceMonth, values.tradingSinceYear),
    companyType: aboutDetails?.companyType || 'Limited',
    telephoneNumbers: [{ value: values.telephone, kind: 'business' }],
    emailAddresses: [{ kind: 'Home', value: values.email, primary: true }],
  };
};
