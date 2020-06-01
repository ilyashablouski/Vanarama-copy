import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from '../../pages';
import { ALL_CONTENT } from '../../gql/homepage';
import { HomePageData } from '../../../generated/HomePageData';

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
                featured1: {
                  title: 'Why Leasing?',
                  body: '',
                },
                featured2: {
                  title: 'Featured 2 title',
                  body: '',
                },
                hero: {
                  title: '',
                  flag: '',
                  body: '',
                  image: {
                    file: {
                      url: '',
                    },
                    title: '',
                  },
                },
                cards: {
                  name: '',
                  cards: [],
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
