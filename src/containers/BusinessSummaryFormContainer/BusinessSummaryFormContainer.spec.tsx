import { MockedProvider } from '@apollo/client/testing'; 
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import BusinessSummaryFormContainer from './BusinessSummaryFormContainer';
import createCompanyData from './__fixtures__/testCompanyData';
import g from '../../components/BusinessSummaryForm/BusinessSummaryFormDirectorDetailsSection'

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
    };
  },
}));

describe('<BusinessSummaryFormContainer />', () => {
  it('should render company details correctly', async () => {
    // ARRANGE
    const uuid = 'ad0f772b-eded-483a-96be-18ea4e67948d';
    const mocks = [createCompanyData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
      'Desafinado, 15 Mill Bridge Close, Crewe, CW1 5DZ'
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

    expect(screen.getByTestId(/summary-email-address/)).toHaveTextContent('a.harbuz81@reply.com');
  });

  it('should render VAT details correctly', async () => {
    // ARRANGE
    const uuid = 'ad0f772b-eded-483a-96be-18ea4e67948d';
    const mocks = [createCompanyData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'ad0f772b-eded-483a-96be-18ea4e67948d';
    const mocks = [createCompanyData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'ad0f772b-eded-483a-96be-18ea4e67948d';
    const mocks = [createCompanyData(uuid)];

    console.log('/////////////////////');
    console.log((mocks[0].result as any).data.companyByUuid.associates);

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Female')).toBeInTheDocument();
    });
    // await screen.findByText('Director Details');
    // console.log('//////////////////////////////////////');
    // console.log(screen.getByTestId('company_director_details_heading_[0]'));

    // ASSERT
    expect(
      screen.getByTestId('company_director_details_heading_[0]'),
    ).toHaveTextContent('Anastasiya Harbuz');

    expect(screen.getByTestId('summary-director[0]-title')).toHaveTextContent(
      'Miss',
    );

    expect(
      screen.getByTestId('summary-director[0]-gender'),
    ).toHaveTextContent('Female');

    expect(screen.getByTestId('summary-director[0]-birth-date')).toHaveTextContent(
      '17 February 1999',
    );

    expect(
      screen.getByTestId('summary-director[0]-business-share'),
    ).toHaveTextContent('40%');

    expect(screen.getByTestId('summary-director[0]-noOfDependants')).toHaveTextContent(
      'None',
    );

    expect(
      screen.getByTestId('summary-director[0]-curr-address'),
    ).toHaveTextContent('Sky View, 5 Harrogate Road, York, YO51 9JD');

    expect(
      screen.getByTestId('summary-director[0]-curr-moved-in'),
    ).toHaveTextContent('February 2007');

    expect(screen.getByTestId('summary-director[0]-curr-prop-status')).toHaveTextContent(
      'Owned with mortgage',
    );
  });

  it('should redirect to the thank you page when clicking "Continue"', async () => {
    // ARRANGE
    const uuid = 'ad0f772b-eded-483a-96be-18ea4e67948d';
    const mocks = [createCompanyData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BusinessSummaryFormContainer companyUuid={uuid} />
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
