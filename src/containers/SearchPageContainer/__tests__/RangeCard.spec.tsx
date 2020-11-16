import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import RangeCard from '../RangeCard';
import { GET_RANGES_IMAGES, GET_MODEL_IMAGES } from '../gql';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    pathname: '/car-leasing/BMW',
    query: {
      dynamicParam: 'BMW',
    },
  }),
}));

describe('<RangeCard />', () => {
  const resetMocks = () => {
    return {
      title: '2 Series',
      id: '1208',
      vehicleType: 'CAR',
      fromPrice: 191.91,
      isPersonalPrice: true,
      isAllMakesCard: false,
    };
  };

  const mocks = resetMocks();
  let imageRequest = false;

  const mocksResponse: MockedResponse[] = [
    {
      request: {
        query: GET_RANGES_IMAGES,
        variables: {
          rangeId: '1208',
          vehicleType: 'CAR',
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
              },
            ],
          },
        };
      },
    },
    {
      request: {
        query: GET_MODEL_IMAGES,
        variables: {
          capIds: ['1208'],
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
              },
            ],
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
        <RangeCard {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(imageRequest).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
  it('should be render correctly with all makes page', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <RangeCard {...mocks} isAllMakesCard />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(imageRequest).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
