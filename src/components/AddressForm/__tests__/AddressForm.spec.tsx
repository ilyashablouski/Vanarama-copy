import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { AddressFormDropDownData } from '../../../../generated/AddressFormDropDownData';
import { makeAddressResponseMock } from '../../../hooks/useLoqate/utils';
import useLoqate from '../../../hooks/useLoqate';
import AddressForm from '../AddressForm';

jest.mock('../../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());

function typeIntoAddressField(testId: string, value: string) {
  const input = screen.getByTestId(testId);
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

const mockDropDownData: AddressFormDropDownData = {
  __typename: 'DropDownType',
  propertyStatuses: {
    __typename: 'DropDownDataType',
    data: ['Rented', 'Mortgage', 'Living with parents'],
    favourites: [],
  },
};

describe('<AddressForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should call `onSubmit` when entering valid information', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    typeIntoAddressField('history[0].address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: '1990' },
    });

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
          month: '1',
          status: 'Rented',
          year: '1990',
        },
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
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    typeIntoAddressField('history[0].address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    typeIntoAddressField('history[1].address', 'GB|002');
    fireEvent.mouseDown(screen.getByText(/^B002, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[1].status'), {
      target: { value: 'Mortgage' },
    });

    fireEvent.change(screen.getByTestId('history[1].month'), {
      target: { value: '4' },
    });

    fireEvent.change(screen.getByTestId('history[1].year'), {
      target: { value: '1994' },
    });

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
          month: currentMonth,
          status: 'Rented',
          year: currentYear,
        },
        {
          address: {
            id: 'GB|RM|A|54725861',
            label:
              'B002, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
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
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('We need another 3 years of address history.'),
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
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: lastYear },
    });

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('We need another 2 years of address history.'),
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
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    // Add a history for the current year
    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: currentYear },
    });

    // Then add one for 1994
    fireEvent.change(screen.getByTestId('history[1].month'), {
      target: { value: '4' },
    });

    fireEvent.change(screen.getByTestId('history[1].year'), {
      target: { value: '1994' },
    });

    // Then modify the date on the first history to 1997
    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: '1997' },
    });

    // Then fill the first one in
    typeIntoAddressField('history[0].address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    // Only one date should be submitted, the other should have been removed
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: {
            id: 'GB|RM|A|54725860',
            label:
              'B001, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
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
    render(
      <AddressForm
        addresses={[]}
        dropDownData={mockDropDownData}
        onSubmit={onSubmit}
      />,
    );

    // Add a history for last year
    typeIntoAddressField('history[0].address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[0].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(screen.getByTestId('history[0].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[0].year'), {
      target: { value: lastYear },
    });

    // Then add a history for this year
    typeIntoAddressField('history[1].address', 'GB|002');
    fireEvent.mouseDown(screen.getByText(/^B002, Purbeck House 5-7/));

    fireEvent.change(screen.getByTestId('history[1].status'), {
      target: { value: 'Rented' },
    });

    fireEvent.change(screen.getByTestId('history[1].month'), {
      target: { value: currentMonth },
    });

    fireEvent.change(screen.getByTestId('history[1].year'), {
      target: { value: currentYear },
    });

    // Then add another to meet the 3 years requirement
    typeIntoAddressField('history[2].address', 'GB|003');
    fireEvent.mouseDown(screen.getByText(/^B003, Domville House/));

    fireEvent.change(screen.getByTestId('history[2].status'), {
      target: { value: 'Living with parents' },
    });

    fireEvent.change(screen.getByTestId('history[2].month'), {
      target: { value: '4' },
    });

    fireEvent.change(screen.getByTestId('history[2].year'), {
      target: { value: '1994' },
    });

    // Then submit the form
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    // All dates should be submitted, ordered by most recent
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1), {
      timeout: 5000,
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      history: [
        {
          address: {
            id: 'GB|RM|A|54725861',
            label:
              'B002, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
          month: currentMonth,
          status: 'Rented',
          year: currentYear,
        },
        {
          address: {
            id: 'GB|RM|A|54725860',
            label:
              'B001, Purbeck House 5-7, Oxford Road - Bournemouth, BH8 8ES',
          },
          month: currentMonth,
          status: 'Rented',
          year: lastYear,
        },
        {
          address: {
            id: 'GB|RM|A|56391338',
            label:
              'B003, Domville House, Sir John Richardson Avenue - Gosport, PO12 2FD',
          },
          month: '4',
          status: 'Living with parents',
          year: '1994',
        },
      ],
    });
  });
});
