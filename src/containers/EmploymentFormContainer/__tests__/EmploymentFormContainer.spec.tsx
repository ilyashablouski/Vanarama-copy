import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import EmploymentFormContainer from '../EmploymentFormContainer';
import {
  withoutPrefilledEmployments,
  withPrefilledEmployments,
} from '../fixtures';

describe('<EmploymentFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
    const orderId = '1337';
    const personUuid = '1337';
    const onCompletedMock = jest.fn();
    const mocks: MockedResponse[] = withoutPrefilledEmployments(
      personUuid,
      () => {
        mutationCalled = true;
      },
    );

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <EmploymentFormContainer
          orderId={orderId}
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByTestId('employment-history-heading');

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '1' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1990' } });

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });

  it('should prefill data from the server', async () => {
    // ARRANGE
    const orderId = '1337';
    const personUuid = '1337';
    const onCompletedMock = jest.fn();
    const mocks = withPrefilledEmployments(personUuid);

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <EmploymentFormContainer
          orderId={orderId}
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => {
      screen.getByTestId('employment-history-heading');
    });

    // Assert form is pre-filled
    const status = screen.getByLabelText('Your Current Employment Status');
    expect(status).toHaveValue('Employed');

    const month = screen.getByTestId('history[0].month');
    expect(month).toHaveValue('1');

    const year = screen.getByTestId('history[0].year');
    expect(year).toHaveValue('2002');

    const jobTitle = screen.getByLabelText('Job Title');
    expect(jobTitle).toHaveValue('Janitor');

    const companyName = screen.getByLabelText('Company Name');
    expect(companyName).toHaveValue('Google');

    const phoneNumber = screen.getByLabelText('Work Phone Number');
    expect(phoneNumber).toHaveValue('0777777777777');

    const address = screen.getByTestId('history[0].address');
    expect(address).toHaveTextContent(
      '1 St. Giles High Street, London, WC2H 8AG',
    );

    const income = screen.getByLabelText('Gross Annual Income');
    expect(income).toHaveValue('200000');

    fireEvent.click(screen.getByText('Continue'));

    // Assert pre-filled data is saved again on clicking "Continue"
    await waitFor(() => expect(onCompletedMock).toHaveBeenCalledTimes(1));
  });
});
