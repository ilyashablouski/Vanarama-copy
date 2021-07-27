import { parseDate } from '../../utils/dates';
import {
  SubmissionValues,
  ICompanyDetailsFormValues,
} from '../../components/CompanyDetailsForm/interfaces';
import { SaveCompanyDetailsMutation_createUpdateLimitedCompany as ICompany } from '../../../generated/SaveCompanyDetailsMutation';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';
import {
  GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as ICreditApplication,
  GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_addresses as ICreditApplicationAddress,
} from '../../../generated/GetCreditApplicationByOrderUuid';
import { addressToDisplay } from '../../utils/address';
import { AddressFormAddresses } from '../../../generated/AddressFormAddresses';

export const getAddress = (
  addresses: ICreditApplicationAddress[],
  kind: string,
) =>
  addresses?.find(
    (address: ICreditApplicationAddress) => address.kind === kind,
  );

export const mapAddresses = (values: SubmissionValues) =>
  values.tradingDifferent
    ? [
        {
          ...(values.registeredAddress ?? {}),
          label: undefined,
          id: undefined,
          serviceId: values.registeredAddress?.id,
          kind: 'registered',
        },
        {
          ...(values.tradingAddress ?? {}),
          label: undefined,
          id: undefined,
          serviceId: values.tradingAddress?.id,
          kind: 'trading',
        },
      ]
    : [
        {
          ...(values.registeredAddress ?? {}),
          label: undefined,
          id: undefined,
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

export const mapAddress = (
  data?: ICreditApplicationAddress | AddressFormAddresses | null,
) => ({
  city: data?.city || undefined,
  country: data?.country || undefined,
  endedOn: data?.endedOn,
  kind: data?.kind,
  label: data ? addressToDisplay(data) : '',
  lineOne: data?.lineOne || undefined,
  lineThree: data?.lineThree || undefined,
  lineTwo: data?.lineTwo || undefined,
  postcode: data?.postcode || undefined,
  propertyStatus: data?.propertyStatus,
  id: data?.serviceId || undefined,
  startedOn: data?.startedOn,
});

export const mapDefaultValues = (
  data?: ICreditApplication['companyDetailsV2'],
): ICompanyDetailsFormValues => {
  const tradingSince = data?.tradingSince
    ? new Date(data?.tradingSince)
    : undefined;

  const registeredAddress = data?.addresses
    ? mapAddress(getAddress(data?.addresses, 'registered'))
    : undefined;
  const tradingAddress = data?.addresses
    ? mapAddress(getAddress(data?.addresses, 'trading'))
    : undefined;

  return {
    uuid: data?.uuid,
    companySearchResult: data?.companySearchResult
      ? {
          addressSnippet: data?.companySearchResult?.address_snippet,
          companyNumber: data?.companySearchResult?.company_number,
          companyStatus: data?.companySearchResult?.company_status,
          dateOfCreation: data?.companySearchResult?.date_of_creation,
          title: data?.companySearchResult?.title,
        }
      : undefined,
    companyNumber: data?.businessRegistrationNumber ?? '',
    companyName: data?.businessName ?? '',
    tradingSinceMonth: (tradingSince?.getMonth() || '').toString(),
    tradingSinceYear: (tradingSince?.getFullYear() || '').toString(),
    nature: data?.natureOfBusiness ?? '',
    registeredAddress: registeredAddress?.label ? registeredAddress : undefined,
    tradingDifferent: !!tradingAddress?.label,
    tradingAddress: tradingAddress?.label ? tradingAddress : undefined,
    email: data?.emailAddresses?.[0]?.value ?? '',
    telephone: data?.telephoneNumbers?.[0]?.value ?? '',
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
