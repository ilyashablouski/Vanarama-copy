import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  GetAboutYouDataQuery,
  GetAboutYouDataQueryVariables,
} from '../../../generated/GetAboutYouDataQuery';
import AboutFormContainer from './AboutFormContainer';
import { GET_ABOUT_YOU_DATA } from './gql';

describe('<AboutFormContainer />', () => {
  it('should prepopulate the form with existing data', async () => {
    // ARRANGE
    const personUuid = '1927e308-18f8-4d95-aef3-57cc46459930';
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ABOUT_YOU_DATA,
          variables: {
            uuid: personUuid,
            includePerson: true,
          } as GetAboutYouDataQueryVariables,
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
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <AboutFormContainer personUuid={personUuid} onCompleted={jest.fn()} />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('aboutHeading'));

    // ASSERT
    expect((screen.getByLabelText(/Title/) as HTMLInputElement).value).toEqual(
      'Professor',
    );

    expect(
      (screen.getByLabelText(/First Name/) as HTMLInputElement).value,
    ).toEqual('Bob');

    expect(
      (screen.getByLabelText(/Last Name/) as HTMLInputElement).value,
    ).toEqual('Smith');

    expect((screen.getByLabelText(/Email/) as HTMLInputElement).value).toEqual(
      'bob.smith90@gmail.com',
    );

    expect((screen.getByLabelText(/Mobile/) as HTMLInputElement).value).toEqual(
      '077799900022',
    );

    expect(
      (screen.getByTestId(/aboutSelectDOB/) as HTMLInputElement).value,
    ).toEqual('25');

    expect(
      (screen.getByTestId(/aboutSelectMOB/) as HTMLInputElement).value,
    ).toEqual('12');

    expect(
      (screen.getByTestId(/aboutSelectYOB/) as HTMLInputElement).value,
    ).toEqual('1990');

    expect(
      (screen.getByLabelText(/Country of Birth/) as HTMLInputElement).value,
    ).toEqual('United Kingdom');

    expect(
      (screen.getByLabelText(/Nationality/) as HTMLInputElement).value,
    ).toEqual('Irish');

    expect(
      (screen.getByLabelText(/Marital Status/) as HTMLInputElement).value,
    ).toEqual('Married');

    expect(
      (screen.getByLabelText(/No. of Dependants/) as HTMLInputElement).value,
    ).toEqual('None');

    expect(
      (screen.getByLabelText(/No. of Adults in Household/) as HTMLInputElement)
        .value,
    ).toEqual('1');

    expect(
      (screen.getByTestId(/aboutConsent/) as HTMLInputElement).checked,
    ).toEqual(true);

    expect(
      (screen.getByTestId(/aboutTermsAndCons/) as HTMLInputElement).checked,
    ).toEqual(true);
  });
});
