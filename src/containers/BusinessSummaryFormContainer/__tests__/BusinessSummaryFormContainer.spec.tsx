import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import BusinessSummaryFormContainer from '../BusinessSummaryFormContainer';
import { GET_COMPANY_SUMMARY } from '../gql';
import {
  GetCompanySummaryQueryVariables,
  GetCompanySummaryQuery,
} from '../../../../generated/GetCompanySummaryQuery';

// ARRANGE
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
      pathname: '/b2b/olaf/summary/[companyUuid]',
    };
  },
}));

const mockParams = {
  personUuid: '895f87bc-14bf-407b-91c1-42ae3ebfb9e2',
  companyUuid: 'c4e8c130-8c71-4eeb-b2a8-b161426ef3a7',
  orderId: 'bf87b571-9846-49db-bd37-2c05c127efe8',
};

const mocks = [
  {
    request: {
      query: GET_COMPANY_SUMMARY,
      variables: {
        uuid: mockParams.companyUuid,
        personUuid: mockParams.personUuid,
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
              updatedAt: '2020-07-31T14:35:52.872+00:00',
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
  } as MockedResponse,
];

xdescribe('<BusinessSummaryFormContainer />', () => {
  it('should render company details correctly', async () => {
    // ARRANGE

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Company Details');

    // ASSERT
    expect(screen.getByTestId(/summary-business-name/)).toHaveTextContent(
      'Nastia Test2',
    );

    expect(screen.getByTestId(/summary-company-number/)).toHaveTextContent(
      '09876546',
    );

    expect(screen.getByTestId(/summary-business-nature/)).toHaveTextContent(
      'Fairy tale',
    );

    expect(screen.getByTestId(/summary-registered-address/)).toHaveTextContent(
      'Desafinado, 15 Mill Bridge Close, Crewe, CW1 5DZ',
    );
    expect(screen.getByTestId(/summary-trading-address/)).toHaveTextContent(
      'Sadlers Farm, Lower Pennington Lane, Lymington, SO41 8AL',
    );

    expect(screen.getByTestId(/summary-trading-since/)).toHaveTextContent(
      'February 2005',
    );

    expect(screen.getByTestId(/summary-telephone-number/)).toHaveTextContent(
      '09876 543211',
    );

    expect(screen.getByTestId(/summary-email-address/)).toHaveTextContent(
      'a.harbuz81@reply.com',
    );
  });

  it('should render VAT details correctly', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('VAT Details');

    // ASSERT
    expect(screen.getByTestId('summary-vat-details')).toHaveTextContent(
      '123456789',
    );

    expect(screen.getByTestId('summary-vat-countries')).toHaveTextContent(
      'Belarus Vanuatu',
    );

    expect(screen.getByTestId('summary-turnover-percentage')).toHaveTextContent(
      '40%',
    );
  });

  it('should render company bank details correctly', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Company Bank Details');

    // ASSERT
    expect(screen.getByTestId('summary-name-on-card')).toHaveTextContent(
      'Nastia',
    );

    expect(screen.getByTestId('summary-sort-code')).toHaveTextContent(
      '11-22-33',
    );

    expect(screen.getByTestId('summary-account-number')).toHaveTextContent(
      '12345678',
    );
  });

  it('should render directors correctly and sorted by sharehold percentage desc', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Female')).toBeInTheDocument();
    });
    // await screen.findByText('Director Details');

    // ASSERT
    expect(
      screen.getByTestId('company_director_details_heading_[0]'),
    ).toHaveTextContent('Anastasiya Harbuz');

    expect(screen.getByTestId('summary-director[0]-title')).toHaveTextContent(
      'Miss',
    );

    expect(screen.getByTestId('summary-director[0]-gender')).toHaveTextContent(
      'Female',
    );

    expect(
      screen.getByTestId('summary-director[0]-birth-date'),
    ).toHaveTextContent('17 February 1999');

    expect(
      screen.getByTestId('summary-director[0]-business-share'),
    ).toHaveTextContent('40%');

    expect(
      screen.getByTestId('summary-director[0]-noOfDependants'),
    ).toHaveTextContent('None');

    expect(
      screen.getByTestId('summary-director[0]-curr-address'),
    ).toHaveTextContent('Sky View, 5 Harrogate Road, York, YO51 9JD');

    expect(
      screen.getByTestId('summary-director[0]-curr-moved-in'),
    ).toHaveTextContent('February 2007');

    expect(
      screen.getByTestId('summary-director[0]-curr-prop-status'),
    ).toHaveTextContent('Owned with mortgage');
  });

  it('should redirect to the thank you page when clicking "Continue"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByText(/Continue/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/olaf/thank-you');
  });

  it('should redirect to about page when clicking "Edit" on the "Your Details" section', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-your-details/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/about/[uuid]?redirect=summary',
      '/olaf/about/fd2333b8-6da1-47d2-837d-bc69849e0764?redirect=summary',
    );
  });

  it('should redirect to employment history page when clicking "Edit" on the "Employment History" section', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-employment-history/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/employment-history/[uuid]?redirect=summary',
      '/olaf/employment-history/fd2333b8-6da1-47d2-837d-bc69849e0764?redirect=summary',
    );
  });

  it('should redirect to expenses page when clicking "Edit" on the "Monthly Income" section', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-expenses/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/expenses/[uuid]?redirect=summary',
      '/olaf/expenses/fd2333b8-6da1-47d2-837d-bc69849e0764?redirect=summary',
    );
  });

  it('should redirect to bank details page when clicking "Edit" on the "Bank Details" section', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer {...mockParams} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-bank-details/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/bank-details/[uuid]?redirect=summary',
      '/olaf/bank-details/fd2333b8-6da1-47d2-837d-bc69849e0764?redirect=summary',
    );
  });
});
