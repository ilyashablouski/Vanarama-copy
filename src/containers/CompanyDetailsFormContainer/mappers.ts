import moment from 'moment';
import { historyToMoment } from '../../utils/dates';
import { SubmissionValues } from '../../components/CompanyDetailsForm/interfaces';

const DATE_FORMAT = 'DD-MM-YYYY';

export const mapAddresses = (values: SubmissionValues) =>
  values.tradingDifferent
    ? [
        {
          serviceId: values.registeredAddress.id,
          kind: 'registered',
        },
        {
          serviceId: values.tradingAddress.id,
          kind: 'trading',
        },
      ]
    : [
        {
          serviceId: values.registeredAddress.id,
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
) => {
  const searchResult =
    values.inputMode === 'search' && values.companySearchResult;

  const uuidData = companyUuid
    ? { uuid: companyUuid }
    : { person: { uuid: personUuid } };

  return {
    ...uuidData,
    companyType: 'Limited',
    legalName: searchResult ? searchResult.title : values.companyName,
    companyNumber: searchResult
      ? searchResult.companyNumber
      : values.companyNumber,
    tradingSince: searchResult
      ? moment(searchResult.dateOfCreation!).format(DATE_FORMAT)
      : historyToMoment({
          month: values.tradingSinceMonth,
          year: values.tradingSinceYear,
        }).format(DATE_FORMAT),
    addresses: mapAddresses(values),
    withTradingAddress: values.tradingDifferent,
    companyNature: values.nature,
    emailAddress: mapEmailAddress(values),
    telephoneNumbers: mapTelephoneNumbers(values),
  };
};

export const mapDefaultValues = (data: { [key: string]: any }) => {
  return {
    nature: data?.nature,
    companyNumber: data?.company_number,
    companyType: data?.company_type,
    companyName: data?.company_name,
    tradingSinceMonth: data?.trading_since_month,
    tradingSinceYear: data?.trading_since_year,
    email: data?.email,
    telephone: data?.telephone,
    tradingAddress: data?.trading_address,
    registeredAddress: data?.registered_address,
    tradingDifferent: data?.trading_different,
  };
};
