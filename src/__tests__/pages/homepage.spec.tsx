import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HomePageData } from '../../../generated/HomePageData';
import { ALL_CONTENT } from '../../gql/homepage';
import { HomePage } from '../../pages';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';

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
      {
        request: {
          query: GET_SEARCH_POD_DATA,
          variables: {
            vehicleTypes: ['LCV'],
          },
        },
        result: () => {
          return {
            data: {
              filterList: {
                vehicleTypes: ['LCV'],
                groupedRanges: [
                  {
                    parent: 'Citroën',
                    children: ['Berlingo', 'Dispatch', 'Relay'],
                  },
                  {
                    parent: 'Dacia',
                    children: ['Duster'],
                  },
                ],
                bodyStyles: ['Dropside Tipper', 'Large Van'],
              },
            },
          };
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
