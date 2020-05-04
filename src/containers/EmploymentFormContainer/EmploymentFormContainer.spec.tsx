import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import EmploymentFormContainer from './EmploymentFormContainer';
import {
  withoutPrefilledEmployments,
  withPrefilledEmployments,
} from './fixtures';

describe('<EmploymentFormContainer />', () => {
  it('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
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
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('employment-history-heading'));

    const status = screen.getByLabelText('Your Current Employment Status');
    fireEvent.change(status, { target: { value: 'Retired' } });

    const month = screen.getByTestId('history[0].month');
    fireEvent.change(month, { target: { value: '1' } });

    const year = screen.getByTestId('history[0].year');
    fireEvent.change(year, { target: { value: '1990' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });

  it('should prefill data from the server', async () => {
    // ARRANGE
    let mutationCalled = false;
    const personUuid = '1337';
    const onCompletedMock = jest.fn();
    const mocks = withPrefilledEmployments(personUuid, () => {
      mutationCalled = true;
    });

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <EmploymentFormContainer
          personUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await waitFor(() => screen.findByTestId('employment-history-heading'));

    // Assert form is pre-filled
    const status = screen.getByLabelText('Your Current Employment Status');
    expect((status as HTMLInputElement).value).toEqual('Employed');

    const month = screen.getByTestId('history[0].month');
    expect((month as HTMLInputElement).value).toEqual('1');

    const year = screen.getByTestId('history[0].year');
    expect((year as HTMLInputElement).value).toEqual('2002');

    const jobTitle = screen.getByLabelText('Job Title');
    expect((jobTitle as HTMLInputElement).value).toEqual('Senior Developer');

    const companyName = screen.getByLabelText('Company Name');
    expect((companyName as HTMLInputElement).value).toEqual('Google');

    const phoneNumber = screen.getByLabelText('Work Phone Number');
    expect((phoneNumber as HTMLInputElement).value).toEqual('0777777777777');

    const address = screen.getByLabelText('Company Postcode or Address');
    expect((address as HTMLInputElement).value).toEqual(
      '1-13 St Giles High St,, West End, London, WC2H 8AG',
    );

    const income = screen.getByLabelText('Gross Annual Income');
    expect((income as HTMLInputElement).value).toEqual('200000');

    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    // Assert pre-filled data is saved again on clicking "Continue"
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });
});
