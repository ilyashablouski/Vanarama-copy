import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HomePageData } from '../../../generated/HomePageData';
import { ALL_HOME_CONTENT } from '../../gql/homepage';
import { HomePage } from '../../pages';
import { GET_SEARCH_POD_DATA } from '../../containers/SearchPodContainer/gql';

/**
 * NOTE: Mock the SearchPodContainer as it is out of scope for this test and is doing state
 * updates after the test has finished.
 */
jest.mock('../../containers/SearchPodContainer', () => () => {
  return <div />;
});

describe('<HomePage />', () => {
  it('should successfully query contentful data', async () => {
    const mocked: MockedResponse[] = [
      {
        request: {
          query: ALL_HOME_CONTENT,
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
