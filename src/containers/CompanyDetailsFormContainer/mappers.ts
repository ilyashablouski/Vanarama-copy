import moment from 'moment';
import { historyToMoment } from '../../utils/dates';
import { SubmissionValues } from '../../components/CompanyDetailsForm/interfaces';

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
  companyUuid?: string
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
      ? moment(searchResult.dateOfCreation!).format('DD-MM-YYYY')
      : historyToMoment({
          month: values.tradingSinceMonth,
          year: values.tradingSinceYear,
        }).format('DD-MM-YYYY'),
    addresses: mapAddresses(values),
    withTradingAddress: values.tradingDifferent,
    companyNature: values.nature,
    emailAddress: mapEmailAddress(values),
    telephoneNumbers: mapTelephoneNumbers(values),
  };
};
