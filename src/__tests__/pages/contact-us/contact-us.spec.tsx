import React from 'react';
// @ts-ignore
// import preloadAll from 'jest-next-dynamic';
// import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { ContactUsPage } from '../../../pages/contact-us';
import { CONTACT_US_CONTENT } from '../../../gql/contact-us/contactUs';
import { ContactUsPageData } from '../../../../generated/ContactUsPageData';

jest.mock('../../../containers/BreadCrumbContainer', () => () => {
  return <div />;
});

// jest.mock('next/router', () => ({ push: jest.fn() }));

const mocked: MockedResponse[] = [
  {
    request: {
      query: CONTACT_US_CONTENT,
    },
    result: () => {
      return {
        data: {
          contactUsLandingPage: {
            id: '6kwAjjbDywHCouepDMPJ1v',
            sections: {
              featured1: {
                title: 'Head Office',
                body:
                  'Ad est aliqua reprehenderit labore exercitation est veniam consectetur sit',
              },
              cards: {
                cards: [
                  {
                    title: 'Telephone',
                    titleTag: null,
                    body:
                      'New vehicle & leasing enquiries email: vehicleleasing@vanarama.co.uk',
                  },
                ],
              },
              featured2: {
                title: 'Customer Service',
                body:
                  'Vanarama is a trading name for Autorama UK Ltd \n\nAutorama UK Ltd Registered in England and Wales with registration number: 05137709 \n\nRegistered office: Vanarama HQ, Maylands Avenue, Hemel Hempstead, Hertfordshire, HP2 7DE \n\nTo view our complaints procedure, please [click here](https://beta.vanarama.com/contact-us/complaints-procedure.html).',
              },
            },
          },
        } as ContactUsPageData,
      };
    },
  },
];

describe('<ContactUsPage />', () => {
  it('should successfully query ContactUsPage data', async () => {
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <ContactUsPage />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText(
          'New vehicle & leasing enquiries email: vehicleleasing@vanarama.co.uk',
        ),
      ).toBeInTheDocument();
    });
  });
});
