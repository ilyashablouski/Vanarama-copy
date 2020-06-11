import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { ParsedUrlQuery } from 'querystring';
import {
  GetAboutCarDataQuery,
  GetAboutCarDataQueryVariables,
} from '../../../../../generated/GetAboutCarDaraQuery';
import { GET_CAR_DATA } from '../gql';

import CarDetailsPage from '..';

interface IProps {
  query: ParsedUrlQuery;
}

describe('<CarDetailsPage />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly ', () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_CAR_DATA,
          variables: {
            capId: 84429,
            capIdDetails: 84429,
            vehicleType: 'CAR',
          } as GetAboutCarDataQueryVariables,
        },
        result: {
          data: {
            vehicleConfigurationByCapId: {
              capDerivativeDescription:
                'C200 Amg Line Premium 2 Doors 9g-Tronic',
              capManufacturerDescription: 'Mercedes-Benz',
              capModelDescription: 'C Class Coupe',
              capPaintDescription: 'Solid - Polar white',
              capTrimDescription:
                'Artico man-made leather/Microfibre Dinamica - Black',
              offerRanking: 91,
              onOffer: true,
              uuid: '2c0690a0-3da6-4490-b378-cc381029c6cb',
              __typename: 'VehicleConfigurationType',
            },
            vehicleDetails: {
              averageRating: 4.7,
              brochureUrl: null,
            },
          },
        } as GetAboutCarDataQuery,
      },
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <CarDetailsPage />
      </MockedProvider>,
    );

    await waitFor(() => screen.findByTestId('carDetailsWrapper'));
    // expect(screen).toMatchSnapshot();
  });
});
