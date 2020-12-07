import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BankDetails from '..';

describe('<BankDetails />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should show required form field validation messages', async () => {
    // ACT
    render(<BankDetails onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Please enter name on account')).toBeVisible(),
    );

    expect(screen.getByText('Please enter account number')).toBeVisible();
    expect(screen.getByText('Please enter sort code')).toBeVisible();
    expect(screen.getByText('Please enter bank name')).toBeVisible();
    expect(
      screen.getByText('Please select account opening date'),
    ).toBeVisible();
    expect(
      screen.getByText('The understanding must be accepted'),
    ).toBeVisible();
    expect(
      screen.getByText('The terms and conditions must be accepted'),
    ).toBeVisible();
  });

  // TODO- fix after css issue is fixed
  // it('should not submit the form unless you confirm all terms and conditions', async () => {
  //   // ARRANGE
  //   const onSubmitMock = jest.fn();

  //   // ACT
  //   render(<BankDetails onSubmit={onSubmitMock} />);

  //   // Fill in the form except the checkboxes
  //   fireEvent.input(
  //     screen.getByRole('textbox', { name: /Name on the Account/ }),
  //     { target: { value: 'MR A N OTHER' } },
  //   );

  //   fireEvent.input(screen.getByRole('textbox', { name: /Account Number/ }), {
  //     target: { value: '00112233' },
  //   });

  //   fireEvent.input(
  //     screen.getByRole('textbox', { name: /Sort code first two digits/ }),
  //     { target: { value: '12' } },
  //   );

  //   fireEvent.input(
  //     screen.getByRole('textbox', { name: /Sort code middle two digits/ }),
  //     { target: { value: '34' } },
  //   );

  //   fireEvent.input(
  //     screen.getByRole('textbox', { name: /Sort code last two digits/ }),
  //     { target: { value: '56' } },
  //   );

  //   fireEvent.input(screen.getByRole('textbox', { name: /Bank Name/ }), {
  //     target: { value: 'MONZO' },
  //   });

  //   fireEvent.input(screen.getByTestId('accountOpenSinceMonth'), {
  //     target: { value: '4' },
  //   });

  //   fireEvent.input(screen.getByTestId('accountOpenSinceYear'), {
  //     target: { value: '1994' },
  //   });

  //   fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

  //   // The form should not be submitted
  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));

  //   // Check one checkbox
  //   fireEvent.input(
  //     screen.getByRole('checkbox', {
  //       name: /I have read and understood the above/,
  //     }),
  //     { target: { checked: true } },
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

  //   // The form should still not be submitted
  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));

  //   // Check another checkbox
  //   fireEvent.input(
  //     screen.getByRole('checkbox', {
  //       name: /I can afford the monthly rentals without creating undue financial hardship./,
  //     }),
  //     { target: { checked: true } },
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

  //   // The form should still not be submitted
  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));

  //   // Check another checkbox
  //   fireEvent.input(
  //     screen.getByRole('checkbox', {
  //       name: /I allow the Funder \(the company lending me the money\) to check my credit history. I am aware it might affect my credit score./,
  //     }),
  //     { target: { checked: true } },
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

  //   // The form should still not be submitted
  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));

  //   // Check the final checkbox
  //   fireEvent.input(
  //     screen.getByRole('checkbox', {
  //       name: /I agree to the Terms and conditions./,
  //     }),
  //     { target: { checked: true } },
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

  //   // The form should now be submitted
  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
  // });
});
