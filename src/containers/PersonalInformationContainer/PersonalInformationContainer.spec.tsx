import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen } from '@testing-library/react';
import PersonalInformation from './PersonalInformation';
import { GET_PERSON_INFORMATION_DATA } from './gql';

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_PERSON_INFORMATION_DATA,
      variables: {
        personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
      },
    },
    result: {
      data: {
        myAccountDetailsByPersonUuid: {
          address: {
            lineOne: 'Building 1000',
            lineTwo: 'Lakeside North Harbour',
            city: 'Portsmouth',
            postcode: 'PO6 3EN',
            serviceId: 'GB|RM|B|55855593',
          },
          emailAddress: 'someone.testing.motorama+44@gmail.com',
          firstName: 'Jonses',
          lastName: 'Lanes',
          personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
          telephoneNumber: '02020202334',
          emailConsent: false,
          smsConsent: false,
        },
      },
    },
  },
];

describe('<PersonalInformation />', () => {
  it('should prepopulate the form with existing data', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PersonalInformation personUuid="aa08cca2-5f8d-4b8c-9506-193d9c32e05f" />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('personHeading'));

    // // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Jonses'));
    });

    await waitFor(() => {
      expect(screen.getByText('Lanes'));
    });

    await waitFor(() => {
      expect(screen.getByText('02020202334'));
    });

    await waitFor(() => {
      expect(screen.getByText('someone.testing.motorama+44@gmail.com'));
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Building 1000, Lakeside North Harbour - Portsmouth, PO6 3EN',
        ),
      );
    });
  });
});
