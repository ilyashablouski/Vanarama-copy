import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import {
  GetAboutYouDataQuery,
  GetAboutYouDataQueryVariables,
} from '../../../../generated/GetAboutYouDataQuery';
import AboutFormContainer from '../AboutFormContainer';
import { GET_ABOUT_YOU_DATA, GET_ABOUT_YOU_PAGE_DATA } from '../gql';

describe('<AboutFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should prepopulate the form with existing data', async () => {
    // ARRANGE
    const personUuid = '1927e308-18f8-4d95-aef3-57cc46459930';
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ABOUT_YOU_DATA,
          variables: {
            uuid: personUuid,
          } as GetAboutYouDataQueryVariables,
        },
        result: {
          data: {
            personByUuid: {
              __typename: 'PersonType',
              uuid: personUuid,
              countryOfBirth: 'United Kingdom',
              dateOfBirth: '1990-12-25',
              emailAddresses: [
                {
                  __typename: 'EmailAddressType',
                  primary: false,
                  value: 'bob.secondary@gmail.com',
                  uuid: '724fa4a2-1cd8-4a81-97b2-2eade6d8ff22',
                },
                {
                  __typename: 'EmailAddressType',
                  primary: true,
                  value: 'bob.smith90@gmail.com',
                  uuid: 'fc554b09-8896-470a-adc8-9c48abc1badd',
                },
              ],
              emailConsent: true,
              firstName: 'Bob',
              lastName: 'Smith',
              maritalStatus: 'Married',
              nationality: 'Irish',
              noOfAdultsInHousehold: '1',
              noOfDependants: 'None',
              telephoneNumbers: [
                {
                  __typename: 'TelephoneNumberType',
                  kind: 'Mobile',
                  uuid: '843a9887-b6c4-4774-966c-e2089bc027f0',
                  value: '077799900022',
                },
                {
                  __typename: 'TelephoneNumberType',
                  kind: 'Secret Phone',
                  uuid: 'de3fdb73-124d-47a4-b017-82b597323404',
                  value: '099999999999',
                },
              ],
              title: 'Professor',
            },
          } as GetAboutYouDataQuery,
        },
      },
      {
        request: {
          query: GET_ABOUT_YOU_PAGE_DATA,
        },
        result: {
          data: {
            allDropDowns: {
              __typename: 'DropDownType',
              titles: {
                __typename: 'DropDownDataType',
                data: ['Mr.', 'Mrs.', 'Professor'],
                favourites: [],
              },
              countries: {
                __typename: 'DropDownDataType',
                data: ['United Kingdom', 'United States'],
                favourites: [],
              },
              nationalities: {
                __typename: 'DropDownDataType',
                data: ['British', 'Irish'],
                favourites: [],
              },
              maritalStatuses: {
                __typename: 'DropDownDataType',
                data: ['Single', 'Married'],
              },
              noOfAdultsInHousehold: {
                __typename: 'DropDownDataType',
                data: ['1', 'More than 1'],
              },
              noOfDependants: {
                __typename: 'DropDownDataType',
                data: ['None', 'Lots...'],
              },
            },
          },
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <AboutFormContainer personUuid={personUuid} onCompleted={jest.fn()} />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByLabelText(/Title/);

    // ASSERT
    // expect(screen.getByLabelText(/Title/)).toHaveValue('Professor');
    expect(screen.getByLabelText(/First Name/)).toHaveValue('Bob');
    expect(screen.getByLabelText(/Last Name/)).toHaveValue('Smith');
    expect(screen.getByLabelText(/Email/)).toHaveValue('bob.smith90@gmail.com');
    expect(screen.getByLabelText(/Telephone/)).toHaveValue('077799900022');
    expect(screen.getByTestId(/aboutSelectDOB/)).toHaveValue('25');
    expect(screen.getByTestId(/aboutSelectMOB/)).toHaveValue('12');
    expect(screen.getByTestId(/aboutSelectYOB/)).toHaveValue('1990');
    expect(screen.getByLabelText(/Country of Birth/)).toHaveValue(
      'United Kingdom',
    );

    expect(screen.getByLabelText(/Nationality/)).toHaveValue('Irish');
    expect(screen.getByLabelText(/Marital Status/)).toHaveValue('Married');
    expect(screen.getByLabelText(/No. of Dependants/)).toHaveValue('None');
    expect(screen.getByLabelText(/No. of Adults in Household/)).toHaveValue(
      '1',
    );

    expect(screen.getByTestId(/aboutConsent/)).toBeChecked();
    expect(screen.getByTestId(/aboutTermsAndCons/)).toBeChecked();
  });
});
