import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { GetB2BAboutPageData } from '../../../../../generated/GetB2BAboutPageData';
import {
  BusinessAboutPage,
  GET_B2B_ABOUT_PAGE_DATA,
  SAVE_BUSINESS_ABOUT_YOU,
} from '../../../../pages/b2b/olaf/about';
import {
  SaveBusinessAboutYou,
  SaveBusinessAboutYouVariables,
} from '../../../../../generated/SaveBusinessAboutYou';

jest.mock('../../../../hooks/useMediaQuery');
jest.mock('../../../../gql/order');

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
      pathname: '/b2b/olaf/about',
      query: {},
    };
  },
}));

describe('B2B About You page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should submit data to the server and redirect to the company details page', async () => {
    let mutationCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_B2B_ABOUT_PAGE_DATA,
        },
        result: {
          data: {
            allDropDowns: {
              __typename: 'DropDownType',
              titles: {
                __typename: 'DropDownDataType',
                data: ['Mr', 'Mrs', 'Miss'],
                favourites: [],
              },
            },
          } as GetB2BAboutPageData,
        },
      },
      {
        request: {
          query: SAVE_BUSINESS_ABOUT_YOU,
          variables: {
            input: {
              title: 'Mr',
              firstName: 'Bruce',
              lastName: 'Forsyth',
              telephoneNumber: { value: '07777777777' },
              emailAddress: { value: 'bruce_bonus@gmail.com' },
              company: { companyType: 'Limited' },
              profilingConsent: true,
              emailConsent: false,
              smsConsent: false,
              termsAndConditions: true,
              role: { position: 'Account owner', primaryContact: true },
            },
          } as SaveBusinessAboutYouVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateBusinessPerson: {
                uuid: 'f16564ce-b076-4a8d-aa6c-b4c394f090c9',
                companies: [
                  {
                    uuid: '6b4b95b3-8fa4-47e8-8846-ce478ef85169',
                  },
                ],
              },
            } as SaveBusinessAboutYou,
          };
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BusinessAboutPage />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('about-you_heading')).toBeInTheDocument();
    });

    fireEvent.input(screen.getByRole('combobox', { name: /title/i }), {
      target: { value: 'Mr' },
    });

    fireEvent.input(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'Bruce' },
    });

    fireEvent.input(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'Forsyth' },
    });

    fireEvent.input(
      screen.getByRole('textbox', { name: /telephone number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.input(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'bruce_bonus@gmail.com' },
    });

    fireEvent.input(
      screen.getByRole('combobox', { name: /type of company/i }),
      { target: { value: 'Limited' } },
    );

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I am authorised to apply for credit on behalf of the company/i,
      }),
      { target: { checked: true } },
    );

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I agree to the Terms and Condition/i,
      }),
      { target: { checked: true } },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/b2b/olaf/company-details/[uuid]',
      '/b2b/olaf/company-details/6b4b95b3-8fa4-47e8-8846-ce478ef85169',
    );
  });

  it('should display a toast message if the request to the server fails', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_B2B_ABOUT_PAGE_DATA,
        },
        result: {
          data: {
            allDropDowns: {
              __typename: 'DropDownType',
              titles: {
                __typename: 'DropDownDataType',
                data: ['Mr', 'Mrs', 'Miss'],
                favourites: [],
              },
            },
          } as GetB2BAboutPageData,
        },
      },
      {
        request: {
          query: SAVE_BUSINESS_ABOUT_YOU,
          variables: {
            input: {
              title: 'Mr',
              firstName: 'Bruce',
              lastName: 'Forsyth',
              telephoneNumber: { value: '07777777777' },
              emailAddress: { value: 'bruce_bonus@gmail.com' },
              company: { companyType: 'Limited' },
              profilingConsent: true,
              emailConsent: false,
              smsConsent: false,
              termsAndConditions: true,
              role: { position: 'Account owner', primaryContact: true },
            },
          } as SaveBusinessAboutYouVariables,
        },
        error: new Error('the backend was down!'),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          <ToastContainer />
          <BusinessAboutPage />
        </>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('about-you_heading')).toBeInTheDocument();
    });

    fireEvent.input(screen.getByRole('combobox', { name: /title/i }), {
      target: { value: 'Mr' },
    });

    fireEvent.input(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'Bruce' },
    });

    fireEvent.input(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'Forsyth' },
    });

    fireEvent.input(
      screen.getByRole('textbox', { name: /telephone number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.input(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'bruce_bonus@gmail.com' },
    });

    fireEvent.input(
      screen.getByRole('combobox', { name: /type of company/i }),
      { target: { value: 'Limited' } },
    );

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I am authorised to apply for credit on behalf of the company/i,
      }),
      { target: { checked: true } },
    );

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I agree to the Terms and Condition/i,
      }),
      { target: { checked: true } },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() =>
      expect(screen.getByTestId('about-you-error')).toBeInTheDocument(),
    );
    expect(mockPush).toHaveBeenCalledTimes(0);
  });
});
