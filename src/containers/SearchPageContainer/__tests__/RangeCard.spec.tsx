import React from 'react';
import renderer from 'react-test-renderer';
import VehicleCard from '../VehicleCard';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import RangeCard from '../RangeCard';
import { GET_RANGES_IMAGES } from '../gql';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
describe('<RangeCard />', () => {
  const resetMocks = () => {
    return {
      data: {
        "rangeName": "2 Series",
        "rangeId": "1208",
        "count": 217,
        "minPrice": 191.91
      },
      isPersonalPrice: true,
      viewRange: jest.fn(),
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
        },
      },
      result: () => {
        imageRequest = true;
        return {
          data: {
            "vehicleImages": [
              {
                "mainImageUrl": "https://images.autorama.co.uk/Photos/Cap/Vehicles/126268/cap-68051-126268.jpg"
              },]
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
  it('should be open car page', async () => {
    // ACT
      render(
        <MockedProvider mocks={mocksResponse} addTypename={false}>
        <RangeCard {...mocks} />
      </MockedProvider>,
      );

    // ASSERT
    fireEvent.click(screen.getByText('View All'));
    expect(mocks.viewRange).toBeCalledWith('1208');
  });
});
