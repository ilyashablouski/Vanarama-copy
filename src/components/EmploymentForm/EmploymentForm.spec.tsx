import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';
import EmploymentForm from './EmploymentForm';

jest.mock('@vanarama/uibook/lib/components/molecules/address-finder');

const mockDropDownData: EmploymentFormDropDownData = {
  __typename: 'DropDownType',
  employmentStatuses: {
    __typename: 'DropDownDataType',
    data: ['Retired', 'Employed', 'Self employed', 'Student'],
    favourites: [],
  },
};

describe('<EmploymentForm />', () => {
  it('should call `onSubmit` when entering valid information for a position that does not require additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '1' } });

    const year = getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1990' } });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
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
    const { getByText, getByTestId, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Employed' } });

    const type = getByLabelText('Part Time');
    fireEvent.click(type);

    const title = getByLabelText('Job Title');
    fireEvent.change(title, { target: { value: 'Janitor' } });

    const company = getByLabelText('Company Name');
    fireEvent.change(company, { target: { value: 'Autorama Ltd.' } });

    const phone = getByLabelText('Work Phone Number');
    fireEvent.change(phone, { target: { value: '01442838195' } });

    const address = getByLabelText('Company Postcode or Address');
    fireEvent.change(address, {
      target: { value: 'Maylands Avenue, HP2 7DE' },
    });

    const income = getByLabelText('Gross Annual Income');
    fireEvent.change(income, { target: { value: '52000.00' } });

    const month = getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '4' } });

    const year = getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1994' } });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: {
            id: 'Maylands Avenue, HP2 7DE',
          },
          company: 'Autorama Ltd.',
          income: 52000,
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
    const { getByText, getByTestId, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: currentYear } });

    const prevStatus = getByLabelText('Your Previous Employment Status');
    fireEvent.change(prevStatus, { target: { value: 'Employed' } });

    const prevType = getByLabelText('Full Time');
    fireEvent.click(prevType);

    const prevTitle = getByLabelText('Job Title');
    fireEvent.change(prevTitle, { target: { value: 'Janitor' } });

    const prevCompany = getByLabelText('Company Name');
    fireEvent.change(prevCompany, { target: { value: 'Autorama Ltd.' } });

    const prevPhone = getByLabelText('Work Phone Number');
    fireEvent.change(prevPhone, { target: { value: '01442838195' } });

    const prevAddress = getByLabelText('Company Postcode or Address');
    fireEvent.change(prevAddress, {
      target: { value: 'Maylands Avenue, HP2 7DE' },
    });

    const prevIncome = getByLabelText('Gross Annual Income');
    fireEvent.change(prevIncome, { target: { value: '52000.00' } });

    const prevMonth = getByTestId('history[1].month');
    fireEvent.change(prevMonth, { target: { value: '11' } });

    const prevYear = getByTestId('history[1].year');
    fireEvent.change(prevYear, { target: { value: '1992' } });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
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
            id: 'Maylands Avenue, HP2 7DE',
          },
          company: 'Autorama Ltd.',
          income: 52000,
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
    const { getByText, getByTestId, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: currentYear } });

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 3 years of employment history.'),
      ).toBeVisible(),
    );
  });

  it('should show the correct value for the remaining months', async () => {
    // ARRANGE
    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: currentMonth } });

    const year = getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: lastYear } });

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 2 years of employment history.'),
      ).toBeVisible(),
    );
  });

  it('should show the correct validation messages when pressing submit on a pristine form', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(getByText('Please enter your employment status')).toBeVisible();
  });

  it('should show the correct validation messages when pressing submit after choosing a status that requires additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByLabelText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Employed' } });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(getByText('Please enter the job title')).toBeVisible();
    expect(getByText('Please enter the employment type')).toBeVisible();
    expect(getByText('Please enter the company name')).toBeVisible();
    expect(getByText('Please enter the work phone number')).toBeVisible();
    expect(getByText('Please enter the company address')).toBeVisible();
    expect(getByText('Please enter the gross annual income')).toBeVisible();
    expect(getByText('Please select the date you started')).toBeVisible();
  });

  it('should show the correct validation messages when pressing submit after choosing a status that does not require additional information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByLabelText, queryByText } = render(
      <EmploymentForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    const status = getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    expect(queryByText('Please enter the job title')).toBeNull();
    expect(queryByText('Please enter the employment type')).toBeNull();
    expect(queryByText('Please enter the company name')).toBeNull();
    expect(
      queryByText('Please enter work phone number without spaces or hyphens'),
    ).toBeNull();
    expect(queryByText('Please enter the company address')).toBeNull();
    expect(queryByText('Please enter the gross annual income')).toBeNull();

    expect(queryByText('Please select the date you started')).toBeVisible();
  });
});
