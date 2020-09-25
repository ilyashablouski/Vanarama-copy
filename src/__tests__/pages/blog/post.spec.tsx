import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useGenericPage } from '../../../gql/genericPage';
import BlogPost from '../../../pages/blog';

jest.mock('../../../gql/genericPage');
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

describe('<BlogPost />', () => {
  it('should successfully show post data', async () => {
    (useGenericPage as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        genericPage: {
          id: '42LjdTY9hSi2YdVi4aEsuO',
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
          sections: {
            cards: null,
            carousel: null,
            tiles: null,
          },
          intro: null,
          body:
            "When it comes to leasing a vehicle, you'll be presented with either personal or business options.",
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
        },
      },
      error: undefined,
    });
    render(<BlogPost />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "When it comes to leasing a vehicle, you'll be presented with either personal or business options.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Vehicle Leasing | Personal & Business Lease'),
      ).toBeInTheDocument();
    });
  });
});
