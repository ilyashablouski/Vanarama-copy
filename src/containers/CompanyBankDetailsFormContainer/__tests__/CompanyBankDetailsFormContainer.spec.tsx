import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor } from '@testing-library/react';
import CompanyBankDetailsFormContainer from '../CompanyBankDetailsFormContainer';
import { makeGetCreditApplicationMock } from '../../../gql/creditApplication';

const companyUuid = '7f5a4ed2-24a5-42ff-9acd-208db847d678';
const orderUuid = '00000000-24a5-42ff-9acd-00000000';

const getCreditApplication = makeGetCreditApplicationMock(orderUuid);

describe('<CompanyBankDetailsFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('should prepopulate the form with existing data', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[getCreditApplication]}>
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={jest.fn()}
          onError={jest.fn()}
          isEdited={false}
          isSoleTrader={false}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    // await screen.findByTestId('companyBankDetails');
    await waitFor(() => expect(getCreditApplication.result).toHaveBeenCalled());
    expect(screen.getByTestId(/accountName/)).toHaveValue('Eternal account');
    expect(screen.getByTestId(/accountNumber/)).toHaveValue('67272820');
    expect(screen.getByDisplayValue(/01/)).toBeVisible();
    expect(screen.getByDisplayValue(/93/)).toBeVisible();
    expect(screen.getByDisplayValue(/87/)).toBeVisible();
    expect(screen.getByTestId(/joinedAtMonth/)).toHaveValue('1');
    expect(screen.getByTestId(/joinedAtYear/)).toHaveValue('2020');
  });
});
