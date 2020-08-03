// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedResponse } from '@apollo/client/testing';
import {
  GetCompanySummaryQueryVariables,
  GetCompanySummaryQuery,
} from '../../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from '../gql';

export default (uuid: string) =>
  ({
    request: {
      query: GET_COMPANY_SUMMARY,
      variables: {
        uuid,
      } as GetCompanySummaryQueryVariables,
    },
    result: {
      data: {
        companyByUuid: {
          __typename: 'CompanyType',
          uuid: 'ad0f772b-eded-483a-96be-18ea4e67948d',
          legalName: 'Nastia Test2',
          companyNumber: '09876546',
          companyNature: 'Fairy tale',
          tradingSince: '2005-02-01',
          tradesOutsideUk: true,
          isVatRegistered: true,
          vatNumber: '123456789',
          turnoverPercentageOutsideUk: [
            {
              country: 'Belarus',
              percentage: '30',
            },
            {
              country: 'Vanuatu',
              percentage: '10',
            },
          ],
          associates: [
            {
              uuid: 'fb9cd864-9667-4a71-9808-98709cda5875',
              title: 'Mr',
              firstName: 'Codrut Constantin',
              lastName: 'ABAZA',
              gender: 'Male',
              dateOfBirth: '1981-09-16',
              noOfDependants: 'None',
              businessShare: 30,
              roles: [
                {
                  position: 'director',
                },
              ],
              addresses: [
                {
                  serviceId: 'GB|RM|A|17306875',
                  propertyStatus: 'Rented',
                  startedOn: '2004-10-01',
                  city: 'Norwich',
                  lineOne: 'Flat 3',
                  lineTwo: 'Ivory House',
                  postcode: 'NR1 3NB',
                },
              ],
            },
            {
              uuid: '895f87bc-14bf-407b-91c1-42ae3ebfb9e2',
              title: 'Miss',
              firstName: 'Anastasiya',
              lastName: 'Harbuz',
              gender: 'Female',
              dateOfBirth: '1999-02-17',
              noOfDependants: 'None',
              businessShare: 40,
              roles: [
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
                  startedOn: '2007-02-01',
                  city: 'York',
                  lineOne: 'Sky View',
                  lineTwo: '5 Harrogate Road',
                  postcode: 'YO51 9JD',
                },
              ],
            },
          ],
          addresses: [
            {
              uuid: 'd3bbe72e-c785-45a0-a282-dbbc06efdea3',
              kind: 'trading',
              lineOne: 'Sadlers Farm',
              lineTwo: 'Lower Pennington Lane',
              country: 'GB',
              city: 'Lymington',
              postcode: 'SO41 8AL',
            },
            {
              uuid: '7826b870-dd25-4d43-a312-9f323e678638',
              kind: 'registered',
              lineOne: 'Desafinado',
              lineTwo: '15 Mill Bridge Close',
              country: 'GB',
              city: 'Crewe',
              postcode: 'CW1 5DZ',
            },
          ],
          emailAddresses: [
            {
              uuid: 'a1ba04ed-222b-4005-845f-c0a421b9f8ae',
              kind: 'Home',
              value: 'a.harbuz81@reply.com',
              primary: false,
            },
          ],
          telephoneNumbers: [
            {
              uuid: 'c803bf5b-4bf2-4164-bd9e-e892a933111d',
              kind: 'Mobile',
              value: '09876543211',
              primary: true,
            },
          ],
          bankAccounts: [
            {
              __typename: 'BankAccountType',
              uuid: 'aeabbbeb-007c-4b3c-b56f-2a02da347e7f',
              accountName: 'Nastia',
              accountNumber: '12345678',
              joinedAt: '2006-03-01',
              sortCode: '112233',
              updatedAt: '2020-07-20T14:14:25.317+00:00',
            },
          ],
        },
        personByUuid: {
          __typename: 'PersonType',
          uuid: 'uuid',
          title: null,
          firstName: 'firstName',
          lastName: 'lastName',
          emailAddresses: [
            {
              __typename: 'EmailAddressType',
              uuid: 'uuid',
              primary: true,
              value: 'value',
            },
          ],
          telephoneNumbers: [
            {
              __typename: 'TelephoneNumberType',
              uuid: 'uuid',
              kind: 'kind',
              value: 'value',
            },
          ],
          dateOfBirth: null,
          countryOfBirth: null,
          nationality: null,
          maritalStatus: null,
          noOfAdultsInHousehold: null,
          noOfDependants: null,
          emailConsent: null,
        },
      } as GetCompanySummaryQuery,
    },
  } as MockedResponse);
