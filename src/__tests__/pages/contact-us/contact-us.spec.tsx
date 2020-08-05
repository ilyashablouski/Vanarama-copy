import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ContactUsPage } from '../../../pages/contact-us';
import { CONTACT_US_CONTENT } from '../../../gql/contact-us/contactUs';
import { ContactUsPageData } from '../../../../generated/ContactUsPageData';

jest.mock('../../../containers/BreadCrumbContainer', () => () => {
  return <div />;
});

jest.mock('next/router', () => ({ push: jest.fn() }));

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
                  'Ad est aliqua reprehenderit labore exercitation est veniam consectetur sit deserunt commodo magna anim sit aliqua sunt non irure sit velit magna aliqua ullamco esse amet cillum elit fugiat ipsum',
              },
              cards: {
                cards: [
                  {
                    title: 'Telephone',
                    titleTag: null,
                    body:
                      '### 01442 838 195\n\n__Monday__ - __Friday__ 9am - 9pm\n__Saturday__ - __Sunday__ 11am - 9pm',
                  },
                  {
                    title: 'Email us',
                    titleTag: null,
                    body:
                      '- New vehicle & leasing enquiries email: vehicleleasing@vanarama.co.uk\n\n\n- General enquires: enquiries@vanarama.co.uk\n\n\n- Customer Support email: customersupport@vanarama.co.uk',
                  },
                ],
              },
              featured2: {
                title: 'Customer Service',
                body:
                  'Vanarama is a trading name for Autorama UK Ltd \n\nAutorama UK Ltd Registered in England and Wales with registration number: 05137709 \n\nRegistered office: Vanarama HQ, Maylands Avenue, Hemel Hempstead, Hertfordshire, HP2 7DE \n\nTo view our complaints procedure, please [click here](https://beta.vanarama.com/contact-us/complaints-procedure.html).',
                cards: [
                  {
                    title: 'Meet iVan',
                    body:
                      'Our helpful chatbot iVan is available 24/7 to answer your van financing questions\n\n[Chat with iVan](https://www.vanarama.com)',
                    image: {
                      file: {
                        url:
                          '//images.ctfassets.net/3xid768u5joa/eZPgB9urABZFuaBLX1Uk9/79c0739890cc618c962493bec51a9358/ivan-card.JPG',
                      },
                    },
                    link: {
                      url: '/www.vanarama.com',
                      text: 'Chat With iVan',
                    },
                  },
                ],
              },
            },
          },
        } as ContactUsPageData,
      };
    },
  },
];

describe('<ContactUsPage />', () => {
  beforeEach(async () => {
    await preloadAll();

    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <ContactUsPage />
      </MockedProvider>,
    );
  });

  it('should successfully query ContactUsPage data', async () => {
    await waitFor(() => {
      expect(screen.getByText('Head Office')).toBeInTheDocument();
    });
  });

  it.skip('should trigger route push when clicking Chat With iVan', async () => {
    await screen.findAllByText('Chat With iVan');
    fireEvent(
      screen.getAllByText('Chat With iVan')[0],
      new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
      }),
    );
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/www.vanarama.com'),
    );
  });
});
