// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedResponse } from '@apollo/client/testing';
import {
  GetPersonSummaryQuery,
  GetPersonSummaryQueryVariables,
} from '../../../../generated/GetPersonSummaryQuery';
import { GET_PERSON_SUMMARY } from '../SummaryFormContainer';

export default (uuid: string) =>
  ({
    request: {
      query: GET_PERSON_SUMMARY,
      variables: {
        uuid,
      } as GetPersonSummaryQueryVariables,
    },
    result: {
      data: {
        personByUuid: {
          __typename: 'PersonType',
          uuid,
          addresses: [
            {
              __typename: 'AddressType',
              uuid: '5dbf59ab-f20e-4576-9128-0401142dee54',
              city: 'London',
              lineOne: 'Buckingham Palace',
              lineTwo: 'Westminster',
              postcode: 'SW1A 1AA',
              propertyStatus: 'Rented',
              startedOn: '2009-11-01',
            },
            {
              __typename: 'AddressType',
              uuid: '5dbf59ab-f20e-4576-9128-02837a3e7d2',
              city: 'London',
              lineOne: 'Tower of London',
              lineTwo: 'Westminster',
              postcode: 'SW1A 1AA',
              propertyStatus: 'Owned',
              startedOn: '2012-11-01',
            },
          ],
          bankAccounts: [
            {
              __typename: 'BankAccountType',
              uuid: '587a021e-2edc-44c3-a2d1-eadf70ec0a02',
              accountName: "Mr Brucey 'Bonus' Forsyth",
              accountNumber: '12345678',
              bankName: 'Bank of Merica!',
              sortCode: '001122',
              joinedAt: '2012-02-02',
            },
          ],
          countryOfBirth: 'United Kingdom',
          dateOfBirth: '1928-02-22',
          emailAddresses: [
            {
              __typename: 'EmailAddressType',
              uuid: 'b3869c45-75ce-412f-941b-e63b4b6d9c54',
              primary: false,
              value: 'brucey-secondary@forsyth.com',
            },
            {
              __typename: 'EmailAddressType',
              uuid: '0a321df7-5b02-438d-a27d-83cc402a39ca',
              primary: true,
              value: 'brucey-bonus@forsyth.com',
            },
          ],
          employmentHistories: [
            {
              __typename: 'EmploymentHistoryType',
              uuid: '0c3ffa34-e744-4b70-9d3c-cc1256a1b783',
              companyAddressCity: 'London',
              companyAddressLineOne: '1 Television Centre',
              companyAddressLineTwo: '101 Wood Lane',
              companyAddressPostcode: 'W12 7FA',
              companyName: 'BBC Studios',
              employedSinceDate: '1950-12-17',
              employmentStatus: 'Employed',
              grossAnnualIncome: 600000,
              jobTitle: 'TV Presenter',
              workPhoneNumber: '02084332000',
            },
            {
              __typename: 'EmploymentHistoryType',
              uuid: '0c3ffa34-e744-4b70-9d3c-cc1256a1b8aa',
              companyAddressCity: null,
              companyAddressLineOne: null,
              companyAddressLineTwo: null,
              companyAddressPostcode: null,
              companyName: null,
              employedSinceDate: '2015-01-01',
              employmentStatus: 'Retired',
              grossAnnualIncome: null,
              jobTitle: null,
              workPhoneNumber: null,
            },
          ],
          firstName: 'Bruce',
          incomeAndExpense: {
            __typename: 'IncomeAndExpenseType',
            uuid: 'e610318f-99fe-4e5c-9f60-888198bcd000',
            averageMonthlyIncome: 25000,
            netDisposableIncome: 10000,
            totalMonthlyExpenses: 14567.11,
          },
          lastName: 'Forsyth',
          maritalStatus: 'Married',
          nationality: 'British',
          noOfAdultsInHousehold: '2',
          noOfDependants: 'None',
          telephoneNumbers: [
            {
              __typename: 'TelephoneNumberType',
              uuid: '714e1bda-4b3d-420c-9cf5-a0fa8d91401b',
              kind: 'Home',
              value: '02001111111',
            },
            {
              __typename: 'TelephoneNumberType',
              uuid: '75ad1e9a-9392-4f6c-8d7d-47662939b2b2',
              kind: 'Mobile',
              value: '07733311122',
            },
          ],
          title: 'Mr.',
        },
      } as GetPersonSummaryQuery,
    },
  } as MockedResponse);
