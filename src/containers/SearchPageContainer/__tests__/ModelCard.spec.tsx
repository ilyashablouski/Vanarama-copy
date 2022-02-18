import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import ModelCard from '../components/ModelCard';
import { GET_MODEL_IMAGES } from '../gql';
import { GENERIC_SEARCH_PAGE_SLUG } from '../../../gql/genericPage';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/car-leasing/BMW',
    query: { make: 'BMW', rangeName: '3 series', dynamicParam: 'BMW' },
    route: '/car-leasing/BMW',
  }),
}));

describe('<ModelCard />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  const resetMocks = () => {
    return {
      data: {
        bodyStyle: 'coupe',
        count: 2,
        minPrice: 120,
        capId: 123,
        legacyUrl: '/bmw-car-leasing/3-series/coupe.html',
      },
      dataUiTestId: 'model-card',
      isPersonalPrice: true,
    };
  };

  const mocks = resetMocks();
  let imageRequest = false;

  const mocksResponse: MockedResponse[] = [
    {
      request: {
        query: GET_MODEL_IMAGES,
        variables: {
          capIds: ['123'],
        },
      },
      result: () => {
        imageRequest = true;
        return {
          data: {
            vehicleImages: [
              {
                mainImageUrl:
                  'https://images.autorama.co.uk/Photos/Cap/Vehicles/126268/cap-68051-126268.jpg',
                capId: 11111,
              },
            ],
          },
        };
      },
    },
    {
      request: {
        query: GENERIC_SEARCH_PAGE_SLUG,
        variables: {
          slug: 'car-leasing/bmw/3-series/coupe',
        },
      },
      result: () => {
        return {
          data: {
            genericPage: {
              metaData: {
                legacyUrl: '/bmw-car-leasing/3-series/coupe.html',
              },
            },
          },
        };
      },
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <ModelCard {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(imageRequest).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
