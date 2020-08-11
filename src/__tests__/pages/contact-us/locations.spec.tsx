import React from 'react';
// @ts-ignore
// import preloadAll from 'jest-next-dynamic';
// import Router from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { LocationsPage } from '../../../pages/contact-us/locations';
import { LOCATIONS_PAGE_CONTENT } from '../../../gql/contact-us/contactUs';
import { LocationsPageData } from '../../../../generated/LocationsPageData';

jest.mock('../../../containers/BreadCrumbContainer', () => () => {
  return <div />;
});

// jest.mock('next/router', () => ({ push: jest.fn() }));

const mocked: MockedResponse[] = [
  {
    request: {
      query: LOCATIONS_PAGE_CONTENT,
    },
    result: () => {
      return {
        data: {
          regionalOfficesPage: {
            id: '1p0BIbJUDnPfRLn0v6VNOZ',
            metaData: {
              title: 'Our Regional Locations - Vanarama',
            },
            body: 'With 50 regional offices throughout the United Kingdom',
            intro: 'mock intro',
          },
        } as LocationsPageData,
      };
    },
  },
];

describe('<LocationsPage />', () => {
  it('should successfully query LocationsPage data', async () => {
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <LocationsPage />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText('Our Regional Locations - Vanarama'),
      ).toBeInTheDocument();
    });
  });
});
