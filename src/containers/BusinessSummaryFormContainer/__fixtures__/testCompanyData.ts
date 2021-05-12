// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedResponse } from '@apollo/client/testing';
import {
  GetCompanySummaryQueryVariables,
  GetCompanySummaryQuery,
} from '../../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from '../gql';

export default (uuid: string, personUuid: string) =>
  ({
    request: {
      query: GET_COMPANY_SUMMARY,
      variables: {
        uuid,
        personUuid,
      } as GetCompanySummaryQueryVariables,
    },
    result: {
      data: {
        companyByUuid: {
          bankAccounts: [
            {
              __typename: 'BankAccountType',
              uuid: 'c5939b96-2854-444b-9aec-52d634581eb0',
              accountName: 'Eternal account',
              accountNumber: '01234567',
              joinedAt: '2007-08-01',
              sortCode: '433335',
            },
          ],
          associates: [
            {
              uuid: '895f87bc-14bf-407b-91c1-42ae3ebfb9e2',
              title: 'Miss',
              firstName: 'Nastya',
              lastName: 'Garbuz',
              gender: 'Female',
              dateOfBirth: '1999-02-03',
              noOfDependants: 'None',
              businessShare: 40,
              roles: [
                {
                  position: null,
                },
                {
                  position: null,
                },
                {
                  position: null,
                },
                {
                  position: null,
                },
                {
                  position: 'director',
                },
              ],
              addresses: [
                {
                  serviceId: 'GB|RM|A|27452128|A1',
                  propertyStatus: 'Owned with mortgage',
                  startedOn: '2008-02-01',
                  city: 'York',
                  lineOne: 'Sky View',
                  lineTwo: '5 Harrogate Road',
                  postcode: 'YO51 9JD',
                },
              ],
            },
          ],
          uuid: 'c4e8c130-8c71-4eeb-b2a8-b161426ef3a7',
          isVatRegistered: true,
          tradesOutsideUk: true,
          turnoverPercentageOutsideUk: [
            {
              country: 'Azerbaijan',
              percentage: '12',
            },
            {
              country: 'French Polynesia',
              percentage: '34',
            },
          ],
          vatNumber: '123456789',
          __typename: 'CompanyType',
          legalName: '12345 LIMITED',
          companyNumber: '03799306',
          companyNature: 'IT',
          tradingSince: '1999-07-01',
          addresses: [
            {
              serviceId: 'GB|RM|B|20230758|A1',
              uuid: 'f3508691-e47d-4208-a637-b47a5eef7b02',
              kind: 'registered',
              lineOne: '4 Keymer Court',
              lineTwo: '',
              country: 'GB',
              city: 'Burgess Hill',
              postcode: 'RH15 0AA',
            },
          ],
          emailAddresses: [
            {
              uuid: '0f7c0a3e-7930-4823-895b-07c79fd7f02f',
              kind: 'Home',
              value: 'a.harbuz121@reply.com',
              primary: true,
            },
          ],
          telephoneNumbers: [
            {
              uuid: 'e58c66c5-1bea-45e1-89f6-0af202d3660e',
              kind: 'Mobile',
              value: '00000000000',
              primary: true,
            },
          ],
        },
        personByUuid: {
          __typename: 'PersonType',
          uuid: '895f87bc-14bf-407b-91c1-42ae3ebfb9e2',
          title: 'Miss',
          firstName: 'Nastya',
          lastName: 'Garbuz',
          emailAddresses: [
            {
              __typename: 'EmailAddressType',
              uuid: '5ba1d32d-b704-441e-a3de-b4c4c8effc0c',
              primary: true,
              value: 'a.harbuz@reply.com',
            },
          ],
          telephoneNumbers: [
            {
              __typename: 'TelephoneNumberType',
              uuid: '6e007ebc-acfd-4bcc-8545-52e978980c9d',
              kind: 'Mobile',
              value: '09876543213',
            },
          ],
          dateOfBirth: '1999-02-03',
          countryOfBirth: 'Belarus',
          nationality: 'Belarusian',
          maritalStatus: 'Single',
          noOfAdultsInHousehold: '1',
          noOfDependants: 'None',
          emailConsent: false,
        },
      } as GetCompanySummaryQuery,
    },
  } as MockedResponse);
