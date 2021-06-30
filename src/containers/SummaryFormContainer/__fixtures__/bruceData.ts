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
          emailAddresses: [
            {
              __typename: 'EmailAddressType',
              uuid: '3ff771b5-1c5a-4039-acff-ccfee8ffdc9d',
              primary: true,
              value: 'brucey-bonus@forsyth.com',
            },
          ],
          telephoneNumbers: [
            {
              __typename: 'TelephoneNumberType',
              uuid: 'ea09cfbf-e9d4-4ed5-9df4-ac9a23178372',
              kind: 'Mobile',
              value: '07733311122',
            },
          ],
          title: 'Mr.',
          firstName: 'Bruce',
          lastName: 'Forsyth',
          dateOfBirth: '1928-02-22',
          countryOfBirth: 'United Kingdom',
          nationality: 'British',
          maritalStatus: 'Married',
          noOfDependants: 'None',
          noOfAdultsInHousehold: '2',
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
          incomeAndExpense: {
            __typename: 'IncomeAndExpenseType',
            uuid: '3033e3cc-7f6b-4bad-8dea-32dbdb858e51',
            averageMonthlyIncome: 25000,
            netDisposableIncome: 10000,
            totalMonthlyExpenses: 14567.11,
          },
          bankAccounts: [
            {
              __typename: 'BankAccountType',
              uuid: '44f45ca5-8060-4dbc-a8fc-3b0e92eac77f',
              bankName: 'Bank of Merica!',
              accountName: "Mr Brucey 'Bonus' Forsyth",
              sortCode: '001122',
              accountNumber: '12345678',
              joinedAt: '1928-03-01',
            },
          ],
        },
      } as GetPersonSummaryQuery,
    },
  } as MockedResponse);
