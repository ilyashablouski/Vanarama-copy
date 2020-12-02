import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ContactUsPage } from '../../../pages/contact-us';
import { useGenericPage } from '../../../gql/genericPage';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '/contact-us',
  }),
}));
jest.mock('../../../gql/genericPage');
jest.mock('../../../hooks/useMediaQuery');

const mocked: MockedResponse[] = [];

describe('<ContactUsPage />', () => {
  beforeEach(async () => {
    (useGenericPage as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        genericPage: {
          id: '6kwAjjbDywHCouepDMPJ1v',
          metaData: {
            title: 'Vehicle Leasing | Personal & Business Lease',
            name: 'Vehicle Leasing | Personal & Business Lease',
            metaRobots: 'all',
            metaDescription: null,
            publishedOn: '2020-08-02',
            legacyUrl: 'https://www.vanarama.com/',
            pageType: 'Leasing Explained Article',
            canonicalUrl:
              'https://www.vanarama.com/car-leasing-explained/business-vs-personal-car-leasing.html',
            slug: '/car-leasing-explained/business-vs-personal-car-leasing',
            schema: null,
          },
          featuredImage: {
            title: 'Personal Vs Buisness Leasing-full',
            description: 'Man searching though his bag in a business lease car',
            file: {
              url:
                '//images.ctfassets.net/3xid768u5joa/2e4LdVtVx07Zo9SX2m6hC3/c6a589ac518aa667201206d6a8fa1402/personal-vs-buisness-leasing.jpg',
              fileName: 'personal-vs-buisness-leasing.jpg',
              contentType: 'image/jpeg',
            },
          },
          body: '',
          intro: '',
          sections: {
            featured1: {
              title: 'Head Office',
              body:
                'Ad est aliqua reprehenderit labore exercitation est veniam consectetur sit deserunt commodo magna anim sit aliqua sunt non irure sit velit magna aliqua ullamco esse amet cillum elit fugiat ipsum',
              layout: [''],
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
                    url: '/vanarama',
                    text: 'Chat With iVan',
                  },
                },
              ],
            },
          },
        },
      },
    });

    await preloadAll();

    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <ContactUsPage />
      </MockedProvider>,
    );
  });

  it.skip('should trigger route push when clicking Chat With iVan', async () => {
    await screen.findAllByText('Chat With iVan');
    fireEvent(
      screen.getAllByText('Chat With iVan')[0],
      new MouseEvent('click', {
        bubbles: false,
      }),
    );
    await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/vanarama'));
  });
});
