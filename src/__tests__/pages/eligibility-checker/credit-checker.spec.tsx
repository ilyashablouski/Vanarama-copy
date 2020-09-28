import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import CreditChecker from '../../../pages/lease-eligibility-checker/credit-checker';
import { useProductCard } from '../../../gql/productCard';
import { useCarDerivativesData } from '../../../containers/OrdersInformation/gql';
import { useVehicleListUrl } from '../../../gql/vehicleList';

jest.mock('../../../gql/productCard');
jest.mock('../../../containers/OrdersInformation/gql');
jest.mock('../../../gql/vehicleList');

jest.mock('../../../containers/SearchPodContainer', () => () => {
  return <div />;
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/eligibility-checker/credit-checker',
      asPath: '/eligibility-checker/credit-checker',
      query: {
        score: 75,
      },
    };
  },
  push: jest.fn(),
}));

describe('<CreditChecker />', () => {
  beforeEach(async () => {
    (useProductCard as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        productCarousel: [
          {
            averageRating: 4.8,
            businessRate: 164.88,
            capId: '83615',
            derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
            imageUrl:
              'https://images.autorama.co.uk/Photos/Vehicles/155485/im_3411.jpg',
            isOnOffer: true,
            keyInformation: [],
            leadTime: '10-14 Day Delivery',
            manufacturerName: 'Ford',
            offerPosition: 1,
            personalRate: 197.88,
            rangeName: 'Focus',
          },
        ],
      },
      error: undefined,
    });

    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        derivatives: [
          {
            id: '83615',
            derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
            slug: '10-ecoBoost-125-st-line-nav-5dr',
            capCode: 'capCode',
            name: 'name',
            manufacturer: {
              name: 'Ford',
              slug: 'ford',
            },
            model: {
              name: 'Focus',
              slug: 'focus',
            },
            fuelType: {
              name: 'name',
            },
            transmission: {
              name: 'name',
            },
            bodyStyle: {
              name: 'Hatchback',
            },
            range: {
              name: 'Focus',
              slug: 'focus',
            },
            __typename: 'derivative',
          },
        ],
        vehicleImages: null,
      },
      error: undefined,
    });

    (useVehicleListUrl as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        vehicleList: {
          totalCount: 1,
          pageInfo: {
            startCursor: 'startCursor',
            endCursor: 'endCursor',
            hasNextPage: 'hasNextPage',
            hasPreviousPage: 'hasPreviousPage',
          },
          edges: [
            {
              cursor: 'cursor',
              node: {
                derivativeId: '83615',
                url: 'url',
                legacyUrl:
                  '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
              },
            },
          ],
        },
      },
      error: undefined,
    });

    render(<CreditChecker />);
  });

  it('should render title, link and text correctly', async () => {
    expect(screen.getByText('Choose Your Vehicle'));
    expect(screen.getByText('Not sure? We can')).toBeInTheDocument();
    expect(screen.getByText('help you choose')).toBeInTheDocument();
  });

  it('should trigger route push when clicking car Choose Your Vehicle', async () => {
    fireEvent.click(screen.getByText('Choose Your Vehicle'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing/'),
    );
  });

  it('should trigger route push when clicking View All Cars', async () => {
    fireEvent.click(screen.getByText('View All Cars'));
    await waitFor(() =>
      expect(Router.push).toHaveBeenCalledWith('/car-leasing'),
    );
  });

  it('should trigger route push when clicking View Offer', async () => {
    fireEvent.click(screen.getByText('View Offer'));
    expect(screen.getByTestId('car-view-offer')).toHaveAttribute(
      'href',
      '/van-leasing/ford/focus/10-ecoBoost-125-st-line-nav-5dr',
    );
  });

  it('should render Error', async () => {
    (useProductCard as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'error' },
    });

    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'error' },
    });

    render(<CreditChecker />);

    expect(screen.getByText('error'));
  });
});
