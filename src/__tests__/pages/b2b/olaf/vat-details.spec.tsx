import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { GetVatDetailsCountries } from '../../../../../generated/GetVatDetailsCountries';
import { GET_VAT_DETAILS_COUNTRIES } from '../../../../components/VatDetailsForm/CountryTurnoverFieldArray';
import { VatDetailsPage } from '../../../../pages/b2b/olaf/vat-details/[companyUuid]';

jest.mock('../../../../hooks/useMediaQuery');
jest.mock('../../../../gql/order');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/b2b/olaf/company-details',
    query: {
      companyUuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
    },
  }),
}));

const dropDownData: MockedResponse[] = [
  {
    request: {
      query: GET_VAT_DETAILS_COUNTRIES,
    },
    result: {
      data: {
        allDropDowns: {
          __typename: 'DropDownType',
          countries: {
            __typename: 'DropDownDataType',
            data: [
              'Afghanistan',
              'Albania',
              'Algeria',
              'American Samoa',
              'Andorra',
              'Angola',
              'Anguilla',
            ],
            favourites: ['United Kingdom'],
          },
        },
      } as GetVatDetailsCountries,
    },
  },
];

describe('B2B VAT Details page', () => {
  it('should only show the "VAT Number" field when checking "The company is VAT registered"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));

    // ASSERT
    // Initally, the VAT Number field should not be shown
    expect(
      screen.queryByRole('textbox', { name: /VAT Number/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('checkbox', { name: /The company is VAT registered/i }),
    );

    // It should now be shown
    expect(
      screen.getByRole('textbox', { name: /VAT Number/i }),
    ).toBeInTheDocument();
  });

  it('should validate the "VAT Number" field is not empty when checking "The company is VAT registered"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));

    // ASSERT
    fireEvent.click(
      screen.getByRole('checkbox', { name: /The company is VAT registered/i }),
    );

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Please fill in VAT Number/i),
      ).toBeInTheDocument(),
    );
  });

  it('should validate the "VAT Number" field is 9 digits', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));

    // ASSERT
    fireEvent.click(
      screen.getByRole('checkbox', { name: /The company is VAT registered/i }),
    );

    fireEvent.input(screen.getByRole('textbox', { name: /VAT Number/i }), {
      target: { value: 'checkenz!🐔' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Your VAT number must be 9 digits long/i),
      ).toBeInTheDocument(),
    );
  });

  it('should only show the "Countries of Trade and % of Turnover" field when checking "The company trades outside the UK"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));

    // ASSERT
    // Initally, the turnover fields should not be shown
    expect(
      screen.queryByRole('combobox', { name: /Country 1/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('spinbutton', { name: /Percentage 1/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // They should now be shown
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    expect(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
    ).toBeInTheDocument();
  });

  it('should allow the user to add multiple countries', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    // Second country should not exist until clicking "add country" button
    expect(
      screen.queryByRole('combobox', { name: /Country 2/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /add country/i,
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 2/i }),
      ).toBeInTheDocument(),
    );
  });

  it('should allow the user to remove all but one country', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    // Second country should not exist until clicking "add country" button
    expect(
      screen.queryByRole('combobox', { name: /Country 2/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /add country/i,
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 2/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /Remove country 1/i,
      }),
    );

    // The second entry should dissapear
    await waitFor(() =>
      expect(
        screen.queryByRole('combobox', { name: /Country 2/i }),
      ).not.toBeInTheDocument(),
    );

    // And the user should not be able to remove any more countries
    expect(
      screen.queryAllByRole('button', { name: /Remove country \d/i }),
    ).toHaveLength(0);
  });

  it('should show a validation message if the user does not select a country', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // Wait for the countries to load
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/Please fill in country of trade and % of turnover/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the user enters a percentage less than 1', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // Wait for the countries to load
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      {
        target: { value: '0' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The % of turnover must be at least 1%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the user enters a percentage greater than 100', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // Wait for the countries to load
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      {
        target: { value: '101' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The Total % of Turnover Cannot Exceed 100%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the total percentage is greater than 100', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // Wait for the countries to load
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      {
        target: { value: '80' },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /add country/i,
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 2/i }),
      ).toBeInTheDocument(),
    );

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 2/i }),
      {
        target: { value: '21' },
      },
    );

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The Total % of Turnover Cannot Exceed 100%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should not show an option for the "United Kingdom"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={dropDownData}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('vat-details_heading'));
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // Wait for the countries to load
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 1/i }),
      ).toBeInTheDocument(),
    );

    // ASSERT
    expect(
      screen.queryByRole('option', { name: /United Kingdom/i }),
    ).not.toBeInTheDocument();
  });
});
