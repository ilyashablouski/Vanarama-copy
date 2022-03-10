import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { IManualAddressFormValues } from 'core/molecules/address-finder/interfaces';
import SoleTraderDetailsForm from '../SoleTraderDetailsForm';
import { ISoleTraderDetailsFormValues } from '../interfaces';
import { GET_OCCUPATIONS } from '../../EmploymentForm/gql';
import { formValuesToAssociate } from '../mappers';

const sicData: MockedResponse[] = [
  {
    request: {
      query: GET_OCCUPATIONS,
    },
    result: {
      data: {
        occupationList: {
          occupations: ['AAA'],
        },
      },
    },
  },
];
describe('<SoleTraderDetailsForm />', () => {
  const onSubmitMock = jest.fn<Promise<void>, [ISoleTraderDetailsFormValues]>();

  beforeEach(async () => {
    await preloadAll();
    onSubmitMock.mockRestore();
    render(
      <MockedProvider mocks={sicData}>
        <SoleTraderDetailsForm
          isEdited={false}
          dropdownData={{
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
              favourites: [],
            },
            noOfAdultsInHousehold: {
              __typename: 'DropDownDataType',
              data: ['1', 'More than 1'],
              favourites: [],
            },
            noOfDependants: {
              __typename: 'DropDownDataType',
              data: ['None', 'Lots...'],
              favourites: [],
            },
            propertyStatuses: {
              __typename: 'DropDownDataType',
              data: ['Owned outright', 'Rented'],
              favourites: [],
            },
          }}
          onSubmit={onSubmitMock}
        />
      </MockedProvider>,
    );
  });

  it('should display validation messages', async () => {
    fireEvent.input(screen.getByTestId('annual-income'), {
      target: { value: '' },
    });
    fireEvent.input(screen.getByTestId('monthly-Mortgage-payments'), {
      target: { value: '' },
    });
    fireEvent.input(screen.getByTestId('monthly-student-payments'), {
      target: { value: '' },
    });
    /*  fireEvent.input(screen.getByTestId('income-change'), {
      target: { checked: true },
    });
     await waitFor(() => {
      expect(screen.getByTestId('future-monthly-income')).toBeInTheDocument();
    });

    fireEvent.input(screen.getByTestId('future-monthly-income'), {
      target: { value: '' },
    }); */
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByTestId('soleTrader-details-heading')).toBeVisible(),
    );

    expect(screen.getByText('Please select a title')).toBeVisible();
    expect(screen.getByText('Please enter a first name')).toBeVisible();
    expect(screen.getByText('Please enter a last name')).toBeVisible();
    expect(screen.getByText('Please select a gender')).toBeVisible();
    expect(screen.getByText('Please select your place of birth')).toBeVisible();
    expect(screen.getByText('Please enter your marital status')).toBeVisible();
    expect(screen.getByText('Please enter your nationality')).toBeVisible();
    expect(screen.getByText('Please select a date of birth')).toBeVisible();
    expect(screen.getByText('Please enter a number of adults')).toBeVisible();
    expect(
      screen.getByText('Please enter a number of dependants'),
    ).toBeVisible();
    expect(
      screen.getByText(
        'Please search for your job title & select from the list',
      ),
    ).toBeVisible();
    expect(screen.getByText('Please enter your address')).toBeVisible();
    expect(
      screen.getByText('Please select your property status'),
    ).toBeVisible();
    expect(screen.getByText('Please select a move in date')).toBeVisible();
    expect(screen.getByText('Please enter your annual income')).toBeVisible();
    expect(
      screen.getByText('Please enter your monthly mortgage/rent payments'),
    ).toBeVisible();
    expect(
      screen.getByText('Please enter your student loan payments'),
    ).toBeVisible();
    /* expect(
      screen.getByText('Please enter your future monthly income'),
    ).toBeVisible(); */
  });
});

describe('formValuesToAssociate', () => {
  const personId = '7c350898-0eb9-4d06-99c3-9e395396fca1';
  const commonValues = {
    title: 'Mr',
    firstName: 'Test',
    lastName: 'Test',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'Austrian',
  };
  const requestValues = {
    ...commonValues,
    placeOfBirth: 'Afghanistan',
    dependants: 'None',
    email: 'wikile8884@o3live.com',
    dayOfBirth: '17',
    monthOfBirth: '3',
    yearOfBirth: '1986',
    adultsInHousehold: '1',
    occupation: 'Janitor',
    avgMonthlyIncome: 0,
    annualIncome: 0,
    monthlyMortgagePayments: 123,
    monthlyStudentPayments: 123,
    monthlyIncomeChange: false,
    futureMonthlyIncome: 0,
    suitabilityConsent: true,
    history: [
      {
        status: 'Rented',
        month: '10',
        year: '1963',
        address: {
          id: 'GB|RM|A|22543510|A8',
          label: '12345, The Tri Centre, New Bridge Square - Swindon, SN1 1HN',
        },
      },
    ],
  };
  const responseValues = {
    ...commonValues,
    addresses: [
      {
        propertyStatus: 'Rented',
        serviceId: 'GB|RM|A|22543510|A8',
        startedOn: '1963-10-01',
      },
    ],
    countryOfBirth: 'Afghanistan',
    dateOfBirth: '1986-3-17',
    incomeAndExpense: {
      annualIncome: 0,
      anticipateMonthlyIncomeChange: false,
      averageMonthlyIncome: 0,
      futureMonthlyIncome: 0,
      mortgageOrRent: 123,
      studentLoan: 123,
      suitabilityConsent: true,
    },
    noOfAdultsInHousehold: '1',
    noOfDependants: 'None',
    occupation: 'Janitor',
    uuid: personId,
  };

  it('formValuesToAssociate should return correct associate form values', () => {
    expect(formValuesToAssociate(requestValues, personId)).toEqual(
      responseValues,
    );
  });

  it('formValuesToAssociate should return correct associate form values with manual address', () => {
    expect(
      formValuesToAssociate(
        {
          ...requestValues,
          history: [
            {
              ...requestValues.history[0],
              address: {
                lineOne: 'test',
                lineTwo: '',
                city: 'test',
                county: '',
                postcode: 'test',
                label: 'test - test, test',
              } as IManualAddressFormValues,
            },
          ],
        },
        personId,
      ),
    ).toEqual({
      ...responseValues,
      addresses: [
        {
          ...responseValues.addresses[0],
          id: undefined,
          label: undefined,
          serviceId: undefined,
          lineOne: 'test',
          lineTwo: '',
          postcode: 'test',
          city: 'test',
          county: '',
          propertyStatus: 'Rented',
          startedOn: '1963-10-01',
        },
      ],
    });
  });
});
