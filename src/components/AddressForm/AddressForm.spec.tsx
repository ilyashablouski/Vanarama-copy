import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AddressFormDropDownData } from '../../../generated/AddressFormDropDownData';
import AddressForm from './AddressForm';

jest.mock('@vanarama/uibook/lib/components/molecules/address-finder');

const mockDropDownData: AddressFormDropDownData = {
  __typename: 'DropDownType',
  propertyStatuses: {
    __typename: 'DropDownDataType',
    data: ['Rented', 'Mortgage', 'Living with parents'],
    favourites: [],
  },
};

describe('<AddressForm />', () => {
  it('should call `onSubmit` when entering valid information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].address'), {
      target: { value: '000' },
    });

    fireEvent.change(getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: '1' },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: '1990' },
    });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        { address: { id: '000' }, month: '1', status: 'Rented', year: '1990' },
      ],
    });
  });

  it('should call `onSubmit` when entering multiple histories', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].address'), {
      target: { value: '000' },
    });

    fireEvent.change(getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    fireEvent.change(getByTestId('history[1].address'), {
      target: { value: '111' },
    });

    fireEvent.change(getByTestId('history[1].status'), {
      target: { value: 'Mortgage' },
    });

    fireEvent.change(getByTestId('history[1].month'), {
      target: { value: '4' },
    });

    fireEvent.change(getByTestId('history[1].year'), {
      target: { value: '1994' },
    });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: { id: '000' },
          month: currentMonth,
          status: 'Rented',
          year: currentYear,
        },
        {
          address: { id: '111' },
          month: '4',
          status: 'Mortgage',
          year: '1994',
        },
      ],
    });
  });

  it('should show a message saying 3 years remaining when selecting today as the move in date', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 3 years of address history.'),
      ).toBeVisible(),
    );
  });

  it('should show a message saying 2 years remaining when selecting one year ago as the move in date', async () => {
    // ARRANGE
    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: lastYear },
    });

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 2 years of address history.'),
      ).toBeVisible(),
    );
  });

  it('should remove unnecessary entries', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Add a history for the current year
    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // Then add one for 1994
    fireEvent.change(getByTestId('history[1].month'), {
      target: { value: '4' },
    });

    fireEvent.change(getByTestId('history[1].year'), {
      target: { value: '1994' },
    });

    // Then modify the date on the first history to 1997
    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: '1997' },
    });

    // Then fill the first one in
    fireEvent.change(getByTestId('history[0].address'), {
      target: { value: '000' },
    });

    fireEvent.change(getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    // Only one date should be submitted, the other should have been removed
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: { id: '000' },
          month: currentMonth,
          status: 'Rented',
          year: '1997',
        },
      ],
    });
  });

  it('should reorder entries chronologically by the move in date', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Add a history for last year
    fireEvent.change(getByTestId('history[0].address'), {
      target: { value: '000' },
    });

    fireEvent.change(getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: lastYear },
    });

    // Then add a history for this year
    fireEvent.change(getByTestId('history[1].address'), {
      target: { value: '111' },
    });

    fireEvent.change(getByTestId('history[1].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(getByTestId('history[1].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[1].year'), {
      target: { value: currentYear },
    });

    // Then add another to meet the 3 years requirement
    fireEvent.change(getByTestId('history[2].address'), {
      target: { value: '222' },
    });

    fireEvent.change(getByTestId('history[2].status'), {
      target: { value: 'Living with parents' },
    });

    fireEvent.change(getByTestId('history[2].month'), {
      target: { value: '4' },
    });

    fireEvent.change(getByTestId('history[2].year'), {
      target: { value: '1994' },
    });

    // Then submit the form
    await act(async () => {
      fireEvent.click(getByText('Continue'));
    });

    // ASSERT
    // All dates should be submitted, ordered by most recent
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: { id: '111' },
          month: currentMonth,
          status: 'Rented',
          year: currentYear,
        },
        {
          address: { id: '000' },
          month: currentMonth,
          status: 'Rented',
          year: lastYear,
        },
        {
          address: { id: '222' },
          month: '4',
          status: 'Living with parents',
          year: '1994',
        },
      ],
    });
  });
});
