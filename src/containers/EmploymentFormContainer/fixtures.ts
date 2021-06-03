// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedResponse } from '@apollo/client/testing';
import {
  GetEmploymentContainerDataQuery,
  GetEmploymentContainerDataQueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import {
  SaveEmploymentHistoryMutation,
  SaveEmploymentHistoryMutationVariables,
} from '../../../generated/SaveEmploymentHistoryMutation';
import { GET_EMPLOYMENT_CONTAINER_DATA, SAVE_EMPLOYMENT_HISTORY } from './gql';

export const withoutPrefilledEmployments = (
  personUuid: string,
  onMutationCalled: () => any,
) => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: GET_EMPLOYMENT_CONTAINER_DATA,
        variables: {
          uuid: personUuid,
        } as GetEmploymentContainerDataQueryVariables,
      },
      result: {
        data: {
          personByUuid: {
            __typename: 'PersonType',
            uuid: personUuid,
            partyId: '911',
            employmentHistories: [],
          },
          allDropDowns: {
            __typename: 'DropDownType',
            employmentStatuses: {
              __typename: 'DropDownDataType',
              data: [
                'Employed',
                'Self employed',
                'Unemployed',
                'Student',
                'Retired',
              ],
              favourites: [],
            },
          },
        } as GetEmploymentContainerDataQuery,
      },
    },
    {
      request: {
        query: SAVE_EMPLOYMENT_HISTORY,
        variables: {
          input: {
            partyId: '911',
            employmentHistories: [
              {
                companyAddressServiceId: undefined,
                companyName: undefined,
                contract: undefined,
                employedSinceDate: '1990-1-01',
                employmentStatus: 'Retired',
                grossAnnualIncome: undefined,
                jobTitle: undefined,
                workPhoneNumber: undefined,
              },
            ],
          },
        } as SaveEmploymentHistoryMutationVariables,
      },
      result: () => {
        onMutationCalled();
        return {
          data: {
            createUpdateEmploymentHistory: [
              {
                __typename: 'EmploymentHistoryType',
                uuid: '4f3ff930-090f-400b-b7fa-f51d83e7eaa9',
                companyAddressServiceId: null,
                companyAddressCity: null,
                companyAddressLineOne: null,
                companyAddressLineTwo: null,
                companyAddressPostcode: null,
                companyName: null,
                contract: null,
                employedSinceDate: '1990-01-01',
                employmentStatus: 'Retired',
                grossAnnualIncome: null,
                jobTitle: null,
                workPhoneNumber: null,
              },
            ],
          } as SaveEmploymentHistoryMutation,
        };
      },
    },
  ];

  return mocks;
};

export const withPrefilledEmployments = (personUuid: string) => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: GET_EMPLOYMENT_CONTAINER_DATA,
        variables: {
          uuid: personUuid,
        } as GetEmploymentContainerDataQueryVariables,
      },
      result: {
        data: {
          personByUuid: {
            uuid: personUuid,
            partyId: '911',
            employmentHistories: [
              {
                __typename: 'EmploymentHistoryType',
                uuid: '4f4b31ad-df91-417f-913a-510072e7d695',
                companyAddressCity: 'London',
                companyAddressLineOne: '1-13 St Giles High St,',
                companyAddressLineTwo: 'West End',
                companyAddressPostcode: 'WC2H 8AG',
                companyAddressServiceId: 'GB|001',
                companyName: 'Google',
                contract: 'Full time',
                employedSinceDate: '2002-01-01',
                employmentStatus: 'Employed',
                grossAnnualIncome: 200000,
                jobTitle: 'Janitor',
                workPhoneNumber: '0777777777777',
              },
              {
                __typename: 'EmploymentHistoryType',
                uuid: '4f4b31ad-df91-417f-913a-7363727abce',
                companyAddressCity: null,
                companyAddressLineOne: null,
                companyAddressLineTwo: null,
                companyAddressPostcode: null,
                companyAddressServiceId: null,
                companyName: null,
                contract: null,
                employedSinceDate: '1990-01-01',
                employmentStatus: 'Student',
                grossAnnualIncome: null,
                jobTitle: null,
                workPhoneNumber: null,
              },
            ],
          },
          allDropDowns: {
            __typename: 'DropDownType',
            employmentStatuses: {
              __typename: 'DropDownDataType',
              data: [
                'Employed',
                'Self employed',
                'Unemployed',
                'Student',
                'Retired',
              ],
              favourites: [],
            },
          },
        } as GetEmploymentContainerDataQuery,
      },
    },
    {
      request: {
        query: SAVE_EMPLOYMENT_HISTORY,
        variables: {
          input: {
            partyId: '911',
            employmentHistories: [
              {
                companyAddressServiceId: 'GB|001',
                companyName: 'Google',
                contract: 'Full time',
                employedSinceDate: '2002-01-01',
                employmentStatus: 'Employed',
                grossAnnualIncome: 200000,
                jobTitle: 'Janitor',
                workPhoneNumber: '0777777777777',
              },
            ],
          },
        } as SaveEmploymentHistoryMutationVariables,
      },
      result: {
        data: {
          createUpdateEmploymentHistory: [
            {
              __typename: 'EmploymentHistoryType',
              uuid: '4f3ff930-090f-400b-b7fa-f51d83e7eaa9',
              companyAddressCity: 'London',
              companyAddressLineOne: '1-13 St Giles High St,',
              companyAddressLineTwo: 'West End',
              companyAddressPostcode: 'WC2H 8AG',
              companyAddressServiceId: 'GB|001',
              companyName: 'Google',
              contract: 'Full time',
              employedSinceDate: '2002-01-01',
              employmentStatus: 'Retired',
              grossAnnualIncome: 200000,
              jobTitle: 'Janitor',
              workPhoneNumber: '0777777777777',
            },
          ],
        } as SaveEmploymentHistoryMutation,
      },
    },
  ];

  return mocks;
};
