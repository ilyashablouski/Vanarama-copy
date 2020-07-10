import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { GetB2BAboutPageData } from '../../../../../generated/GetB2BAboutPageData';
import { BusinessAboutPage } from '../../../../pages/b2b/olaf/about';
import {
  GET_B2B_ABOUT_PAGE_DATA,
  SAVE_BUSINESS_ABOUT_YOU,
} from '../../../../containers/BusinessAboutFormContainer/gql';
import { GET_ABOUT_YOU_DATA } from '../../../../containers/AboutFormContainer/gql';
import { EMAIL_ALREADY_EXISTS } from '../../../../containers/RegisterFormContainer/gql';
import {
  SaveBusinessAboutYou,
  SaveBusinessAboutYouVariables,
} from '../../../../../generated/SaveBusinessAboutYou';

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
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
          query: EMAIL_ALREADY_EXISTS,
          variables: {
            email: 'bruce_bonus@gmail.com',
          },
        },
        result: {
          data: {
            emailAlreadyExists: false,
          },
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
              telephoneNumbers: [{ value: '07777777777' }],
              emailAddress: { value: 'bruce_bonus@gmail.com' },
              company: { companyType: 'Limited' },
              profilingConsent: true,
              emailConsent: false,
              smsConsent: false,
              termsAndConditions: true,
            },
          } as SaveBusinessAboutYouVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateBusinessPerson: {
                uuid: 'f16564ce-b076-4a8d-aa6c-b4c394f090c9',
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

    await screen.findByRole('combobox', { name: /title/i });

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

    // await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/b2b/olaf/company-details/[personUuid]',
      '/b2b/olaf/company-details/f16564ce-b076-4a8d-aa6c-b4c394f090c9',
    );
  });

  it('should display a toast message if the request to the server fails', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_ABOUT_YOU_DATA,
          variables: {
            uuid: 'test',
          },
        },
        result: {
          data: {
            personByUuid: {
              countryOfBirth: null,
              dateOfBirth: '1986-04-04',
              emailAddresses: [
                {
                  __typename: 'EmailAddressType',
                  uuid: '52343251-22f4-4b57-86d8-79bfbb8f756d',
                  primary: true,
                },
              ],
              emailConsent: false,
              firstName: 'firstName',
              lastName: 'lastName',
              maritalStatus: 'Single',
              nationality: null,
              noOfAdultsInHousehold: null,
              noOfDependants: null,
              telephoneNumbers: [
                {
                  __typename: 'TelephoneNumberType',
                  uuid: '38ccdb70-26a9-48df-958a-44d0fac3bab7',
                  kind: 'Mobile',
                },
              ],
              title: 'Mr',
              uuid: '5d02b0d1-d685-49c2-b35f-bb5b7f1a2a51',
              __typename: 'PersonType',
            },
          },
        },
      },
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
          query: EMAIL_ALREADY_EXISTS,
          variables: {
            email: 'bruce_bonus@gmail.com',
          },
        },
        result: {
          data: {
            emailAlreadyExists: false,
          },
        },
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

    await screen.findByTestId('about-you_heading');

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
