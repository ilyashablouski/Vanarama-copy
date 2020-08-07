import moment from 'moment';
import { historyToMoment } from '../../utils/dates';
import { SubmissionValues } from '../../components/CompanyDetailsForm/interfaces';

const DATE_FORMAT = 'DD-MM-YYYY';

export const mapAddresses = (values: SubmissionValues) =>
  values.tradingDifferent
    ? [
        {
          serviceId: values.registeredAddress.id,
          label: values.registeredAddress.label,
          kind: 'registered',
        },
        {
          serviceId: values.tradingAddress.id,
          label: values.tradingAddress.label,
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

export const mapDefaultValues = (data: { [key: string]: string | object }) => {
  const date = data?.trading_since
    ? moment(data?.trading_since, DATE_FORMAT)
    : null;

  const tradingAddress = data?.addresses?.find(item => item.kind === 'trading');
  const registeredAddress = data?.addresses?.find(
    item => item.kind === 'registered',
  );

  return {
    nature: data?.company_nature,
    companyNumber: data?.company_number,
    companyType: data?.company_type,
    legalName: data?.legal_name,
    tradingDifferent: data?.with_trading_address,
    tradingSinceMonth: date?.month(),
    tradingSinceYear: date?.year(),
    email: data?.email_address?.value,
    telephone: data?.telephone_numbers?.[0]?.value,
    tradingAddress,
    registeredAddress,
  };
};
