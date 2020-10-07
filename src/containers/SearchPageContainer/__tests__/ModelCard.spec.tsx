import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import ModelCard from '../ModelCard';
import { GET_MODEL_IMAGES } from '../gql';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/car-leasing/BMW',
    query: { rangeName: '3 series', dynamicParam: 'BMW' },
    route: '/car-leasing/BMW',
  }),
}));
describe('<ModelCard />', () => {
  const resetMocks = () => {
    return {
      data: {
        bodyStyle: 'coupe',
        count: 2,
        minPrice: 120,
        capId: 123,
      },
      isPersonalPrice: true,
      viewModel: jest.fn(),
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
        <ModelCard {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(imageRequest).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
  it('should be open model page', async () => {
    // ACT
    render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <ModelCard {...mocks} />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('View 2 Offers')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('View 2 Offers'));
    expect(mocks.viewModel).toBeCalledWith('coupe');
  });
});
