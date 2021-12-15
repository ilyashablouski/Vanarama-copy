import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';
import { GET_OCCUPATIONS } from './gql';
import { makeAddressResponseMock } from '../../hooks/useLoqate/utils';
import useLoqate from '../../hooks/useLoqate';
import EmploymentForm from './EmploymentForm';

jest.mock('../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());

function typeIntoAddressField(value: string) {
  const input = screen.getByLabelText('Company Address');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

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

const mockDropDownData: EmploymentFormDropDownData = {
  __typename: 'DropDownType',
  employmentStatuses: {
    __typename: 'DropDownDataType',
    data: ['Retired', 'Employed', 'Self employed', 'Student'],
    favourites: [],
  },
};

describe('<EmploymentForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should call `onSubmit` when entering valid information for a position that does not require additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '1' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1990' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: undefined,
          company: '',
          contract: '',
          income: '',
          month: '1',
          phoneNumber: '',
          status: 'Retired',
          year: '1990',
          title: '',
        },
      ],
    });
  });

  it('should call `onSubmit` when entering valid information for a position that requires additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Employed' } });

    const type = screen.getByLabelText('Part Time');
    fireEvent.click(type);

    const title = screen.getByLabelText('Job Title');
    fireEvent.change(title, { target: { value: 'Janitor' } });

    const company = screen.getByLabelText('Company Name');
    fireEvent.change(company, { target: { value: 'Autorama Ltd.' } });

    const phone = screen.getByLabelText('Work Phone Number');
    fireEvent.change(phone, { target: { value: '01442838195' } });

    typeIntoAddressField('GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    const income = screen.getByLabelText('Gross Annual Income');
    const incomeValue = '52000';
    fireEvent.change(income, { target: { value: incomeValue } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '4' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1994' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: {
            id: 'GB|RM|A|54725860',
            label:
              'B001, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
          company: 'Autorama Ltd.',
          income: incomeValue,
          month: '4',
          phoneNumber: '01442838195',
          status: 'Employed',
          title: 'Janitor',
          contract: 'Part time',
          year: '1994',
        },
      ],
    });
  });

  it('should call `onSubmit` when entering multiple employment entries', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: currentYear } });

    const prevStatus = screen.getByLabelText('Your Previous Employment Status');
    fireEvent.change(prevStatus, { target: { value: 'Employed' } });

    const prevType = screen.getByLabelText('Full Time');
    fireEvent.click(prevType);

    const prevTitle = screen.getByLabelText('Job Title');
    fireEvent.change(prevTitle, { target: { value: 'Janitor' } });

    const prevCompany = screen.getByLabelText('Company Name');
    fireEvent.change(prevCompany, { target: { value: 'Autorama Ltd.' } });

    const prevPhone = screen.getByLabelText('Work Phone Number');
    fireEvent.change(prevPhone, { target: { value: '01442838195' } });

    typeIntoAddressField('GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    const prevIncome = screen.getByLabelText('Gross Annual Income');
    const incomeValue = '52000';
    fireEvent.change(prevIncome, { target: { value: incomeValue } });

    const prevMonth = screen.getByTestId('history[1].month');
    fireEvent.change(prevMonth, { target: { value: '11' } });

    const prevYear = screen.getByTestId('history[1].year');
    fireEvent.change(prevYear, { target: { value: '1992' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: undefined,
          company: '',
          contract: '',
          income: '',
          month: currentMonth,
          phoneNumber: '',
          status: 'Retired',
          title: '',
          year: currentYear,
        },
        {
          address: {
            id: 'GB|RM|A|54725860',
            label:
              'B001, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
          company: 'Autorama Ltd.',
          income: incomeValue,
          month: '11',
          phoneNumber: '01442838195',
          status: 'Employed',
          title: 'Janitor',
          contract: 'Full time',
          year: '1992',
        },
      ],
    });
  });

  it('should validate at least 3 years of history', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: currentYear } });

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('We need another 3 years of employment history.'),
      ).toBeInTheDocument(),
    );
  });

  it('should show the correct value for the remaining months', async () => {
    // ARRANGE
    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: lastYear } });

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('We need another 2 years of employment history.'),
      ).toBeInTheDocument(),
    );
  });

  it('should show the correct validation messages when pressing submit on a pristine form', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('Please enter your employment status'),
      ).toBeInTheDocument(),
    );
  });

  it('should show the correct validation messages when pressing submit after choosing a status that requires additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Employed' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(
          'Please search for your job title & select from the list',
        ),
      ).toBeInTheDocument(),
    );

    expect(
      screen.getByText('Please enter the employment type'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the company name'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the work phone number'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the company address'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the gross annual income'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please select the date you started'),
    ).toBeInTheDocument();
  });

  it('should show the correct validation messages when pressing submit after choosing a status that does not require additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <MockedProvider mocks={sicData}>
        <EmploymentForm
          employments={[]}
          dropDownData={mockDropDownData}
          onSubmit={onSubmit}
        />
      </MockedProvider>,
    );

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Please search for your job title & select from the list',
        ),
      ).not.toBeInTheDocument(),
    );
    expect(
      screen.queryByText('Please enter the employment type'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Please enter the company name'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Please enter work phone number without spaces or hyphens',
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText('Please enter the company address'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Please enter the gross annual income'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText('Please select the date you started'),
    ).toBeInTheDocument();
  });
});
