import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import SoleTraderDetailsForm from '../SoleTraderDetailsForm';
import { ISoleTraderDetailsFormValues } from '../interfaces';
import { GET_OCCUPATIONS } from '../../EmploymentForm/gql';

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
