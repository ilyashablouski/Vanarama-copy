import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HomePageData } from '../../../generated/HomePageData';
import { ALL_CONTENT } from '../../gql/homepage';
import { HomePage } from '../../pages';

require('dotenv').config();

describe('<HomePage />', () => {
  it('should successfully query contentful data', async () => {
    const mocked: MockedResponse[] = [
      {
        request: {
          query: ALL_CONTENT,
        },
        result: {
          data: {
            homePage: {
              sections: {
                hero: {
                  title: '',
                  body: 'hero body',
                  image: {
                    file: {
                      url: '',
                    },
                    title: '',
                  },
                },
                leadText: {
                  heading: 'Lead heading',
                  description: 'hellow world description',
                },
                cards: {
                  name: '',
                  cards: [],
                },
                featured1: {
                  title: 'Why Leasing?',
                  body: '',
                },
                featured2: {
                  title: 'Featured 2 title',
                  body: '',
                },
                tiles: {
                  name: '',
                  tiles: [],
                },
              },
            },
          } as HomePageData,
        },
      },
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <HomePage />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Why Leasing?')).toBeInTheDocument();
    });
  });
});
