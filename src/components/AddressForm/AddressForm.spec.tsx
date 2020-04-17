import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddressFormDropDownData } from '../../../generated/AddressFormDropDownData';
import AddressForm from './AddressForm';

const mockDropDownData: AddressFormDropDownData = {
  __typename: 'DropDownType',
  propertyStatuses: {
    __typename: 'DropDownDataType',
    data: ['Rented', 'Mortgage'],
    favourites: [],
  },
};

jest.mock('@vanarama/uibook/lib/components/molecules/address-finder', () => {
  return {
    __esModule: true,
    default: ({ id, dataTestId, onChange }: any) => {
      return (
        <input
          id={id}
          data-testid={dataTestId}
          onChange={e => onChange({ id: e.target.value })}
        />
      );
    },
  };
});

describe('<AddressForm />', () => {
  it('should call `onSubmit` when entering valid information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, rerender } = render(
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

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.click(getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [{ address: '000', month: '1', status: 'Rented', year: '1990' }],
    });
  });

  it('should call `onSubmit` when entering multiple histories', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, rerender } = render(
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

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

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

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.click(getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: '000',
          month: currentMonth,
          status: 'Rented',
          year: currentYear,
        },
        { address: '111', month: '4', status: 'Mortgage', year: '1994' },
      ],
    });
  });

  it('should show a message saying 36 months remaining when selecting today as the move in date', async () => {
    // ARRANGE
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, rerender } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 36 months of address history.'),
      ).toBeVisible(),
    );
  });

  it('should show a message saying 24 months remaining when selecting one year ago as the move in date', async () => {
    // ARRANGE
    const now = new Date();
    const lastYear = String(now.getFullYear() - 1);
    const currentMonth = String(now.getMonth() + 1);
    const onSubmit = jest.fn();

    // ACT
    const { getByText, getByTestId, rerender } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: lastYear },
    });

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('We need another 24 months of address history.'),
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
    const { getByText, getByTestId, rerender } = render(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Add a history for the current year
    fireEvent.change(getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Then add one for 1994
    fireEvent.change(getByTestId('history[1].month'), {
      target: { value: '4' },
    });

    fireEvent.change(getByTestId('history[1].year'), {
      target: { value: '1994' },
    });

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Then modify the date on the first history to 1997
    fireEvent.change(getByTestId('history[0].year'), {
      target: { value: '1997' },
    });

    // Wait for all effects to execute
    rerender(
      <AddressForm dropDownData={mockDropDownData} onSubmit={onSubmit} />,
    );

    // Then fill the first one in
    fireEvent.change(getByTestId('history[0].address'), {
      target: { value: '000' },
    });

    fireEvent.change(getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.click(getByText('Continue'));

    // ASSERT
    // Only one date should be submitted, the other should have been removed
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: '000',
          month: currentMonth,
          status: 'Rented',
          year: '1997',
        },
      ],
    });
  });
});
