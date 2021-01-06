import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from 'core/atoms/toast/Toast';
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
import { makeGetCreditApplicationMock } from '../../../../gql/creditApplication';

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
      pathname: '/b2b/olaf/about',
      query: {
        orderId: '00000000-24a5-42ff-9acd-00000000',
      },
    };
  },
}));

const getCreditApplication = makeGetCreditApplicationMock(
  '00000000-24a5-42ff-9acd-00000000',
);

describe('B2B About You page', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should submit data to the server and redirect to the company details page', async () => {
    const mocks: MockedResponse[] = [
      getCreditApplication,
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
        result: {
          data: {
            createUpdateBusinessPerson: {
              uuid: '84e78193-c7dc-4859-b483-9f9e8d46a126',
              emailAddresses: [
                {
                  createdAt: '2020-09-08T15:07:53.541+00:00',
                  kind: 'Home',
                  partyId: '2252',
                  primary: true,
                  updatedAt: '2020-09-08T15:07:53.541+00:00',
                  uuid: 'e7379b53-3059-44d9-9185-4b188505a2b5',
                  value: 'a.douhal@reply.com',
                },
              ],
              telephoneNumbers: [
                {
                  createdAt: '2020-10-13T11:57:09.064+00:00',
                  kind: 'Mobile',
                  partyId: '2252',
                  primary: true,
                  updatedAt: '2020-10-13T11:57:09.064+00:00',
                  uuid: '2f6f6d7f-89d9-42b4-97e0-d1544591b219',
                  value: '01323223323',
                },
              ],
              __typename: 'PersonType',
            },
          } as SaveBusinessAboutYou,
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

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I have read and understood the/i,
      }),
      { target: { checked: true } },
    );

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() =>
      expect(screen.queryByText('Saving...')).not.toBeInTheDocument(),
    );
  });

  it('should display a toast message if the request to the server fails', async () => {
    const mocks: MockedResponse[] = [
      getCreditApplication,
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

    fireEvent.input(
      screen.getByRole('checkbox', {
        name: /I have read and understood the/i,
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
